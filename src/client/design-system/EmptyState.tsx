import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

function EmptyState({ icon, title, description, action }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 1,
        py: 6,
        px: 2,
        color: 'text.secondary',
      }}
    >
      {icon}
      <Typography variant="h3" color="text.primary">
        {title}
      </Typography>
      {description && <Typography variant="body2">{description}</Typography>}
      {action}
    </Box>
  );
}

export default EmptyState;
