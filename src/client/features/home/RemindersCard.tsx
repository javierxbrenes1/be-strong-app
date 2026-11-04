import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, Link, Stack, Typography } from '@mui/material';
import { MemberAvatar, StatusChip, StatusVariant } from '../../design-system';

type Ref = { code: string; name: string };
type Props = { birthdays: Ref[]; atRisk: Ref[]; unmeasured: Ref[] };

const MAX_VISIBLE = 5;

function Group({
  label,
  variant,
  members,
}: {
  label: string;
  variant: StatusVariant;
  members: Ref[];
}) {
  const [expanded, setExpanded] = useState(false);
  if (members.length === 0) return null;
  const visible = expanded ? members : members.slice(0, MAX_VISIBLE);
  const hidden = members.length - visible.length;
  return (
    <Box>
      <StatusChip variant={variant} label={`${label} (${members.length})`} />
      <Stack spacing={1} sx={{ mt: 1 }}>
        {visible.map((m) => (
          <Box
            key={m.code}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <MemberAvatar name={m.name} size={28} />
            <Link
              component={RouterLink}
              to={`/members/${m.code}`}
              underline="hover"
              color="text.primary"
            >
              {m.name}
            </Link>
          </Box>
        ))}
        {hidden > 0 && (
          <Button
            size="small"
            sx={{ alignSelf: 'flex-start' }}
            onClick={() => setExpanded(true)}
          >
            y {hidden} más
          </Button>
        )}
      </Stack>
    </Box>
  );
}

function RemindersCard({ birthdays, atRisk, unmeasured }: Props) {
  const allEmpty = !birthdays.length && !atRisk.length && !unmeasured.length;
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Recordatorios
      </Typography>
      {allEmpty ? (
        <Typography color="text.secondary">Todo al día</Typography>
      ) : (
        <Stack spacing={3}>
          <Group label="Cumpleaños" variant="info" members={birthdays} />
          <Group label="En riesgo" variant="warning" members={atRisk} />
          <Group label="Sin medirse" variant="neutral" members={unmeasured} />
        </Stack>
      )}
    </Card>
  );
}

export default RemindersCard;
