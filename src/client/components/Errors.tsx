import { Typography, Box, useTheme } from '@mui/material';

function Errors(props: { errors: string[]; addTitle: boolean }) {
  const theme = useTheme();
  const { errors, addTitle } = props;
  if (!errors.length) return null;

  return (
    <Box>
      {addTitle && (
        <Typography variant="body2" style={{ color: theme.palette.error.main }}>
          Ocurrieron los siguientes errores:{' '}
        </Typography>
      )}
      <ul>
        {errors.map((err, index) => (
          <li key={`error=${index}`}>
            <Typography variant="caption">{err}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default Errors;
