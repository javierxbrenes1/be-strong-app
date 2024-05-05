import { Chip, Paper, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { getMeasureColorAndEmoji } from '../utils/measureColorPicker';

function BsMeasure(props: {
  title: string;
  suffix?: string;
  value: number;
  label?: string;
  measureDiff?: ReactNode;
}) {
  const { title, value, label, suffix, measureDiff } = props;

  const { color, emoji } = getMeasureColorAndEmoji(label ?? '');

  return (
    <Paper elevation={3} sx={{ padding: '10px', margin: '5px' }}>
      <Typography variant="h6">{title}</Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
        flexWrap="wrap"
      >
        <Typography variant="h3">{`${value} ${suffix ?? ''}`}</Typography>
        {label && (
          <Chip
            label={`${emoji} ${label}`}
            sx={{ background: color, fontWeight: 'bold' }}
          />
        )}
        {measureDiff}
      </Stack>
    </Paper>
  );
}

export default BsMeasure;
