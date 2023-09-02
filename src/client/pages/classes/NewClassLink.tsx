import EventIcon from '@mui/icons-material/Event';
import { IconButton, Tooltip, styled } from '@mui/material';

const Icon = styled(EventIcon)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}));

function NewClassLink() {
  return (
    <Tooltip title="Crea una nueva clase">
      <IconButton>
        <Icon />
      </IconButton>
    </Tooltip>
  );
}

export default NewClassLink;
