import { useEffect, useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import { useLazyQuery } from '@apollo/client';
import PageContainer from '../../components/PageContainer';
import DataVisualizationSwitch, {
  VisualizationType,
} from './DataVisualizationSwitch';
import MemberCardsVisualization from './MemberCardsVisualization';
import { GET_ACTIVE_MEMBERS } from '../../queries/getActiveMembers';
import Member from '../../models/Member';
import Pagination from '../../models/Pagination';
import AddMember from './AddMember';
import BsButton from '../../components/BsButton';

const LIMIT = 20;

function MembersPage() {
  const [visualizationType, setVisualizationType] = useState<VisualizationType>(
    VisualizationType.cards
  );
  const [members, setMembers] = useState<Member[]>([]);
  const [codesToIgnore, setCodesToIgnore] = useState<string[]>([]);
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
    loadMoreMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreMembers = () => {
    getMembers({
      variables: {
        offset,
        limit: LIMIT,
        ignore: codesToIgnore,
      },
    });
  };

  const onDataVisualizationChange = (newProp: VisualizationType) => {
    setVisualizationType(newProp);
  };

  const addNewMemberToList = (member: Member) => {
    setCodesToIgnore((prevState) => [...prevState, member.code]);
    setMembers((prevState) => [member, ...prevState]);
  };

  return (
    <PageContainer Icon={PeopleAltIcon} text="Miembros">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <AddMember addNewMemberToList={addNewMemberToList} />
        <DataVisualizationSwitch
          onVisualizationSwitch={onDataVisualizationChange}
          selectedOption={visualizationType}
        />
      </Box>
      <Box sx={{ margin: '10px 0' }}>
        {visualizationType === VisualizationType.cards && (
          <MemberCardsVisualization members={members} />
        )}
      </Box>
      {offset !== -1 && (
        <Box sx={{ maxWidth: '200px', margin: '0 auto' }}>
          <BsButton text="Cargar Mas" onClick={loadMoreMembers} />
        </Box>
      )}
    </PageContainer>
  );
}

export default MembersPage;
