import { Box, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { DataViewer } from '../../types';
import BsDataViewSelector from '../../components/BsDataViewSelector';

function VisitMeasureDataViewWrapper(props: {
  children: ReactNode | ReactNode[];
  title: string;
  color?: string;
  setViewElement: (type: DataViewer) => void;
  viewElement: DataViewer;
}) {
  const { children, title, color, setViewElement, viewElement } = props;

  const handleViewElementSelection = (type: DataViewer) => () => {
    setViewElement(type);
  };

  return (
    <Stack direction="column" alignItems="center" sx={{ padding: '10px' }}>
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ width: '100%' }}>
        <BsDataViewSelector
          color={color}
          table={{
            onClick: handleViewElementSelection('table'),
            selected: viewElement === 'table',
          }}
          line={{
            onClick: handleViewElementSelection('line'),
            selected: viewElement === 'line',
          }}
          bar={{
            onClick: handleViewElementSelection('bar'),
            selected: viewElement === 'bar',
          }}
        />
      </Box>
      <Box sx={{ width: '100%', margin: '10px auto' }}>{children}</Box>
    </Stack>
  );
}

export default VisitMeasureDataViewWrapper;
