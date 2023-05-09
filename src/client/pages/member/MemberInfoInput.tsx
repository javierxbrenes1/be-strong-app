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
  <Box>
    <Typography color="primary" variant="subtitle1">
      {label}
    </Typography>
    {children}
  </Box>
);

function MemberInfoInput(props: {
  label: string;
  value?: string | Date | boolean | number;
  name?: string;
  editMode: boolean;
  inputType?: 'text' | 'number' | 'textarea' | 'email' | 'date' | 'select';
  selectOptions?: { value: string; label: string }[];
  onInputChange?: (key: keyof Member, value: string | Date) => void;
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
              onChange={() => {}}
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
          <Select name={name} value={value} onChange={() => {}}>
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
          onChange={() => {}}
          multiline={inputType === 'textarea'}
          value={value}
        />
      </FormControl>
    </Wrapper>
  );
}

export default MemberInfoInput;
