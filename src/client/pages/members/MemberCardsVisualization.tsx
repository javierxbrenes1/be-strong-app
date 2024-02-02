import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box/Box';
import Member from '../../../common/models/Member';
import MemberCard from './MemberCard';
import { PATHS } from '../../../common/enums';

function MemberCardsVisualization(props: { members?: Member[] }) {
  const { members } = props;
  const navigate = useNavigate();

  const handleViewClick = (code: string) => {
    navigate(`${PATHS.MEMBERS}/${code}`);
  };

  return (
    <Box marginY="10px">
      <Grid container columnSpacing="16px" rowSpacing="16px">
        {members?.map((member) => (
          <Grid item sm={4} md={3} width="100%" key={member.code}>
            <MemberCard member={member} onViewClick={handleViewClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MemberCardsVisualization;
