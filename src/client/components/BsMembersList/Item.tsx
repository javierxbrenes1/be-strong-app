import { styled, Stack, Typography } from '@mui/material';
import Member from '../../../common/models/Member';

const MemberItemWrapper = styled(Stack)(({ theme }) => ({
  padding: '10px',
  borderRadius: '10px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[100],
  },
  '&.selected': {
    backgroundColor: theme.palette.grey[200],
    borderLeft: `10px solid ${theme.palette.primary.main}`,
  },
}));

function MemberItem(props: {
  member: Member;
  className: string;
  onClick: (memberCode: string) => void;
}) {
  const { member, className, onClick } = props;

  return (
    <MemberItemWrapper
      direction="row"
      alignItems="center"
      gap="5px"
      role="button"
      onClick={() => {
        onClick(member.code);
      }}
      className={className}
    >
      <img
        src={member.avatar}
        alt={member.name}
        width={36}
        height={36}
        style={{ borderRadius: '100px' }}
      />
      <Typography
        typography="h6"
        sx={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {member.name}
      </Typography>
    </MemberItemWrapper>
  );
}

export default MemberItem;
