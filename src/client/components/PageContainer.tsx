import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import IconType from '../../common/models/Icon';
import PageTitle from './PageTitle';
import ErrorBoundary from './ErrorBoundary';

const Container = styled(Box)({
  padding: '24px',
  height: '100%',
  overflowX: 'auto',
});

function PageContainer(props: {
  Icon?: IconType | string;
  text: string;
  RightAction?: JSX.Element | ReactNode;
  children: ReactNode | ReactNode[];
}) {
  const { children, Icon, text, RightAction } = props;
  return (
    <ErrorBoundary>
      <Container flexDirection="column">
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
          transition={{ duration: 1 }}
        >
          <PageTitle Icon={Icon} text={text} RightAction={RightAction} />
          {children}
        </motion.div>
      </Container>
    </ErrorBoundary>
  );
}

export default PageContainer;
