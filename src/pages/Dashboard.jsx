
import React, { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Card,
  CardContent,
  Chip
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { useNavigate } from 'react-router-dom';

import { getMatchesAPI } from '../services/apiServices';
import StatsCard from '../components/StatsCard';
import MatchCard from '../components/MatchCard';

export default function Dashboard() {
  const [matches, setMatches] = useState([]);

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
      .catch((err) => console.log(err));
  }, []);

  const completed = matches.filter(
    (match) => match.status === 'Completed'
  );

  const upcoming = matches
    .filter((match) => match.status === 'Upcoming')
    .sort((a, b) => a.date.localeCompare(b.date));

  const live = matches.filter(
    (match) => match.status === 'Live'
  );

  const goals = completed.reduce(
    (total, match) =>
      total + Number(match.homeScore) + Number(match.awayScore),
    0
  );

  const recent = [...completed]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const statistics = [
    {
      title: 'Total Matches',
      value: matches.length,
      caption: 'All recorded fixtures',
      icon: <SportsSoccerRoundedIcon />,
      accent: '#168653'
    },
    {
      title: 'Total Goals',
      value: goals,
      caption: 'Goals in completed matches',
      icon: <TimelineRoundedIcon />,
      accent: '#d99a35'
    },
    {
      title: 'Completed',
      value: completed.length,
      caption: 'Finished matches',
      icon: <EmojiEventsRoundedIcon />,
      accent: '#4385cf'
    },
    {
      title: 'Upcoming',
      value: upcoming.length,
      caption: 'Scheduled fixtures',
      icon: <CalendarMonthRoundedIcon />,
      accent: '#8a68c7'
    }
  ];

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
            OVERVIEW
          </Typography>

          <Typography variant="h4" fontWeight={900}>
            Dashboard
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Your football season, all in one place.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={() => navigate('/matches')}
        >
          Add new match
        </Button>
      </Box>

      <Box className="hero-banner">

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 570 }}>

          <Chip
            label="YOUR FOOTBALL SEASON"
            sx={{
              bgcolor: 'rgba(185,237,119,0.15)',
              color: '#b9ed77',
              fontWeight: 800,
              letterSpacing: 1,
              mb: 2
            }}
          />

          <Typography
            variant="h3"
            fontWeight={900}
            color="white"
            sx={{
              fontFamily: 'Outfit',
              lineHeight: 1.15,
              letterSpacing: -1
            }}
          >
            Every match has
            <br />
            a story to tell.
          </Typography>

          <Typography
            color="#d0ddd4"
            mt={2}
            maxWidth={430}
            lineHeight={1.8}
          >
            Track fixtures, capture every goal and keep
            your football season organized with Matchday.
          </Typography>

          <Box display="flex" gap={2} mt={3}>
            <Button
              variant="contained"
              onClick={() => navigate('/matches')}
              sx={{
                bgcolor: '#b9ed77',
                color: '#17311f',
                '&:hover': {
                  bgcolor: '#a6dd61'
                }
              }}
            >
              Explore matches
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate('/calendar')}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.08)'
                }
              }}
            >
              View calendar
            </Button>
          </Box>

        </Box>
      </Box>

      <Box mb={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h6" fontWeight={900}>
              Season overview
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Your performance at a glance
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {statistics.map((item) => (
            <Grid item xs={12} sm={6} xl={3} key={item.title}>
              <StatsCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={900}>
            Live centre
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Matches currently in progress
          </Typography>
        </Box>

        <Chip
          label={`${live.length} LIVE`}
          color={live.length ? 'error' : 'default'}
          size="small"
          sx={{ fontWeight: 800 }}
        />
      </Box>

      {live.length > 0 ? (
        <Grid container spacing={2} mb={4}>
          {live.map((match) => (
            <Grid item xs={12} md={6} key={match.id}>
              <MatchCard match={match} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            mb: 4
          }}
        >
          <CardContent sx={{ py: 3, textAlign: 'center' }}>
            <SportsSoccerRoundedIcon
              sx={{ fontSize: 35, color: 'text.secondary', mb: 1 }}
            />

            <Typography fontWeight={800}>
              No live matches right now
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Your live matches will appear here.
            </Typography>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>

        <Grid item xs={12} lg={7}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box>
              <Typography variant="h6" fontWeight={900}>
                Recent results
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Your latest completed matches
              </Typography>
            </Box>

            <Button
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => navigate('/matches')}
            >
              View all
            </Button>
          </Box>

          <Stack spacing={2}>
            {recent.length > 0 ? (
              recent.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <EmojiEventsRoundedIcon
                    sx={{ fontSize: 35, color: 'text.secondary', mb: 1 }}
                  />

                  <Typography fontWeight={800}>
                    No results yet
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Completed matches will appear here.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box>
              <Typography variant="h6" fontWeight={900}>
                Upcoming fixtures
              </Typography>

              <Typography variant="body2" color="text.secondary">
                What's coming next
              </Typography>
            </Box>

            <Button
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => navigate('/calendar')}
            >
              Calendar
            </Button>
          </Box>

          <Stack spacing={2}>
            {upcoming.length > 0 ? (
              upcoming.slice(0, 3).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <CalendarMonthRoundedIcon
                    sx={{ fontSize: 35, color: 'text.secondary', mb: 1 }}
                  />

                  <Typography fontWeight={800}>
                    No upcoming fixtures
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Add a fixture to plan your next match.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>

      </Grid>

    </Box>
  );
}
