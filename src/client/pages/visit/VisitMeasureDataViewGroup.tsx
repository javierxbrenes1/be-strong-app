import { useState, useMemo } from 'react';
import { ChartDataViewer, DataViewer } from '../../types';
import SimpleTable from '../../components/SimpleTable';
import {
  MEASURES_TITLES,
  MeasuresTitlesProp,
  MeasuresColorMap,
  getFullMeasureTableColums,
} from '../../labels';
import BsChart from '../../components/BsChart';
import VisitMeasureDataViewWrapper from './VisitMeasureDataViewWrapper';

type Props = {
  title: string;
  tableData: Record<string, string>[];
  charts: {
    labels: string[];
    numbers: Record<string, number[]>;
  };
};

function VisitMeasureDataViewGroup(props: Props) {
  const [viewElement, setViewElement] = useState<DataViewer>('table');
  const { title, tableData, charts } = props;

  const chartsDataSets = useMemo(() => {
    const keys = Object.keys(charts.numbers);
    const dataSets: {
      numbers: number[];
      title: string;
      borderColor: string;
      bgColor: string;
    }[] = [];
    keys.forEach((key) => {
      dataSets.push({
        numbers: charts.numbers[key],
        title: MEASURES_TITLES[key as MeasuresTitlesProp],
        borderColor: MeasuresColorMap[key],
        bgColor: MeasuresColorMap[key],
      });
    });
    return dataSets;
  }, [charts.numbers]);

  return (
    <VisitMeasureDataViewWrapper
      title={title}
      viewElement={viewElement}
      setViewElement={setViewElement}
    >
      {viewElement === 'table' && (
        <SimpleTable
          columns={getFullMeasureTableColums()}
          rows={tableData}
          xs={{ maxHeight: '400px' }}
        />
      )}
      {['bar', 'line'].includes(viewElement) && (
        <BsChart
          type={viewElement as ChartDataViewer}
          labels={charts.labels}
          datasets={chartsDataSets}
          sx={{ maxHeight: '500px' }}
        />
      )}
    </VisitMeasureDataViewWrapper>
  );
}

export default VisitMeasureDataViewGroup;
