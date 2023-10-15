/* eslint-disable @typescript-eslint/ban-ts-comment */
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Box, LinearProgress } from '@mui/material';
import dayjs from 'dayjs';
import PageContainer from '../../components/PageContainer';
import BsDateTimeline from '../../components/BsDateTimeline';
import NoClass from './noClass';
import GymClass from '../../../common/models/GymClass';
import { GET_CLASSES_BY_DATE } from '../../queries/classesPage';
import GymClasses from './gymClasses';
import AddClassModal from './addClassModal';
import { isoFormatDate } from '../../utils/helpers';

function ClassesPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [dateInView, setDateInView] = useState<number | null>(null);
  const [loadClasses, { loading, data }] = useLazyQuery<{
    getGymClasses: GymClass[];
  }>(GET_CLASSES_BY_DATE, {
    onError(err) {
      throw err;
    },
  });

  const onDateAccept = (date: number) => {
    setDateInView(date);
    loadClasses({
      variables: {
        gte: isoFormatDate(dayjs(date).toDate()),
        lt: isoFormatDate(dayjs(date).add(1, 'day').toDate()),
      },
    });
  };

  const classes = data?.getGymClasses ?? [];

  return (
    <>
      <PageContainer Icon={SportsGymnasticsIcon} text="Clases">
        <BsDateTimeline onDateAccept={onDateAccept} />
        <Box sx={{ margin: '10px 0' }}>
          {loading && <LinearProgress color="primary" />}
          {!loading && !classes.length ? (
            <NoClass onClick={() => setOpenAddModal(true)} />
          ) : null}
          {!loading && classes.length ? (
            <GymClasses
              classes={classes}
              onAddClass={() => setOpenAddModal(true)}
            />
          ) : null}
        </Box>
      </PageContainer>
      <AddClassModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        date={dateInView}
      />
    </>
  );
}

export default ClassesPage;
