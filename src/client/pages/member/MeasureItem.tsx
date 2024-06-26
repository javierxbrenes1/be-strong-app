/* eslint-disable eqeqeq */
import { useRef, useEffect } from 'react';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { getMeasureColorAndEmoji } from '../../utils/measureColorPicker';
import { Measures } from '../../types';
import measuresDecorator from './measuresDiffsDecorator';

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
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  '& *': {
    margin: 0,
    padding: 0,
  },
});

function MeasureItem(props: {
  id: Measures;
  idDiff?: Measures;
  selectedOption: Measures | null;
  title: string;
  value: string;
  valueDiff?: number;
  suffix?: string;
  chipText?: string;
  newMeasureId?: number;
  onClick: (ev: Measures) => void;
  showExplanation?: boolean;
  onShowExplanationClick?: (measure: Measures) => void;
}) {
  const {
    title,
    value,
    valueDiff,
    chipText,
    id,
    idDiff,
    selectedOption,
    onClick,
    newMeasureId,
    suffix,
    showExplanation,
    onShowExplanationClick,
  } = props;
  const newValue = useRef(value);
  const comparativeValue = useRef(value);
  const { color, emoji } = getMeasureColorAndEmoji(chipText || '');

  useEffect(() => {
    if (newMeasureId) {
      onClick(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMeasureId]);

  useEffect(() => {
    comparativeValue.current = value;
    newValue.current = value;
  }, [value]);

  const handleClick = () => {
    onClick(id);
  };

  return (
    <Container
      selected={id === selectedOption}
      role="button"
      onClick={handleClick}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="0.125rem"
      >
        <Typography variant="h6" color="#393e46">
          {title}
        </Typography>
        {showExplanation && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onShowExplanationClick?.(id);
            }}
          >
            <InfoIcon sx={{ color: '#bfbdbd' }} />
          </IconButton>
        )}
      </Stack>
      <ValueWrapper>
        <Typography variant="h4">{`${value} ${suffix ?? ''}`}</Typography>
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
        {idDiff &&
          valueDiff != undefined &&
          measuresDecorator(idDiff, valueDiff)}
      </ValueWrapper>
    </Container>
  );
}

export default MeasureItem;
