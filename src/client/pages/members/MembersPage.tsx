import { useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import PageContainer from '../../components/PageContainer';
import AddMember from './AddMember';
import BsButton from '../../components/BsButton';
import BsInput from '../../components/BsInput';
import MemberCardsVisualization from './MemberCardsVisualization';
import useMembers from '../../hooks/useMembers';
import BsFilteredMembers from '../../components/BsFilteredMembers';

const SearchBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '50%',
  },
}));

function MembersPage() {
  const { loading, members, loadMoreMembers, canLoadMore } = useMembers(50);
  const [filter, setFilter] = useState('');

  const handleFilter = (text: string) => {
    setFilter(text.length >= 3 ? text : '');
  };

  const hideAll = !!filter;
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
      <BsFilteredMembers filter={filter} allMembers={members}>
        <MemberCardsVisualization />
      </BsFilteredMembers>
      {!hideAll && (
        <>
          <MemberCardsVisualization members={members} />
          {canLoadMore && !loading && (
            <Box sx={{ maxWidth: '200px', margin: '0 auto' }}>
              <BsButton text="Cargar Mas" onClick={loadMoreMembers} />
            </Box>
          )}
        </>
      )}
    </PageContainer>
  );
}

export default MembersPage;
