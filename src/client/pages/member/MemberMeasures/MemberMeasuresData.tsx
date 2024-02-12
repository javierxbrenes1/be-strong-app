import { useMemo, useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Divider, Stack, Switch, Typography } from '@mui/material';
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
import Pagination from '../../../../common/models/Pagination';
import { Measures } from '../../../types';
import useGetMeasuresFromServer from './useGetMeasuresFromServer';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditMeasures from '../../members/EditMeasure';
import { useMemberContext } from '../MemberContext';

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
  const [showActions, setShowActions] = useState(false);
  const [measureToDelete, setMeasureToDelete] = useState<Measure | null>(null);
  const [measureToEdit, setMeasureToEdit] = useState<Measure | null>(null);
  const { reloadMeasures } = useMemberContext();

  const { getMeasuresFromServer, loading, refetchMeasures } =
    useGetMeasuresFromServer((data) => {
      const { measures, pagination } = data.getMeasures;
      setPaginationDetails(pagination);
      setMeasuresPages((p) => ({
        ...p,
        [pagination.currentPage]: measures,
      }));
      setCurrentPage(pagination.currentPage);
    });

  useEffect(() => {
    if (reloadMeasures) {
      refetchMeasures();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadMeasures]);

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

  const deleteMemberMeasure = (id: string) => {
    const measure = memberMeasures.find((m) => m.id === Number(id));
    if (measure) {
      setMeasureToDelete(measure);
    }
  };

  const editMemberMeasure = (id: string) => {
    const measure = memberMeasures.find((m) => m.id === Number(id));
    if (measure) {
      setMeasureToEdit(measure);
    }
  };

  return (
    <>
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
          <Divider sx={{ margin: '8px 0' }} />
          <Grid container spacing={1} sx={{ marginTop: '12px' }}>
            {columns && (
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  gap="0.25rem"
                  justifyContent="end"
                  alignItems="center"
                >
                  <Switch
                    color="primary"
                    checked={showActions}
                    onChange={() => setShowActions((prev) => !prev)}
                  />
                  <Typography>Mostrar acciones</Typography>
                </Stack>
                <SimpleTable
                  columns={columns}
                  rows={parsedMemberMeasures}
                  loading={loading}
                  actions={{
                    delete: deleteMemberMeasure,
                    edit: editMemberMeasure,
                  }}
                  showActions={showActions}
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
      {measureToDelete ? (
        <DeleteConfirmationModal
          measure={measureToDelete}
          memberCode={memberCode}
          onClose={() => {
            setMeasureToDelete(null);
          }}
        />
      ) : null}
      {measureToEdit && (
        <EditMeasures
          measure={measureToEdit}
          memberCode={memberCode}
          onClose={() => {
            setMeasureToEdit(null);
          }}
        />
      )}
    </>
  );
}

export default MemberMeasuresData;
