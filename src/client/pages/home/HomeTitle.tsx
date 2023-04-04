import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

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

function getHomeTitle() {
  return greeting[determineDayTime()];
}

export default getHomeTitle;
