import {
  DialogContent,
  Dialog,
  Stack,
  DialogTitle,
  IconButton,
  DialogProps,
  Icon,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function BsImageShower(props: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const { src, alt, onClose } = props;

  const handleClose: DialogProps['onClose'] = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    onClose();
  };

  return (
    <Dialog open onClose={handleClose} disableEscapeKeyDown>
      <DialogTitle>
        <Stack direction="row" justifyContent="end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignSelf="center"
        >
          <TransformWrapper initialScale={1}>
            {(details) => (
              <>
                <Stack direction="row" justifyContent="flex-start" gap=".5rem">
                  <IconButton onClick={() => details.zoomIn()}>
                    <ZoomInIcon />
                  </IconButton>
                  <IconButton onClick={() => details.zoomOut()}>
                    <ZoomOutIcon />
                  </IconButton>
                  <IconButton role="link" href={src} target="_blank">
                    <OpenInNewIcon />
                  </IconButton>
                </Stack>
                <TransformComponent
                  wrapperStyle={{ width: '100%', height: '100%' }}
                >
                  <img
                    src={src}
                    alt={alt}
                    width="100%"
                    height="100%"
                    // style={{ objectFit: 'contain' }}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default BsImageShower;
