import Grid from '@mui/material/Grid';
import { styled } from '@mui/material';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { motion } from 'framer-motion';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import Greetings from './Greetings';
import Indicator from './Indicator';
import { PATHS } from '../../constants';
import Events from './Events';
import { HOME_COUNTERS } from '../../queries/homePage';
import Member from '../../models/Member';
import GymClass from '../../models/GymClass';

const Container = styled(Grid)({
  padding: '32px',
});

const getCurrentYear = (): number => new Date().getFullYear();

type QueryType = {
  getMembersCount: number;
  getGymClassesCount: number;
  getBirthdateMembers: Member[];
  getGymClasses: GymClass[];
};

function HomePage() {
  const [counters, setCounters] = useState<{
    members: number;
    classes: number;
  }>({
    members: 0,
    classes: 0,
  });

  const { loading, data, error } = useQuery<QueryType>(HOME_COUNTERS, {
    variables: {
      year: getCurrentYear(),
      today: new Date(),
    },
    // onCompleted(data) {
    //   setCounters({
    //     members: data.getMembersCount,
    //     classes: data.getGymClassesCount,
    //   });
    // },
    // onError(error) {
    //   console.log(error);
    // },
  });

  if (error) return <div>shit broke</div>;

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(20px)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      transition={{ duration: 1 }}
    >
      <Container container flexDirection="column">
        <Greetings />
        <Grid container gap="16px" justifyContent="begin" padding="10px">
          <Indicator
            Icon={PeopleOutlineTwoToneIcon}
            gradientColors={['#ffcbc2', '#ffa08e']}
            iconBackgroundColor="#FF6E31"
            title="Miembros Activos"
            loading={loading}
            value={counters.members}
            goToPath={PATHS.MEMBERS}
          />
          <Indicator
            Icon={FitnessCenterIcon}
            gradientColors={['#e4f4f6', '#bbe4e9']}
            iconBackgroundColor="#007cb9"
            btnHoverColor="#007cb9"
            loading={loading}
            title={`Clases en ${getCurrentYear()}`}
            value={counters.classes}
            goToPath={PATHS.CLASSES}
          />
          <Events />
        </Grid>
      </Container>
    </motion.div>
  );
}

export default HomePage;
