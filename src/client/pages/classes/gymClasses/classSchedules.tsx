import { useState, useEffect, useMemo } from 'react';
import { Box, Tabs, Tab, IconButton, Stack } from '@mui/material';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import GymClassTime from '../../../../common/models/GymClassTime';
import { getGymClassTimeForUI, sortIsoTimes } from '../../../utils/memberUtils';
import { AttendanceList } from '../../../../common/models/GymClass';
import Attendance from './attendance';
import AddTimeDialog from './AddTimeDialog';

function ClassSchedules(props: {
  attendanceList: AttendanceList[];
  classId: number;
  schedules?: GymClassTime[];
}) {
  const { schedules, classId, attendanceList } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedGymClassTime, setSelectedGymClassTime] =
    useState<GymClassTime | null>(null);
  const [openAddTimeDialog, setOpenAddTimeDialog] = useState(false);

  const sortedSchedules = useMemo(
    () =>
      [...(schedules ?? [])].sort((a, b) => sortIsoTimes(a.isoTime, b.isoTime)),
    [schedules]
  );

  useEffect(() => {
    if (sortedSchedules) {
      setSelectedGymClassTime(sortedSchedules[tabIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, sortedSchedules]);

  if (!schedules) {
    return null;
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Box sx={{ marginTop: '10px' }}>
        <Stack
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Tabs value={tabIndex} onChange={handleChange}>
            {sortedSchedules.map((s) => {
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
          <IconButton onClick={() => setOpenAddTimeDialog(true)}>
            <AlarmAddIcon />
          </IconButton>
        </Stack>
        <Attendance
          gymClassId={classId}
          activeTimeId={selectedGymClassTime?.id}
          attendanceList={attendanceList}
        />
      </Box>
      {openAddTimeDialog && (
        <AddTimeDialog
          onClose={() => setOpenAddTimeDialog(false)}
          classId={classId}
          timeIdsToIgnore={sortedSchedules.map((v) => v.id)}
        />
      )}
    </>
  );
}

export default ClassSchedules;
