import { useEffect, useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import PageContainer from '../../components/PageContainer';
import AddMember from './AddMember';
import BsButton from '../../components/BsButton';
import BsInput from '../../components/BsInput';
import Member from '../../../common/models/Member';
import Pagination from '../../../common/models/Pagination';
import { GET_ACTIVE_MEMBERS } from '../../queries/membersPage';
import MemberCardsVisualization from './MemberCardsVisualization';

const SearchBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '50%',
  },
}));

const LIMIT = 50;

function MembersPage() {
  const [currentPagination, setCurrentPagination] = useState<Pagination | null>(
    null
  );
  const [filter, setFilter] = useState('');

  const { loading, fetchMore, data } = useQuery<{
    getAllMembers: {
      members: Member[];
      pagination: Pagination;
    };
  }>(GET_ACTIVE_MEMBERS, {
    variables: {
      offset: 0,
      limit: LIMIT,
    },
    onCompleted(onCompletedData) {
      const { getAllMembers } = onCompletedData;
      setCurrentPagination(getAllMembers.pagination);
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
    if (!currentPagination || currentPagination?.nextPageStart === -1) return;

    fetchMore({
      variables: {
        offset: currentPagination.nextPageStart,
      },
    });
  };

  const handleFilter = (text: string) => {
    setFilter(text.length >= 3 ? text : '');
  };

  return (
    <PageContainer Icon={PeopleAltIcon} text="Miembros">
      <SearchBox direction="row" gap="10px">
        <AddMember />
        <BsInput
          placeholder="Buscar Miembro"
          onChange={handleFilter}
          Icon={SearchIcon}
          sx={{ flex: 1 }}
        />
      </SearchBox>
      <MemberCardsVisualization members={data?.getAllMembers?.members || []} />
      {currentPagination &&
        currentPagination.nextPageStart !== -1 &&
        !loading && (
          <Box sx={{ maxWidth: '200px', margin: '0 auto' }}>
            <BsButton text="Cargar Mas" onClick={loadMoreMembers} />
          </Box>
        )}
    </PageContainer>
  );
}

export default MembersPage;
