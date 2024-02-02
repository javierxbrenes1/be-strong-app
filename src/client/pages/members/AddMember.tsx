/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  CircularProgress,
  Stack,
  IconButton,
} from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useMutation } from '@apollo/client';
import BsButton from '../../components/BsButton';
import { Genre } from '../../../common/enums';
import ADD_NEW_MEMBER from '../../mutations/addMember';
import { createAvatarLink, getApolloErrorMessages } from '../../utils/helpers';
import Errors from '../../components/Errors';
import Member from '../../../common/models/Member';
import BsLocalizationProvider from '../../components/BsLocalizationProvider';
import modifyGetAllMembersQuery from '../../cacheHelpers/getAllMembersModifier';

function AddMember(props: { addNewMemberToList?: (member: Member) => void }) {
  const { addNewMemberToList } = props;
  const [open, setOpen] = useState(false);
  const [readyToBeSaved, setReadyToBeSaved] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showInputs, setShowInputs] = useState(false);
  const [memberDetails, setMemberDetails] = useState<{
    name?: string;
    height?: number;
    observations?: string;
    birthDate?: Date;
    genre?: Genre;
  }>({});

  const [addMember, { loading }] = useMutation<{ addMember: Member }>(
    ADD_NEW_MEMBER,
    {
      refetchQueries: ['homeQueries'],
      update(cache, { data }) {
        cache.modify({
          fields: {
            getAllMembers: modifyGetAllMembersQuery(
              data?.addMember ? [data?.addMember] : []
            ),
          },
        });
      },
      onCompleted(data) {
        if (addNewMemberToList) {
          addNewMemberToList(data.addMember);
        }
        setOpen(false);
        setReadyToBeSaved(false);
        setMemberDetails({});
        setErrors([]);
        toast.success('Nuevo miembro agregado satisfactoriamente.', {
          position: 'top-right',
        });
      },
      onError(error) {
        setErrors(getApolloErrorMessages(error));
      },
    }
  );

  useEffect(() => {
    const { name } = memberDetails;
    const canISaveIt = !!name;
    setReadyToBeSaved(canISaveIt);
  }, [memberDetails]);

  const handleInputsChange = (
    ev:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { target } = ev;
    const { name, value } = target;
    setErrors([]);
    setMemberDetails((prevState) => ({
      ...prevState,
      [name]: name === 'height' ? Number(value) : value,
    }));
  };

  const handleBirthDateChange = (newDate: unknown) => {
    const parseNewDate = newDate as { $d: Date };
    const isValid = !Number.isNaN(parseNewDate.$d.getTime());
    setErrors([]);
    if (isValid) {
      setMemberDetails((prev) => ({
        ...prev,
        birthDate: parseNewDate.$d,
      }));
    }
  };
  const handleClose = (
    _ev: unknown,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleSaveClick = () => {
    const avatar: string | undefined = memberDetails.name
      ? createAvatarLink(memberDetails.name)
      : undefined;
    addMember({
      variables: {
        member: {
          ...memberDetails,
          birthDate: memberDetails.birthDate?.getTime(),
          ...(avatar ? { avatar } : {}),
        },
      },
    });
  };

  return (
    <>
      <Box>
        <IconButton onClick={handleClick}>
          <PersonAddAlt1Icon color="primary" />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>Nuevo Miembro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los detalles necesarios para un nuevo miembro, mas
            informacion puede ser proporcionada a travez del app mobile
            individualmente.
          </DialogContentText>
          <FormControl fullWidth sx={{ marginTop: '.5rem' }}>
            <TextField
              onChange={handleInputsChange}
              name="name"
              label="Nombre"
              variant="outlined"
              value={memberDetails.name ?? ''}
            />
          </FormControl>
          <Stack justifyContent="center" alignItems="center" paddingY=".5rem">
            <IconButton onClick={() => setShowInputs((s) => !s)}>
              {showInputs ? (
                <RemoveCircleOutlineIcon />
              ) : (
                <AddCircleOutlineIcon />
              )}
            </IconButton>
          </Stack>
          <Stack gap=".5rem" sx={{ display: showInputs ? 'flex' : 'none' }}>
            <FormControl fullWidth>
              <TextField
                type="number"
                name="height"
                label="Estatura (metros)"
                variant="outlined"
                onChange={handleInputsChange}
                value={memberDetails.height ?? ''}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="genre">Género</InputLabel>
              <Select
                labelId="genre"
                name="genre"
                label="Genero"
                value={memberDetails.genre ?? ''}
                onChange={handleInputsChange}
              >
                <MenuItem value={Genre.male}>Masculino</MenuItem>
                <MenuItem value={Genre.female}>Femenino</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <BsLocalizationProvider>
                <DateField
                  onChange={handleBirthDateChange}
                  value={memberDetails.birthDate}
                  label="F. Nacimiento"
                  format="DD/MM/YYYY"
                  disableFuture
                />
              </BsLocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                multiline
                minRows={4}
                name="observations"
                label="Observaciones"
                value={memberDetails.observations ?? ''}
                onChange={handleInputsChange}
              />
            </FormControl>
          </Stack>

          <Errors errors={errors} addTitle />
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            variant="contained"
            onClick={handleSaveClick}
            sx={{ color: '#fff' }}
            disabled={!readyToBeSaved || loading}
          >
            {loading ? (
              <CircularProgress color="primary" size="25px" />
            ) : (
              'Agregar'
            )}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
            sx={{ color: '#fff' }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddMember;
