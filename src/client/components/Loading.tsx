import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loading(props: { full?: boolean }) {
  const { full } = props;
  const height = full ? '100vh' : '100%';
  return (
    <Box
      sx={{
        height,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
