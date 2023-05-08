import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import IconType from '../models/Icon';

const Img = styled('img')({
  objectFit: 'cover',
  borderRadius: '100%',
});

function PageTitle(props: {
  Icon?: IconType | string;
  text: string;
  RightAction?: JSX.Element | ReactNode;
}) {
  const { Icon, text, RightAction } = props;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {Icon && typeof Icon !== 'string' && (
            <Icon fontSize="large" sx={{ color: '#FF6E31' }} />
          )}
          {Icon && typeof Icon === 'string' && (
            <Img alt="Title Icon" src={Icon} />
          )}
          <Typography variant="h4" sx={{ color: '#393e46' }}>
            {text}
          </Typography>
        </Box>
        {RightAction}
      </Box>
      <Divider variant="middle" sx={{ margin: '16px 0' }} />
    </>
  );
}

export default PageTitle;
