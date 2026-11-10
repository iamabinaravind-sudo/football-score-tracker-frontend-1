
import React, { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Alert
} from '@mui/material';

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useNavigate } from 'react-router-dom';
import { getMatchesAPI } from '../services/apiServices';

export default function Calendar() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem('matchday-user') || '{}'
  );

  useEffect(() => {
    getMatchesAPI()
      .then((res) => {
        setMatches(
          res.data.filter((match) => match.userId === user.id)
        );
      })
      .catch(() => {
        setError('Unable to load calendar events.');
      });
  }, []);

  const events = matches.map((match) => ({
    id: String(match.id),
    title: `${match.homeTeam} vs ${match.awayTeam}`,
    start: `${match.date}T${match.time || '12:00'}`,
    backgroundColor:
      match.status === 'Completed'
        ? '#168653'
        : match.status === 'Live'
          ? '#d94d4d'
          : '#d49b35',
    borderColor: 'transparent',
    textColor: '#ffffff'
  }));

  const upcoming = matches.filter(
    (match) => match.status === 'Upcoming'
  ).length;

  const completed = matches.filter(
    (match) => match.status === 'Completed'
  ).length;

  const live = matches.filter(
    (match) => match.status === 'Live'
  ).length;

  return (
    <Box>

      <Box className="page-heading">
        <Box>
          <Typography
            variant="overline"
            color="primary.main"
            fontWeight={800}
            letterSpacing={2}
          >
            MATCH SCHEDULE
          </Typography>

          <Typography variant="h4" fontWeight={900}>
            Calendar
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Plan, organize and follow all your football fixtures.
          </Typography>
        </Box>

        <Box
          sx={{
            width: 55,
            height: 55,
            borderRadius: 3,
            bgcolor: 'action.hover',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CalendarMonthRoundedIcon sx={{ fontSize: 30 }} />
        </Box>
      </Box>

      <Box
        display="flex"
        gap={2}
        mb={3}
      >
        <Card sx={{ flex: 1, borderRadius: 3 }}>
          <CardContent sx={{ py: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Total fixtures
            </Typography>

            <Typography variant="h4" fontWeight={900}>
              {matches.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 3 }}>
          <CardContent sx={{ py: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Upcoming
            </Typography>

            <Typography variant="h4" fontWeight={900} color="warning.main">
              {upcoming}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 3 }}>
          <CardContent sx={{ py: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Completed
            </Typography>

            <Typography variant="h4" fontWeight={900} color="success.main">
              {completed}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 3 }}>
          <CardContent sx={{ py: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Live
            </Typography>

            <Typography variant="h4" fontWeight={900} color="error.main">
              {live}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none'
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
              <Typography variant="h6" fontWeight={900}>
                Fixture calendar
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Select any match to view its details.
              </Typography>
            </Box>

            <Chip
              icon={<SportsSoccerRoundedIcon />}
              label="MATCHDAY SCHEDULE"
              variant="outlined"
              sx={{ fontWeight: 800 }}
            />
          </Box>

          <Stack direction="row" spacing={3} mb={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: '#d49b35'
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Upcoming
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: '#d94d4d'
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Live
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: '#168653'
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Completed
              </Typography>
            </Box>
          </Stack>

          <Box className="calendar-shell" sx={{ p: 0, border: 0, boxShadow: 'none' }}>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin
              ]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={events}
              height="auto"
              eventClick={(info) => {
                navigate(`/matches/${info.event.id}`);
              }}
              eventDisplay="block"
              dayMaxEvents={3}
              nowIndicator
            />
          </Box>

        </CardContent>
      </Card>

    </Box>
  );
}
