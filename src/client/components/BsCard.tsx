import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material';
import React, { ReactNode } from 'react';

const Container = styled(Box)<{ overwrites?: Record<string, string> }>(
  ({ overwrites }) => ({
    borderRadius: '15px',
    background: '#FFF',
    boxShadow: `0px 5px 5px 0px ${alpha('#C0C3CF', 0.72)}`,
    margin: '12px 0',
    padding: '12px',
    ...(overwrites || {}),
  })
);

interface Props {
  children: ReactNode | ReactNode[];
  style?: Record<string, string>;
}

function BsCard(props: Props) {
  const { children, style } = props;
  return <Container overwrites={style}>{children}</Container>;
}

export default BsCard;
