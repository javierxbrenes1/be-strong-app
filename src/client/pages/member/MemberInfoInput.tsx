import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Member from '../../models/Member';

const Wrapper: FC<{ label: string; children: ReactNode | ReactNode }> = ({
  label,
  children,
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography color="primary" variant="subtitle1">
      {label}
    </Typography>
    {children}
  </Box>
);

export type ValueType = string | Date | boolean | number;
export type OnInputChangeFn = (key: keyof Member, value: ValueType) => void;

function MemberInfoInput(props: {
  label: string;
  value?: ValueType;
  name: keyof Member;
  editMode: boolean;
  inputType?: 'text' | 'number' | 'textarea' | 'email' | 'date' | 'select';
  selectOptions?: { value: string; label: string }[];
  onInputChange: OnInputChangeFn;
}) {
  const {
    label,
    value,
    editMode,
    name,
    inputType,
    selectOptions,
    onInputChange,
  } = props;

  if (!editMode) {
    return (
      <Wrapper label={label}>
        <Typography color="#757a79" variant="subtitle2">
          {(value as string) || 'No Definido'}
        </Typography>
      </Wrapper>
    );
  }

  if (inputType === 'date') {
    return (
      <Wrapper label={label}>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(value as Date)}
              format="DD/MM/YYYY"
              onChange={(ev: unknown) => {
                if (ev) {
                  const parseEv = ev as { $d: Date };
                  onInputChange(name, parseEv.$d);
                }
              }}
            />
          </LocalizationProvider>
        </FormControl>
      </Wrapper>
    );
  }

  if (inputType === 'select') {
    return (
      <Wrapper label={label}>
        <FormControl fullWidth>
          <Select
            variant="outlined"
            name={name}
            value={value}
            onChange={(ev) => {
              onInputChange(name, ev.target.value);
            }}
          >
            {selectOptions?.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Wrapper>
    );
  }

  return (
    <Wrapper label={label}>
      <FormControl fullWidth>
        <TextField
          type={inputType}
          name={name}
          variant="outlined"
          onChange={(ev) => {
            onInputChange(name, ev.target.value);
          }}
          multiline={inputType === 'textarea'}
          maxRows={inputType === 'textarea' ? 0 : 5}
          value={value || ''}
        />
      </FormControl>
    </Wrapper>
  );
}

export default MemberInfoInput;
