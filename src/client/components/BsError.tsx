import { Stack, Button, Typography, styled, Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

const ErrorImage = styled(Box)({
  backgroundImage: 'url(/ops.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '350px',
});

function BsError(props: { text: string }) {
  const { text } = props;
  return (
    <Stack alignItems="center" sx={{ margin: '0 auto' }}>
      <Box sx={{ height: '260px' }}>
        <ReactSVG src="/ops.svg" />
      </Box>
      <Typography variant="h5">{text}</Typography>
      <Typography variant="h5">
        Intenta nuevamente o refresca la pagina dando click{' '}
        <Button
          variant="text"
          onClick={() => window.location.reload()}
          sx={{ minWidth: 'fit-content' }}
        >
          Aqui
        </Button>
        .
      </Typography>
    </Stack>
  );
}

export default BsError;
