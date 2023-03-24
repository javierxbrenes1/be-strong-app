import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import EventsSkeleton from './EventsSkeleton';
import Member from '../../models/Member';
import Event from './Event';
import BirthDate from './BirthDate';

function BirthDates(props: { birthdates: Member[]; loading: boolean }) {
  const { birthdates, loading } = props;
  let content: ReactNode;
  if (loading) {
    content = <EventsSkeleton />;
  } else {
    content = !birthdates.length ? (
      <Typography variant="subtitle1">No hay Cumpleaños</Typography>
    ) : (
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {birthdates.map((member, index) => (
          <BirthDate member={member} key={`birthdate-${index}`} />
        ))}
      </Box>
    );
  }

  return (
    <Event emoji="🎉" title="Cumpleaños">
      {content}
    </Event>
  );
}

export default BirthDates;
