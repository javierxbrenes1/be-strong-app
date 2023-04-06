import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ScaleIcon from '@mui/icons-material/Scale';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Member from '../../models/Member';
import { createAvatarLink } from '../utils/helpers';

const Img = styled('img')({
  objectFit: 'cover',
  width: '40%',
  height: '40%',
  borderRadius: '100%',
});

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
  '&:hover': {
    cursor: 'pointer',
    background: '#FF6E31',
    color: '#fff',
  },
});

function MemberCard(props: {
  member: Member;
  onAddMeasuresClick: (member: Member) => void;
}) {
  const { member, onAddMeasuresClick } = props;

  return (
    <Card sx={{ padding: '16px 0', height: '100%' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <Img
          alt={member.name}
          src={member.avatar || createAvatarLink(member.name)}
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
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Action
          onClick={() => {
            onAddMeasuresClick(member);
          }}
        >
          <ScaleIcon />
          <span>Medidas</span>
        </Action>
        <Action>
          <VisibilityIcon />
          <span>Ver</span>
        </Action>
      </CardActions>
    </Card>
  );
}

export default MemberCard;
