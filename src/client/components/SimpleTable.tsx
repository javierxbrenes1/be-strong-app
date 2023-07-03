import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, TablePagination } from '@mui/material';
import Loading from './Loading';

const StyledTableCell = styled(TableCell)<{ headBgColor?: string }>(
  ({ theme, headBgColor }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: headBgColor || theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  })
);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export type ColumnType = {
  text: string;
  id: string;
  textAlign?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
};

export type RowType = Record<string, string | ReactNode | ReactNode[]>;

const itemLabel = {
  first: 'primer',
  last: 'ultima',
  next: 'siguiente',
  previous: 'anterior',
};

interface Props {
  columns: ColumnType[];
  rows: RowType[];
  headBgColor?: string;
  loading: boolean;
  pagination?: {
    count: number;
    currentPage: number;
    onPageChange: (pageIndex: number) => void;
    rowsPerPage: number;
    rowsPerPageOptions: Array<number | { label: string; value: number }>;
    onRowsPerPageChange: (newRowNumber: number) => void;
  };
}

export default function SimpleTable(props: Props) {
  const { columns, rows, loading, headBgColor, pagination } = props;

  const handlePageChange = (ev: unknown, page: number) => {
    pagination?.onPageChange(page);
  };

  const handleRowsPerPageChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    pagination?.onRowsPerPageChange(parseInt(ev.target.value));
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ minHeight: '325px' }}>
        <Table
          sx={{ width: '100%' }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {columns.map(({ id, text, textAlign }) => (
                <StyledTableCell
                  key={id}
                  id={id}
                  align={textAlign}
                  headBgColor={headBgColor}
                >
                  {text}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              rows.map((row, index) => (
                <StyledTableRow key={`row-${index}`}>
                  {columns.map(({ id, textAlign }) => (
                    <StyledTableCell
                      key={`row-${index}-col-${id}`}
                      align={textAlign}
                    >
                      {row[id]}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {loading && (
          <Stack
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="150px"
          >
            <Loading />
          </Stack>
        )}
      </TableContainer>
      {pagination && (
        <Stack
          justifyContent="end"
          direction="row"
          marginY="20px"
          color="primary"
        >
          <TablePagination
            count={pagination.count}
            page={pagination.currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={pagination.rowsPerPage}
            rowsPerPageOptions={pagination.rowsPerPageOptions}
            onRowsPerPageChange={handleRowsPerPageChange}
            labelRowsPerPage="Filas por Página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
            getItemAriaLabel={(type) => `Ve a la ${itemLabel[type]} página`}
          />
        </Stack>
      )}
    </>
  );
}
