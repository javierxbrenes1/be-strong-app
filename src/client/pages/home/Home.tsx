import Grid from '@mui/material/Grid';
import { Divider, styled } from '@mui/material';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { motion } from 'framer-motion';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Greetings from './Greetings';
import Indicator from './Indicator';
import { PATHS } from '../../constants';
import Events from '../../components/HomeEvents/Events';
import { HOME_QUERY } from '../../queries/homePage';
import Member from '../../models/Member';
import GymClass from '../../models/GymClass';

const Container = styled(Grid)({
  padding: '32px',
});

const getCurrentYear = (): number => new Date().getFullYear();
const getTodayDate = () => new Date().getTime();
type QueryType = {
  getMembersCount: number;
  getGymClassesCount: number;
  getBirthdateMembers: Member[];
  getGymClasses: GymClass[];
};

function HomePage() {
  const [getData, { loading, data }] = useLazyQuery<QueryType>(HOME_QUERY, {
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    getData({
      variables: {
        year: getCurrentYear(),
        today: getTodayDate(),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(20px)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      transition={{ duration: 1 }}
    >
      <Container container flexDirection="column">
        <Greetings />
        <Divider variant="middle" sx={{ margin: '16px 0' }} />
        <Grid container gap="32px" padding="10px">
          <Indicator
            Icon={PeopleOutlineTwoToneIcon}
            gradientColors={['#ffcbc2', '#ffa08e']}
            iconBackgroundColor="#FF6E31"
            title="Miembros Activos"
            loading={loading}
            value={data?.getMembersCount || 0}
            goToPath={PATHS.MEMBERS}
          />
          <Indicator
            Icon={FitnessCenterIcon}
            gradientColors={['#e4f4f6', '#bbe4e9']}
            iconBackgroundColor="#007cb9"
            btnHoverColor="#007cb9"
            loading={loading}
            title={`Clases en ${getCurrentYear()}`}
            value={data?.getGymClassesCount || 0}
            goToPath={PATHS.CLASSES}
          />
          <Events
            todayClasses={data?.getGymClasses || []}
            birthDateMembers={data?.getBirthdateMembers || []}
            loading={loading}
          />
        </Grid>
      </Container>
    </motion.div>
  );
}

export default HomePage;
