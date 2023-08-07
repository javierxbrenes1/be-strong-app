import {
  Button,
  Divider,
  Fade,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import BsLocalizationProvider from '../../../components/BsLocalizationProvider';
import useFirstTimeBuild from '../../../hooks/useFirstTimeBuild';

const FORMAT = 'DD/MM/YYYY';

const Container = styled(Box)({
  display: 'flex',
});

const DatesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  [theme.breakpoints.up('md')]: {
    display: 'grid',
    gap: '10px 10px',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: `
    "from to"
    "search search"
  `,
  },
}));

const ShortcutButton = styled(Button)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    color: selected ? theme.palette.primary.main : '#000',
    border: '1px #e6e6e6 solid',
  })
);

const defaultValue = {
  id: 'last-three-months',
  label: 'Últimos 3 meses',
  dates: {
    from: dayjs().subtract(3, 'month').date(1),
    to: dayjs(),
  },
};

const shortcuts = [
  {
    id: 'last-year',
    label: 'Este Año',
    dates: {
      from: dayjs().startOf('year'),
      to: dayjs(),
    },
  },
  {
    id: 'last-six-months',
    label: 'Últimos 6 meses',
    dates: {
      from: dayjs().subtract(6, 'month').date(1),
      to: dayjs(),
    },
  },
  defaultValue,
];

type Props = {
  onSearch: (from: Date, to: Date) => void;
  activateReloading?: boolean;
  onReloadingClick?: () => void;
  iconFirst?: boolean;
};

function Filters(props: Props) {
  const {
    onSearch,
    activateReloading,
    onReloadingClick,
    iconFirst = false,
  } = props;
  const [openPop, setOpenPop] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isFirstTime = useFirstTimeBuild();

  const [selectedShortcurt, setSelectedShortcut] = useState<string>(
    defaultValue.id
  );
  const [fromDate, setFromDate] = useState<dayjs.Dayjs>(
    defaultValue.dates.from
  );
  const [toDate, setToDate] = useState<dayjs.Dayjs>(defaultValue.dates.to);

  useEffect(() => {
    if (isFirstTime) {
      handleOnSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const shortcut = shortcuts.find(({ id }) => id === selectedShortcurt);
    if (shortcut) {
      const { dates } = shortcut;
      setFromDate(dates.from);
      setToDate(dates.to);
    }
  }, [selectedShortcurt]);

  const handleShortcutClick = (id: string) => () => {
    setSelectedShortcut(id);
  };
  const handleDateChange = (type: 'from' | 'to') => (ev: unknown) => {
    const date = ev as dayjs.Dayjs;
    if (type === 'from') {
      setFromDate(date);
      return;
    }
    setToDate(date);
    setSelectedShortcut('');
  };

  const handlePopOpen = (ev: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(ev.currentTarget);
    setOpenPop((s) => !s);
  };

  const canBeOpen = openPop && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const handleOnSearch = () => {
    type D = { $d: Date };
    onSearch((fromDate as unknown as D).$d, (toDate as unknown as D).$d);
    setOpenPop(false);
    if (onReloadingClick) {
      onReloadingClick();
    }
  };

  const hoverIconStyle = {
    '&:hover': {
      cursor: 'pointer',
    },
  };

  const handleReplayClick = () => {
    handleOnSearch();
  };

  return (
    <>
      <Stack direction="row" gap="10px" alignItems="center">
        <Box
          onClick={handlePopOpen}
          area-aria-describedby={id}
          sx={{
            display: 'flex',
            alignItems: 'end',
            flexDirection: iconFirst ? 'row-reverse' : 'row',
          }}
        >
          {fromDate && toDate && (
            <Typography variant="caption" component="span">
              {fromDate.format(FORMAT)} - {toDate.format(FORMAT)}
            </Typography>
          )}
          <FilterAltIcon
            sx={hoverIconStyle}
            color={openPop ? 'primary' : undefined}
          />
        </Box>
        {activateReloading && (
          <Box>
            <Tooltip title="Parece que nuevas medidas fueron agregadas, da click aca para actualizar la vista.">
              <ReplayIcon
                sx={hoverIconStyle}
                color="primary"
                onClick={handleReplayClick}
              />
            </Tooltip>
          </Box>
        )}
      </Stack>
      <Popper
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ padding: '10px' }} elevation={3}>
              <Container>
                <Stack spacing={2}>
                  {shortcuts.map((sc) => (
                    <ShortcutButton
                      variant="text"
                      key={sc.id}
                      onClick={handleShortcutClick(sc.id)}
                      selected={sc.id === selectedShortcurt}
                    >
                      {sc.label}
                    </ShortcutButton>
                  ))}
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: '0 10px' }}
                />
                <DatesContainer>
                  <Box sx={{ gridArea: 'from' }}>
                    <Typography>Desde:</Typography>
                    <BsLocalizationProvider>
                      <DatePicker
                        value={fromDate}
                        format={FORMAT}
                        onChange={handleDateChange('from')}
                        disableFuture
                        maxDate={toDate?.subtract(1, 'day')}
                      />
                    </BsLocalizationProvider>
                  </Box>
                  <Box sx={{ gridArea: 'to' }}>
                    <BsLocalizationProvider>
                      <Typography>Hasta:</Typography>
                      <DatePicker
                        value={toDate}
                        format={FORMAT}
                        onChange={handleDateChange('to')}
                        disableFuture
                        minDate={fromDate?.add(1, 'day')}
                      />
                    </BsLocalizationProvider>
                  </Box>
                  <Stack
                    justifyContent="right"
                    width="100%"
                    direction="row"
                    gap="10px"
                    sx={{ gridArea: 'search' }}
                  >
                    <Button
                      sx={{ maxWidth: '150px' }}
                      variant="outlined"
                      onClick={handleOnSearch}
                    >
                      Buscar
                    </Button>
                    <Button
                      sx={{ maxWidth: '150px' }}
                      variant="outlined"
                      onClick={() => setOpenPop(false)}
                    >
                      Cerrar
                    </Button>
                  </Stack>
                </DatesContainer>
              </Container>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}

export default Filters;
