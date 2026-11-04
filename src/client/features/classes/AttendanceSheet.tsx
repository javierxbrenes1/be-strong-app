import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import {
  Checkbox,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { AppSheet, MemberAvatar } from '../../design-system';
import {
  AddMembersAttendancesDocument,
  GymClassesByDayDocument,
  RemoveMembersAttendancesDocument,
} from './api';
import { ActiveMembersDocument } from '../members/api';
import { diffAttendance } from './diffAttendance';
import BsShowError from '../../components/BsShowError';
import { LocalDate, formatLocalDate } from '../../../common/dates';

type Props = {
  open: boolean;
  gymClass: { id: number; classType: string; classDate: LocalDate };
  timeId: number;
  timeLabel: string;
  registered: string[];
  onClose: () => void;
};

const WEEKDAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

function AttendanceSheet({
  open,
  gymClass,
  timeId,
  timeLabel,
  registered,
  onClose,
}: Props) {
  const [selected, setSelected] = useState<string[]>(registered);
  const [text, setText] = useState('');
  const { data } = useQuery(ActiveMembersDocument, {
    variables: { offset: 0, limit: 500 },
    skip: !open,
  });
  const refetchQueries = [GymClassesByDayDocument];
  const [addAttendance, adding] = useMutation(AddMembersAttendancesDocument, {
    refetchQueries,
  });
  const [removeAttendance, removing] = useMutation(
    RemoveMembersAttendancesDocument,
    { refetchQueries }
  );

  useEffect(() => {
    if (open) {
      setSelected(registered);
      setText('');
    }
    // registered se lee solo al abrir
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const weekday = WEEKDAYS[dayjs(gymClass.classDate).day()];
  const members = useMemo(() => {
    const needle = text.trim().toLowerCase();
    return (data?.getAllMembers?.members ?? [])
      .filter((m): m is NonNullable<typeof m> => Boolean(m?.isActive))
      .filter((m) => !needle || m.name?.toLowerCase().includes(needle))
      .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '', 'es'));
  }, [data, text]);

  const toggle = (code: string) =>
    setSelected((s) =>
      s.includes(code) ? s.filter((c) => c !== code) : [...s, code]
    );

  const save = async () => {
    const { add, remove } = diffAttendance(registered, selected);
    if (!add.length && !remove.length) {
      toast.info('Sin cambios');
      onClose();
      return;
    }
    const base = { gymClassId: gymClass.id, gymClassTimeId: timeId };
    try {
      if (remove.length) {
        await removeAttendance({
          variables: { input: { ...base, memberCodes: remove } },
        });
      }
      if (add.length) {
        await addAttendance({
          variables: { input: { ...base, memberCodes: add } },
        });
      }
      toast.success('Asistencia guardada');
      onClose();
    } catch (err) {
      BsShowError(err, 'No se pudo guardar la asistencia. Intenta de nuevo.');
    }
  };

  return (
    <AppSheet
      open={open}
      onClose={onClose}
      title="Pasar lista"
      subtitle={`${gymClass.classType} · ${formatLocalDate(
        gymClass.classDate,
        'DD/MM'
      )} ${timeLabel}`}
      dirty={
        Boolean(diffAttendance(registered, selected).add.length) ||
        Boolean(diffAttendance(registered, selected).remove.length)
      }
      primaryAction={{
        label: 'Guardar',
        onClick: save,
        loading: adding.loading || removing.loading,
      }}
    >
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Buscar miembro"
        fullWidth
        slotProps={{
          htmlInput: { 'aria-label': 'Buscar miembro' },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ my: 1.5 }}>
        Seleccionados: {selected.length}
      </Typography>
      <List disablePadding>
        {members.map((m) => {
          const planned = Boolean(m.memberAttendance?.[weekday]);
          return (
            <ListItemButton key={m.code} onClick={() => toggle(m.code)} dense>
              <Checkbox
                edge="start"
                checked={selected.includes(m.code)}
                tabIndex={-1}
                disableRipple
                slotProps={{ input: { 'aria-label': m.name ?? m.code } }}
              />
              <ListItemAvatar sx={{ minWidth: 48 }}>
                <MemberAvatar name={m.name ?? ''} />
              </ListItemAvatar>
              <ListItemText
                primary={m.name}
                secondary={planned ? 'Plan' : undefined}
              />
            </ListItemButton>
          );
        })}
      </List>
    </AppSheet>
  );
}

export default AttendanceSheet;
