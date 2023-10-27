import LinkIcon from '@mui/icons-material/Link';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  styled,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { encode } from 'js-base64';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PATHS } from '../../../common/enums';

const QRWrapper = styled('div')({
  '& > svg': {
    display: 'block',
    height: 'auto',
    width: '100%',
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <QRWrapper>
            <QRCode value={link} />
          </QRWrapper>
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
