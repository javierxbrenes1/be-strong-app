import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { IconButton, Paper, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { EquipmentCategoryInput } from '../../../common/models/EquipmentCategory';
import { EquipmentInput } from '../../../common/models/Equipment';
import EquipmentForm from './EquipmentForm';
import BsExpandButton from '../../components/BsExpandButton';

const newEquipmentInput: EquipmentInput = {
  description: '',
  brand: '',
};

type Props = {
  onEquipmentCategoryUpdate: (category: EquipmentCategoryInput) => void;
};
function EquipmentCategoryForm(props: Props) {
  const { onEquipmentCategoryUpdate } = props;
  const [category, setCategory] = useState<EquipmentCategoryInput>({
    name: '',
    equipment: [],
  });

  useEffect(() => {
    onEquipmentCategoryUpdate(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onAddClick = () => {
    setCategory((old) => ({
      ...old,
      equipment: [...(old.equipment ?? []), { ...newEquipmentInput }],
    }));
  };

  const onEquipmentChange =
    (index: number) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCategory((old) => {
        const newEquipment = [...(old.equipment ?? [])];
        newEquipment[index] = {
          ...newEquipment[index],
          [ev.target.name]:
            ev.target.type === 'number' ? +ev.target.value : ev.target.value,
        };
        return { ...old, equipment: newEquipment };
      });
    };

  const onRemoveEquipment = (index: number) => {
    setCategory((old) => {
      const newEquipment = [...(old.equipment ?? [])];
      newEquipment.splice(index, 1);
      return { ...old, equipment: newEquipment };
    });
  };

  return (
    <Box>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Categoria Nombre"
          name="name"
          value={category.name}
          onChange={(ev) => {
            setCategory({ ...category, name: ev.target.value });
          }}
          fullWidth
          margin="normal"
        />
      </FormControl>
      <Box>
        <Typography
          variant="h6"
          component="span"
          sx={{ paddingRight: '.2rem' }}
        >
          Equipo
        </Typography>
        <Typography variant="subtitle2" component="span">
          (Ingresa los detalles de cada equipo en esta categoria)
        </Typography>
        {category.equipment?.map((equipment, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              padding: '1rem',
              margin: '10px 0',
              background: '#fcfefe',
              position: 'relative',
            }}
            square={false}
          >
            <IconButton
              sx={{
                position: 'absolute',
                right: '0px',
                top: '-2px',
                zIndex: '10',
              }}
              onClick={() => {
                onRemoveEquipment(index);
              }}
            >
              <RemoveCircleOutlineIcon color="warning" />
            </IconButton>
            <EquipmentForm
              values={equipment}
              onChange={onEquipmentChange(index)}
            />
          </Paper>
        ))}
      </Box>
      <BsExpandButton onButtonClick={onAddClick} />
    </Box>
  );
}

export default EquipmentCategoryForm;
