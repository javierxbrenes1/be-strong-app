import { FieldValues } from 'react-hook-form';
import FormTextField, { FormFieldProps } from './FormTextField';

type Props<T extends FieldValues, TT extends FieldValues = T> = FormFieldProps<
  T,
  TT
> & { int?: boolean };

// Guarda el texto crudo en el form; zNumber lo convierte al validar.
function FormNumberField<T extends FieldValues, TT extends FieldValues = T>({
  int,
  ...rest
}: Props<T, TT>) {
  return (
    <FormTextField
      {...rest}
      slotProps={{ htmlInput: { inputMode: int ? 'numeric' : 'decimal' } }}
    />
  );
}

export default FormNumberField;
