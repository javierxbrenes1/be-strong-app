import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import IconType from '../models/Icon';

const InfoTitle = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

const StyledIcon = styled(Box)({
  color: '#757a79',
  borderRadius: '20px',
  padding: '5px',
  fontSize: '30px',
  '&:hover': {
    cursor: 'pointer',
    background: '#f6eedf',
  },
});

function CardTitle(props: {
  title?: string;
  ActionIcon?: IconType;
  onActionIconClick?: () => void;
  children?: ReactNode | ReactNode[];
}) {
  const { title, ActionIcon, onActionIconClick, children } = props;

  return (
    <InfoTitle>
      <>
        {title && <Typography variant="h6">{title}</Typography>}
        {children}
        <StyledIcon as={ActionIcon} onClick={onActionIconClick} />
      </>
    </InfoTitle>
  );
}

export default CardTitle;
