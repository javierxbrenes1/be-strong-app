import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

interface Props {
  columns: ColumnType[];
  rows: RowType[];
  headBgColor?: string;
}

export default function SimpleTable(props: Props) {
  const { columns, rows, headBgColor } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} aria-label="customized table">
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
          {rows.map((row, index) => (
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
    </TableContainer>
  );
}
