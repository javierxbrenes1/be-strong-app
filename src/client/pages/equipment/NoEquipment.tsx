/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import BsButton from '../../components/BsButton';

function NoEquipment(props: { onClick: () => void }) {
  const { onClick } = props;

  return (
    <Stack justifyContent="center" alignItems="center" rowGap="1rem">
      {/** @ts-ignore */}
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="./images/weights.json"
        style={{ maxWidth: '12rem', height: 'auto' }}
      />
      <Typography variant="h6" textAlign="center">
        Parece que no tienes ninguna categoria ingresada.
      </Typography>
      <Box>
        <BsButton text="Nueva Categoria" onClick={onClick} />
      </Box>
    </Stack>
  );
}

export default NoEquipment;
