import { KeyboardEvent, MouseEvent, ReactNode, SyntheticEvent } from 'react';
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';

export type Column<T> = {
  id: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: 'left' | 'right';
  hideBelow?: 'sm' | 'md';
  // El orden lo aplica quien llama; la tabla solo muestra la flecha y avisa del clic.
  sortable?: boolean;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowId: (r: T) => string | number;
  loading?: boolean;
  empty?: ReactNode;
  onRowClick?: (r: T) => void;
  sort?: { dir: 'asc' | 'desc'; onToggle: () => void };
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (p: number) => void;
  };
};

const SKELETON_ROWS = 5;

// Clics o Enter sobre botones/enlaces dentro de la fila no son clics de fila.
const fromNestedControl = (e: SyntheticEvent) =>
  e.target !== e.currentTarget &&
  e.target instanceof Element &&
  e.target.closest('a, button, input, select, textarea') !== null;

function DataTable<T>({
  columns,
  rows,
  getRowId,
  loading = false,
  empty,
  onRowClick,
  sort,
  pagination,
}: Props<T>) {
  const cellSx = (c: Column<T>) => ({
    textAlign: c.align ?? 'left',
    ...(c.align === 'right' ? { fontVariantNumeric: 'tabular-nums' } : {}),
    ...(c.hideBelow
      ? { display: { xs: 'none', [c.hideBelow]: 'table-cell' } }
      : {}),
  });
  return (
    <Box>
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell
                  key={c.id}
                  sx={{ ...cellSx(c), fontWeight: 600 }}
                  sortDirection={c.sortable && sort ? sort.dir : false}
                >
                  {c.sortable && sort ? (
                    <TableSortLabel
                      active
                      direction={sort.dir}
                      onClick={sort.onToggle}
                    >
                      {c.header}
                    </TableSortLabel>
                  ) : (
                    c.header
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              Array.from({ length: SKELETON_ROWS }, (_, i) => (
                <TableRow key={i}>
                  {columns.map((c) => (
                    <TableCell key={c.id} sx={cellSx(c)}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!loading &&
              rows.map((row) => (
                <TableRow
                  key={getRowId(row)}
                  hover={Boolean(onRowClick)}
                  tabIndex={onRowClick ? 0 : undefined}
                  onClick={
                    onRowClick &&
                    ((e: MouseEvent) => {
                      if (!fromNestedControl(e)) onRowClick(row);
                    })
                  }
                  onKeyDown={
                    onRowClick &&
                    ((e: KeyboardEvent) => {
                      if (e.key === 'Enter' && !fromNestedControl(e))
                        onRowClick(row);
                    })
                  }
                  sx={onRowClick ? { cursor: 'pointer' } : undefined}
                >
                  {columns.map((c) => (
                    <TableCell key={c.id} sx={cellSx(c)}>
                      {c.render(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      {!loading && rows.length === 0 && empty}
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.page}
          rowsPerPage={pagination.pageSize}
          rowsPerPageOptions={[pagination.pageSize]}
          onPageChange={(_e, p) => pagination.onPageChange(p)}
        />
      )}
    </Box>
  );
}

export default DataTable;
