
import React, { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Stack,
  Divider,
  Alert
} from '@mui/material';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import { useNavigate, useParams } from 'react-router-dom';

import {
  getMatchesAPI,
  updateMatchAPI
} from '../services/apiServices';

export default function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [player, setPlayer] = useState({
    name: '',
    team: '',
    goals: 0,
    assists: 0,
    yellow: 0,
    red: 0
  });

  const user = JSON.parse(
    localStorage.getItem('matchday-user') || '{}'
  );

  useEffect(() => {
    getMatchesAPI()
      .then((res) => {
        const found = res.data.find(
          (item) => String(item.id) === String(id) &&
            item.userId === user.id
        );

        setMatch(found || null);
      })
      .catch(() => {
        setError('Unable to load match details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const changePlayer = (e) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value
    });
  };

  const addPlayer = async () => {
    if (!player.name.trim() || !player.team.trim()) {
      setError('Please enter player name and team.');
      return;
    }

    const updatedPlayers = [
      ...(match.players || []),
      {
        ...player,
        goals: Number(player.goals),
        assists: Number(player.assists),
        yellow: Number(player.yellow),
        red: Number(player.red)
      }
    ];

    try {
      await updateMatchAPI(match.id, {
        players: updatedPlayers
      });

      setMatch({
        ...match,
        players: updatedPlayers
      });

      setPlayer({
        name: '',
        team: '',
        goals: 0,
        assists: 0,
        yellow: 0,
        red: 0
      });

      setError('');
    } catch {
      setError('Unable to save player statistics.');
    }
  };

  if (loading) {
    return (
      <Typography color="text.secondary">
        Loading match details...
      </Typography>
    );
  }

  if (!match) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate('/matches')}
        >
          Back to matches
        </Button>

        <Typography mt={3} fontWeight={700}>
          Match not found.
        </Typography>
      </Box>
    );
  }

  const statusColor = {
    Completed: 'success',
    Live: 'error',
    Upcoming: 'info'
  };

  return (
    <Box>

      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => navigate('/matches')}
        sx={{ mb: 3, fontWeight: 700 }}
      >
        Back to matches
      </Button>

      <Box className="page-heading">
        <Box>
          <Typography
            variant="overline"
            color="primary.main"
            fontWeight={800}
            letterSpacing={2}
          >
            MATCH CENTRE
          </Typography>

          <Typography variant="h4" fontWeight={900}>
            Match details
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Complete match information and player performance.
          </Typography>
        </Box>

        <Chip
          label={match.status}
          color={statusColor[match.status] || 'default'}
          sx={{ fontWeight: 800 }}
        />
      </Box>

      <Card
        className="detail-score"
        sx={{ borderRadius: 4, overflow: 'hidden' }}
      >
        <Box
          sx={{
            bgcolor: 'action.hover',
            p: 2,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="overline"
            color="primary.main"
            fontWeight={900}
            letterSpacing={2}
          >
            {match.competition || 'FOOTBALL MATCH'}
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={3}
            mb={4}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonthRoundedIcon color="action" />

              <Typography variant="body2" color="text.secondary">
                {match.date}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <AccessTimeRoundedIcon color="action" />

              <Typography variant="body2" color="text.secondary">
                {match.time || 'Time TBA'}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <LocationOnOutlinedIcon color="action" />

              <Typography variant="body2" color="text.secondary">
                {match.venue || 'Venue TBA'}
              </Typography>
            </Box>
          </Stack>

          <Grid container alignItems="center" spacing={2}>

            <Grid item xs={4}>
              <Box textAlign="center">
                <Box className="team-badge large">
                  {match.homeTeam.slice(0, 2).toUpperCase()}
                </Box>

                <Typography variant="h6" fontWeight={900} mt={2}>
                  {match.homeTeam}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  HOME TEAM
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box textAlign="center">
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={900}
                  letterSpacing={2}
                >
                  {match.status === 'Live' ? 'LIVE' : match.status === 'Completed' ? 'FULL TIME' : 'KICK OFF'}
                </Typography>

                <Typography
                  variant="h2"
                  fontWeight={900}
                  sx={{
                    fontFamily: 'Outfit',
                    my: 1
                  }}
                >
                  {match.status === 'Upcoming'
                    ? 'VS'
                    : `${match.homeScore} - ${match.awayScore}`}
                </Typography>

                <Chip
                  label={match.status}
                  color={statusColor[match.status] || 'default'}
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box textAlign="center">
                <Box className="team-badge large">
                  {match.awayTeam.slice(0, 2).toUpperCase()}
                </Box>

                <Typography variant="h6" fontWeight={900} mt={2}>
                  {match.awayTeam}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  AWAY TEAM
                </Typography>
              </Box>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      <Box mt={5} mb={2}>
        <Typography variant="h5" fontWeight={900}>
          Player statistics
        </Typography>

        <Typography color="text.secondary" variant="body2" mt={0.5}>
          Individual player performance during this match.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              {['Player', 'Team', 'Goals', 'Assists', 'Yellow cards', 'Red cards'].map((item) => (
                <TableCell key={item} sx={{ fontWeight: 900 }}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {(match.players || []).map((item, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Typography fontWeight={800}>
                    {item.name}
                  </Typography>
                </TableCell>

                <TableCell>{item.team}</TableCell>
                <TableCell>{item.goals}</TableCell>
                <TableCell>{item.assists}</TableCell>
                <TableCell>{item.yellow}</TableCell>
                <TableCell>{item.red}</TableCell>
              </TableRow>
            ))}

            {!match.players?.length && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <SportsSoccerRoundedIcon
                    sx={{ fontSize: 35, color: 'text.secondary', mb: 1 }}
                  />

                  <Typography fontWeight={800}>
                    No player statistics available
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Add player details below.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Box mt={5} mb={2}>
        <Typography variant="h5" fontWeight={900}>
          Add player statistics
        </Typography>

        <Typography color="text.secondary" variant="body2" mt={0.5}>
          Record goals, assists and disciplinary records.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: 3 }}>

          <Grid container spacing={2}>

            {[
              ['name', 'Player name', 'text'],
              ['team', 'Team name', 'text'],
              ['goals', 'Goals', 'number'],
              ['assists', 'Assists', 'number'],
              ['yellow', 'Yellow cards', 'number'],
              ['red', 'Red cards', 'number']
            ].map(([name, label, type]) => (
              <Grid item xs={4} key={name}>
                <TextField
                  fullWidth
                  size="small"
                  label={label}
                  name={name}
                  type={type}
                  value={player[name]}
                  onChange={changePlayer}
                  inputProps={type === 'number' ? { min: 0 } : undefined}
                />
              </Grid>
            ))}

          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={addPlayer}
              startIcon={<SportsSoccerRoundedIcon />}
              sx={{ px: 3, py: 1.2 }}
            >
              Save player statistics
            </Button>
          </Box>

        </CardContent>
      </Card>

    </Box>
  );
}
