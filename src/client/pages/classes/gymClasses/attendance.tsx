import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { AttendanceList } from '../../../../common/models/GymClass';
import attendanceList from '../../../../server/apollo/resolvers/gymClasses/attendanceList';

function Attendance(props: {
  activeTimeId?: number;
  attendanceList: AttendanceList[];
}) {
  const { activeTimeId, atten };

  return (
    <Box sx={{ margin: '1rem 0' }}>
      <Typography
        variant="h6"
        sx={{
          textDecoration: 'underline',
        }}
      >
        Asistentes a la clase
      </Typography>
      <Box>{}</Box>
    </Box>
  );
}

export default Attendance;
