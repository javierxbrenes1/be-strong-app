import { ReactNode, useId, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConfirmDialog from './ConfirmDialog';

export type AppSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: ReactNode;
  size?: 'default' | 'wide';
  dirty?: boolean;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    form?: string;
    loading?: boolean;
    disabled?: boolean;
  };
  cancelLabel?: string;
  children: ReactNode;
};

function AppSheet({
  open,
  onClose,
  title,
  subtitle,
  size = 'default',
  dirty = false,
  primaryAction,
  cancelLabel = 'Cancelar',
  children,
}: AppSheetProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const titleId = useId();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const requestClose = () => {
    if (dirty) setConfirmOpen(true);
    else onClose();
  };

  return (
    <>
      <Drawer
        anchor={isDesktop ? 'right' : 'bottom'}
        open={open}
        onClose={requestClose}
        slotProps={{
          paper: {
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': titleId,
            sx: {
              display: 'flex',
              flexDirection: 'column',
              ...(isDesktop
                ? {
                    width: size === 'wide' ? 640 : 480,
                    maxWidth: '100vw',
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                  }
                : {
                    height: '92dvh',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  }),
            },
          },
        }}
      >
        {!isDesktop && (
          <Box
            aria-hidden
            sx={{
              width: 40,
              height: 4,
              borderRadius: 2,
              bgcolor: 'divider',
              mx: 'auto',
              mt: 1,
            }}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
            px: 3,
            pt: 2,
            pb: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography id={titleId} component="h2" variant="h3">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <IconButton aria-label="Cerrar" onClick={requestClose} edge="end">
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2 }}>{children}</Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            px: 3,
            pt: 1.5,
            pb: 'max(12px, env(safe-area-inset-bottom))',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Button variant="outlined" color="inherit" onClick={requestClose}>
            {cancelLabel}
          </Button>
          {primaryAction && (
            <Button
              variant="contained"
              type={primaryAction.type ?? 'button'}
              form={primaryAction.form}
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled || primaryAction.loading}
            >
              {primaryAction.label}
            </Button>
          )}
        </Box>
      </Drawer>
      <ConfirmDialog
        open={confirmOpen}
        title="¿Descartar cambios?"
        description="Los cambios que no guardaste se perderán."
        confirmLabel="Descartar"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onClose();
        }}
      />
    </>
  );
}

export default AppSheet;
