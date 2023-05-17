import { Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { getMeasureColorAndEmoji } from './utils/measureColorPicker';
import { MeasureType } from './utils/measureTypes';

const Container = styled(Box)<{ selected?: boolean }>(
  ({ selected, theme }) => ({
    backgroundColor: '#ebebeb',
    width: '100%',
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
  flexWrap: 'wrap',
  '& *': {
    margin: 0,
    padding: 0,
  },
});

function MeasureItem(props: {
  id: MeasureType;
  selectedOption: MeasureType | null;
  title: string;
  value: string;
  chipText?: string;
  onClick: (ev: MeasureType) => void;
}) {
  const { title, value, chipText, id, selectedOption, onClick } = props;

  const { color, emoji } = getMeasureColorAndEmoji(chipText || '');

  return (
    <Container
      selected={id === selectedOption}
      role="button"
      onClick={() => onClick(id)}
    >
      <Typography variant="h6" color="#393e46">
        {title}
      </Typography>
      <ValueWrapper>
        <Typography variant="h4">{value}</Typography>
        {chipText && (
          <Chip
            label={`${chipText} ${emoji}`}
            sx={{
              backgroundColor: color,
              padding: '10px',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          />
        )}
      </ValueWrapper>
    </Container>
  );
}

export default MeasureItem;
