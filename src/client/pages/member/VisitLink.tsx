import LinkIcon from '@mui/icons-material/Link';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  styled,
  Button,
  Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { encode } from 'js-base64';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PATHS } from '../../constants';

const CopyToCb = styled(Button)({
  padding: '10px',
  background: '#393e46',
  borderRadius: '10px',
  color: '#fff',
  '&:hover': {
    cursor: 'pointer',
  },
});

function VisitLink(props: { name?: string; code: string }) {
  const [link, setLink] = useState('');
  const [forClipboard, setForClipboard] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { name, code } = props;

  const handleOpenModal = () => {
    setLink(`${window.location.origin}${PATHS.VISIT}?code=${encode(code)}`);
    setOpen(true);
  };

  return (
    <>
      <Tooltip
        title={`Obtiene el link para compartirlo con ${name || 'el miembro'}.`}
      >
        <LinkIcon
          sx={{ '&:hover': { cursor: 'pointer' } }}
          color="primary"
          onClick={handleOpenModal}
        />
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Acceso para {name}</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <QRCode value={link} />
          <CopyToClipboard text={forClipboard}>
            <Button
              variant="contained"
              onClick={() => setForClipboard(link)}
              sx={{ color: '#fff' }}
            >
              Click para Copiar
            </Button>
          </CopyToClipboard>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VisitLink;
