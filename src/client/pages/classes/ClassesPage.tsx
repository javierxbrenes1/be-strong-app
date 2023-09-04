/* eslint-disable @typescript-eslint/ban-ts-comment */
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Box, LinearProgress } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import BsDateTimeline from '../../components/BsDateTimeline';
import NoClass from './noClass';
import GymClass from '../../../common/models/GymClass';
import { GET_CLASSES_BY_DATE } from '../../queries/classesPage';
import GymClasses from './gymClasses';

function ClassesPage() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [loadClasses, { loading }] = useLazyQuery<{
    getGymClasses: GymClass[];
  }>(GET_CLASSES_BY_DATE, {
    onCompleted(data) {
      const { getGymClasses } = data;
      setClasses(getGymClasses);
    },
    onError(err) {
      throw err;
    },
  });

  const onDateAccept = (date: number) => {
    loadClasses({
      variables: {
        gte: date,
      },
    });
  };

  return (
    <PageContainer Icon={SportsGymnasticsIcon} text="Clases">
      <BsDateTimeline onDateAccept={onDateAccept} />
      <Box sx={{ margin: '10px 0' }}>
        {loading && <LinearProgress color="primary" />}
        {!loading && !classes.length ? <NoClass /> : null}
        {!loading && classes.length ? <GymClasses classes={classes} /> : null}
      </Box>
    </PageContainer>
  );
}

export default ClassesPage;
