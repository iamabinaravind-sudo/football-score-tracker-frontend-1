
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import { Link, useNavigate } from "react-router-dom";
import { getUsersAPI } from "../services/apiServices";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await getUsersAPI();

      const user = response.data.find(
        (item) =>
          item.email.toLowerCase() === email.trim().toLowerCase() &&
          item.password === password
      );

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      localStorage.setItem(
        "matchday-user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );

      navigate("/");
    } catch {
      setError("Unable to connect to the server. Please start JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        bgcolor: "#ffffff",
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(180deg, rgba(8,20,14,0.12), rgba(8,20,14,0.92)), url(https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1800&q=90)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              bgcolor: "#a9df76",
              color: "#14251b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SportsSoccerRoundedIcon sx={{ fontSize: 29 }} />
          </Box>

          <Typography fontSize={22} fontWeight={900} letterSpacing={2}>
            MATCHDAY
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 560 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.8,
              borderRadius: 10,
              bgcolor: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.2)",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#a9df76",
              }}
            />

            <Typography fontSize={11} fontWeight={800} letterSpacing={1.5}>
              YOUR FOOTBALL CONTROL CENTRE
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 58,
              lineHeight: 1.08,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            Every game.
            <Box component="span" sx={{ color: "#a9df76", display: "block" }}>
              Every moment.
            </Box>
            One place.
          </Typography>

          <Typography
            sx={{
              mt: 3,
              maxWidth: 440,
              color: "rgba(255,255,255,0.78)",
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            Manage your fixtures, track match results, monitor player
            performances and keep your football journey organised.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 4,
              mt: 5,
            }}
          >
            <Box>
              <Typography fontSize={25} fontWeight={900} color="#a9df76">
                01
              </Typography>
              <Typography fontSize={12} color="rgba(255,255,255,0.7)">
                Track matches
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={25} fontWeight={900} color="#a9df76">
                02
              </Typography>
              <Typography fontSize={12} color="rgba(255,255,255,0.7)">
                Analyse players
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={25} fontWeight={900} color="#a9df76">
                03
              </Typography>
              <Typography fontSize={12} color="rgba(255,255,255,0.7)">
                Own your season
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography fontSize={12} color="rgba(255,255,255,0.55)">
          © 2026 MATCHDAY · FOOTBALL TRACKER
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 7,
          py: 5,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 410 }}>
          <Box mb={5}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 2.5,
                bgcolor: "#edf7e7",
                color: "#168653",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <SportsSoccerRoundedIcon sx={{ fontSize: 30 }} />
            </Box>

            <Typography
              sx={{
                fontSize: 34,
                fontWeight: 900,
                color: "#17251d",
                letterSpacing: -1.2,
              }}
            >
              Welcome back
            </Typography>

            <Typography color="#7b8980" mt={1}>
              Enter your details to access your dashboard.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <InputLabel
              sx={{
                color: "#34483b",
                fontWeight: 700,
                mb: 1,
                fontSize: 13,
              }}
            >
              Email address
            </InputLabel>

            <TextField
              placeholder="you@example.com"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#f8faf8",
                  "& fieldset": {
                    borderColor: "#e5ebe6",
                  },
                  "&:hover fieldset": {
                    borderColor: "#168653",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#168653",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon sx={{ color: "#84948a" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <InputLabel
                sx={{
                  color: "#34483b",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                Password
              </InputLabel>
            </Box>

            <TextField
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#f8faf8",
                  "& fieldset": {
                    borderColor: "#e5ebe6",
                  },
                  "&:hover fieldset": {
                    borderColor: "#168653",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#168653",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon sx={{ color: "#84948a" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffRoundedIcon />
                      ) : (
                        <VisibilityRoundedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                mt: 4,
                py: 1.7,
                borderRadius: 2,
                bgcolor: "#168653",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: 15,
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(22,134,83,0.18)",
                "&:hover": {
                  bgcolor: "#116d43",
                  boxShadow: "0 10px 24px rgba(22,134,83,0.25)",
                },
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography textAlign="center" color="#7b8980" fontSize={14}>
            New to Matchday?{" "}
            <Link
              to="/register"
              style={{
                color: "#168653",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Create an account
            </Link>
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
            mt={5}
          >
            <ShieldRoundedIcon sx={{ fontSize: 17, color: "#84948a" }} />

            <Typography fontSize={11} color="#84948a">
              Your account information stays protected
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
