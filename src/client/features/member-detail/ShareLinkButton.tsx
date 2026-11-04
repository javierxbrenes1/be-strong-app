import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import { encode } from 'js-base64';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import { PATHS } from '../../../common/enums';

function ShareLinkButton({ code }: { code: string }) {
  const [open, setOpen] = useState(false);
  const link = `${window.location.origin}${PATHS.VISIT}?code=${encode(code)}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Enlace copiado');
    } catch {
      toast.error('No se pudo copiar el enlace');
    }
  };
  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<LinkRoundedIcon />}
        onClick={() => setOpen(true)}
      >
        Compartir
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Compartir perfil</DialogTitle>
        <DialogContent>
          {/* Fondo blanco fijo: el QR necesita contraste también en modo oscuro. */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 2,
              bgcolor: 'common.white',
              borderRadius: 2,
            }}
          >
            <QRCode value={link} size={220} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={copy} startIcon={<LinkRoundedIcon />}>
            Copiar enlace
          </Button>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ShareLinkButton;
