import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Member from '../../models/Member';
import MultipleSelectChip from '../../components/BsMultiSelect';
import BsSelect from '../../components/BsSelect';

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

export type ValueType = string | Date | boolean | number | string[];
export type MemberInfoInputType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'email'
  | 'date'
  | 'select'
  | 'multiselect';
export type OnInputChangeFn = (key: keyof Member, value: ValueType) => void;

function MemberInfoInput(props: {
  label: string;
  value?: ValueType;
  name: keyof Member;
  useChip?: boolean;
  editMode: boolean;
  inputType?: MemberInfoInputType;
  selectOptions?: { value: string; label: string }[];
  onInputChange: OnInputChangeFn;
}) {
  const {
    label,
    value,
    useChip,
    editMode,
    name,
    inputType,
    selectOptions,
    onInputChange,
  } = props;

  const isValueArray = Array.isArray(value);

  if (!editMode) {
    let content: JSX.Element[] | string = isValueArray
      ? value.join(', ')
      : (value as string);

    if (isValueArray && useChip) {
      content = value.map((v) => (
        <Chip key={v} label={v} sx={{ margin: '2px' }} />
      ));

      if (!content.length) {
        content = '';
      }
    }

    return (
      <Wrapper label={label}>
        <Typography color="#757a79" variant="subtitle2">
          {content || 'No Definido'}
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
          <BsSelect
            variant="outlined"
            name={name}
            value={value}
            onChange={(ev) => {
              onInputChange(name, ev.target.value as ValueType);
            }}
          >
            {selectOptions?.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </BsSelect>
        </FormControl>
      </Wrapper>
    );
  }

  if (inputType === 'multiselect') {
    return (
      <Wrapper label={label}>
        <FormControl fullWidth>
          <MultipleSelectChip
            options={selectOptions ?? []}
            value={value as string[]}
          />
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
