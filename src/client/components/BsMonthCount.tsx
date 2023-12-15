import { styled, Box, Paper, Typography } from '@mui/material';

const MonthContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.white.main,
  padding: '.5rem 1rem',
  marginBottom: '.25rem',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

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
      <MonthContainer>
        <Typography variant="h5" color="white">
          {month}
        </Typography>
      </MonthContainer>
      <Typography variant="h4" textAlign="center">
        {count}
      </Typography>
    </Paper>
  );
}

export default BsMonthCount;
