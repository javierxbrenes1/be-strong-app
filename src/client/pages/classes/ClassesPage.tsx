import React, { useMemo } from 'react';
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

const gLocalizer = dayjsLocalizer(dayjs);

function ClassesPage() {
  const formats = useMemo(
    () => ({
      timeGutterFormat: (
        date: Date,
        culture?: string,
        localizer?: DateLocalizer
      ) => localizer?.format(date, 'hh:mm a', culture) ?? '',
    }),
    []
  );

  return (
    <PageContainer
      Icon={SportsGymnasticsIcon}
      text="Clases"
      RightAction={<NewClassLink />}
    >
      <CalendarWrapper>
        <Calendar
          localizer={gLocalizer}
          culture="es"
          formats={formats}
          messages={{
            week: 'Semana',
            work_week: 'Semana de trabajo',
            day: 'Día',
            month: 'Mes',
            previous: 'Atrás',
            next: 'Después',
            today: 'Hoy',
            agenda: 'El Diario',

            showMore: (total) => `+${total} más`,
          }}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          min={new Date(1972, 0, 1, 17, 0, 0)}
        />
      </CalendarWrapper>
    </PageContainer>
  );
}

export default ClassesPage;
