import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconType from '../models/Icon';

function PageTitle(props: { Icon?: IconType; text: string }) {
  const { Icon, text } = props;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {Icon && <Icon fontSize="large" sx={{ color: '#FF6E31' }} />}
        <Typography variant="h4" sx={{ color: '#393e46' }}>
          {text}
        </Typography>
      </Box>
      <Divider variant="middle" sx={{ margin: '16px 0' }} />
    </>
  );
}

export default PageTitle;
