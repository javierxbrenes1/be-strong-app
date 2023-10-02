import { Stack } from '@mui/material';
import MemberItem from './Item';
import Member from '../../../common/models/Member';

function MemberList(props: {
  members?: Member[];
  selectedMap: Record<string, boolean>;
  onClick: (memberCode: string) => void;
}) {
  const { members, selectedMap, onClick } = props;
  return (
    <Stack gap="10px" marginY="10px" justifyContent="start">
      {members?.map((m) => (
        <MemberItem
          member={m}
          key={m.code}
          className={selectedMap[m.code] ? 'selected' : ''}
          onClick={onClick}
        />
      ))}
    </Stack>
  );
}

export default MemberList;
