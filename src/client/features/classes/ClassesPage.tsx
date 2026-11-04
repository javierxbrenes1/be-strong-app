import { Suspense, lazy, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Button, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { EmptyState, PageHeader } from '../../design-system';
import { GymClassesByDayDocument } from './api';
import { GymClassTimesDocument } from '../config/api';
import DayNavigator from './DayNavigator';
import AttendanceSheet from './AttendanceSheet';
import AddTimesDialog from './AddTimesDialog';
import ClassCard from './ClassCard';
import {
  formatLocalTime,
  isLocalDate,
  todayLocalDate,
} from '../../../common/dates';

// El editor markdown pesa mucho: se descarga al abrir "Nueva clase" por primera vez.
const NewClassSheet = lazy(() => import('./NewClassSheet'));

function ClassesPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('date');
  const date = isLocalDate(raw) ? raw : todayLocalDate();
  const { data, loading } = useQuery(GymClassesByDayDocument, {
    variables: { gte: date },
    fetchPolicy: 'cache-and-network',
  });
  const times = useQuery(GymClassTimesDocument);
  const [newClassOpen, setNewClassOpen] = useState(false);
  // Una vez cargado se queda montado para que la animación de cierre funcione.
  const [newClassLoaded, setNewClassLoaded] = useState(false);
  const [addTimesFor, setAddTimesFor] = useState<number | null>(null);
  const [attending, setAttending] = useState<{
    classId: number;
    timeId: number;
  } | null>(null);
  const classes = (data?.getGymClasses ?? []).filter(Boolean);
  const totalTimes = times.data?.allGymClassTimes?.length ?? 0;

  const attendingClass = classes.find((c) => c?.id === attending?.classId);
  const attendingTime = attendingClass?.gymClassOnTimes
    ?.map((t) => t?.gymClassTime)
    .find((t) => t?.id === attending?.timeId);
  const attendingTimeLabel = attendingTime
    ? formatLocalTime(attendingTime.localTime)
    : '';
  const registered = (
    attendingClass?.attendanceList?.find(
      (a) => a?.gymClassTimeId === attending?.timeId
    )?.members ?? []
  )
    .filter(Boolean)
    .map((m) => m?.code ?? '');

  const newClassButton = (
    <Button
      variant="contained"
      startIcon={<AddRoundedIcon />}
      onClick={() => {
        setNewClassLoaded(true);
        setNewClassOpen(true);
      }}
    >
      Nueva clase
    </Button>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader title="Clases" actions={newClassButton} />
      <DayNavigator
        value={date}
        onChange={(d) => setParams({ date: d }, { replace: true })}
      />
      <Stack spacing={2}>
        {classes.map((c) => (
          <ClassCard
            key={c?.id}
            gymClass={c ?? {}}
            totalTimes={totalTimes}
            onTakeAttendance={(classId, timeId) =>
              setAttending({ classId, timeId })
            }
            onAddTimes={(classId) => setAddTimesFor(classId)}
          />
        ))}
        {!loading && classes.length === 0 && (
          <EmptyState
            title="No hay clases para este día"
            action={newClassButton}
          />
        )}
      </Stack>
      {newClassLoaded && (
        <Suspense fallback={null}>
          <NewClassSheet
            open={newClassOpen}
            date={date}
            onClose={() => setNewClassOpen(false)}
          />
        </Suspense>
      )}
      {addTimesFor !== null && (
        <AddTimesDialog
          open
          gymClassId={addTimesFor}
          existingTimeIds={(
            classes.find((c) => c?.id === addTimesFor)?.gymClassOnTimes ?? []
          ).map((t) => Number(t?.gymClassTime?.id))}
          onClose={() => setAddTimesFor(null)}
        />
      )}
      {attendingClass && attending && (
        <AttendanceSheet
          open
          gymClass={{
            id: attending.classId,
            classType: attendingClass.classType ?? '',
            classDate: date,
          }}
          timeId={attending.timeId}
          timeLabel={attendingTimeLabel}
          registered={registered}
          onClose={() => setAttending(null)}
        />
      )}
    </Box>
  );
}

export default ClassesPage;
