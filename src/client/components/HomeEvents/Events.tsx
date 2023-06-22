import { styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CelebrationIcon from '@mui/icons-material/Celebration';
import GymClass from '../../../common/models/GymClass';
import Member from '../../../common/models/Member';
import TodayClassesEvent from './TodayClassesEvent';
import BirthDates from './BirthDates';

function Events(props: {
  birthDateMembers: Member[];
  todayClasses: GymClass[];
  loading: boolean;
}) {
  const { birthDateMembers, todayClasses, loading } = props;

  return (
    <Box flex="1">
      <Typography variant="h4" sx={{ color: '#393e46' }}>
        Eventos para Hoy
      </Typography>
      <TodayClassesEvent todayClasses={todayClasses} loading={loading} />
      <BirthDates birthdates={birthDateMembers} loading={loading} />
    </Box>
  );
}

export default Events;
