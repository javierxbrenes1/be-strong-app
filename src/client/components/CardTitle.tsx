import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { Tooltip } from '@mui/material';
import IconType from '../models/Icon';

const InfoTitle = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

const StyledIcon = styled(Box)(({ theme }) => ({
  color: '#757a79',
  borderRadius: '20px',
  padding: '5px',
  fontSize: '30px',
  '&:hover': {
    cursor: 'pointer',
    background: '#f6eedf',
    color: theme.palette.primary.main,
  },
}));

function CardTitle(props: {
  title?: string;
  actions?: {
    ActionIcon: IconType;
    onActionIconClick: () => void;
    tooltip: string;
  }[];
  children?: ReactNode | ReactNode[];
}) {
  const { title, children, actions } = props;

  return (
    <InfoTitle>
      <>
        {title && <Typography variant="h6">{title}</Typography>}
        {children}
        {actions && (
          <Box sx={{ display: 'flex' }}>
            {actions.map((ac, index) => (
              <Tooltip key={index} title={ac.tooltip}>
                <StyledIcon as={ac.ActionIcon} onClick={ac.onActionIconClick} />
              </Tooltip>
            ))}
          </Box>
        )}
      </>
    </InfoTitle>
  );
}

export default CardTitle;
