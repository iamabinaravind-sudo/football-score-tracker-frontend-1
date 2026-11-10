
import React from 'react';

import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';

import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

export default function StatsCard({ title, value, caption, icon, accent }) {
  return (
    <Card
      className="stat-card"
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">

          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={700}
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                mt: 2,
                fontFamily: 'Outfit',
                letterSpacing: -1
              }}
            >
              {value}
            </Typography>

            <Box display="flex" alignItems="center" gap={0.5} mt={1.5}>
              <TrendingUpRoundedIcon
                sx={{
                  fontSize: 16,
                  color: accent || 'primary.main'
                }}
              />

              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                {caption}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 55,
              height: 55,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--surface-secondary)',
              color: accent || 'primary.main',
              fontSize: 28
            }}
          >
            {icon}
          </Box>

        </Box>
      </CardContent>
    </Card>
  );
}
