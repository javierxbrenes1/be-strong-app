import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Measures } from '../../types';

const upWarningDownSuccess = (value: number) =>
  value > 0 ? 'error' : 'success';
const upSuccessDownWarning = (value: number) =>
  value > 0 ? 'success' : 'error';

const measureRules = {
  weightDiff: upWarningDownSuccess,
  bodyMassIndexDiff: upWarningDownSuccess,
  corporalFatDiff: upWarningDownSuccess,
  caloriesDiff: upWarningDownSuccess,
  corporalWaterPctDiff: upSuccessDownWarning,
  muscleDiff: upSuccessDownWarning,
};

function measuresDecorator(id: Measures, value: unknown): ReactNode {
  const valueAsNumber = value as number;
  const color = measureRules[id as keyof typeof measureRules]?.(valueAsNumber);
  if (!color) {
    return value as ReactNode;
  }
  // eslint-disable-next-line eqeqeq
  if (valueAsNumber == 0) {
    return <Typography> - </Typography>;
  }
  return (
    <Typography
      sx={{
        color: (theme) => theme.palette[color].main,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {parseFloat(value as string) > 0 ? (
        <ArrowUpwardIcon />
      ) : (
        <ArrowDownwardIcon />
      )}
      {Math.abs(parseFloat(value as string))}
    </Typography>
  );
}

export default measuresDecorator;
