import { useState, ReactNode, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  IconButton,
  Stack,
  TextField,
  TextFieldProps,
  styled,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { MobileDatePicker } from '@mui/x-date-pickers';
import BsLocalizationProvider from './BsLocalizationProvider';

const DateWrapper = styled(Box)(({ theme }) => ({
  '& .MuiInput-root:after': {
    borderBottom: 'none',
  },
  '& .MuiInput-root:hover': {
    cursor: 'pointer',
    '& input': {
      cursor: 'pointer',
    },
    '&:before': {
      borderBottom: 'none !important',
    },
  },
  '& .MuiInput-root:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-root': {
    ...theme.typography.h5,
    fontWeight: '600',
    '& input': {
      textAlign: 'center',
    },
  },
}));

const CustomTextField = (props: TextFieldProps) => (
  <TextField
    {...props}
    variant="standard"
    className="classes-date"
    size="medium"
  />
);

function BsDateTimeline(props: {
  children?: ReactNode | ReactNode[];
  onDateAccept: (date: number) => void;
}) {
  const { children, onDateAccept } = props;
  const [date, setDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    onDateAccept(date.toDate().getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveDate = (tDays: number) => () => {
    const newDate = date.add(tDays, 'day');
    onDateAccept(newDate.toDate().getTime());
    setDate(newDate);
  };

  const handleOnChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleOnAccept = (newDate: Dayjs | null) => {
    if (newDate) {
      onDateAccept(newDate.toDate().getTime());
    }
  };

  return (
    <Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton onClick={moveDate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <DateWrapper>
          <BsLocalizationProvider>
            <MobileDatePicker
              value={date}
              format="DD MMMM YYYY"
              slots={{ textField: CustomTextField }}
              onChange={handleOnChange}
              onAccept={handleOnAccept}
            />
          </BsLocalizationProvider>
        </DateWrapper>
        <IconButton onClick={moveDate(1)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      <Box>{children}</Box>
    </Stack>
  );
}

export default BsDateTimeline;
