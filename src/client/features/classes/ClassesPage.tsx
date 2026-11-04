import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Button, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { EmptyState, PageHeader } from '../../design-system';
import { GymClassesByDayDocument } from './api';
import { GymClassTimesDocument } from '../config/api';
import DayNavigator from './DayNavigator';
import ClassCard from './ClassCard';
import { isLocalDate, todayLocalDate } from '../../../common/dates';

function ClassesPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('date');
  const date = isLocalDate(raw) ? raw : todayLocalDate();
  const { data, loading } = useQuery(GymClassesByDayDocument, {
    variables: { gte: date },
    fetchPolicy: 'cache-and-network',
  });
  const times = useQuery(GymClassTimesDocument);
  const [, setNewClassOpen] = useState(false);
  const classes = (data?.getGymClasses ?? []).filter(Boolean);
  const totalTimes = times.data?.allGymClassTimes?.length ?? 0;

  const newClassButton = (
    <Button
      variant="contained"
      startIcon={<AddRoundedIcon />}
      onClick={() => setNewClassOpen(true)}
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
            onTakeAttendance={() => undefined}
            onAddTimes={() => undefined}
          />
        ))}
        {!loading && classes.length === 0 && (
          <EmptyState
            title="No hay clases para este día"
            action={newClassButton}
          />
        )}
      </Stack>
    </Box>
  );
}

export default ClassesPage;
