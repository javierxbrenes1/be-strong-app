import { Button } from '@mui/material';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import { encode } from 'js-base64';
import { toast } from 'react-toastify';
import { PATHS } from '../../../common/enums';

function ShareLinkButton({ code }: { code: string }) {
  const copy = async () => {
    const link = `${window.location.origin}${PATHS.VISIT}?code=${encode(code)}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Enlace copiado');
    } catch {
      toast.error('No se pudo copiar el enlace');
    }
  };
  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<LinkRoundedIcon />}
      onClick={copy}
    >
      Compartir
    </Button>
  );
}

export default ShareLinkButton;
