import { styled } from '@mui/material/styles';

const FormContainer = styled('form')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  margin: '16px 0',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

export default FormContainer;
