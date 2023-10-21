import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, CardContent, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from 'react';
import PageContainer from '../../components/PageContainer';
import useWhoAmI from '../../hooks/useWhoAmI';
import BsWrapper from '../../components/BsWrapper';
import BsButton from '../../components/BsButton';
import UpdatePwd from './UpdatePwd';

function Element(props: { label: string; value?: string }) {
  const { label, value } = props;
  return (
    <BsWrapper label={label}>
      <Typography color="#757a79" variant="subtitle2">
        {value || 'No Definido'}
      </Typography>
    </BsWrapper>
  );
}

function Profile() {
  const whoAmI = useWhoAmI();
  const [openPwd, setOpenPwd] = useState<boolean>(false);
  const lastPasswordChangeDate = whoAmI?.lastPasswordChangeDate
    ? dayjs(whoAmI?.lastPasswordChangeDate).format('DD MMMM YYYY')
    : 'Actualiza tu contraseña';

  return (
    <>
      <PageContainer Icon={AccountCircleIcon} text="Mi Perfil">
        <CardContent>
          <Stack direction="column" flexWrap="wrap" gap="25px">
            <Element label="Nombre" value={whoAmI?.name} />
            <Element label="usuario" value={whoAmI?.username} />
            <Element label="Correo electrónico" value={whoAmI?.email} />
            <Element label="Role" value={whoAmI?.role} />
            <Element
              label="Última fecha contraseña actualizada"
              value={lastPasswordChangeDate}
            />
            <Box sx={{ maxWidth: '200px' }}>
              <BsButton
                text="Actualizar contraseña"
                Icon={PasswordIcon}
                onClick={() => setOpenPwd(true)}
                iconPosition="right"
              />
            </Box>
          </Stack>
        </CardContent>
      </PageContainer>
      {openPwd && <UpdatePwd onClose={() => setOpenPwd(false)} />}
    </>
  );
}

export default Profile;
