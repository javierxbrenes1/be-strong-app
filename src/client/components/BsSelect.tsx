import Select from '@mui/material/Select';
import styled from '@mui/material/styles/styled';

const BsSelect = styled(Select)(({ theme }) => ({
  '&:hover': {
    '&& fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default BsSelect;
