import { useQuery } from '@apollo/client';
import { Box, Button, Card, Typography } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { MemberDetailQuery } from '../../gql/graphql';
import { GymClassTimesDocument } from '../config/api';
import MemberStatusChip from '../members/MemberStatusChip';
import { DAYS } from '../members/memberSchema';
import {
  ageOn,
  formatLocalDate,
  formatLocalTime,
  todayLocalDate,
} from '../../../common/dates';

type Member = NonNullable<MemberDetailQuery['getMember']>;

const GENRES: Record<string, string> = {
  male: 'Masculino',
  female: 'Femenino',
  other: 'Otro',
};

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{value || '—'}</Typography>
    </Box>
  );
}

function DataTab({ member, onEdit }: { member: Member; onEdit: () => void }) {
  const today = todayLocalDate();
  const times = useQuery(GymClassTimesDocument);
  const preferred = times.data?.allGymClassTimes?.find(
    (t) => t?.id === member.preferredClassTime
  );
  const att = member.memberAttendance;
  const days = DAYS.filter(([key]) => att?.[key])
    .map(([, label]) => label)
    .join(', ');
  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        <Field label="Nombre" value={member.name} />
        <Field label="Categoría" value={member.category} />
        <Field label="Correo" value={member.email} />
        <Field label="Teléfono" value={member.phone} />
        <Box>
          <Typography variant="body2" color="text.secondary">
            Estado
          </Typography>
          <MemberStatusChip
            isActive={Boolean(member.isActive)}
            lastAttendanceDate={member.lastAttendanceDate ?? null}
            today={today}
          />
        </Box>
        <Field
          label="Estatura"
          value={member.height == null ? null : `${member.height} m`}
        />
        <Field label="Género" value={GENRES[member.genre ?? '']} />
        <Field
          label="Nacimiento"
          value={member.birthDate ? formatLocalDate(member.birthDate) : null}
        />
        <Field
          label="Edad"
          value={
            member.birthDate ? `${ageOn(member.birthDate, today)} años` : null
          }
        />
        <Field
          label="Horario preferido"
          value={preferred ? formatLocalTime(preferred.localTime) : null}
        />
        <Field label="Días del plan" value={days} />
        <Field label="Observaciones" value={member.observations} />
      </Box>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<EditRoundedIcon />}
        onClick={onEdit}
        sx={{ mt: 3 }}
      >
        Editar
      </Button>
    </Card>
  );
}

export default DataTab;
