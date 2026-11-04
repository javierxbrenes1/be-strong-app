import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  ButtonBase,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  AttendanceByYearDocument,
  AttendanceMonthDetailsDocument,
  FirstAttendanceDocument,
} from './api';
import { attendanceYears } from './attendanceYears';
import {
  formatLocalDate,
  formatLocalTime,
  todayLocalDate,
} from '../../../common/dates';

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function MonthDetails({
  code,
  year,
  month,
  onClose,
}: {
  code: string;
  year: number;
  month: number | null;
  onClose: () => void;
}) {
  const { data, loading } = useQuery(AttendanceMonthDetailsDocument, {
    variables: { year, month: month ?? 1, memberCode: code },
    skip: month == null,
  });
  const classes = (data?.getMemberAttendanceLogsDetails ?? []).filter(
    (c): c is NonNullable<typeof c> => Boolean(c)
  );
  return (
    <Dialog open={month != null} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {month != null ? MONTHS[month - 1] : ''} {year}
      </DialogTitle>
      <DialogContent>
        {!loading && classes.length === 0 && (
          <Typography color="text.secondary">Sin clases este mes.</Typography>
        )}
        <List disablePadding>
          {classes.map((c, i) => (
            <ListItem key={i} disableGutters divider>
              <ListItemText
                primary={[
                  c.classDate && formatLocalDate(c.classDate),
                  c.localTime && formatLocalTime(c.localTime),
                ]
                  .filter(Boolean)
                  .join(' · ')}
                secondary={[
                  c.classType,
                  c.classDurationInMinutes && `${c.classDurationInMinutes} min`,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

function AttendanceTab({ code }: { code: string }) {
  const today = todayLocalDate();
  const first = useQuery(FirstAttendanceDocument, {
    variables: { memberCode: code },
  });
  const years = attendanceYears(
    first.data?.getMemberAttendanceClasses?.[0]?.classDate ?? null,
    today
  );
  const [selectedYear, setYear] = useState<number | null>(null);
  const year = selectedYear ?? years[0];
  const [month, setMonth] = useState<number | null>(null);
  const { data } = useQuery(AttendanceByYearDocument, {
    variables: { year, memberCode: code },
  });
  const counts = Array<number>(12).fill(0);
  data?.getMemberAttendanceLogByYear?.forEach((r) => {
    if (r?.month != null) counts[r.month - 1] = r.total ?? 0;
  });
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Año"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          sx={{ minWidth: 120 }}
        >
          {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="body1">
          <strong>{total}</strong> clases en {year}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
        }}
      >
        {counts.map((n, i) => (
          <Card key={MONTHS[i]}>
            <ButtonBase
              onClick={() => setMonth(i + 1)}
              aria-label={`${MONTHS[i]}: ${n} clases`}
              sx={{
                display: 'block',
                width: '100%',
                p: 1.5,
                textAlign: 'left',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {MONTHS[i]}
              </Typography>
              <Typography variant="metric">{n}</Typography>
            </ButtonBase>
          </Card>
        ))}
      </Box>
      <MonthDetails
        code={code}
        year={year}
        month={month}
        onClose={() => setMonth(null)}
      />
    </Stack>
  );
}

export default AttendanceTab;
