
import React from 'react';

import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Typography
} from '@mui/material';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  category,
  setCategory
}) {
  return (
    <Box
      className="filter-row"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2.5,
        borderRadius: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        mb: 3
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={700}
          mb={1}
          display="block"
        >
          SEARCH MATCHES
        </Typography>

        <TextField
          fullWidth
          size="small"
          placeholder="Search teams or competitions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon color="action" />
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box sx={{ width: 190 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={700}
          mb={1}
          display="block"
        >
          MATCH STATUS
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="All">All statuses</MenuItem>

          {['Upcoming', 'Live', 'Completed'].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ width: 190 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={700}
          mb={1}
          display="block"
        >
          CATEGORY
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="All">All categories</MenuItem>

          {['League', 'Cup', 'Friendly', 'International'].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
