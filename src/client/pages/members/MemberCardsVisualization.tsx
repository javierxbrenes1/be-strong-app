import Grid from '@mui/material/Grid';
import Member from '../../models/Member';
import MemberCard from './MemberCard';

function MemberCardsVisualization(props: { members: Member[] }) {
  const { members } = props;
  return (
    <Grid container columnSpacing="16px" rowSpacing="16px">
      {members.map((member) => (
        <Grid item md={3} width="100%" key={member.code}>
          <MemberCard member={member} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MemberCardsVisualization;
