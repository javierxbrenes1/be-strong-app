import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Box, useTheme } from '@mui/material';

type Props = {
  color?: string;
  line?: {
    onClick: () => void;
    selected: boolean;
  };
  bar?: {
    onClick: () => void;
    selected: boolean;
  };
  table?: {
    onClick: () => void;
    selected: boolean;
  };
};

const getIconStyleWhenSelected = (isSelected: boolean, color: string) => ({
  '&:hover': { cursor: 'pointer' },
  ...(isSelected ? { borderBottom: `3px solid ${color}` } : {}),
});

function BsDataViewSelector(props: Props) {
  const theme = useTheme();
  const { line, bar, table, color = theme.palette.primary.main } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
        margin: '5px 0',
      }}
    >
      {table && (
        <TableChartIcon
          sx={getIconStyleWhenSelected(table.selected, color)}
          onClick={table.onClick}
        />
      )}
      {line && (
        <TimelineIcon
          sx={getIconStyleWhenSelected(line.selected, color)}
          onClick={line.onClick}
        />
      )}
      {bar && (
        <BarChartIcon
          onClick={bar.onClick}
          sx={getIconStyleWhenSelected(bar.selected, color)}
        />
      )}
    </Box>
  );
}

export default BsDataViewSelector;
