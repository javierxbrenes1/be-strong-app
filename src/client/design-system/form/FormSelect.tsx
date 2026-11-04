import { MenuItem } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import FormTextField, { FormFieldProps } from './FormTextField';

type Props<T extends FieldValues, TT extends FieldValues = T> = FormFieldProps<
  T,
  TT
> & {
  options: { value: string; label: string }[];
};

function FormSelect<T extends FieldValues, TT extends FieldValues = T>({
  options,
  ...rest
}: Props<T, TT>) {
  return (
    <FormTextField {...rest} select>
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </FormTextField>
  );
}

export default FormSelect;
