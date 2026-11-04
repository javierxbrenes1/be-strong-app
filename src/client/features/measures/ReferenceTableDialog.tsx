import { useState } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from '@mui/material';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import { MetricKey } from './metrics';

export const REFERENCE_IMAGES: Partial<Record<MetricKey, string>> = {
  bodyMassIndex: '/images/body-mass-index.jpeg',
  corporalFat: '/images/corporal-fat.jpeg',
  muscle: '/images/muscle.jpeg',
  // Igual que la versión anterior: agua y calorías reutilizan estas imágenes.
  corporalWaterPct: '/images/corporal-fat.jpeg',
  calories: '/images/muscle.jpeg',
};

type Props = {
  open: boolean;
  onClose: () => void;
  metric: MetricKey;
  title: string;
};

function ReferenceTableDialog({ open, onClose, metric, title }: Props) {
  const [zoom, setZoom] = useState(1);
  const src = REFERENCE_IMAGES[metric];
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Tabla de referencia: {title}</DialogTitle>
      <DialogContent>
        <Box sx={{ overflow: 'auto' }}>
          {src && (
            <Box
              component="img"
              src={src}
              alt={`Tabla de referencia de ${title}`}
              sx={{ width: `${zoom * 100}%`, maxWidth: 'none' }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <IconButton
          aria-label="Alejar"
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
        >
          <ZoomOutRoundedIcon />
        </IconButton>
        <IconButton
          aria-label="Acercar"
          onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
        >
          <ZoomInRoundedIcon />
        </IconButton>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReferenceTableDialog;
