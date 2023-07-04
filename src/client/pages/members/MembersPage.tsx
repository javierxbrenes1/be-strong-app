import { useEffect, useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import { useLazyQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { Stack, Typography, styled } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import { VisualizationType } from './DataVisualizationSwitch';
import MemberCardsVisualization from './MemberCardsVisualization';
import {
  GET_ACTIVE_MEMBERS,
  GET_FILTERED_MEMBERS,
} from '../../queries/membersPage';
import Member from '../../../common/models/Member';
import Pagination from '../../../common/models/Pagination';
import AddMember from './AddMember';
import BsButton from '../../components/BsButton';
import BsInput from '../../components/BsInput';

const LIMIT = 20;

const SearchBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '50%',
  },
}));

function MembersPage() {
  // TODO: be able to select table here
  const [visualizationType] = useState<VisualizationType>(
    VisualizationType.cards
  );
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [codesToIgnore, setCodesToIgnore] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState('');

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

  const [getFilteredMembers] = useLazyQuery<{ getFilteredMembers: Member[] }>(
    GET_FILTERED_MEMBERS,
    {
      onCompleted(data) {
        const { getFilteredMembers: res } = data;
        if (res.length) {
          setMembers((prev) => [...prev, ...res]);
          setCodesToIgnore((prev) => [...prev, ...res.map((m) => m.code)]);
          return;
        }
        setFilteredMembers([]);
      },
      onError(error) {
        console.error(error);
      },
    }
  );

  useEffect(() => {
    loadMoreMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!filter) {
      setFilteredMembers(members);
      return;
    }

    const newFilteredMembers = members.filter((m) =>
      m.name.toLowerCase().startsWith(filter.toLocaleLowerCase())
    );

    if (newFilteredMembers.length) {
      setFilteredMembers(newFilteredMembers);
    } else {
      getFilteredMembers({
        variables: {
          column: 'name',
          comparator: 'startsWith',
          filter,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, filter]);

  const loadMoreMembers = () => {
    if (offset === -1) return;
    getMembers({
      variables: {
        offset,
        limit: LIMIT,
        ignore: codesToIgnore,
      },
    });
  };

  const addNewMemberToList = (member: Member) => {
    setCodesToIgnore((prevState) => [...prevState, member.code]);
    setMembers((prevState) => [member, ...prevState]);
  };

  const handleFilter = (text: string) => {
    setFilter(text.length >= 3 ? text : '');
  };

  return (
    <PageContainer Icon={PeopleAltIcon} text="Miembros">
      <SearchBox direction="row" gap="10px">
        <AddMember addNewMemberToList={addNewMemberToList} />
        <BsInput
          placeholder="Buscar Miembro"
          onChange={handleFilter}
          Icon={SearchIcon}
          sx={{ flex: 1 }}
        />
      </SearchBox>
      <Box sx={{ margin: '10px 0' }}>
        {filter && !filteredMembers.length && (
          <Typography textAlign="center" margin="20px">
            No se encontró ningún miembro
          </Typography>
        )}
        {visualizationType === VisualizationType.cards && (
          <MemberCardsVisualization members={filteredMembers} />
        )}
      </Box>
      {offset !== -1 && !filter && !loading && (
        <Box sx={{ maxWidth: '200px', margin: '0 auto' }}>
          <BsButton text="Cargar Mas" onClick={loadMoreMembers} />
        </Box>
      )}
    </PageContainer>
  );
}

export default MembersPage;
