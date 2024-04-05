import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApolloError } from '@apollo/client';
import OptionsMenu from './OptionsMenu';
import EquipmentCategory from '../../../common/models/EquipmentCategory';
import EquipmentElement from './EquipmentElement';
import Equipment from '../../../common/models/Equipment';
import useUpdateCategoryName from './useUpdateCategoryName';
import BsShowError from '../../components/BsShowError';

const NameContainer = styled(Box)({
  '&[contenteditable=true]': {
    outline: '0px solid transparent',
  },
});

function EquipmentCategoryCard(props: {
  category: EquipmentCategory;
  onAddEquipmentClick: (categoryUuid: string) => void;
  onDeleteCategoryClick: (categoryUuid: string) => void;
  onDeleteEquipmentClick: (equipmentUuid: string) => void;
  onEditEquipmentClick: (categoryUuid: string, eq: Equipment) => void;
}) {
  const {
    category,
    onAddEquipmentClick,
    onDeleteCategoryClick,
    onDeleteEquipmentClick,
    onEditEquipmentClick,
  } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editName, setEditName] = useState<boolean>(false);
  const nameRef = useRef(null);
  const { updateCategoryName, updatingCategoryName } = useUpdateCategoryName(
    () => ({}),
    (error: ApolloError) => {
      BsShowError(error, 'Error al eliminar la categoria, intente nuevamente');
    }
  );

  const handleOnEditEquipmentClick = (eq: Equipment) => {
    onEditEquipmentClick(category.uuid, eq);
  };

  const handleOnCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (editName && nameRef?.current) {
      const current = nameRef.current as {
        focus: () => void;
        childNodes: {
          length: number;
        };
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(nameRef.current, current.childNodes.length);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editName]);

  const handleNameChange = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    const value = e.currentTarget.textContent;
    if (value && value !== category.name) {
      updateCategoryName({ variables: { uuid: category.uuid, name: value } });
    }
    setEditName(false);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{ padding: '1rem', width: 'auto', height: 'fit-content' }}
      >
        <Stack direction="row" justifyContent="space-between">
          {updatingCategoryName ? (
            <CircularProgress size="1rem" />
          ) : (
            <NameContainer
              contentEditable={editName}
              ref={nameRef}
              onBlur={editName ? handleNameChange : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  (nameRef.current as unknown as { blur: () => void })?.blur();
                }
              }}
            >
              <Typography variant="h5" color="primary">
                {category.name}
              </Typography>
            </NameContainer>
          )}
          <Stack direction="row" alignItems="center" gap=".5rem">
            <Typography variant="h5">
              Total:{' '}
              {category.equipment?.reduce(
                (prev, eq) => prev + (eq?.total || 0),
                0
              )}
            </Typography>
            <IconButton onClick={(ev) => setAnchorEl(ev.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Divider variant="fullWidth" />
        <List>
          {category.equipment?.length ? (
            category.equipment?.map((eq) => (
              <ListItem
                key={eq.uuid}
                sx={{
                  '&:hover': { background: '#f5f5f5', borderRadius: '1rem' },
                }}
              >
                <EquipmentElement
                  onDeleteEquipmentClick={onDeleteEquipmentClick}
                  onEditEquipmentClick={handleOnEditEquipmentClick}
                  equipment={eq}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">
              No has ingresado ningún equipo, da click en el menú de la
              categoria.
            </Typography>
          )}
        </List>
      </Paper>
      {anchorEl && (
        <OptionsMenu
          onClose={handleOnCloseMenu}
          anchorEl={anchorEl}
          options={[
            {
              Icon: AddIcon,
              label: 'Agregar equipo',
              action: () => {
                handleOnCloseMenu();
                onAddEquipmentClick(category.uuid);
              },
            },
            {
              Icon: EditIcon,
              label: 'Editar Nombre',
              action: () => {
                handleOnCloseMenu();
                setEditName(true);
              },
            },
            {
              Icon: DeleteIcon,
              label: 'Eliminar',
              action: () => {
                handleOnCloseMenu();
                onDeleteCategoryClick(category.uuid);
              },
            },
          ]}
        />
      )}
    </>
  );
}

export default EquipmentCategoryCard;
