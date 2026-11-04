import dayjs from 'dayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { FieldValues, useController } from 'react-hook-form';
import { FormFieldProps } from './FormTextField';

type Props<T extends FieldValues, TT extends FieldValues = T> = FormFieldProps<
  T,
  TT
> &
  Omit<DatePickerProps, 'value' | 'onChange' | 'name' | 'label'>;

// LocalDate (YYYY-MM-DD) <-> Dayjs; una fecha incompleta se guarda como ''.
function FormDatePicker<T extends FieldValues, TT extends FieldValues = T>({
  control,
  name,
  label,
  helperText,
  ...rest
}: Props<T, TT>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <DatePicker
      {...rest}
      label={label}
      value={field.value ? dayjs(field.value as string) : null}
      onChange={(d) =>
        field.onChange(d?.isValid() ? d.format('YYYY-MM-DD') : '')
      }
      slotProps={{
        textField: {
          fullWidth: true,
          onBlur: field.onBlur,
          inputRef: field.ref,
          error: Boolean(fieldState.error),
          helperText: fieldState.error?.message ?? helperText,
        },
      }}
    />
  );
}

export default FormDatePicker;
