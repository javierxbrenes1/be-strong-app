import { useState, useEffect } from 'react';
import {
  Typography,
  Stack,
  Box,
  styled,
  IconButton,
  CircularProgress,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { AttendanceList } from '../../../../common/models/GymClass';
import BsMembersList from '../../../components/BsMembersList';
import DisplayAttendanceMembers from './displayAttendanceMembers';
import {
  ADD_MEMBER_ATTENDANCES_LOG,
  REMOVE_MEMBER_ATTENDANCES_LOG,
} from '../../../queries/classesPage';
import BsShowError from '../../../components/BsShowError';

const Total = styled('span')(({ theme }) => ({
  marginLeft: '5px',
  fontFamily: theme.typography.fontFamily,
  ...theme.typography.body1,
}));

type Props = {
  gymClassId: number;
  activeTimeId?: number;
  attendanceList: AttendanceList[];
};

const Wrapper = styled(Box)({
  margin: '10px',
});

const ListContainer = styled(Stack)({
  Height: '450px',
  overflowY: 'auto',
  padding: '5px',
  borderRadius: '5px',
});

function Attendance(props: Props) {
  const { activeTimeId, attendanceList, gymClassId } = props;
  const [addMode, setaddMode] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceList | null>(null);
  const [addModeCodes, setaddModeCodes] = useState<Record<string, boolean>>({});
  const [removeCodes, setRemoveCodes] = useState<string[]>([]);

  const cleanUp = () => {
    setaddMode(false);
    setRemoveMode(false);
    setRemoveCodes([]);
  };

  const handleOnModeCancel = () => {
    cleanUp();
    setaddModeCodes(
      attendance?.members.reduce(
        (prev, member) => ({ ...prev, [member.code]: true }),
        {}
      ) ?? {}
    );
  };
  const [addMembersAttendances, { loading: loadingAddMembersAttendances }] =
    useMutation(ADD_MEMBER_ATTENDANCES_LOG, {
      onError(error) {
        BsShowError(
          error,
          'Hubo un error guardando los datos, intenta nuevamente, o refresca el browser'
        );
      },
      onCompleted() {
        cleanUp();
      },
    });
  const [
    removeMembersAttendances,
    { loading: loadingRemoveMembersAttendances },
  ] = useMutation(REMOVE_MEMBER_ATTENDANCES_LOG, {
    onError(error) {
      BsShowError(
        error,
        'Hubo un error eliminando los datos, intenta nuevamente, o refresca el browser'
      );
    },
    onCompleted() {
      cleanUp();
    },
  });

  useEffect(() => {
    cleanUp();
    const at =
      attendanceList.find((a) => a.gymClassTimeId === activeTimeId) ?? null;
    setAttendance(at);
    setaddModeCodes(
      at?.members.reduce(
        (prev, member) => ({ ...prev, [member.code]: true }),
        {}
      ) ?? {}
    );
  }, [activeTimeId, attendanceList]);

  const handleMemberClick = (code: string) => {
    setaddModeCodes((s) => ({ ...s, [code]: true }));
  };

  const classHasAttendances = !!attendance?.members.length;
  const loading =
    loadingAddMembersAttendances || loadingRemoveMembersAttendances;

  const handleAddClick = () => {
    setaddMode(true);
  };

  const handleRemoveClick = () => {
    setRemoveMode(true);
  };

  const handleSaveClick = () => {
    const input = {
      gymClassId,
      gymClassTimeId: activeTimeId,
      memberCodes: [...(addMode ? Object.keys(addModeCodes) : removeCodes)],
    };

    if (addMode) {
      addMembersAttendances({
        variables: {
          input,
        },
      });
      return;
    }
    removeMembersAttendances({
      variables: {
        input,
      },
    });
  };

  return (
    <Box sx={{ margin: '1rem 0' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">
          Asistentes a la clase
          {attendance ? (
            <Total>(total: {attendance.members.length})</Total>
          ) : null}
        </Typography>
        {!addMode && !removeMode && (
          <Box>
            {classHasAttendances && (
              <IconButton>
                <RemoveIcon onClick={handleRemoveClick} />
              </IconButton>
            )}
            <IconButton>
              <AddIcon onClick={handleAddClick} />
            </IconButton>
          </Box>
        )}
        {(addMode || removeMode) && (
          <Box>
            {!loading ? (
              <>
                <IconButton>
                  <SaveIcon onClick={handleSaveClick} />
                </IconButton>
                <IconButton>
                  <CancelIcon onClick={handleOnModeCancel} />
                </IconButton>
              </>
            ) : (
              <CircularProgress />
            )}
          </Box>
        )}
      </Stack>
      <Wrapper>
        {addMode && (
          <ListContainer>
            <BsMembersList
              selectedMap={addModeCodes}
              onClick={handleMemberClick}
            />
          </ListContainer>
        )}
        {!addMode && (
          <Box sx={{ flex: 1 }}>
            {attendance === null && null}
            {classHasAttendances && (
              <DisplayAttendanceMembers
                members={attendance?.members}
                removeMode={removeMode}
                onMembersToDeleteChange={(newState: string[]) => {
                  setRemoveCodes(newState);
                }}
              />
            )}
            {!classHasAttendances && (
              <Typography variant="h6" align="center">
                No se encontrarón asistentes a la clase
              </Typography>
            )}
          </Box>
        )}
      </Wrapper>
    </Box>
  );
}

export default Attendance;
