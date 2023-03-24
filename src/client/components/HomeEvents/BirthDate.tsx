import { Box, styled, Typography } from '@mui/material';
import Member from '../../models/Member';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  gap: '5px',
  borderRadius: '20px',
  padding: '10px',
  background: '#fff',
  boxShadow: '0 1px 4px #e3e3e3',
});

function BirthDate(props: { member: Member }) {
  const { member } = props;
  return (
    <Container>
      <Typography>🎂</Typography>
      <Typography>{member.name}</Typography>
    </Container>
  );
}

export default BirthDate;
