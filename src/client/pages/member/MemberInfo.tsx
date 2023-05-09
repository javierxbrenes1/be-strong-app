import { useState } from 'react';
import { Card, CardContent, Box, styled } from '@mui/material';
import dayjs from 'dayjs';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import Member from '../../models/Member';
import MemberInfoInput from './MemberInfoInput';
import { calculateAge } from '../../../common/utils';
import CardTitle from '../../components/CardTitle';
import { formatDate } from '../utils/helpers';

const InfoContainer = styled(Box)({
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
});

const getIsActiveLabel = (val: boolean): string => {
  if (val) return 'Activo';
  return 'Inactivo';
};

function MemberInfo(props: { member: Member }) {
  const { member } = props;
  const [editMode, setEditMode] = useState(false);
  const [editableMember, setEditableMember] = useState<Member>(member);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (key: keyof Member, value: string | Date) => {
    setEditableMember((st) => ({
      ...st,
      [key]: value,
    }));
  };

  const actions = !editMode
    ? [
        {
          ActionIcon: ModeEditOutlineRoundedIcon,
          onActionIconClick: handleEditClick,
        },
      ]
    : undefined;

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
            onInputChange={handleChange}
            selectOptions={[
              {
                value: 'true',
                label: 'Activo',
              },
              {
                value: 'true',
                label: 'Inactivo',
              },
            ]}
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
                  editMode={false}
                />
              )}
            </>
          )}
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
