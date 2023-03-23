import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import Box from '@mui/material/Box';

enum DayTime {
  day = 'day',
  afternoon = 'afteernoon',
  night = 'night',
}

const greeting = {
  [DayTime.day]: {
    Icon: LightModeIcon,
    text: 'Buenos dias',
  },
  [DayTime.afternoon]: {
    Icon: WbTwilightIcon,
    text: 'Buenas tardes',
  },
  [DayTime.night]: {
    Icon: BedtimeIcon,
    text: 'Buenas noches',
  },
};

const determineDayTime = (): DayTime => {
  const hour: number = new Date().getHours();
  if (hour >= 6 && hour <= 11) {
    return DayTime.day;
  }
  if (hour >= 12 && hour <= 17) {
    return DayTime.afternoon;
  }
  return DayTime.night;
};

function Greetings() {
  const { Icon, text } = greeting[determineDayTime()];

  if (!DayTime) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Icon fontSize="large" sx={{ color: '#FF6E31' }} />
      <Typography variant="h4" sx={{ color: '#393e46' }}>
        {text}
      </Typography>
    </Box>
  );
}

export default Greetings;
