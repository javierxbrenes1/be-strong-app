import { styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GymClass from '../../../common/models/GymClass';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  backgroundImage: 'linear-gradient(to right, #c4c1e0, #f5f4fa)',
  borderRadius: '20px',
  width: '350px',
  maxWidth: '100%',
  textTransform: 'capitalize',
});

function ClassEvent(props: { gymClass: GymClass }) {
  const { gymClass } = props;
  return (
    <Container>
      <Typography variant="h5">{gymClass.classType}</Typography>
      <ChevronRightIcon
        fontSize="large"
        sx={{ '&:hover': { cursor: 'pointer' } }}
      />
    </Container>
  );
}

export default ClassEvent;
