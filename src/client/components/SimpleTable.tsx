import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Stack,
  SxProps,
  Theme,
  IconButton,
  SvgIconTypeMap,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Loading from './Loading';
import BsTablePagination from './BsTablePagination';

const IconMap: {
  [key: string]: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
    muiName: string;
  };
} = {
  edit: EditIcon,
  delete: DeleteIcon,
};

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'headBgColor',
})<{ headBgColor?: string }>(({ theme, headBgColor }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: headBgColor || theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

enum ActionsTypes {
  edit = 'edit',
  delete = 'delete',
}
export type Actions = { [key in ActionsTypes]?: (id: string) => void };
interface Props {
  columns: ColumnType[];
  rows: RowType[];
  headBgColor?: string;
  loading?: boolean;
  xs?: SxProps<Theme>;
  rowDecorator?: (id: string, value: unknown) => ReactNode;
  pagination?: {
    count: number;
    currentPage: number;
    onPageChange: (pageIndex: number) => void;
    rowsPerPage: number;
    rowsPerPageOptions: Array<number | { label: string; value: number }>;
    onRowsPerPageChange: (newRowNumber: number) => void;
  };
  actions?: Actions;
  showActions?: boolean;
}

function ActionsComponent(props: { actions: Actions; id: string }) {
  const { actions, id } = props;

  return (
    <Stack direction="row" gap=".5rem">
      {Object.keys(actions).map((action, index) => {
        const Icon = IconMap[action];
        const clickHandler = actions[action as ActionsTypes];
        return (
          <IconButton
            key={`actions-for-${id}-${index}`}
            size="small"
            onClick={() => {
              if (clickHandler) {
                clickHandler(id);
              }
            }}
          >
            <Icon />
          </IconButton>
        );
      })}
    </Stack>
  );
}

export default function SimpleTable(props: Props) {
  const {
    columns,
    rows,
    loading,
    headBgColor,
    pagination,
    xs,
    actions,
    showActions,
    rowDecorator,
  } = props;

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ minHeight: '325px', ...(xs ?? {}) }}
      >
        <Table
          sx={{ width: '100%', position: 'relative', zIndex: 0 }}
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
              {actions && showActions ? (
                <StyledTableCell>Acciones</StyledTableCell>
              ) : null}
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
                      {rowDecorator ? rowDecorator(id, row[id]) : row[id]}
                    </StyledTableCell>
                  ))}
                  {actions && showActions ? (
                    <StyledTableCell>
                      <ActionsComponent
                        actions={actions}
                        id={row.id as string}
                      />
                    </StyledTableCell>
                  ) : null}
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
        <BsTablePagination
          count={pagination.count}
          currentPage={pagination.currentPage}
          onPageChange={pagination?.onPageChange}
          rowsPerPage={pagination.rowsPerPage}
          rowsPerPageOptions={pagination.rowsPerPageOptions}
          onRowsPerPageChange={pagination?.onRowsPerPageChange}
        />
      )}
    </>
  );
}
