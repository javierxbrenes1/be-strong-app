import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Dialog from '@mui/material/Dialog';
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
  styled,
  CircularProgress,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useMutation } from '@apollo/client';
import BsButton from '../../components/BsButton';
import Genre from '../../models/enums';
import ADD_NEW_MEMBER from '../../mutations/addMember';
import { createAvatarLink, getApolloErrorMessages } from '../utils/helpers';
import Errors from '../../components/Errors';
import Member from '../../models/Member';

const FormContainer = styled('form')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  margin: '16px 0',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

const ObservationContainer = styled(FormControl)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    gridColumn: 'span 2',
  },
}));

function AddMember(props: { addNewMemberToList: (member: Member) => void }) {
  const { addNewMemberToList } = props;
  const [open, setOpen] = useState(false);
  const [readyToBeSaved, setReadyToBeSaved] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
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
      onCompleted(data) {
        addNewMemberToList(data.addMember);
        setOpen(false);
      },
      onError(error) {
        setErrors(getApolloErrorMessages(error));
      },
    }
  );

  useEffect(() => {
    const { name, height, birthDate, genre } = memberDetails;
    const canISaveIt = !!name && !!height && !!birthDate && !!genre;
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
        <BsButton Icon={PersonAddAlt1Icon} onClick={handleClick} />
      </Box>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>Nuevo Miembro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa los detalles necesarios para un nuevo miembro, mas
            informacion puede ser proporcionada por el miembro a travez del app
            mobile.
          </DialogContentText>
          <FormContainer>
            <FormControl fullWidth>
              <TextField
                onChange={handleInputsChange}
                name="name"
                label="Nombre"
                variant="standard"
                value={memberDetails.name ?? ''}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                type="number"
                name="height"
                label="Estatura (metros)"
                variant="standard"
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  onChange={handleBirthDateChange}
                  value={memberDetails.birthDate}
                  label="F. Nacimiento"
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </FormControl>
            <ObservationContainer fullWidth>
              <TextField
                multiline
                minRows={4}
                name="observations"
                label="Observaciones"
                value={memberDetails.observations ?? ''}
                onChange={handleInputsChange}
              />
            </ObservationContainer>
          </FormContainer>
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
