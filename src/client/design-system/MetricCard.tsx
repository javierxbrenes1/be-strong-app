import { ButtonBase, Card, Typography, Box } from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import Sparkline from './Sparkline';
import StatusChip, { StatusVariant } from './StatusChip';

type Props = {
  label: string;
  value: string;
  unit?: string;
  status?: { variant: StatusVariant; label: string };
  delta?: { value: number; good: boolean };
  spark?: number[];
  selected?: boolean;
  onSelect?: () => void;
};

function MetricCard({
  label,
  value,
  unit,
  status,
  delta,
  spark,
  selected = false,
  onSelect,
}: Props) {
  const Arrow =
    delta && delta.value < 0
      ? ArrowDownwardRoundedIcon
      : ArrowUpwardRoundedIcon;
  const body = (
    <Box sx={{ p: 2, textAlign: 'left', width: '100%' }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 600 }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
        <Typography variant="metric">{value}</Typography>
        {unit && (
          <Typography variant="body2" color="text.secondary">
            {unit}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
          minHeight: 24,
        }}
      >
        {status && <StatusChip variant={status.variant} label={status.label} />}
        {delta && (
          <Typography
            component="span"
            variant="body2"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              fontWeight: 600,
              color: delta.good ? 'success.main' : 'error.main',
            }}
          >
            <Arrow sx={{ fontSize: 16 }} />
            {Math.abs(delta.value)}
          </Typography>
        )}
      </Box>
      {spark && <Sparkline points={spark} />}
    </Box>
  );
  return (
    <Card
      sx={
        selected
          ? {
              borderColor: 'primaryInk',
              boxShadow: '0 0 0 1px var(--mui-palette-primaryInk)',
            }
          : undefined
      }
    >
      {onSelect ? (
        <ButtonBase
          onClick={onSelect}
          aria-pressed={selected}
          sx={{ display: 'block', width: '100%' }}
        >
          {body}
        </ButtonBase>
      ) : (
        body
      )}
    </Card>
  );
}

export default MetricCard;
