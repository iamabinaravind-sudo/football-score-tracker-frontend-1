
import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  Box,
  Typography,
  Button,
  Divider
} from '@mui/material';

import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

const links = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <SpaceDashboardRoundedIcon />
  },
  {
    label: 'Matches',
    path: '/matches',
    icon: <SportsSoccerRoundedIcon />
  },
  {
    label: 'Calendar',
    path: '/calendar',
    icon: <CalendarMonthRoundedIcon />
  },
  {
    label: 'Downloads',
    path: '/downloads',
    icon: <DownloadRoundedIcon />
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: <PersonOutlineRoundedIcon />
  }
];

export default function Sidebar({ onLogout }) {
  return (
    <Box className="sidebar-inner">

      <Box className="brand">
        <Box className="brand-mark">
          <SportsSoccerRoundedIcon />
        </Box>

        <Box>
          <Typography
            fontWeight={900}
            fontSize={21}
            letterSpacing={1.5}
          >
            MATCHDAY
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            letterSpacing={2}
          >
            FOOTBALL TRACKER
          </Typography>
        </Box>
      </Box>

      <Typography className="nav-caption">
        MAIN MENU
      </Typography>

      <Box className="nav-menu">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box className="sidebar-promo">
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: '12px',
            background: 'rgba(22,134,83,0.12)',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          <EmojiEventsRoundedIcon />
        </Box>

        <Typography fontWeight={800} mb={0.5}>
          Your season. Your story.
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          lineHeight={1.7}
        >
          Every fixture, every goal and every result in one place.
        </Typography>
      </Box>

      <Divider sx={{ my: 2.5, borderColor: 'divider' }} />

      <Button
        color="inherit"
        fullWidth
        startIcon={<LogoutRoundedIcon />}
        onClick={onLogout}
        sx={{
          justifyContent: 'flex-start',
          px: 2,
          py: 1.3,
          borderRadius: 2,
          color: 'text.secondary',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: 'rgba(220,60,60,0.08)',
            color: '#e05252'
          }
        }}
      >
        Log out
      </Button>

      <Typography
        variant="caption"
        color="text.secondary"
        textAlign="center"
        mt={2}
      >
        MATCHDAY © 2026
      </Typography>

    </Box>
  );
}
