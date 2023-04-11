import { Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Container = styled(Box)<{ selected?: boolean }>(
  ({ selected, theme }) => ({
    backgroundColor: '#ebebeb',
    width: 'fit-content',
    padding: '10px',
    borderRadius: '10px',
    border: `2px solid ${selected ? theme.palette.primary.main : '#e3e3e3'}`,
    '&:hover': {
      cursor: 'pointer',
    },
  })
);
const ValueWrapper = styled(Box)({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  '& *': {
    margin: 0,
    padding: 0,
  },
});

function MeasureItem(props: {
  title: string;
  value: string;
  chipText?: string;
  chipColor?: string;
  selected?: boolean;
}) {
  const { title, value, chipText, chipColor, selected } = props;
  return (
    <Container selected={selected}>
      <Typography variant="h6" color="#393e46">
        {title}
      </Typography>
      <ValueWrapper>
        <Typography variant="h4">{value}</Typography>
        {chipText && (
          <Chip
            label={chipText}
            sx={{
              backgroundColor: chipColor,
              padding: '0 10px',
              fontWeight: 'bold',
            }}
          />
        )}
      </ValueWrapper>
    </Container>
  );
}

export default MeasureItem;
