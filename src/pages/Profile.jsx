import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Stack,
  Divider,
  Alert,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

function Profile() {
  const storedUser = JSON.parse(
    localStorage.getItem("matchday-user") || "{}"
  );

  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const updatedUser = {
      ...storedUser,
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem("matchday-user", JSON.stringify(updatedUser));

    setSuccess("Your profile has been updated successfully.");
  };

  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800}>
          My Profile
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Manage your Matchday account information.
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="280px 1fr"
        gap={3}
        alignItems="start"
      >
        <Card elevation={0}>
          <CardContent
            sx={{
              textAlign: "center",
              py: 4,
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontSize: 34,
                fontWeight: 800,
              }}
            >
              {initials}
            </Avatar>

            <Typography variant="h6" fontWeight={800}>
              {name || "User"}
            </Typography>

            <Typography color="text.secondary" variant="body2">
              {email}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <SportsSoccerRoundedIcon color="primary" />

              <Typography variant="body2" fontWeight={700}>
                Matchday Member
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={800} mb={0.5}>
              Personal Information
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Update your account details below.
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSave}>
              <Stack spacing={3}>
                <TextField
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <PersonRoundedIcon
                        sx={{ mr: 1, color: "text.secondary" }}
                      />
                    ),
                  }}
                />

                <TextField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <EmailRoundedIcon
                        sx={{ mr: 1, color: "text.secondary" }}
                      />
                    ),
                  }}
                />

                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveRoundedIcon />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1.2,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Profile;