
import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Alert,
  Chip
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';

import {
  getMatchesAPI,
  addMatchAPI,
  updateMatchAPI,
  deleteMatchAPI
} from '../services/apiServices';

import MatchCard from '../components/MatchCard';
import MatchForm from '../components/MatchForm';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const size = 6;

  const user = JSON.parse(
    localStorage.getItem('matchday-user') || '{}'
  );

  const loadMatches = async () => {
    try {
      setLoading(true);

      const response = await getMatchesAPI();

      setMatches(
        response.data.filter(
          (match) => match.userId === user.id
        )
      );

      setError('');
    } catch {
      setError('Unable to load matches. Please start JSON Server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const filtered = useMemo(() => {
    return matches.filter((match) => {
      const searchMatch = (
        `${match.homeTeam} ${match.awayTeam} ${match.competition}`
      )
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        status === 'All' || match.status === status;

      const categoryMatch =
        category === 'All' || match.category === category;

      return searchMatch && statusMatch && categoryMatch;
    });
  }, [matches, search, status, category]);

  const pages = Math.ceil(filtered.length / size);

  const shown = filtered.slice(
    (page - 1) * size,
    page * size
  );

  const saveMatch = async (data) => {
    try {
      if (editing) {
        await updateMatchAPI(editing.id, data);
      } else {
        await addMatchAPI({
          ...data,
          userId: user.id
        });
      }

      setOpen(false);
      setEditing(null);
      setError('');
      await loadMatches();
    } catch {
      setError('Unable to save match. Please try again.');
    }
  };

  const removeMatch = async (id) => {
    if (!window.confirm('Are you sure you want to delete this match?')) {
      return;
    }

    try {
      await deleteMatchAPI(id);
      await loadMatches();
    } catch {
      setError('Unable to delete match.');
    }
  };

  const openAddForm = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEditForm = (match) => {
    setEditing(match);
    setOpen(true);
  };

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
            FIXTURES & RESULTS
          </Typography>

          <Typography variant="h4" fontWeight={900}>
            Matches
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Manage your football fixtures and match records.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={openAddForm}
        >
          Add new match
        </Button>
      </Box>

      <Box
        display="flex"
        gap={2}
        mb={3}
        flexWrap="wrap"
      >
        <Card sx={{ minWidth: 150, borderRadius: 3 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="caption" color="text.secondary">
              Total matches
            </Typography>

            <Typography variant="h5" fontWeight={900}>
              {matches.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 150, borderRadius: 3 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="caption" color="text.secondary">
              Completed
            </Typography>

            <Typography variant="h5" fontWeight={900} color="success.main">
              {matches.filter((m) => m.status === 'Completed').length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 150, borderRadius: 3 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="caption" color="text.secondary">
              Upcoming
            </Typography>

            <Typography variant="h5" fontWeight={900} color="primary.main">
              {matches.filter((m) => m.status === 'Upcoming').length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 150, borderRadius: 3 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="caption" color="text.secondary">
              Live matches
            </Typography>

            <Typography variant="h5" fontWeight={900} color="error.main">
              {matches.filter((m) => m.status === 'Live').length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <SearchFilter
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);
          setPage(1);
        }}
        category={category}
        setCategory={(value) => {
          setCategory(value);
          setPage(1);
        }}
      />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={900}>
            All fixtures
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Showing {shown.length} of {filtered.length} matches
          </Typography>
        </Box>

        <Chip
          icon={<SportsSoccerRoundedIcon />}
          label={`${filtered.length} MATCHES`}
          variant="outlined"
          sx={{ fontWeight: 800 }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ textAlign: 'center', py: 5 }}>
            Loading matches...
          </CardContent>
        </Card>
      ) : shown.length > 0 ? (
        <Stack spacing={2}>
          {shown.map((match) => (
            <Box key={match.id}>
              <MatchCard match={match} />

              <Box
                display="flex"
                justifyContent="flex-end"
                gap={1}
                mt={1}
              >
                <Button
                  size="small"
                  onClick={() => openEditForm(match)}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => removeMatch(match.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      ) : (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ textAlign: 'center', py: 7 }}>
            <SportsSoccerRoundedIcon
              sx={{
                fontSize: 50,
                color: 'text.secondary',
                mb: 2
              }}
            />

            <Typography variant="h6" fontWeight={900}>
              No matches found
            </Typography>

            <Typography color="text.secondary" mt={1} mb={3}>
              Try another search or create a new fixture.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={openAddForm}
            >
              Create match
            </Button>
          </CardContent>
        </Card>
      )}

      <Pagination
        page={page}
        count={pages}
        onChange={setPage}
      />

      <MatchForm
        key={editing?.id || 'new'}
        open={open}
        initial={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={saveMatch}
      />

    </Box>
  );
}
