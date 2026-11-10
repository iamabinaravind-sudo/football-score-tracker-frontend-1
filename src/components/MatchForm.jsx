
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  Typography,
  Box,
  Divider
} from '@mui/material';

import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';

const blank = {
  homeTeam: '',
  awayTeam: '',
  homeScore: 0,
  awayScore: 0,
  date: '',
  time: '18:00',
  competition: 'Premier League',
  venue: '',
  status: 'Upcoming',
  category: 'League',
  players: []
};

export default function MatchForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({ ...blank });
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({ ...blank, ...initial });
    setError('');
  }, [initial, open]);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError('');
  };

  const submit = () => {
    if (
      !form.homeTeam.trim() ||
      !form.awayTeam.trim() ||
      !form.date
    ) {
      setError('Please enter both teams and match date.');
      return;
    }

    if (
      form.homeTeam.trim().toLowerCase() ===
      form.awayTeam.trim().toLowerCase()
    ) {
      setError('A team cannot play against itself.');
      return;
    }

    if (
      Number(form.homeScore) < 0 ||
      Number(form.awayScore) < 0
    ) {
      setError('Scores cannot be negative.');
      return;
    }

    if (
      form.status === 'Completed' &&
      (form.homeScore === '' || form.awayScore === '')
    ) {
      setError('Enter both final scores.');
      return;
    }

    onSave({
      ...form,
      homeScore: Number(form.homeScore),
      awayScore: Number(form.awayScore)
    });

    setForm({ ...blank });
    setError('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 45,
              height: 45,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.hover',
              color: 'primary.main'
            }}
          >
            <SportsSoccerRoundedIcon />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={900}>
              {initial ? 'Edit match' : 'Create new match'}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Add your fixture and match information
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <Divider sx={{ my: 1 }} />

      <DialogContent>
        <Typography fontWeight={800} mb={2} mt={1}>
          Team information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Home team"
              name="homeTeam"
              value={form.homeTeam}
              onChange={change}
              placeholder="e.g. Arsenal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Away team"
              name="awayTeam"
              value={form.awayTeam}
              onChange={change}
              placeholder="e.g. Chelsea"
            />
          </Grid>
        </Grid>

        <Typography fontWeight={800} mt={3} mb={2}>
          Match details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Match date"
              type="date"
              name="date"
              value={form.date}
              onChange={change}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Kick-off time"
              type="time"
              name="time"
              value={form.time}
              onChange={change}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Competition"
              name="competition"
              value={form.competition}
              onChange={change}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Venue"
              name="venue"
              value={form.venue}
              onChange={change}
              placeholder="Stadium name"
            />
          </Grid>
        </Grid>

        <Typography fontWeight={800} mt={3} mb={2}>
          Scoreboard
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Home score"
              type="number"
              name="homeScore"
              value={form.homeScore}
              onChange={change}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Away score"
              type="number"
              name="awayScore"
              value={form.awayScore}
              onChange={change}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Match status"
              name="status"
              value={form.status}
              onChange={change}
            >
              {['Upcoming', 'Live', 'Completed'].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={form.category}
              onChange={change}
            >
              {['League', 'Cup', 'Friendly', 'International'].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          color="inherit"
          onClick={onClose}
          sx={{ fontWeight: 700 }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={submit}
          sx={{ px: 3, py: 1.2 }}
        >
          {initial ? 'Update match' : 'Save match'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
