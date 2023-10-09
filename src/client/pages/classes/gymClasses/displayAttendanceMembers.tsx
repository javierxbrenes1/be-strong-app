import { Paper, Stack, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState, memo } from 'react';
import Member from '../../../../common/models/Member';
import BsAvatar from '../../../components/BsAvatar';

function DisplayAttendanceMembers(props: {
  members: Member[];
  removeMode?: boolean;
  onMembersToDeleteChange: (newState: string[]) => void;
}) {
  const { members, removeMode, onMembersToDeleteChange } = props;
  const [membersToDelete, setMembersToDelete] = useState<string[]>([]);

  const handleClick = (code: string) => {
    setMembersToDelete((state) => {
      if (!state.includes(code)) {
        return [...state, code];
      }
      return state.filter((r) => r !== code);
    });
  };

  useEffect(() => {
    onMembersToDeleteChange(membersToDelete);
  }, [membersToDelete]);

  return (
    <Stack direction="row" gap=".5rem" flexWrap="wrap">
      {members.map((member) => (
        <Paper
          elevation={3}
          key={member.code}
          onClick={removeMode ? () => handleClick(member.code) : undefined}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap="10px"
            padding="10px"
            sx={{ position: 'relative' }}
          >
            {member.avatar ? (
              <BsAvatar
                src={member.avatar}
                sx={{ width: '32px', height: '32px' }}
              />
            ) : null}
            <Typography>{member.name}</Typography>
            {removeMode && (
              <RemoveCircleOutlineIcon
                color={
                  membersToDelete.includes(member.code) ? 'primary' : undefined
                }
              />
            )}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

export default memo(DisplayAttendanceMembers);
