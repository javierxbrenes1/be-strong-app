import { ReactNode } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

// TTransformed: salida del resolver (zod) que puede diferir del texto crudo del form.
export type FormFieldProps<
  T extends FieldValues,
  TTransformed extends FieldValues = T
> = {
  control: Control<T, unknown, TTransformed>;
  name: Path<T>;
  label: string;
  helperText?: ReactNode;
};

type Props<T extends FieldValues, TT extends FieldValues = T> = FormFieldProps<
  T,
  TT
> &
  Omit<TextFieldProps, 'name' | 'label' | 'helperText' | 'value' | 'error'>;

function FormTextField<T extends FieldValues, TT extends FieldValues = T>({
  control,
  name,
  label,
  helperText,
  ...rest
}: Props<T, TT>) {
  const { field, fieldState } = useController({ control, name });
  const { ref, ...fieldProps } = field;
  return (
    <TextField
      {...rest}
      {...fieldProps}
      inputRef={ref}
      value={field.value ?? ''}
      label={label}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message ?? helperText}
      fullWidth
    />
  );
}

export default FormTextField;
