import { MenuItem } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import FormTextField, { FormFieldProps } from './FormTextField';

type Props<T extends FieldValues, TT extends FieldValues = T> = FormFieldProps<
  T,
  TT
> & {
  options: { value: string; label: string }[];
  // Agrega la opción vacía para poder quitar un valor ya elegido.
  clearable?: boolean;
};

function FormSelect<T extends FieldValues, TT extends FieldValues = T>({
  options,
  clearable,
  ...rest
}: Props<T, TT>) {
  return (
    <FormTextField {...rest} select>
      {clearable && <MenuItem value="">Ninguno</MenuItem>}
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </FormTextField>
  );
}

export default FormSelect;
