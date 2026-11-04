import dayjs from 'dayjs';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { FieldValues, useController } from 'react-hook-form';
import { FormFieldProps } from './FormTextField';

type Props<T extends FieldValues, TT extends FieldValues = T> = FormFieldProps<
  T,
  TT
> &
  Omit<TimePickerProps, 'value' | 'onChange' | 'name' | 'label'>;

// LocalTime (HH:mm) <-> Dayjs; una hora incompleta se guarda como ''.
function FormTimePicker<T extends FieldValues, TT extends FieldValues = T>({
  control,
  name,
  label,
  helperText,
  ...rest
}: Props<T, TT>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <TimePicker
      {...rest}
      label={label}
      ampm={false}
      value={field.value ? dayjs(`2000-01-01T${field.value as string}`) : null}
      onChange={(d) => field.onChange(d?.isValid() ? d.format('HH:mm') : '')}
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

export default FormTimePicker;
