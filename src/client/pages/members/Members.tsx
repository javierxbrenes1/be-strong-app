import { useEffect, useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useLazyQuery } from '@apollo/client';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import DataVisualizationSwitch, {
  VisualizationType,
} from './DataVisualizationSwitch';
import MemberCardsVisualization from './MemberCardsVisualization';
import { GET_ACTIVE_MEMBERS } from '../../queries/getActiveMembers';
import Member from '../../models/Member';
import Pagination from '../../models/Pagination';

const LIMIT = 6;

function MembersPage() {
  const [visualizationType, setVisualizationType] = useState<VisualizationType>(
    VisualizationType.cards
  );
  const [members, setMembers] = useState<Member[]>([]);
  const [offset, setOffset] = useState(0);

  const [getMembers, { loading }] = useLazyQuery<{
    getAllMembers: {
      members: Member[];
      pagination: Pagination;
    };
  }>(GET_ACTIVE_MEMBERS, {
    onCompleted(data) {
      const { getAllMembers } = data;
      setMembers((prev) => [...prev, ...getAllMembers.members]);
      setOffset(getAllMembers.pagination.nextPageStart);
    },
    onError(error) {
      // do something
      console.error(error);
    },
  });

  useEffect(() => {
    getMembers({
      variables: {
        offset,
        limit: LIMIT,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDataVisualizationChange = (newProp: VisualizationType) => {
    setVisualizationType(newProp);
  };

  return (
    <PageContainer Icon={PeopleAltIcon} text="Miembros">
      <DataVisualizationSwitch
        onVisualizationSwitch={onDataVisualizationChange}
        selectedOption={visualizationType}
      />
      <Box sx={{ margin: '10px 0' }}>
        {loading && <LinearProgress color="warning" />}
        {visualizationType === VisualizationType.cards && (
          <MemberCardsVisualization members={members} />
        )}
      </Box>
    </PageContainer>
  );
}

export default MembersPage;
