import { Box, Card, Typography } from '@mui/material';

type Props = {
  label: string;
  value: string | number;
  delta?: { text: string; good: boolean };
  hint?: string;
};

function KpiCard({ label, value, delta, hint }: Props) {
  return (
    <Card sx={{ p: 2 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 600 }}
      >
        {label}
      </Typography>
      <Typography variant="metric">{value}</Typography>
      <Box
        sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}
      >
        {delta && (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: delta.good ? 'success.main' : 'error.main',
            }}
          >
            {delta.text}
          </Typography>
        )}
        {hint && (
          <Typography variant="body2" color="text.secondary">
            {hint}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

export default KpiCard;
