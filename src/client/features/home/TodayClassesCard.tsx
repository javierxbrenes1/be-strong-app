import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, Typography } from '@mui/material';
import { EmptyState } from '../../design-system';
import { formatLocalTime } from '../../../common/dates';

export type TodayRow = {
  classId: number;
  timeId: number;
  localTime: string;
  classType: string;
  attendees: number;
};

type Props = {
  rows: TodayRow[];
  onTakeAttendance: (classId: number, timeId: number) => void;
};

function TodayClassesCard({ rows, onTakeAttendance }: Props) {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Clases de hoy
      </Typography>
      {rows.length === 0 ? (
        <EmptyState
          title="No hay clases hoy"
          action={
            <Button component={RouterLink} to="/classes">
              Ir a Clases
            </Button>
          }
        />
      ) : (
        rows.map((r) => (
          <Box
            key={`${r.classId}-${r.timeId}`}
            sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}
          >
            <Typography variant="metric" sx={{ minWidth: 96 }}>
              {formatLocalTime(r.localTime)}
            </Typography>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography noWrap>{r.classType}</Typography>
              <Typography variant="body2" color="text.secondary">
                {r.attendees} asistentes
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() => onTakeAttendance(r.classId, r.timeId)}
            >
              Pasar lista
            </Button>
          </Box>
        ))
      )}
    </Card>
  );
}

export default TodayClassesCard;
