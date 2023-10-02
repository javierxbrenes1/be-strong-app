import { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import GymClassTime from '../../../../common/models/GymClassTime';
import { getGymClassTimeForUI } from '../../../utils/memberUtils';
import { AttendanceList } from '../../../../common/models/GymClass';
import Attendance from './attendance';

function ClassSchedules(props: {
  attendanceList: AttendanceList[];
  classId: number;
  schedules?: GymClassTime[];
}) {
  const { schedules, classId, attendanceList } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedGymClassTime, setSelectedGymClassTime] =
    useState<GymClassTime | null>(null);

  useEffect(() => {
    if (schedules) {
      setSelectedGymClassTime(schedules[tabIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex]);

  if (!schedules) {
    return null;
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ marginTop: '10px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          {schedules.map((s) => {
            const id = `${classId}-${s.id}`;
            return (
              <Tab
                label={getGymClassTimeForUI(s)}
                id={id}
                key={id}
                aria-controls={id}
              />
            );
          })}
        </Tabs>
      </Box>
      <Attendance
        activeTimeId={selectedGymClassTime?.id}
        attendanceList={attendanceList}
      />
    </Box>
  );
}

export default ClassSchedules;
