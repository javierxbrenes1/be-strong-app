import { useMemo, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import Measure from '../../../../common/models/Measure';
import CardTitle from '../../../components/CardTitle';
import SimpleTable from '../../../components/SimpleTable';
import {
  buildMeasureChartDataByMeasureType,
  parseMeasureData,
} from '../../../utils/helpers';
import Chart from './Chart';
import {
  MEASURES_TITLES,
  MeasuresTitlesProp,
  getMeasureTableColumns,
} from '../../../labels';
import Filters from './Filters';
import { GET_MEMBER_MEASURES } from '../../../queries/memberPage';
import Pagination from '../../../../common/models/Pagination';
import { Measures } from '../../../types';
import BsShowError from '../../../components/BsShowError';

/**
 * Member measure component
 * @param props
 * @returns
 */
function MemberMeasuresData(props: {
  selectedMeasureType: Measures | null;
  memberCode: string;
  newMeasureWasAdded: boolean;
  updateMeasureWasAddedFlag: () => void;
}) {
  const {
    selectedMeasureType,
    memberCode,
    newMeasureWasAdded,
    updateMeasureWasAddedFlag,
  } = props;
  const [measuresPages, setMeasuresPages] = useState<Record<number, Measure[]>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [paginationDetails, setPaginationDetails] = useState<Pagination | null>(
    null
  );
  const [filters, setFilters] = useState<{ from: number; to: number } | null>(
    null
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [getMeasuresFromServer, { loading }] = useLazyQuery<{
    getMeasures: {
      measures: Measure[];
      pagination: Pagination;
    };
  }>(GET_MEMBER_MEASURES, {
    fetchPolicy: 'cache-and-network',
    onError(err) {
      BsShowError(
        err,
        'Hubo un error cargando los datos, intenta nuevamente, o refresca el browser'
      );
    },
    onCompleted(data) {
      const { measures, pagination } = data.getMeasures;
      setPaginationDetails(pagination);
      setMeasuresPages((p) => ({
        ...p,
        [pagination.currentPage]: measures,
      }));
      setCurrentPage(pagination.currentPage);
    },
  });

  const memberMeasures: Measure[] = useMemo(
    () => measuresPages[currentPage] ?? [],
    [measuresPages, currentPage]
  );

  const columns = useMemo(() => {
    if (!selectedMeasureType) return null;
    return getMeasureTableColumns(selectedMeasureType);
  }, [selectedMeasureType]);

  const chartDetails = useMemo(() => {
    if (!selectedMeasureType || !memberMeasures.length) return null;
    return buildMeasureChartDataByMeasureType(
      memberMeasures,
      selectedMeasureType
    );
  }, [selectedMeasureType, memberMeasures]);

  const parsedMemberMeasures = useMemo(
    () => parseMeasureData(memberMeasures),
    [memberMeasures]
  );

  if (!selectedMeasureType) return null;

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
    // Execute new query
    getMeasuresFromServer({
      variables: {
        input: {
          memberCode,
          limit: rowsPerPage,
          offset: 0,
          filters: newFilters,
        },
      },
    });
  };

  const handleOnRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    resetStates();
    getMeasuresFromServer({
      variables: {
        input: {
          memberCode,
          limit: newRowsPerPage,
          offset: 0,
          filters,
        },
      },
    });
  };

  const handlePageChange = (nextPage: number) => {
    if (measuresPages[nextPage]) {
      setCurrentPage(nextPage);
      return;
    }
    const offset = rowsPerPage * nextPage;
    getMeasuresFromServer({
      variables: {
        input: {
          memberCode,
          limit: rowsPerPage,
          offset,
          filters,
        },
      },
    });
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: ' 16px' }}
        >
          <CardTitle
            title={`Detalles${newMeasureWasAdded ? ' 🔗‍💥' : ''}`}
            sx={{ marginBottom: 0 }}
          />
          <Filters
            onSearch={handleOnSearch}
            activateReloading={newMeasureWasAdded}
            onReloadingClick={updateMeasureWasAddedFlag}
          />
        </Stack>
        <Grid container spacing={1} sx={{ marginTop: '12px' }}>
          {columns && (
            <Grid item xs={12}>
              <SimpleTable
                columns={columns}
                rows={parsedMemberMeasures}
                loading={loading}
                pagination={
                  paginationDetails
                    ? {
                        count: paginationDetails.total,
                        onPageChange: handlePageChange,
                        currentPage,
                        rowsPerPage,
                        rowsPerPageOptions: [5, 10, 20, 50, 100],
                        onRowsPerPageChange: handleOnRowsPerPageChange,
                      }
                    : undefined
                }
              />
            </Grid>
          )}
          {chartDetails && (
            <Grid item xs={12}>
              <Chart
                labels={chartDetails.labels}
                numbers={chartDetails.numbers}
                chartTitle={
                  MEASURES_TITLES[selectedMeasureType as MeasuresTitlesProp]
                }
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MemberMeasuresData;
