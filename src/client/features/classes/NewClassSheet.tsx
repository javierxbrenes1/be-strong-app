import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import {
  Autocomplete,
  Box,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  useTheme,
} from '@mui/material';
import { AppSheet } from '../../design-system';
import { FormNumberField } from '../../design-system/form';
import {
  AddGymClassDocument,
  GymClassTypesDocument,
  GymClassesByDayDocument,
} from './api';
import { GymClassTimesDocument } from '../config/api';
import { ClassFormInput, ClassFormValues, classSchema } from './classSchema';
import { formatLongDate } from './DayNavigator';
import BsShowError from '../../components/BsShowError';
import {
  LocalDate,
  compareLocalTime,
  formatLocalTime,
} from '../../../common/dates';

type Props = { open: boolean; date: LocalDate; onClose: () => void };

const FORM_ID = 'new-class-form';
const EMPTY: ClassFormInput = {
  classType: '',
  classDurationInMinutes: '',
  classTimeIds: [],
  classDescription: '',
};

function NewClassSheet({ open, date, onClose }: Props) {
  const theme = useTheme();
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const { control, handleSubmit, reset, formState } = useForm<
    ClassFormInput,
    unknown,
    ClassFormValues
  >({ resolver: zodResolver(classSchema), defaultValues: EMPTY });
  const types = useQuery(GymClassTypesDocument, { skip: !open });
  const times = useQuery(GymClassTimesDocument, { skip: !open });
  const [addClass, { loading }] = useMutation(AddGymClassDocument, {
    refetchQueries: [GymClassesByDayDocument],
  });

  useEffect(() => {
    if (open) {
      reset(EMPTY);
      setTab('edit');
    }
  }, [open, reset]);

  const timeOptions = [...(times.data?.allGymClassTimes ?? [])]
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .sort((a, b) => compareLocalTime(a.localTime, b.localTime));

  const onSubmit = async (v: ClassFormValues) => {
    try {
      await addClass({
        variables: {
          input: {
            classDate: date,
            classType: v.classType,
            classTimeIds: v.classTimeIds,
            classDurationInMinutes: v.classDurationInMinutes,
            classDescription: v.classDescription || undefined,
          },
        },
      });
      toast.success('Clase creada');
      onClose();
    } catch (err) {
      BsShowError(err, 'No se pudo crear la clase. Intenta de nuevo.');
    }
  };

  return (
    <AppSheet
      open={open}
      onClose={onClose}
      size="wide"
      title="Nueva clase"
      subtitle={formatLongDate(date)}
      dirty={formState.isDirty}
      primaryAction={{
        label: 'Crear clase',
        type: 'submit',
        form: FORM_ID,
        loading,
      }}
    >
      <form id={FORM_ID} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <Controller
            control={control}
            name="classType"
            render={({ field, fieldState }) => (
              <Autocomplete
                freeSolo
                options={types.data?.getGymClassTypes ?? []}
                inputValue={field.value}
                onInputChange={(_, v) => field.onChange(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo de clase"
                    autoFocus
                    inputRef={field.ref}
                    onBlur={field.onBlur}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            )}
          />
          <FormNumberField
            control={control}
            name="classDurationInMinutes"
            label="Duración (min)"
            int
          />
          <Controller
            control={control}
            name="classTimeIds"
            render={({ field, fieldState }) => (
              <TextField
                select
                label="Horarios"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                slotProps={{ select: { multiple: true } }}
              >
                {timeOptions.map((t) => (
                  <MenuItem key={t.id} value={Number(t.id)}>
                    {formatLocalTime(t.localTime)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Box>
            <Tabs
              value={tab}
              onChange={(_, v: 'edit' | 'preview') => setTab(v)}
              sx={{ mb: 1 }}
            >
              <Tab value="edit" label="Escribir" />
              <Tab value="preview" label="Vista previa" />
            </Tabs>
            <Controller
              control={control}
              name="classDescription"
              render={({ field }) => (
                <div data-color-mode={theme.palette.mode}>
                  <MDEditor
                    height={280}
                    value={field.value ?? ''}
                    onChange={(v) => field.onChange(v ?? '')}
                    preview={tab}
                    hideToolbar={tab === 'preview'}
                    previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                  />
                </div>
              )}
            />
          </Box>
        </Stack>
      </form>
    </AppSheet>
  );
}

export default NewClassSheet;
