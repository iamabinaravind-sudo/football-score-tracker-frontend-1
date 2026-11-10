import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import './index.css';

const savedTheme = localStorage.getItem('matchday-theme') || 'dark';
const theme = createTheme({
  palette: { mode: savedTheme, primary: { main: '#b7f36b' }, secondary: { main: '#62d6a4' },
    background: savedTheme === 'dark' ? { default: '#101714', paper: '#18221d' } : { default: '#f4f7f2', paper: '#ffffff' } },
  typography: { fontFamily: '"DM Sans", sans-serif', h1: {fontFamily:'"Space Grotesk", sans-serif'}, h2:{fontFamily:'"Space Grotesk", sans-serif'}, h3:{fontFamily:'"Space Grotesk", sans-serif'}, button:{textTransform:'none',fontWeight:700} },
  shape:{borderRadius:14}, components:{ MuiButton:{styleOverrides:{root:{borderRadius:11,padding:'9px 16px'}}}, MuiCard:{styleOverrides:{root:{backgroundImage:'none'}}} }
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><ThemeProvider theme={theme}><CssBaseline/><App initialMode={savedTheme}/></ThemeProvider></BrowserRouter></React.StrictMode>
);