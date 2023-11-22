import { Divider, Paper, Typography } from '@mui/material';

function BsMonthCount(props: {
  month: string;
  count: number;
  onClick?: () => void;
}) {
  const { month, count, onClick } = props;
  return (
    <Paper
      elevation={3}
      onClick={onClick}
      sx={{
        padding: '1rem',
        ...(count
          ? {
              '&:hover': {
                cursor: 'pointer',
                background: 'rgba(0, 0, 0, 0.04)',
              },
            }
          : {}),
      }}
    >
      <Typography variant="h5" color="primary">
        {month}
      </Typography>
      <Divider light variant="fullWidth" />
      <Typography variant="h4" textAlign="center">
        {count}
      </Typography>
    </Paper>
  );
}

export default BsMonthCount;
