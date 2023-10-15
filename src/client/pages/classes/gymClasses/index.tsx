import { Box, Stack } from '@mui/material';
import GymClass from '../../../../common/models/GymClass';
import BsButton from '../../../components/BsButton';
import Class from './class';

function GymClasses(props: { classes: GymClass[]; onAddClass: () => void }) {
  const { classes, onAddClass } = props;
  return (
    <>
      <Stack justifyContent="end" direction="row">
        <Box sx={{ maxWidth: '180px' }}>
          <BsButton text="Nueva Clase" onClick={onAddClass} />
        </Box>
      </Stack>
      {classes.map((c) => (
        <Class gymClass={c} key={c.id} />
      ))}
    </>
  );
}

export default GymClasses;
