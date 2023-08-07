import { useState } from 'react';
import {
  Paper,
  Typography,
  Stack,
  Divider,
  LinearProgress,
  Switch,
} from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import Filters from '../member/MemberMeasures/Filters';
import Pagination from '../../../common/models/Pagination';
import { GET_VISIT_MEASURES } from '../../queries/visitPage';
import Measure from '../../../common/models/Measure';
import BsTablePagination from '../../components/BsTablePagination';
import VisitMeasureDataViews from './VisitMeasureDataViews';
import BsError from '../../components/BsError';

function VisitMeasures(props: { code: string }) {
  const { code } = props;
  const [showAllTogether, setShowAllTogether] = useState(false);

  const [paginationDetails, setPaginationDetails] = useState<Pagination | null>(
    null
  );
  const [measuresPages, setMeasuresPages] = useState<Record<number, Measure[]>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filters, setFilters] = useState<{ from: number; to: number } | null>(
    null
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [getDataFromServer, { loading, error }] = useLazyQuery<{
    getMeasures: { pagination: Pagination; measures: Measure[] };
  }>(GET_VISIT_MEASURES, {
    fetchPolicy: 'cache-and-network',
    onError(err) {
      console.error(err);
    },
    onCompleted(data) {
      const { pagination, measures } = data.getMeasures;
      setPaginationDetails(pagination);
      setMeasuresPages((d) => ({ ...d, [pagination.currentPage]: measures }));
      setCurrentPage(pagination.currentPage);
    },
  });

  const resetStates = () => {
    // clean up state
    setMeasuresPages({});
    setCurrentPage(0);
    setPaginationDetails(null);
  };

  const handleOnSearch = (from: Date, to: Date) => {
    const newFilters = {
      from: from.getTime(),
      to: to.getTime(),
    };
    setFilters(newFilters);
    resetStates();
    getDataFromServer({
      variables: {
        input: {
          memberCode: code,
          limit: rowsPerPage,
          offset: 0,
          filters: newFilters,
        },
      },
    });
  };

  const handleOnPageChange = (page: number) => {
    if (measuresPages[page]) {
      setCurrentPage(page);
      return;
    }
    const offset = rowsPerPage * page;
    getDataFromServer({
      variables: {
        input: {
          memberCode: code,
          limit: rowsPerPage,
          offset,
          filters,
        },
      },
    });
  };

  const handleOnRowsPerPageChange = (newRowsPerPage: number) => {
    resetStates();
    setRowsPerPage(newRowsPerPage);
    getDataFromServer({
      variables: {
        input: {
          memberCode: code,
          limit: newRowsPerPage,
          offset: 0,
          filters,
        },
      },
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: '10px' }}>
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <Typography variant="h5">Mis Datos</Typography>
        <Stack direction="row" alignItems="center" sx={{ padding: '0 5px' }}>
          <Switch
            color="primary"
            checked={showAllTogether}
            onChange={() => setShowAllTogether(!showAllTogether)}
          />
          <Typography>Ver todo junto</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ margin: '5px 0' }} />
      {loading && <LinearProgress color="primary" />}
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <Filters onSearch={handleOnSearch} iconFirst />
        {paginationDetails && (
          <BsTablePagination
            justifyAt="start"
            marginY="0"
            count={paginationDetails.total}
            currentPage={currentPage}
            rowsPerPage={paginationDetails.pageSize}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onPageChange={handleOnPageChange}
            onRowsPerPageChange={handleOnRowsPerPageChange}
          />
        )}
      </Stack>
      {!error && (
        <VisitMeasureDataViews
          measures={measuresPages[currentPage] ?? []}
          showIndividually={!showAllTogether}
        />
      )}
      {error && (
        <BsError text="Parece que hubo un problema al cargar tus datos." />
      )}
    </Paper>
  );
}

export default VisitMeasures;
