
import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  Divider
} from '@mui/material';

import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import { useNavigate } from 'react-router-dom';

export default function MatchCard({ match }) {
  const navigate = useNavigate();

  const statusColor = {
    Completed: 'success',
    Live: 'error',
    Upcoming: 'info'
  };

  return (
    <Card
      className="match-card"
      sx={{
        borderRadius: 4,
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ p: 3 }}>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <SportsSoccerRoundedIcon
                sx={{ color: 'primary.main', fontSize: 19 }}
              />

              <Typography fontWeight={800} variant="body2">
                {match.competition || 'Football Match'}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              mt={0.5}
              display="block"
            >
              {match.date}
            </Typography>
          </Box>

          <Chip
            label={match.status}
            color={statusColor[match.status] || 'default'}
            size="small"
            sx={{ fontWeight: 800, borderRadius: 2 }}
          />
        </Box>

        <Box className="score-row">

          <Box flex={1} textAlign="center">
            <Box className="team-badge">
              {match.homeTeam.slice(0, 2).toUpperCase()}
            </Box>

            <Typography fontWeight={800} mt={1.5}>
              {match.homeTeam}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Home
            </Typography>
          </Box>

          <Box textAlign="center" px={2}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={800}
              letterSpacing={2}
            >
              {match.status === 'Live' ? 'LIVE SCORE' : 'FULL TIME'}
            </Typography>

            <Typography
              className="score"
              sx={{
                fontFamily: 'Outfit',
                fontSize: 32,
                fontWeight: 900,
                my: 0.5
              }}
            >
              {match.status === 'Upcoming'
                ? 'VS'
                : `${match.homeScore} - ${match.awayScore}`}
            </Typography>
          </Box>

          <Box flex={1} textAlign="center">
            <Box className="team-badge">
              {match.awayTeam.slice(0, 2).toUpperCase()}
            </Box>

            <Typography fontWeight={800} mt={1.5}>
              {match.awayTeam}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Away
            </Typography>
          </Box>

        </Box>

        <Divider sx={{ my: 2.5 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AccessTimeRoundedIcon
                sx={{ fontSize: 16, color: 'text.secondary' }}
              />

              <Typography variant="caption" color="text.secondary">
                {match.time || 'Time TBA'}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <LocationOnOutlinedIcon
                sx={{ fontSize: 16, color: 'text.secondary' }}
              />

              <Typography variant="caption" color="text.secondary">
                {match.venue || 'Venue TBA'}
              </Typography>
            </Box>
          </Box>

          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/matches/${match.id}`)}
            sx={{
              borderRadius: 2,
              fontWeight: 800
            }}
          >
            View details
          </Button>
        </Box>

      </CardContent>
    </Card>
  );
}
