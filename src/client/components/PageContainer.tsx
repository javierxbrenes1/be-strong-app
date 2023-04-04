import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';

const Container = styled(Grid)({
  padding: '32px',
});

function PageContainer(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(20px)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      transition={{ duration: 1 }}
    >
      <Container container flexDirection="column">
        {children}
      </Container>
    </motion.div>
  );
}

export default PageContainer;
