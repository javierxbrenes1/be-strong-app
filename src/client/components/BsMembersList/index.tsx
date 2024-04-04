import { useState } from 'react';
import { Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BsInput from '../BsInput';
import BsFilteredMembers from '../BsFilteredMembers';
import useMembers from '../../hooks/useMembers';
import MemberList from './List';

const Container = styled(Box)({
  width: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '100%',
});

function BsMembersList(props: {
  selectedMap: Record<string, boolean>;
  onClick: (memberCode: string) => void;
}) {
  const { selectedMap, onClick } = props;
  // TODO fix this component so we can load more members
  const { members } = useMembers(1000, 'active');
  const [filter, setFilter] = useState('');

  const handleFilter = (text: string) => {
    setFilter(text.length >= 3 ? text : '');
  };

  return (
    <Container>
      <BsInput
        placeholder="Buscar Miembro"
        onChange={handleFilter}
        Icon={SearchIcon}
        sx={{ height: '50px' }}
      />
      <BsFilteredMembers filter={filter} allMembers={members} showWithoutFilter>
        <MemberList selectedMap={selectedMap} onClick={onClick} />
      </BsFilteredMembers>
    </Container>
  );
}

export default BsMembersList;
