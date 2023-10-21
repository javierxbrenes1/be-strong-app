import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  label: string;
  children: ReactNode | ReactNode;
};

function BsWrapper(props: Props) {
  const { label, children } = props;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography color="primary" variant="subtitle1">
        {label}
      </Typography>
      {children}
    </Box>
  );
}

export default BsWrapper;
