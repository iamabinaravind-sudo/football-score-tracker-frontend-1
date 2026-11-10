import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
  Alert,
  IconButton,
  Divider,
} from "@mui/material";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import {
  getMatchesAPI,
  getDownloadsAPI,
  addDownloadAPI,
  deleteDownloadAPI,
} from "../services/apiServices";

function Downloads() {
  const [matches, setMatches] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const user = JSON.parse(localStorage.getItem("matchday-user") || "{}");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [matchResponse, downloadResponse] = await Promise.all([
        getMatchesAPI(),
        getDownloadsAPI(),
      ]);

      const userMatches = matchResponse.data.filter(
        (match) => match.userId === user.id
      );

      const userDownloads = downloadResponse.data
        .filter((item) => item.userId === user.id)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

      setMatches(userMatches);
      setHistory(userDownloads);
    } catch {
      setError("Unable to load reports. Please start JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveDownloadHistory = async (name, matchId, type) => {
    try {
      await addDownloadAPI({
        userId: user.id,
        name,
        matchId,
        createdAt: new Date().toISOString(),
        type,
      });

      await loadData();
    } catch {
      setError("PDF created, but download history could not be saved.");
    }
  };

  const createPDF = async (match) => {
    try {
      setError("");

      const doc = new jsPDF();

      doc.setFillColor(23, 35, 29);
      doc.rect(0, 0, 210, 42, "F");

      doc.setTextColor(169, 223, 118);
      doc.setFontSize(11);
      doc.text("MATCHDAY · FOOTBALL TRACKER", 14, 16);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(23);
      doc.text("Match Summary", 14, 31);

      doc.setTextColor(30, 40, 34);
      doc.setFontSize(12);

      const score =
        match.status === "Upcoming"
          ? "VS"
          : `${match.homeScore} - ${match.awayScore}`;

      doc.text(
        `${match.homeTeam}   ${score}   ${match.awayTeam}`,
        14,
        58
      );

      doc.setFontSize(10);

      doc.text(`Competition: ${match.competition || "-"}`, 14, 70);
      doc.text(`Date: ${match.date}   Kick-off: ${match.time || "-"}`, 14, 78);
      doc.text(`Venue: ${match.venue || "-"}   Status: ${match.status}`, 14, 86);

      autoTable(doc, {
        startY: 100,
        head: [["Player", "Team", "Goals", "Assists", "Yellow", "Red"]],
        body: (match.players || []).map((player) => [
          player.name,
          player.team,
          player.goals,
          player.assists,
          player.yellow,
          player.red,
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [34, 66, 48],
        },
      });

      const fileName = `matchday-${match.homeTeam.replace(
        /\W+/g,
        "-"
      )}-vs-${match.awayTeam.replace(/\W+/g, "-")}.pdf`;

      doc.save(fileName);

      await saveDownloadHistory(
        `${match.homeTeam} vs ${match.awayTeam}`,
        match.id,
        "Match summary"
      );
    } catch {
      setError("Unable to generate the PDF report.");
    }
  };

  const exportAll = async () => {
    if (matches.length === 0) {
      setError("There are no matches available to export.");
      return;
    }

    try {
      setExporting(true);
      setError("");

      const doc = new jsPDF();

      doc.setFillColor(23, 35, 29);
      doc.rect(0, 0, 210, 35, "F");

      doc.setTextColor(169, 223, 118);
      doc.setFontSize(11);
      doc.text("MATCHDAY · FOOTBALL TRACKER", 14, 14);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text("Match History", 14, 27);

      autoTable(doc, {
        startY: 45,
        head: [
          ["Date", "Competition", "Home Team", "Score", "Away Team", "Status"],
        ],
        body: matches.map((match) => [
          match.date,
          match.competition || "-",
          match.homeTeam,
          match.status === "Upcoming"
            ? "VS"
            : `${match.homeScore} - ${match.awayScore}`,
          match.awayTeam,
          match.status,
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [34, 66, 48],
        },
        styles: {
          fontSize: 8,
        },
      });

      doc.save("matchday-match-history.pdf");

      await saveDownloadHistory(
        "All match summaries",
        null,
        "Full match history"
      );
    } catch {
      setError("Unable to export match history.");
    } finally {
      setExporting(false);
    }
  };

  const removeDownload = async (id) => {
    try {
      await deleteDownloadAPI(id);
      await loadData();
    } catch {
      setError("Unable to delete download history.");
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Downloads
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Generate and manage your match reports.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<FileDownloadRoundedIcon />}
          onClick={exportAll}
          disabled={matches.length === 0 || exporting}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          {exporting ? "Exporting..." : "Export All Matches"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        display="grid"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        gap={2}
        mb={4}
      >
        <Card elevation={0}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DescriptionRoundedIcon color="primary" />
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2">
                  Available Matches
                </Typography>

                <Typography variant="h4" fontWeight={800}>
                  {matches.length}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card elevation={0}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PictureAsPdfRoundedIcon color="primary" />
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2">
                  Generated Reports
                </Typography>

                <Typography variant="h4" fontWeight={800}>
                  {history.length}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box mb={5}>
        <Box mb={2}>
          <Typography variant="h6" fontWeight={800}>
            Match Reports
          </Typography>

          <Typography color="text.secondary" variant="body2">
            Select a match to generate its PDF summary.
          </Typography>
        </Box>

        {loading ? (
          <Typography color="text.secondary">
            Loading matches...
          </Typography>
        ) : matches.length === 0 ? (
          <Card elevation={0}>
            <CardContent sx={{ textAlign: "center", py: 5 }}>
              <PictureAsPdfRoundedIcon
                sx={{ fontSize: 45, color: "text.secondary", mb: 1 }}
              />

              <Typography fontWeight={700}>
                No matches available
              </Typography>

              <Typography color="text.secondary" variant="body2">
                Add matches to generate PDF reports.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Stack spacing={2}>
            {matches.map((match) => (
              <Card key={match.id} elevation={0}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography fontWeight={700}>
                      {match.homeTeam} vs {match.awayTeam}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mt={1}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {match.date}
                      </Typography>

                      <Typography color="text.secondary">·</Typography>

                      <Typography variant="body2" color="text.secondary">
                        {match.competition || "Friendly"}
                      </Typography>

                      <Chip
                        label={match.status}
                        size="small"
                        color={
                          match.status === "Completed"
                            ? "success"
                            : match.status === "Live"
                            ? "error"
                            : "warning"
                        }
                      />
                    </Stack>
                  </Box>

                  <Button
                    variant="outlined"
                    startIcon={<DownloadRoundedIcon />}
                    onClick={() => createPDF(match)}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box>
        <Typography variant="h6" fontWeight={800} mb={0.5}>
          Download History
        </Typography>

        <Typography color="text.secondary" variant="body2" mb={2}>
          Your previously generated reports.
        </Typography>

        {history.length === 0 ? (
          <Card elevation={0}>
            <CardContent sx={{ textAlign: "center", py: 5 }}>
              <DescriptionRoundedIcon
                sx={{ fontSize: 42, color: "text.secondary", mb: 1 }}
              />

              <Typography fontWeight={700}>
                No download history
              </Typography>

              <Typography color="text.secondary" variant="body2">
                Your generated reports will appear here.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Card elevation={0}>
            {history.map((item, index) => (
              <React.Fragment key={item.id}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  p={2}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PictureAsPdfRoundedIcon color="error" />
                    </Box>

                    <Box>
                      <Typography fontWeight={700}>
                        {item.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {item.type} ·{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>

                  <IconButton
                    color="error"
                    onClick={() => removeDownload(item.id)}
                  >
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
                </Box>

                {index !== history.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        )}
      </Box>
    </Box>
  );
}

export default Downloads;