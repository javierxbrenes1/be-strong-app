import Grid from '@mui/material/Grid';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import Indicator from './Indicator';
import Events from '../../components/HomeEvents/Events';
import { HOME_QUERY } from '../../queries/homePage';
import Member from '../../../common/models/Member';
import GymClass from '../../../common/models/GymClass';
import getHomeTitle from './HomeTitle';
import PageContainer from '../../components/PageContainer';
import { isoFormatDate } from '../../utils/helpers';
import { PATHS } from '../../../common/enums';

const getCurrentYear = (): number => new Date().getFullYear();

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
        today: isoFormatDate(new Date()),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { Icon, text } = getHomeTitle();

  return (
    <PageContainer Icon={Icon} text={text}>
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
    </PageContainer>
  );
}

export default HomePage;
