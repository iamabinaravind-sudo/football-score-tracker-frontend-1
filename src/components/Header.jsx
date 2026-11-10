
import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip
} from '@mui/material';

import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

export default function Header({ onTheme, mode }) {

  const user = JSON.parse(
    localStorage.getItem('matchday-user') || '{}'
  );

  const firstName = user.name?.split(' ')[0] || 'Player';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      className="topbar"
    >
      <Toolbar>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={700}
            letterSpacing={1.5}
          >
            YOUR FOOTBALL CONTROL CENTRE
          </Typography>

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              fontFamily: 'Outfit',
              mt: 0.3
            }}
          >
            Welcome back, {firstName} 👋
          </Typography>
        </Box>

        <Tooltip title="Toggle theme">
          <IconButton
            onClick={onTheme}
            sx={{
              width: 43,
              height: 43,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              mr: 1.5
            }}
          >
            {mode === 'dark'
              ? <LightModeRoundedIcon />
              : <DarkModeRoundedIcon />
            }
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton
            sx={{
              width: 43,
              height: 43,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              mr: 2
            }}
          >
            <NotificationsNoneRoundedIcon />
          </IconButton>
        </Tooltip>

        <Avatar
          sx={{
            width: 43,
            height: 43,
            bgcolor: 'primary.main',
            color: mode === 'dark' ? '#17231b' : '#ffffff',
            fontWeight: 900,
            fontSize: 17
          }}
        >
          {user.name?.[0]?.toUpperCase() || 'P'}
        </Avatar>

      </Toolbar>
    </AppBar>
  );
}
