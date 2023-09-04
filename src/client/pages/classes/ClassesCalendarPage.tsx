/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import Box from '@mui/material/Box';
import {
  Calendar,
  DateLocalizer,
  Views,
  dayjsLocalizer,
} from 'react-big-calendar';
import dayjs from 'dayjs';
// @ts-ignore
import Toolbar from 'react-big-calendar/lib/Toolbar';
import PageContainer from '../../components/PageContainer';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NewClassLink from './NewClassLink';

const CalendarWrapper = styled(Box)(({ theme }) => ({
  height: '90%',
  margin: '10px 0',
  fontFamily: theme.typography.fontFamily,
  '& button': {
    fontFamily: theme.typography.fontFamily,
  },
  '& .rbc-toolbar-label': {
    textTransform: 'capitalize',
  },
}));

const InitialRangeChangeToolbar = (props: {
  onView: (view: unknown) => void;
  view: unknown;
}) => {
  useEffect(() => {
    const { onView, view } = props;
    onView(view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Toolbar {...props} />;
};

const gLocalizer = dayjsLocalizer(dayjs);

function ClassesCalendarPage() {
  const calendarProps = useMemo(
    () => ({
      localizer: gLocalizer,
      culture: 'es',
      formats: {
        timeGutterFormat: (
          date: Date,
          culture?: string,
          localizer?: DateLocalizer
        ) => localizer?.format(date, 'hh:mm a', culture) ?? '',
      },
      messages: {
        week: 'Semana',
        work_week: 'Semana de trabajo',
        day: 'Día',
        month: 'Mes',
        previous: 'Atrás',
        next: 'Después',
        today: 'Hoy',
        agenda: 'El Diario',
        showMore: (total: number) => `+${total} más`,
      },
      views: [Views.MONTH, Views.WEEK, Views.DAY],
      min: new Date(1972, 0, 1, 17, 0, 0),
      popup: true,
      components: { toolbar: InitialRangeChangeToolbar },
    }),
    []
  );

  const handleRangeChange = (range: Date[] | { start: Date; end: Date }) => {
    console.log(range);
  };

  return (
    <PageContainer
      Icon={SportsGymnasticsIcon}
      text="Clases"
      RightAction={<NewClassLink />}
    >
      <CalendarWrapper>
        {/* @ts-ignore */}
        <Calendar onRangeChange={handleRangeChange} {...calendarProps} />
      </CalendarWrapper>
    </PageContainer>
  );
}

export default ClassesCalendarPage;
