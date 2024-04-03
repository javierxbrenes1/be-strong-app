import React from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EquipmentInput } from '../../../common/models/Equipment';

const Container = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: '.5rem',
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

type Props = {
  onChange: (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  values: EquipmentInput;
};
function EquipmentForm(props: Props) {
  const { onChange, values } = props;
  const { description, brand, total } = values;

  return (
    <Container>
      <FormControl fullWidth>
        <TextField
          label="Descripción"
          name="description"
          value={description}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          label="Total"
          name="total"
          type="number"
          value={total}
          onChange={onChange}
          margin="normal"
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          label="Marca"
          name="brand"
          value={brand}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
      </FormControl>
    </Container>
  );
}

export default EquipmentForm;
