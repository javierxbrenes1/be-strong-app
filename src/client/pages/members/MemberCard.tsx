import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Member from '../../../common/models/Member';
import { createAvatarLink } from '../../utils/helpers';
import BsAvatar from '../../components/BsAvatar';

const Action = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  '&::fist-child': {
    paddingLeft: '4px',
  },
  border: 'none',
  gap: '3px',
  padding: '5px 0',
  borderRadius: '10px',
  fontWeight: 'bold',
  color: '#606470',
  width: '100%',
  '&:hover': {
    cursor: 'pointer',
    background: '#FF6E31',
    color: '#fff',
  },
});

const Actions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  '@container (max-width: 250px)': {
    flexDirection: 'column',
    gap: '10px',
  },
}));

function MemberCard(props: {
  member: Member;
  onViewClick: (code: string) => void;
}) {
  const { member, onViewClick } = props;

  return (
    <Card
      sx={{
        containerType: 'inline-size',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '16px 0',
      }}
      elevation={3}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <BsAvatar
          alt={member.name}
          src={member.avatar || createAvatarLink(member.name)}
          sx={member.isActive ? {} : { filter: 'grayscale(100%)' }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ margin: 0, padding: 0 }}>
            {member.name}
          </Typography>
          <Typography variant="subtitle1" color="#9ba6a5">
            {member.code}
          </Typography>
        </Box>
      </CardContent>
      <Actions>
        <Action
          onClick={() => {
            onViewClick(member.code);
          }}
        >
          <VisibilityIcon />
          <span>Ver</span>
        </Action>
      </Actions>
    </Card>
  );
}

export default MemberCard;
