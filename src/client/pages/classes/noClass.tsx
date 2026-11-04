/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import BsButton from '../../components/BsButton';

function NoClass(props: { onClick: () => void }) {
  const { onClick } = props;

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        rowGap: "1rem"
      }}>
      {/** @ts-ignore */}
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="./images/flex.json"
        style={{ maxWidth: '12rem', height: 'auto' }}
      />
      <Typography variant="h6" sx={{
        textAlign: "center"
      }}>
        Parece que no tienes ninguna clase para este día.
      </Typography>
      <Box>
        <BsButton text="Nueva Clase" onClick={onClick} />
      </Box>
    </Stack>
  );
}

export default NoClass;
