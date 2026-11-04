import { useLayoutEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor/nohighlight';
import {
  Box,
  Button,
  Card,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { MemberAvatar } from '../../design-system';
import { compareLocalTime, formatLocalTime } from '../../../common/dates';

export type ClassCardData = {
  id?: number | null;
  classType?: string | null;
  classDurationInMinutes?: number | null;
  classDescription?: string | null;
  gymClassOnTimes?:
    | ({
        gymClassTime?: { id?: number | null; localTime: string } | null;
      } | null)[]
    | null;
  attendanceList?:
    | ({
        gymClassTimeId?: number | null;
        members?: ({ code: string; name?: string | null } | null)[] | null;
      } | null)[]
    | null;
};

type Props = {
  gymClass: ClassCardData;
  totalTimes: number;
  onTakeAttendance: (classId: number, timeId: number) => void;
  onAddTimes: (classId: number) => void;
};

const CLAMP_LINES = 6;

function Description({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && !expanded) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [text, expanded]);

  return (
    <Box>
      <Box
        ref={ref}
        sx={{
          overflow: 'hidden',
          ...(expanded
            ? {}
            : {
                display: '-webkit-box',
                WebkitLineClamp: CLAMP_LINES,
                WebkitBoxOrient: 'vertical',
              }),
        }}
      >
        <MDEditor.Markdown
          source={text}
          style={{ background: 'transparent', color: 'inherit' }}
        />
      </Box>
      {(overflows || expanded) && (
        <Button size="small" onClick={() => setExpanded((e) => !e)}>
          {expanded ? 'Ver menos' : 'Ver más'}
        </Button>
      )}
    </Box>
  );
}

function ClassCard({
  gymClass,
  totalTimes,
  onTakeAttendance,
  onAddTimes,
}: Props) {
  const times = (gymClass.gymClassOnTimes ?? [])
    .map((t) => t?.gymClassTime)
    .filter((t): t is { id?: number | null; localTime: string } => Boolean(t))
    .sort((a, b) => compareLocalTime(a.localTime, b.localTime));
  const [selected, setSelected] = useState<number | null>(null);
  const activeId = selected ?? times[0]?.id ?? null;
  const attendees = (
    gymClass.attendanceList?.find((a) => a?.gymClassTimeId === activeId)
      ?.members ?? []
  ).filter((m): m is { code: string; name?: string | null } => Boolean(m));
  const countFor = (timeId: number | null | undefined) =>
    gymClass.attendanceList?.find((a) => a?.gymClassTimeId === timeId)?.members
      ?.length ?? 0;
  const allTimesAdded = times.length >= totalTimes;
  const classId = gymClass.id ?? 0;

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 2,
          }}
        >
          <Typography variant="h3" component="h2">
            {gymClass.classType}
          </Typography>
          {gymClass.classDurationInMinutes ? (
            <Typography variant="body2" color="text.secondary">
              {gymClass.classDurationInMinutes} min
            </Typography>
          ) : null}
        </Stack>
        {gymClass.classDescription && (
          <Description text={gymClass.classDescription} />
        )}
        <ToggleButtonGroup
          exclusive
          size="small"
          value={activeId}
          onChange={(_, v: number | null) => v !== null && setSelected(v)}
          aria-label="Horarios de la clase"
          sx={{ flexWrap: 'wrap' }}
        >
          {times.map((t) => (
            <ToggleButton key={t.id} value={t.id ?? 0}>
              {formatLocalTime(t.localTime)} · {countFor(t.id)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {attendees.length === 1
              ? '1 asistente'
              : `${attendees.length} asistentes`}
          </Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {attendees.map((m) => (
              <Chip
                key={m.code}
                label={m.name}
                avatar={<MemberAvatar name={m.name ?? ''} size={24} />}
              />
            ))}
          </Stack>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            disabled={activeId === null}
            onClick={() =>
              activeId !== null && onTakeAttendance(classId, activeId)
            }
          >
            Pasar lista
          </Button>
          <Tooltip
            title={allTimesAdded ? 'La clase ya tiene todos los horarios' : ''}
          >
            <span>
              <Button
                variant="outlined"
                color="inherit"
                disabled={allTimesAdded}
                onClick={() => onAddTimes(classId)}
              >
                Agregar horario
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ClassCard;
