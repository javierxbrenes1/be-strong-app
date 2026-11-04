import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { KpiCard, PageHeader } from '../../design-system';
import { GymClassesByDayDocument } from '../classes/api';
import AttendanceSheet from '../classes/AttendanceSheet';
import { formatLongDate } from '../classes/DayNavigator';
import { HomeSummaryDocument } from './api';
import TodayClassesCard, { TodayRow } from './TodayClassesCard';
import RemindersCard from './RemindersCard';
import Last7DaysChart from './Last7DaysChart';
import {
  formatInstant,
  formatLocalTime,
  todayLocalDate,
} from '../../../common/dates';

const greeting = () => {
  const hour = Number(formatInstant(new Date(), 'H')); // hora del gimnasio
  if (hour < 12) return 'Buenos días';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
};

function HomePage() {
  const today = todayLocalDate();
  const summary = useQuery(HomeSummaryDocument, {
    variables: { today },
    fetchPolicy: 'cache-and-network',
  });
  const classesQuery = useQuery(GymClassesByDayDocument, {
    variables: { gte: today },
    fetchPolicy: 'cache-and-network',
  });
  const [attending, setAttending] = useState<{
    classId: number;
    timeId: number;
  } | null>(null);

  const classes = (classesQuery.data?.getGymClasses ?? []).filter(Boolean);
  const rows: TodayRow[] = classes
    .flatMap((c) =>
      (c?.gymClassOnTimes ?? []).map((t) => ({
        classId: Number(c?.id),
        timeId: Number(t?.gymClassTime?.id),
        localTime: t?.gymClassTime?.localTime ?? '',
        classType: c?.classType ?? '',
        attendees:
          c?.attendanceList?.find(
            (a) => a?.gymClassTimeId === t?.gymClassTime?.id
          )?.members?.length ?? 0,
      }))
    )
    .sort((a, b) => a.localTime.localeCompare(b.localTime));
  const totalAttendees = rows.reduce((s, r) => s + r.attendees, 0);

  const attendingClass = classes.find((c) => c?.id === attending?.classId);
  const attendingRow = rows.find(
    (r) => r.classId === attending?.classId && r.timeId === attending?.timeId
  );
  const registered = (
    attendingClass?.attendanceList?.find(
      (a) => a?.gymClassTimeId === attending?.timeId
    )?.members ?? []
  )
    .filter(Boolean)
    .map((m) => m?.code ?? '');

  const s = summary.data?.getHomeSummary;
  const weekDiff = s ? s.attendancesThisWeek - s.attendancesLastWeek : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader title={greeting()} subtitle={formatLongDate(today)} />
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <KpiCard
              label="Miembros activos"
              value={s?.activeMembers ?? '–'}
              delta={
                s && s.newMembersThisMonth > 0
                  ? { text: `↑ ${s.newMembersThisMonth} este mes`, good: true }
                  : undefined
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <KpiCard
              label="Asistencias esta semana"
              value={s?.attendancesThisWeek ?? '–'}
              delta={
                s
                  ? {
                      text: `${weekDiff >= 0 ? '↑' : '↓'} ${Math.abs(
                        weekDiff
                      )} vs semana pasada`,
                      good: weekDiff >= 0,
                    }
                  : undefined
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <KpiCard
              label="Clases hoy"
              value={rows.length}
              hint={`${totalAttendees} asistentes`}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={2}>
              <TodayClassesCard
                rows={rows}
                onTakeAttendance={(classId, timeId) =>
                  setAttending({ classId, timeId })
                }
              />
              {s && <Last7DaysChart days={s.last7Days} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            {s && (
              <RemindersCard
                birthdays={s.birthdays}
                atRisk={s.atRisk}
                unmeasured={s.unmeasured}
              />
            )}
          </Grid>
        </Grid>
      </Stack>
      {attendingClass && attendingRow && (
        <AttendanceSheet
          open
          gymClass={{
            id: attendingRow.classId,
            classType: attendingRow.classType,
            classDate: today,
          }}
          timeId={attendingRow.timeId}
          timeLabel={formatLocalTime(attendingRow.localTime)}
          registered={registered}
          onClose={() => setAttending(null)}
        />
      )}
    </Box>
  );
}

export default HomePage;
