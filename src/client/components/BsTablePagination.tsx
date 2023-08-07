import { Stack, TablePagination } from '@mui/material';

type Props = {
  justifyAt?: 'end' | 'start';
  marginY?: string;
  count: number;
  currentPage: number;
  onPageChange: (pageIndex: number) => void;
  rowsPerPage: number;
  rowsPerPageOptions: Array<number | { label: string; value: number }>;
  onRowsPerPageChange: (newRowNumber: number) => void;
};

const itemLabel = {
  first: 'primer',
  last: 'ultima',
  next: 'siguiente',
  previous: 'anterior',
};

function BsTablePagination(props: Props) {
  const {
    count,
    currentPage,
    onPageChange,
    rowsPerPage,
    rowsPerPageOptions,
    onRowsPerPageChange,
    justifyAt = 'end',
    marginY = '20px',
  } = props;

  const handlePageChange = (ev: unknown, page: number) => {
    onPageChange(page);
  };

  const handleRowsPerPageChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onRowsPerPageChange(parseInt(ev.target.value));
  };

  return (
    <Stack
      justifyContent={justifyAt}
      direction="row"
      marginY={marginY}
      color="primary"
    >
      <TablePagination
        count={count}
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelRowsPerPage="Filas por Página"
        labelDisplayedRows={({ from, to, count: countLabel }) =>
          `${from}-${to} de ${countLabel}`
        }
        getItemAriaLabel={(type) => `Ve a la ${itemLabel[type]} página`}
      />
    </Stack>
  );
}

export default BsTablePagination;
