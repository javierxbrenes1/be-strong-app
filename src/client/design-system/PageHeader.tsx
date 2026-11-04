import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
  leading?: ReactNode;
};

function PageHeader({ title, subtitle, actions, leading }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
        {leading}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {actions && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>{actions}</Box>
      )}
    </Box>
  );
}

export default PageHeader;
