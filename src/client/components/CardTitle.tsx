import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { Divider, SxProps, Theme, Tooltip } from '@mui/material';
import IconType from '../../common/models/Icon';

const InfoTitle = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
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
  titleVariant?: 'h5' | 'h6';
  actions?: {
    ActionIcon: IconType;
    onActionIconClick: () => void;
    tooltip: string;
  }[];
  children?: ReactNode | ReactNode[];
  sx?: SxProps<Theme>;
}) {
  const { title, children, actions, sx, titleVariant = 'h5' } = props;

  return (
    <>
      <InfoTitle sx={sx}>
        <>
          {title && <Typography variant={titleVariant}>{title}</Typography>}
          {children}
          {actions && (
            <Box sx={{ display: 'flex' }}>
              {actions.map((ac, index) => (
                <Tooltip key={`${ac.tooltip}-${index}`} title={ac.tooltip}>
                  <StyledIcon
                    as={ac.ActionIcon}
                    onClick={ac.onActionIconClick}
                  />
                </Tooltip>
              ))}
            </Box>
          )}
        </>
      </InfoTitle>
      <Divider sx={{ margin: '8px 0' }} />
    </>
  );
}

export default CardTitle;
