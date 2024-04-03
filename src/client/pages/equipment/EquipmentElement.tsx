import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Equipment from '../../../common/models/Equipment';
import OptionsMenu from './OptionsMenu';

function EquipmentElement(props: {
  onDeleteEquipmentClick: (uuid: string) => void;
  onEditEquipmentClick: (eq: Equipment) => void;
  equipment: Equipment;
}) {
  const {
    onDeleteEquipmentClick,
    onEditEquipmentClick,
    equipment,
    equipment: { description, brand, total, uuid },
  } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOnCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Typography variant="h6">
          {description}
          {brand ? ` - ${brand}` : null}
        </Typography>
        <Stack direction="row" alignItems="center" gap=".5rem">
          <Typography variant="h6">{total}</Typography>
          <IconButton onClick={(ev) => setAnchorEl(ev.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Stack>
      {anchorEl && (
        <OptionsMenu
          onClose={handleOnCloseMenu}
          anchorEl={anchorEl}
          options={[
            {
              Icon: EditIcon,
              label: 'Editar',
              action: () => {
                handleOnCloseMenu();
                onEditEquipmentClick(equipment);
              },
            },
            {
              Icon: DeleteIcon,
              label: 'Eliminar',
              action: () => {
                handleOnCloseMenu();
                onDeleteEquipmentClick(uuid);
              },
            },
          ]}
        />
      )}
    </>
  );
}

export default EquipmentElement;
