import { FullscreenExit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import GymClass from '../../models/GymClass';
import ClassEvent from './ClassEvent';
import Event from './Event';
import EventsSkeleton from './EventsSkeleton';

function TodayClassesEvent(props: {
  todayClasses: GymClass[];
  loading: boolean;
}) {
  const { todayClasses, loading } = props;
  let content: ReactNode;
  if (loading) {
    content = <EventsSkeleton />;
  } else {
    content = !todayClasses.length ? (
      <Typography variant="subtitle1">No hay clases programadas</Typography>
    ) : (
      <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        {todayClasses.map((gymClass, index) => (
          <ClassEvent gymClass={gymClass} key={`class-${index}`} />
        ))}
      </Box>
    );
  }

  return (
    <Event emoji="🏋" title="Clases">
      {content}
    </Event>
  );
}

export default TodayClassesEvent;
