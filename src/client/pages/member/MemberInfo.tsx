import { useEffect, useState } from 'react';
import { Card, CardContent, Box, styled } from '@mui/material';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import Member from '../../../common/models/Member';
import MemberInfoInput, { OnInputChangeFn } from './MemberInfoInput';
import { calculateAge } from '../../../common/utils';
import CardTitle from '../../components/CardTitle';
import { formatDate } from '../../utils/helpers';
import UpdateMemberArgs from '../../../common/actionModels/UpdateMember';
import {
  daysOptions,
  getClassAttendanceForUI,
  memberStateOptions,
} from '../../utils/memberUtils';
import useCatalogsStore from '../../state/catalogState';
import MemberAttendance from '../../../common/models/MemberAttendance';

const InfoContainer = styled(Box)({
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
});

const getIsActiveLabel = (val: boolean): string => {
  if (val) return 'Activo';
  return 'Inactivo';
};

function MemberInfo(props: {
  member: Member;
  onUpdateMember: (member: UpdateMemberArgs) => void;
}) {
  const { member, onUpdateMember } = props;
  const [editMode, setEditMode] = useState(false);
  const [editableMember, setEditableMember] = useState<Member>(member);
  const [propsEdited, setPropsEdited] = useState<Record<string, boolean>>({});
  const gymClassUiLabels = useCatalogsStore((state) => state.gymClassUiLabels);

  const handleChange: OnInputChangeFn = (key, value) => {
    setEditableMember((st) => ({
      ...st,
      [key]: value,
    }));
    setPropsEdited((st) => ({ ...st, [key]: true }));
  };

  useEffect(() => {
    setEditableMember(member);
  }, [member]);

  const onSaveClick = () => {
    const details: Record<string, unknown> = { code: member.code };
    Object.keys(propsEdited).forEach((key) => {
      details[key] = editableMember[key as keyof Member];
    });
    onUpdateMember(details as UpdateMemberArgs);
    setEditMode(false);
    setPropsEdited({});
  };

  const actions = !editMode
    ? [
        {
          ActionIcon: ModeEditOutlineRoundedIcon,
          onActionIconClick: () => {
            setEditMode(true);
          },
          tooltip: 'Editar',
        },
      ]
    : [
        {
          ActionIcon: SaveIcon,
          onActionIconClick: onSaveClick,
          tooltip: 'Guardar',
        },
        {
          ActionIcon: HighlightOffIcon,
          onActionIconClick: () => {
            setEditMode(false);
            setEditableMember(member);
            setPropsEdited({});
          },
          tooltip: 'Cancelar',
        },
      ];

  return (
    <Card elevation={3}>
      <CardContent>
        <CardTitle title="Información General" actions={actions} />
        <InfoContainer>
          <MemberInfoInput
            label="Nombre"
            value={editableMember.name}
            name="name"
            editMode={editMode}
            inputType="text"
            onInputChange={handleChange}
          />
          <MemberInfoInput
            label="Correo Electrónico"
            value={editableMember.email}
            name="email"
            editMode={editMode}
            inputType="email"
            onInputChange={handleChange}
          />
          <MemberInfoInput
            label="Teléfono"
            value={editableMember.phone}
            name="phone"
            editMode={editMode}
            inputType="text"
            onInputChange={handleChange}
          />
          <MemberInfoInput
            label="Estado"
            name="isActive"
            value={
              editMode
                ? editableMember.isActive
                : getIsActiveLabel(editableMember.isActive)
            }
            editMode={editMode}
            inputType="select"
            onInputChange={(name, value) => {
              handleChange(name, value === 'true');
            }}
            selectOptions={memberStateOptions}
          />
          <MemberInfoInput
            label="Altura"
            value={
              editMode ? editableMember.height : `${editableMember.height} M.`
            }
            name="height"
            inputType="number"
            onInputChange={handleChange}
            editMode={editMode}
          />
          {editableMember.birthDate && (
            <>
              <MemberInfoInput
                label="Fecha de Nacimiento"
                value={
                  editMode
                    ? editableMember.birthDate
                    : formatDate(editableMember.birthDate)
                }
                name="birthDate"
                inputType="date"
                editMode={editMode}
                onInputChange={handleChange}
              />
              {!editMode && (
                <MemberInfoInput
                  label="Edad"
                  value={`${String(
                    calculateAge(new Date(editableMember.birthDate))
                  )} años`}
                  onInputChange={() => {}}
                  name="birthDate"
                  editMode={false}
                />
              )}
            </>
          )}
          <MemberInfoInput
            label="Horario de clases preferido"
            value={
              editMode
                ? `${editableMember.preferredClassTime}`
                : (
                    gymClassUiLabels.find(
                      (x) =>
                        x.value ===
                        String(editableMember.preferredClassTime ?? '')
                    ) || {}
                  ).label
            }
            name="preferredClassTime"
            inputType="select"
            editMode={editMode}
            onInputChange={handleChange}
            selectOptions={gymClassUiLabels}
          />
          <MemberInfoInput
            label="Asiste los dias"
            value={getClassAttendanceForUI(
              editableMember.memberAttendance,
              editMode
            )}
            name="memberAttendance"
            editMode={editMode}
            onInputChange={(key, value) => {
              const days = (value as string[]).reduce(
                (curr, val) => ({ ...curr, [val]: true }),
                {}
              );
              handleChange(key, days as MemberAttendance);
            }}
            inputType="multiselect"
            selectOptions={daysOptions}
            useChip
          />
          <MemberInfoInput
            label="Observaciones"
            value={editableMember.observations}
            name="observations"
            editMode={editMode}
            onInputChange={handleChange}
            inputType="textarea"
          />
        </InfoContainer>
      </CardContent>
    </Card>
  );
}

export default MemberInfo;
