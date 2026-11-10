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
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { Link, useNavigate } from "react-router-dom";
import { getUsersAPI, registerAPI } from "../services/apiServices";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await getUsersAPI();

      const existingUser = response.data.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (existingUser) {
        setError("An account with this email already exists.");
        return;
      }

      await registerAPI({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      navigate("/login");
    } catch {
      setError("Unable to create your account. Please start JSON Server.");
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
          <Typography
            sx={{
              fontSize: 58,
              lineHeight: 1.08,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            Your game.
            <Box component="span" sx={{ color: "#a9df76", display: "block" }}>
              Your stats.
            </Box>
            Your story.
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
            Create your account and take control of your football experience.
            Organise matches, follow performances and build your season.
          </Typography>

          <Box
            sx={{
              mt: 5,
              p: 3,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              maxWidth: 380,
            }}
          >
            <Typography fontWeight={800} color="#a9df76" mb={1}>
              MADE FOR THE GAME
            </Typography>

            <Typography color="rgba(255,255,255,0.8)" fontSize={14}>
              One dashboard for your fixtures, results, players and match
              history.
            </Typography>
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
          py: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 410 }}>
          <Box mb={3}>
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
                mb: 2,
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
              Create account
            </Typography>

            <Typography color="#7b8980" mt={1}>
              Join Matchday and start tracking your matches.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleRegister}>
            <Typography fontSize={13} fontWeight={700} color="#34483b" mb={1}>
              Full name
            </Typography>

            <TextField
              placeholder="Enter your full name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2.2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon sx={{ color: "#84948a" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Typography fontSize={13} fontWeight={700} color="#34483b" mb={1}>
              Email address
            </Typography>

            <TextField
              placeholder="you@example.com"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2.2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon sx={{ color: "#84948a" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Typography fontSize={13} fontWeight={700} color="#34483b" mb={1}>
              Password
            </Typography>

            <TextField
              placeholder="Create a password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2.2 }}
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

            <Typography fontSize={13} fontWeight={700} color="#34483b" mb={1}>
              Confirm password
            </Typography>

            <TextField
              placeholder="Re-enter your password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon sx={{ color: "#84948a" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
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
                mt: 3,
                py: 1.6,
                borderRadius: 2,
                bgcolor: "#168653",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: 15,
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(22,134,83,0.18)",
                "&:hover": {
                  bgcolor: "#116d43",
                },
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography textAlign="center" color="#7b8980" fontSize={14}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#168653",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;