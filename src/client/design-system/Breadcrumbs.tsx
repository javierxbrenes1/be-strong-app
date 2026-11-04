import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
} from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

type Item = { label: string; to?: string };

// El último item es la página actual (sin enlace).
function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <Box component="nav" aria-label="Ruta de navegación" sx={{ mb: 1.5 }}>
      <MuiBreadcrumbs separator={<NavigateNextRoundedIcon fontSize="small" />}>
        {items.map((item, i) =>
          item.to && i < items.length - 1 ? (
            <Link
              key={item.label}
              component={RouterLink}
              to={item.to}
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              {item.label}
            </Link>
          ) : (
            <Typography
              key={item.label}
              variant="body2"
              color="text.primary"
              aria-current="page"
            >
              {item.label}
            </Typography>
          )
        )}
      </MuiBreadcrumbs>
    </Box>
  );
}

export default Breadcrumbs;
