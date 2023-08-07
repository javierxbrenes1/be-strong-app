import { useMemo, useState } from 'react';
import { ChartDataViewer, DataViewer, Measures } from '../../types';
import { MeasuresColorMap, getMeasureTableColumns } from '../../labels';
import SimpleTable from '../../components/SimpleTable';
import BsChart from '../../components/BsChart';
import VisitMeasureDataViewWrapper from './VisitMeasureDataViewWrapper';

type Props = {
  title: string;
  measure: Measures;
  tableData: Record<string, string>[];
  charts: {
    labels: string[];
    numbers: Record<string, number[]>;
  };
};

function VisitMeasureDataView(props: Props) {
  const { title, measure, tableData, charts } = props;
  const [viewElement, setViewElement] = useState<DataViewer>('table');

  const tableColumns = useMemo(
    () => getMeasureTableColumns(measure),
    [measure]
  );

  const chartsNumbers = useMemo(
    () => charts.numbers[measure] ?? [],
    [charts.numbers, measure]
  );

  return (
    <VisitMeasureDataViewWrapper
      title={title}
      viewElement={viewElement}
      setViewElement={setViewElement}
    >
      {viewElement === 'table' && (
        <SimpleTable
          columns={tableColumns}
          rows={tableData}
          headBgColor={MeasuresColorMap[measure]}
          xs={{ height: '400px' }}
        />
      )}
      {['bar', 'line'].includes(viewElement) && (
        <BsChart
          type={viewElement as ChartDataViewer}
          labels={charts.labels}
          datasets={[
            {
              title,
              numbers: chartsNumbers,
              borderColor: MeasuresColorMap[measure],
              bgColor: MeasuresColorMap[measure],
            },
          ]}
        />
      )}
    </VisitMeasureDataViewWrapper>
  );
}

export default VisitMeasureDataView;
