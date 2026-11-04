import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Breadcrumbs, EmptyState, MemberAvatar } from '../../design-system';
import { MemberDetailDocument } from './api';
import MeasuresTab, { MeasureRow } from './MeasuresTab';
import MeasureSheet from '../measures/MeasureSheet';
import SummaryTab from './SummaryTab';
import ShareLinkButton from './ShareLinkButton';
import MemberSheet from '../members/MemberSheet';
import MemberStatusChip from '../members/MemberStatusChip';
import { MeasureValues } from '../measures/metrics';
import { todayLocalDate } from '../../../common/dates';
import { PATHS } from '../../../common/enums';

const TABS = [
  ['resumen', 'Resumen'],
  ['medidas', 'Medidas'],
  ['asistencia', 'Asistencia'],
  ['datos', 'Datos'],
] as const;
type TabId = (typeof TABS)[number][0];

function MemberDetailPage() {
  const { code = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const tab = TABS.find(([id]) => id === params.get('tab'))?.[0] ?? 'resumen';
  const [editOpen, setEditOpen] = useState(false);
  const [sheet, setSheet] = useState<{
    open: boolean;
    measure?: MeasureRow;
    previous?: MeasureValues & { date?: number | null };
  }>({ open: false });
  const { data, loading, refetch } = useQuery(MemberDetailDocument, {
    variables: { code },
    fetchPolicy: 'cache-and-network',
  });
  const member = data?.getMember;

  if (!member) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {loading ? (
          <Skeleton variant="rounded" height={96} />
        ) : (
          <EmptyState title="Miembro no encontrado" />
        )}
      </Box>
    );
  }

  const recent = (member.memberMeasures ?? []).filter(
    (m): m is NonNullable<typeof m> => Boolean(m)
  ) as (MeasureValues & { date?: number | null })[];

  const openNewMeasure = () =>
    setSheet({
      open: true,
      previous: member.lastMeasure ?? undefined,
    });

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Breadcrumbs
        items={[
          { label: 'Miembros', to: PATHS.MEMBERS },
          { label: member.name ?? code },
        ]}
      />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', mb: 2 }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <MemberAvatar name={member.name ?? ''} size={56} />
          <Box>
            <Typography variant="h1">{member.name}</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {[member.code, member.category].filter(Boolean).join(' · ')}
              </Typography>
              <MemberStatusChip
                isActive={Boolean(member.isActive)}
                lastAttendanceDate={member.lastAttendanceDate ?? null}
                today={todayLocalDate()}
              />
            </Stack>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
          <ShareLinkButton code={member.code} />
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<EditRoundedIcon />}
            onClick={() => setEditOpen(true)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={openNewMeasure}
          >
            Medición
          </Button>
        </Stack>
      </Stack>
      <Tabs
        value={tab}
        onChange={(_e, v: TabId) => setParams({ tab: v }, { replace: true })}
        variant="scrollable"
        sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
      >
        {TABS.map(([id, label]) => (
          <Tab key={id} value={id} label={label} />
        ))}
      </Tabs>
      {tab === 'resumen' && (
        <SummaryTab
          code={member.code}
          lastMeasure={member.lastMeasure}
          recent={recent}
          onAddMeasure={openNewMeasure}
        />
      )}
      {tab === 'medidas' && (
        <MeasuresTab
          code={member.code}
          onEdit={(measure, previous) =>
            setSheet({ open: true, measure, previous })
          }
        />
      )}
      <MeasureSheet
        open={sheet.open}
        memberCode={member.code}
        memberName={member.name ?? ''}
        measure={sheet.measure}
        previous={sheet.previous}
        onClose={() => setSheet((s) => ({ ...s, open: false }))}
      />
      <MemberSheet
        open={editOpen}
        member={member}
        onClose={() => setEditOpen(false)}
        onSaved={() => refetch().catch(() => undefined)}
      />
    </Box>
  );
}

export default MemberDetailPage;
