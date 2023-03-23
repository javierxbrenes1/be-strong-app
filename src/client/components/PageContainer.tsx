import { ReactNode } from 'react';
import Box from '@mui/material/Box';

function PageContainer(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  return (
    <Box sx={{ width: '850px', maxWidth: '80%', margin: '0 auto' }}>
      {children}
    </Box>
  );
}

export default PageContainer;
