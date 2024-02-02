import { useRef, useState, useEffect } from 'react';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import InfoIcon from '@mui/icons-material/Info';
import { getMeasureColorAndEmoji } from '../../utils/measureColorPicker';
import { Measures } from '../../types';

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

const EditableField = styled(ContentEditable)(({ theme }) => ({
  padding: '0 5px',
  ...theme.typography.h4,
  outline: 'none',
  borderBottom: 'transparent solid 1px',
  '&:focus-visible, &:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&:hover': {
    cursor: 'text',
  },
}));

function MeasureItem(props: {
  id: Measures;
  selectedOption: Measures | null;
  title: string;
  value: string;
  suffix?: string;
  chipText?: string;
  triggerClickOnMount?: boolean;
  onUpdateMeasure: (id: Measures, value: number) => void;
  onClick: (ev: Measures) => void;
  showExplanation?: boolean;
  onShowExplanationClick?: (measure: Measures) => void;
}) {
  const {
    title,
    value,
    chipText,
    id,
    selectedOption,
    onClick,
    onUpdateMeasure,
    triggerClickOnMount,
    suffix,
    showExplanation,
    onShowExplanationClick,
  } = props;
  const contentEditableRef = useRef(null);
  const newValue = useRef(value);
  const comparativeValue = useRef(value);
  const [isEditing, setIsEditing] = useState(false);

  const { color, emoji } = getMeasureColorAndEmoji(chipText || '');

  useEffect(() => {
    if (triggerClickOnMount) {
      onClick(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    comparativeValue.current = value;
    newValue.current = value;
  }, [value]);

  const handleClick = () => {
    if (!isEditing) {
      onClick(id);
    }
  };

  const handleChangeText = (ev: ContentEditableEvent) => {
    const RegEx = /^[0-9.]+$/;
    const { target } = ev;
    // check if its valid
    if (!target.value || target.value.match(RegEx)) {
      newValue.current = target.value;
    } else if (contentEditableRef.current) {
      (contentEditableRef.current as { innerHTML: string }).innerHTML =
        newValue.current;
      moveCursorToEnd();
    }
  };

  const moveCursorToEnd = () => {
    setTimeout(() => {
      if (contentEditableRef.current) {
        window.getSelection()?.selectAllChildren(contentEditableRef.current);
        window.getSelection()?.collapseToEnd();
      }
    }, 0.5);
  };

  const handleOnFocus = () => {
    setIsEditing(true);
    moveCursorToEnd();
  };

  const handleOnBlur = () => {
    setIsEditing(false);
    if (!newValue.current) {
      newValue.current = comparativeValue.current;
      return;
    }
    if (comparativeValue.current !== newValue.current) {
      // it has to update measure
      onUpdateMeasure(id, Number(newValue.current));
    }
  };

  const handleOnKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.code === 'Enter' && contentEditableRef.current) {
      (contentEditableRef.current as { blur(): () => void }).blur();
    }
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
        <Box sx={{ display: 'flex' }}>
          <EditableField
            innerRef={contentEditableRef}
            html={newValue.current}
            onChange={handleChangeText}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            tabIndex={-1}
            onKeyDown={handleOnKeyDown}
          />
          {suffix && <Typography variant="h4">{suffix}</Typography>}
        </Box>

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
