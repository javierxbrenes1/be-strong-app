import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box, IconButton, Popover } from '@mui/material';
import { useState } from 'react';
import { YearCalendar } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import BsLocalizationProvider from './BsLocalizationProvider';

type Props = {
  onYearSelection: (date: Dayjs) => void;
  date: Dayjs;
};

function BsYearPopover(props: Props) {
  const { date, onYearSelection } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'year-popover' : undefined;

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <CalendarTodayIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <BsLocalizationProvider>
          <YearCalendar
            value={date}
            onChange={(ev) => {
              onYearSelection(ev);
              handleClose();
            }}
          />
        </BsLocalizationProvider>
      </Popover>
    </Box>
  );
}

export default BsYearPopover;
