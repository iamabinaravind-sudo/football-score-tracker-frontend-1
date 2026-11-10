
import React from 'react';

import {
  Pagination as MuiPagination,
  Box,
  Typography
} from '@mui/material';

export default function Pagination({ page, count, onChange }) {
  if (count <= 1) return null;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={3}
      mt={2}
    >
      <Typography variant="body2" color="text.secondary">
        Page {page} of {count}
      </Typography>

      <MuiPagination
        page={page}
        count={count}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
