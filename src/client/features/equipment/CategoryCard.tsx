import { MouseEvent, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Category, Equipment } from './api';

type Props = {
  category: Category;
  onAddEquipment: () => void;
  onEditCategory: () => void;
  onDeleteCategory: () => void;
  onEditEquipment: (equipment: Equipment) => void;
  onDeleteEquipment: (equipment: Equipment) => void;
};

type Option = { label: string; onClick: () => void };

function OptionsMenu({ label, options }: { label: string; options: Option[] }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const close = () => setAnchor(null);
  return (
    <>
      <IconButton aria-label={label} size="small" onClick={open}>
        <MoreVertRoundedIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close}>
        {options.map((o) => (
          <MenuItem
            key={o.label}
            onClick={() => {
              close();
              o.onClick();
            }}
          >
            {o.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function CategoryCard({
  category,
  onAddEquipment,
  onEditCategory,
  onDeleteCategory,
  onEditEquipment,
  onDeleteEquipment,
}: Props) {
  const total = category.equipment.reduce((sum, e) => sum + e.total, 0);
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography component="h3" variant="h3" noWrap>
              {category.name}
            </Typography>
            <Typography
              variant="metric"
              sx={{ fontVariantNumeric: 'tabular-nums' }}
            >
              Total: {total}
            </Typography>
          </Box>
          <OptionsMenu
            label={`Opciones de ${category.name}`}
            options={[
              { label: 'Agregar equipo', onClick: onAddEquipment },
              { label: 'Editar categoría', onClick: onEditCategory },
              { label: 'Eliminar', onClick: onDeleteCategory },
            ]}
          />
        </Stack>
        <Stack
          divider={<Box sx={{ borderTop: 1, borderColor: 'divider' }} />}
          sx={{ mt: 2 }}
        >
          {category.equipment.map((e) => (
            <Stack
              key={e.uuid}
              direction="row"
              spacing={1}
              sx={{ py: 0.5, alignItems: 'center' }}
            >
              <Typography sx={{ flex: 1, minWidth: 0 }} noWrap>
                {e.brand ? `${e.description} · ${e.brand}` : e.description}
              </Typography>
              <Typography sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {e.total}
              </Typography>
              <OptionsMenu
                label={`Opciones de ${e.description}`}
                options={[
                  { label: 'Editar', onClick: () => onEditEquipment(e) },
                  { label: 'Eliminar', onClick: () => onDeleteEquipment(e) },
                ]}
              />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
