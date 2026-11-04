import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { Box, Stack } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AppSheet } from '../../design-system';
import { FormNumberField } from '../../design-system/form';
import {
  AddMeasureDocument,
  MemberDetailDocument,
  MemberMeasuresDocument,
  UpdateMeasureDocument,
} from '../member-detail/api';
import { MEASURE_METRICS, MeasureValues } from './metrics';
import {
  MeasureFormInput,
  MeasureFormValues,
  measureSchema,
} from './measureSchema';
import BsShowError from '../../components/BsShowError';
import { GYM_TIMEZONE, formatInstant } from '../../../common/dates';

type Measure = MeasureValues & { id?: number; date?: number | null };

type Props = {
  open: boolean;
  memberCode: string;
  memberName: string;
  measure?: Measure;
  previous?: Measure;
  onClose: () => void;
};

const FORM_ID = 'measure-sheet-form';

function toDefaults(measure?: Measure): MeasureFormInput {
  const text = (v?: number | null) => (v == null ? '' : String(v));
  return {
    date: measure?.date ?? Date.now(),
    weight: text(measure?.weight),
    bodyMassIndex: text(measure?.bodyMassIndex),
    corporalFat: text(measure?.corporalFat),
    muscle: text(measure?.muscle),
    corporalWaterPct: text(measure?.corporalWaterPct),
    calories: text(measure?.calories),
  };
}

function MeasureSheet({
  open,
  memberCode,
  memberName,
  measure,
  previous,
  onClose,
}: Props) {
  const isEdit = measure?.id != null;
  const { control, handleSubmit, reset, formState } = useForm<
    MeasureFormInput,
    unknown,
    MeasureFormValues
  >({
    resolver: zodResolver(measureSchema),
    defaultValues: toDefaults(measure),
  });
  const refetchQueries = [MemberDetailDocument, MemberMeasuresDocument];
  const [addMeasure, adding] = useMutation(AddMeasureDocument, {
    refetchQueries,
  });
  const [updateMeasure, updating] = useMutation(UpdateMeasureDocument, {
    refetchQueries,
  });

  useEffect(() => {
    if (open) reset(toDefaults(measure));
  }, [open, measure, reset]);

  const onSubmit = (v: MeasureFormValues) => {
    const values = {
      weight: v.weight as number,
      bodyMassIndex: v.bodyMassIndex as number,
      corporalFat: v.corporalFat as number,
      muscle: v.muscle as number,
      corporalWaterPct: v.corporalWaterPct as number,
      calories: v.calories as number,
    };
    const request =
      isEdit && measure?.id != null
        ? updateMeasure({
            variables: { measure: { memberCode, id: measure.id, ...values } },
          })
        : addMeasure({
            variables: { measure: { memberCode, date: v.date, ...values } },
          });
    request
      .then(() => {
        toast.success('Medición guardada');
        onClose();
      })
      .catch((err) =>
        BsShowError(err, 'No se pudo guardar la medición. Intenta de nuevo.')
      );
  };

  return (
    <AppSheet
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar medición' : 'Nueva medición'}
      subtitle={
        previous?.date != null
          ? `${memberName} · última: ${formatInstant(
              previous.date,
              'DD/MM/YYYY'
            )}`
          : memberName
      }
      dirty={formState.isDirty}
      primaryAction={{
        label: 'Guardar',
        type: 'submit',
        form: FORM_ID,
        loading: adding.loading || updating.loading,
      }}
    >
      <form id={FORM_ID} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <Controller
            control={control}
            name="date"
            render={({ field, fieldState }) => (
              <DateTimePicker
                label="Fecha y hora"
                value={dayjs(field.value)}
                // El servidor no permite cambiar la fecha de una medición existente.
                disabled={isEdit}
                disableFuture
                // Misma zona que el resto de la app, no la del navegador.
                timezone={GYM_TIMEZONE}
                onChange={(d) =>
                  field.onChange(d?.isValid() ? d.valueOf() : null)
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(fieldState.error),
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            )}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {MEASURE_METRICS.map((m) => {
              const prev = previous?.[m.key];
              return (
                <FormNumberField
                  key={m.key}
                  control={control}
                  name={m.key}
                  label={m.unit ? `${m.label} (${m.unit})` : m.label}
                  helperText={prev == null ? undefined : `Anterior: ${prev}`}
                />
              );
            })}
          </Box>
        </Stack>
      </form>
    </AppSheet>
  );
}

export default MeasureSheet;
