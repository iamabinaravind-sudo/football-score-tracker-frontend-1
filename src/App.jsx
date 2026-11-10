
import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import MatchDetails from './pages/MatchDetails';
import Calendar from './pages/Calendar';
import Downloads from './pages/Downloads';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export default function App() {
  const [mode, setMode] = useState(
    localStorage.getItem('matchday-theme') || 'light'
  );

  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('matchday-user');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#a9df76' : '#168653'
      },
      background: {
        default: mode === 'dark' ? '#171d1a' : '#f5f7f6',
        paper: mode === 'dark' ? '#202924' : '#ffffff'
      },
      text: {
        primary: mode === 'dark' ? '#edf4ef' : '#18251f',
        secondary: mode === 'dark' ? '#9ba99f' : '#78857e'
      }
    },
    typography: {
      fontFamily: "'DM Sans', sans-serif",
      button: {
        textTransform: 'none',
        fontWeight: 700
      }
    },
    shape: {
      borderRadius: 12
    }
  }), [mode]);

  const toggleTheme = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    localStorage.setItem('matchday-theme', next);
  };

  const logout = () => {
    localStorage.removeItem('matchday-user');
    window.location.href = '/login';
  };

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box data-theme={mode} className={isAuthPage ? '' : 'app-shell'}>
        {isAuthPage ? (
          <Routes>
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/" /> : <Register />}
            />
          </Routes>
        ) : (
          <>
            <Box className="desktop-sidebar">
              <Sidebar onLogout={logout} />
            </Box>

            <Box className="main-area">
              <Header onTheme={toggleTheme} mode={mode} />

              <Box className="page-content">
                <Routes>
                  <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                  <Route path="/matches" element={isLoggedIn ? <Matches /> : <Navigate to="/login" />} />
                  <Route path="/matches/:id" element={isLoggedIn ? <MatchDetails /> : <Navigate to="/login" />} />
                  <Route path="/calendar" element={isLoggedIn ? <Calendar /> : <Navigate to="/login" />} />
                  <Route path="/downloads" element={isLoggedIn ? <Downloads /> : <Navigate to="/login" />} />
                  <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
                  <Route path="*" element={isLoggedIn ? <NotFound /> : <Navigate to="/login" />} />
                </Routes>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
