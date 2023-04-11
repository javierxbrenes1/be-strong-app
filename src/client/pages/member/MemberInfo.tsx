import { useState } from 'react';
import { Card, CardContent, Box, styled } from '@mui/material';
import dayjs from 'dayjs';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import Member from '../../models/Member';
import MemberInfoInput from './MemberInfoInput';
import { calculateAge } from '../../../common/utils';
import CardTitle from '../../components/CardTitle';

const InfoContainer = styled(Box)({
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
});

function MemberInfo(props: { member: Member }) {
  const [editMode, setEditMode] = useState(false);
  const { member } = props;

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <CardTitle
          title="Información General"
          ActionIcon={ModeEditOutlineRoundedIcon}
          onActionIconClick={handleEditClick}
        />
        <InfoContainer>
          <MemberInfoInput
            label="Nombre"
            value={member.name}
            editMode={editMode}
          />
          <MemberInfoInput
            label="Correo Electrónico"
            value={member.email}
            editMode={editMode}
          />
          <MemberInfoInput
            label="Teléfono"
            value={member.phone}
            editMode={editMode}
          />
          <MemberInfoInput
            label="Estado"
            value={member.isActive ? 'Activo' : 'Inactivo'}
            editMode={editMode}
          />
          <MemberInfoInput
            label="Altura"
            value={`${member.height} M.`}
            editMode={editMode}
          />
          {member.birthDate && (
            <>
              <MemberInfoInput
                label="Fecha de Nacimiento"
                value={dayjs(member.birthDate).format('DD/MM/YYYY')}
                editMode={editMode}
              />
              <MemberInfoInput
                label="Edad"
                value={`${String(
                  calculateAge(new Date(member.birthDate))
                )} años`}
                editMode={false}
              />
            </>
          )}
          <MemberInfoInput
            label="Observaciones"
            value={member.observations}
            editMode={editMode}
          />
        </InfoContainer>
      </CardContent>
    </Card>
  );
}

export default MemberInfo;
