import { Box, Typography, Skeleton } from '@mui/material';
import BsCard from '../../components/BsCard';

function ClassesPreview() {
  return (
    <Box sx={{ padding: '24px 0' }}>
      <Typography variant="h6">Clases</Typography>
      <BsCard>
        <Skeleton variant="rounded" width="100%" height="100px" />
      </BsCard>
    </Box>
  );
}

export default ClassesPreview;
