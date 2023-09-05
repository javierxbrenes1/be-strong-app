import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import BsSelect from './BsSelect';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  value?: string[];
  selectLabel?: string;
  onChange: (vals: string[]) => void;
};

export default function MultipleSelectChip(props: Props) {
  const { options, value = [], onChange, selectLabel } = props;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { target } = event;
    const newValues =
      target.value === 'string'
        ? target.value.split(',')
        : (target.value as string[]);

    onChange(newValues);
  };

  const handleRenderValue = (selected: unknown) => {
    const parsedSelected = selected as string[];
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {parsedSelected.map((v: string) => {
          const { label } = options.find((r) => r.value === v) ?? {
            label: v,
          };
          return <Chip key={v} label={label} />;
        })}
      </Box>
    );
  };

  return (
    <>
      {selectLabel && (
        <InputLabel id="multiple-selection-label">{selectLabel}</InputLabel>
      )}
      <BsSelect
        labelId="multiple-selection-label"
        id="multiple-selection"
        multiple
        variant="outlined"
        sx={{ '& .MuiInputBase-input': { paddingY: '16px' } }}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput id="multiple-selection" />}
        renderValue={handleRenderValue}
        MenuProps={MenuProps}
      >
        {options.map((option: { value: string; label: string }) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </BsSelect>
    </>
  );
}
