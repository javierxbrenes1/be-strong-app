import { Chip } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { ReactElement } from 'react';

export type StatusVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

const VARIANTS: Record<
  StatusVariant,
  { icon?: ReactElement; bg: string; fg: string }
> = {
  success: {
    icon: <CheckRoundedIcon />,
    bg: 'var(--mui-palette-soft-success)',
    fg: 'var(--mui-palette-success-main)',
  },
  warning: {
    icon: <CircleRoundedIcon sx={{ fontSize: '10px !important' }} />,
    bg: 'var(--mui-palette-soft-warning)',
    fg: 'var(--mui-palette-warning-main)',
  },
  danger: {
    icon: <ChangeHistoryRoundedIcon />,
    bg: 'var(--mui-palette-soft-error)',
    fg: 'var(--mui-palette-error-main)',
  },
  info: {
    icon: <InfoRoundedIcon />,
    bg: 'var(--mui-palette-soft-info)',
    fg: 'var(--mui-palette-info-main)',
  },
  neutral: {
    bg: 'var(--mui-palette-surface2)',
    fg: 'var(--mui-palette-text-secondary)',
  },
};

type Props = { variant: StatusVariant; label: string };

function StatusChip({ variant, label }: Props) {
  const v = VARIANTS[variant];
  return (
    <Chip
      size="small"
      label={label}
      icon={v.icon}
      sx={{
        bgcolor: v.bg,
        color: v.fg,
        '& .MuiChip-icon': { color: v.fg, fontSize: 16 },
      }}
    />
  );
}

export default StatusChip;
