import { useState, useEffect } from 'react';
import { Typography, styled, Stack, Box, Button } from '@mui/material';
import { AttendanceList } from '../../../../common/models/GymClass';
import BsMembersList from '../../../components/BsMembersList';
import BsButton from '../../../components/BsButton';

type Props = {
  activeTimeId?: number;
  attendanceList: AttendanceList[];
};

const Wrapper = styled(Box)({
  margin: '10px',
});

const ListContainer = styled(Stack)({
  height: '250px',
  overflowY: 'auto',
  padding: '5px',
  borderRadius: '5px',
});

function Attendance(props: Props) {
  const { activeTimeId, attendanceList } = props;
  const [editMode, setEditMode] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceList | null>(null);
  const [editModeCodes, setEditModeCodes] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const at = attendanceList.find((a) => a.gymClassTimeId === activeTimeId);
    if (at) {
      setAttendance(at);
      setEditModeCodes(
        at.members.reduce(
          (prev, member) => ({ ...prev, [member.code]: true }),
          {}
        )
      );
      return;
    }
    setAttendance(null);
  }, [activeTimeId, attendanceList]);

  const handleOnEditModeCancel = () => {
    setEditMode(false);
    setEditModeCodes(
      attendance?.members.reduce(
        (prev, member) => ({ ...prev, [member.code]: true }),
        {}
      ) ?? {}
    );
  };

  const handleMemberClick = (code: string) => {
    setEditModeCodes((s) => ({ ...s, [code]: true }));
  };

  return (
    <Box sx={{ margin: '1rem 0' }}>
      <Typography variant="h5">Asistentes a la clase</Typography>
      <Wrapper>
        {editMode && (
          <>
            <ListContainer>
              <BsMembersList
                selectedMap={editModeCodes}
                onClick={handleMemberClick}
              />
            </ListContainer>
            <Stack direction="row" justifyContent="end" gap="8px" mt="10px">
              <Button
                color="success"
                variant="contained"
                sx={{ color: '#fff' }}
              >
                Aceptar
              </Button>
              <Button
                color="primary"
                variant="contained"
                sx={{ color: '#fff' }}
                onClick={handleOnEditModeCancel}
              >
                Cancelar
              </Button>
            </Stack>
          </>
        )}
        {!editMode && (
          <Box sx={{ flex: 1 }}>
            {attendance === null && null}
            {attendance?.members.length && 'there are members'}
            {!attendance?.members.length && (
              <Typography variant="h6" align="center">
                No se encontrarón asistentes a la clase
              </Typography>
            )}

            {attendance === null && (
              <Box sx={{ width: 'min(100%, 250px)', margin: '0 auto' }}>
                <BsButton
                  text="Agregar Asistencia"
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Wrapper>
    </Box>
  );
}

export default Attendance;
