import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Column,
  DataTable,
  EmptyState,
  MemberAvatar,
  PageHeader,
} from '../../design-system';
import {
  ActiveMembersDocument,
  InactiveMembersDocument,
  SearchMembersDocument,
} from './api';
import MemberSheet from './MemberSheet';
import MemberStatusChip from './MemberStatusChip';
import useDebouncedValue from './useDebouncedValue';
import { todayLocalDate } from '../../../common/dates';
import { PATHS } from '../../../common/enums';

type Row = {
  code: string;
  name?: string | null;
  category?: string | null;
  isActive?: boolean | null;
  lastAttendanceDate?: string | null;
  currentWeight?: number | null;
};

const PAGE_SIZE = 50;

function lastAttendanceLabel(last: string | null | undefined, today: string) {
  if (!last) return 'Sin asistencias';
  const days = dayjs(today).diff(dayjs(last), 'day');
  if (days <= 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  return `Hace ${days} días`;
}

function MembersPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [text, setText] = useState('');
  const debounced = useDebouncedValue(text.trim(), 300);
  const [sheetOpen, setSheetOpen] = useState(false);
  const today = todayLocalDate();

  const active = useQuery(ActiveMembersDocument, {
    variables: { offset: 0, limit: PAGE_SIZE },
    skip: status !== 'active',
    fetchPolicy: 'cache-and-network',
  });
  const inactive = useQuery(InactiveMembersDocument, {
    variables: { offset: 0, limit: PAGE_SIZE },
    skip: status !== 'inactive',
    fetchPolicy: 'cache-and-network',
  });
  const search = useQuery(SearchMembersDocument, {
    variables: { filter: debounced },
    skip: status !== 'active' || !debounced,
  });

  const list = status === 'active' ? active : inactive;
  const page =
    status === 'active'
      ? active.data?.getAllMembers
      : inactive.data?.getAllInactiveMembers;
  const searching = status === 'active' && Boolean(debounced);

  const rows = useMemo(() => {
    const source: (Row | null)[] = searching
      ? search.data?.getFilteredMembers ?? []
      : page?.members ?? [];
    let result = source.filter((m): m is Row => Boolean(m));
    // El caché acumula páginas: el estado visible se filtra aquí.
    result = result.filter(
      (m) => Boolean(m.isActive) === (status === 'active')
    );
    if (status === 'inactive' && text.trim()) {
      const needle = text.trim().toLowerCase();
      result = result.filter((m) => m.name?.toLowerCase().includes(needle));
    }
    return [...result].sort((a, b) =>
      (a.name ?? '').localeCompare(b.name ?? '', 'es')
    );
  }, [searching, search.data, page, status, text]);

  const nextPageStart = page?.pagination?.nextPageStart ?? -1;
  const canLoadMore = !searching && nextPageStart !== -1;
  const loading = searching ? search.loading : list.loading && !page;

  const columns: Column<Row>[] = [
    {
      id: 'member',
      header: 'Miembro',
      render: (m) => (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <MemberAvatar name={m.name ?? ''} />
          <Typography sx={{ fontWeight: 600 }}>{m.name}</Typography>
        </Stack>
      ),
    },
    {
      id: 'category',
      header: 'Categoría',
      hideBelow: 'sm',
      render: (m) => m.category || '—',
    },
    {
      id: 'last',
      header: 'Última asistencia',
      hideBelow: 'md',
      render: (m) => lastAttendanceLabel(m.lastAttendanceDate, today),
    },
    {
      id: 'status',
      header: 'Estado',
      render: (m) => (
        <MemberStatusChip
          isActive={Boolean(m.isActive)}
          lastAttendanceDate={m.lastAttendanceDate ?? null}
          today={today}
        />
      ),
    },
    {
      id: 'weight',
      header: 'Peso',
      align: 'right',
      hideBelow: 'sm',
      render: (m) =>
        m.currentWeight == null ? '—' : `${m.currentWeight.toFixed(1)} kg`,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader
        title="Miembros"
        actions={
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setSheetOpen(true)}
          >
            Nuevo miembro
          </Button>
        }
      />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Buscar miembro"
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
          sx={{ flex: 1, maxWidth: { sm: 420 } }}
        />
        <TextField
          select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
          sx={{ minWidth: 160 }}
          slotProps={{ htmlInput: { 'aria-label': 'Estado' } }}
        >
          <MenuItem value="active">Activos</MenuItem>
          <MenuItem value="inactive">Inactivos</MenuItem>
        </TextField>
      </Stack>
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(m) => m.code}
        loading={loading}
        empty={<EmptyState title="No hay miembros para mostrar" />}
        onRowClick={(m) => navigate(`${PATHS.MEMBERS}/${m.code}`)}
      />
      {canLoadMore && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() =>
              list.fetchMore({ variables: { offset: nextPageStart } })
            }
          >
            Cargar más
          </Button>
        </Box>
      )}
      <MemberSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </Box>
  );
}

export default MembersPage;
