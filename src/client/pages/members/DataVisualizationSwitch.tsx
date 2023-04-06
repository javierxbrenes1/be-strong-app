import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableRowsIcon from '@mui/icons-material/TableRows';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const Container = styled(Box)({
  display: 'flex',
  gap: '12px',
});

const Option = styled(Box)<{ selected?: boolean }>(({ selected }) => ({
  '&:hover': {
    cursor: 'pointer',
  },
  ...(selected
    ? {
        borderBottom: '2px solid #FF6E31',
      }
    : {}),
}));

export enum VisualizationType {
  cards = 'cards',
  list = 'list',
}

function DataVisualizationSwitch(props: {
  selectedOption: VisualizationType;
  onVisualizationSwitch: (newProp: VisualizationType) => void;
}) {
  const { selectedOption, onVisualizationSwitch } = props;
  const handleClick = (newProp: VisualizationType) => () =>
    onVisualizationSwitch(newProp);
  return (
    <Container>
      <Option
        role="button"
        selected={selectedOption === VisualizationType.cards}
        onClick={handleClick(VisualizationType.cards)}
      >
        <DashboardCustomizeIcon />
      </Option>
      <Option
        role="button"
        onClick={handleClick(VisualizationType.list)}
        selected={selectedOption === VisualizationType.list}
      >
        <TableRowsIcon />
      </Option>
    </Container>
  );
}

export default DataVisualizationSwitch;
