import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Button, Chip, Popover, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import { rangePresets } from './rangePresets';
import {
  LocalDate,
  formatLocalDate,
  todayLocalDate,
} from '../../../common/dates';

export type Range = { from: LocalDate; to: LocalDate };

type Props = { value: Range; onChange: (r: Range) => void };

const toLocalDate = (d: dayjs.Dayjs | null) =>
  d?.isValid() ? d.format('YYYY-MM-DD') : null;

function RangeFilter({ value, onChange }: Props) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Range>(value);
  const presets = rangePresets(todayLocalDate());
  const valid = draft.from !== '' && draft.to !== '' && draft.from <= draft.to;

  const openPopover = () => {
    setDraft(value);
    setOpen(true);
  };

  return (
    <>
      <Button
        ref={anchorRef}
        variant="outlined"
        color="inherit"
        startIcon={<DateRangeRoundedIcon />}
        onClick={openPopover}
      >
        {formatLocalDate(value.from)} – {formatLocalDate(value.to)}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Stack spacing={2} sx={{ p: 2, width: 320, maxWidth: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {presets.map((p) => (
              <Chip
                key={p.id}
                label={p.label}
                clickable
                variant={
                  draft.from === p.from && draft.to === p.to
                    ? 'filled'
                    : 'outlined'
                }
                onClick={() => setDraft({ from: p.from, to: p.to })}
              />
            ))}
          </Box>
          <DatePicker
            label="Desde"
            value={draft.from ? dayjs(draft.from) : null}
            maxDate={draft.to ? dayjs(draft.to) : undefined}
            onChange={(d) =>
              setDraft((r) => ({ ...r, from: toLocalDate(d) ?? '' }))
            }
          />
          <DatePicker
            label="Hasta"
            value={draft.to ? dayjs(draft.to) : null}
            minDate={draft.from ? dayjs(draft.from) : undefined}
            onChange={(d) =>
              setDraft((r) => ({ ...r, to: toLocalDate(d) ?? '' }))
            }
          />
          <Button
            variant="contained"
            disabled={!valid}
            onClick={() => {
              onChange(draft);
              setOpen(false);
            }}
          >
            Aplicar
          </Button>
        </Stack>
      </Popover>
    </>
  );
}

export default RangeFilter;
