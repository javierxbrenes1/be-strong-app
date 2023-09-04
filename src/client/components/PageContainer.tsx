import { ReactNode } from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconType from '../../common/models/Icon';
import PageTitle from './PageTitle';
import ErrorBoundary from './ErrorBoundary';

const visible = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled(Box)({
  padding: '24px',
  height: '100%',
  overflowX: 'auto',
  animation: `${visible} 1s ease-out 1`,
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
        <PageTitle Icon={Icon} text={text} RightAction={RightAction} />
        {children}
      </Container>
    </ErrorBoundary>
  );
}

export default PageContainer;
