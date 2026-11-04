import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { LocalDate, addDays, todayLocalDate } from '../../../common/dates';

type Props = { value: LocalDate; onChange: (d: LocalDate) => void };

const HiddenField = () => null;

export const formatLongDate = (d: LocalDate) => {
  const text = dayjs(d).locale('es').format('dddd D [de] MMMM [de] YYYY');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

function DayNavigator({ value, onChange }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const isToday = value === todayLocalDate();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        mb: 3,
      }}
    >
      <IconButton
        aria-label="Día anterior"
        onClick={() => onChange(addDays(value, -1))}
      >
        <ChevronLeftRoundedIcon />
      </IconButton>
      <IconButton
        aria-label="Día siguiente"
        onClick={() => onChange(addDays(value, 1))}
      >
        <ChevronRightRoundedIcon />
      </IconButton>
      <Typography variant="h3" component="p" sx={{ flex: 1, minWidth: 220 }}>
        {formatLongDate(value)}
      </Typography>
      <Button
        variant="outlined"
        color="inherit"
        disabled={isToday}
        onClick={() => onChange(todayLocalDate())}
      >
        Hoy
      </Button>
      <IconButton
        ref={anchorRef}
        aria-label="Elegir fecha"
        onClick={() => setPickerOpen(true)}
      >
        <CalendarMonthRoundedIcon />
      </IconButton>
      <DatePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        value={dayjs(value)}
        onChange={(d) => d?.isValid() && onChange(d.format('YYYY-MM-DD'))}
        slots={{ field: HiddenField }}
        // el field no se muestra: el popper se ancla al botón del calendario
        slotProps={{
          popper: { anchorEl: () => anchorRef.current as HTMLElement },
        }}
      />
    </Box>
  );
}

export default DayNavigator;
