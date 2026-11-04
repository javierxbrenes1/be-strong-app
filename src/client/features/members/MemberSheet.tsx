import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  FormControlLabel,
  Stack,
  Switch,
  ToggleButton,
  Typography,
} from '@mui/material';
import { AppSheet } from '../../design-system';
import {
  FormDatePicker,
  FormNumberField,
  FormSelect,
  FormTextField,
} from '../../design-system/form';
import {
  ActiveMembersDocument,
  AddMemberDocument,
  InactiveMembersDocument,
  MemberDetails,
  UpdateMemberDocument,
} from './api';
import { GymClassTimesDocument } from '../config/api';
import {
  DAYS,
  MemberFormInput,
  MemberFormValues,
  memberSchema,
} from './memberSchema';
import BsShowError from '../../components/BsShowError';
import { MemberCategories } from '../../types';
import { compareLocalTime, formatLocalTime } from '../../../common/dates';

type Props = {
  open: boolean;
  member?: MemberDetails;
  onClose: () => void;
  onSaved?: (code: string) => void;
};

const FORM_ID = 'member-sheet-form';

const GENRES = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'other', label: 'Otro' },
];

const CATEGORIES = Object.values(MemberCategories).map((c) => ({
  value: c,
  label: c,
}));

// Chrome ofrece historial/direcciones según el atributo name del input:
// se le da un name distinto al del campo y se apagan los gestores de contraseñas.
const noAutofill = (field: string) => ({
  autoComplete: 'off',
  slotProps: {
    htmlInput: {
      name: `member-${field}-x`,
      'data-lpignore': 'true',
      'data-form-type': 'other',
    },
  },
});

function toDefaults(member?: MemberDetails): MemberFormInput {
  const att = member?.memberAttendance;
  return {
    name: member?.name ?? '',
    category: (member?.category ?? '') as MemberFormInput['category'],
    genre: (member?.genre ?? '') as MemberFormInput['genre'],
    birthDate: member?.birthDate ?? '',
    height: member?.height != null ? String(member.height) : '',
    phone: member?.phone ?? '',
    email: member?.email ?? '',
    observations: member?.observations ?? '',
    isActive: member?.isActive ?? true,
    preferredClassTime:
      member?.preferredClassTime != null
        ? String(member.preferredClassTime)
        : '',
    attendance: {
      monday: Boolean(att?.monday),
      tuesday: Boolean(att?.tuesday),
      wednesday: Boolean(att?.wednesday),
      thursday: Boolean(att?.thursday),
      friday: Boolean(att?.friday),
      saturday: Boolean(att?.saturday),
      sunday: Boolean(att?.sunday),
    },
  };
}

function Section({ title }: { title: string }) {
  return (
    <Typography variant="overline" color="text.secondary" sx={{ mt: 1 }}>
      {title}
    </Typography>
  );
}

function MemberSheet({ open, member, onClose, onSaved }: Props) {
  const isEdit = Boolean(member);
  const { control, handleSubmit, reset, formState } = useForm<
    MemberFormInput,
    unknown,
    MemberFormValues
  >({
    resolver: zodResolver(memberSchema),
    defaultValues: toDefaults(member),
  });
  const times = useQuery(GymClassTimesDocument, { skip: !open });
  const refetchQueries = [ActiveMembersDocument, InactiveMembersDocument];
  const [addMember, adding] = useMutation(AddMemberDocument, {
    refetchQueries,
  });
  const [updateMember, updating] = useMutation(UpdateMemberDocument, {
    refetchQueries,
  });

  useEffect(() => {
    if (open) reset(toDefaults(member));
  }, [open, member, reset]);

  const timeOptions = [...(times.data?.allGymClassTimes ?? [])]
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .sort((a, b) => compareLocalTime(a.localTime, b.localTime))
    .map((t) => ({ value: String(t.id), label: formatLocalTime(t.localTime) }));

  const onSubmit = async (v: MemberFormValues) => {
    const plan = {
      phone: v.phone,
      email: v.email,
      memberAttendance: v.attendance,
      preferredClassTime: v.preferredClassTime
        ? Number(v.preferredClassTime)
        : null,
    };
    try {
      let code = member?.code ?? '';
      if (member) {
        await updateMember({
          variables: {
            member: {
              code,
              name: v.name,
              category: v.category || null,
              genre: v.genre || null,
              birthDate: v.birthDate || null,
              height: v.height ?? null,
              observations: v.observations,
              isActive: v.isActive,
              ...plan,
            },
          },
        });
      } else {
        const { data } = await addMember({
          variables: {
            member: {
              name: v.name,
              category: v.category || undefined,
              genre: v.genre || undefined,
              birthDate: v.birthDate || undefined,
              height: v.height,
              observations: v.observations || undefined,
            },
          },
        });
        code = data?.addMember?.code ?? '';
        const hasPlan =
          v.phone ||
          v.email ||
          v.preferredClassTime ||
          Object.values(v.attendance).some(Boolean);
        if (code && hasPlan) {
          await updateMember({ variables: { member: { code, ...plan } } });
        }
      }
      toast.success('Miembro guardado');
      onSaved?.(code);
      onClose();
    } catch (err) {
      BsShowError(err, 'No se pudo guardar el miembro. Intenta de nuevo.');
    }
  };

  return (
    <AppSheet
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar miembro' : 'Nuevo miembro'}
      dirty={formState.isDirty}
      primaryAction={{
        label: 'Guardar',
        type: 'submit',
        form: FORM_ID,
        loading: adding.loading || updating.loading,
      }}
    >
      <form
        id={FORM_ID}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2.5}>
          <Section title="Datos" />
          <FormTextField
            control={control}
            name="name"
            {...noAutofill('name')}
            label="Nombre"
            autoFocus
          />
          <Stack direction="row" spacing={2}>
            <FormSelect
              control={control}
              name="category"
              label="Categoría"
              options={CATEGORIES}
            />
            <FormSelect
              control={control}
              name="genre"
              label="Género"
              options={GENRES}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormDatePicker
              control={control}
              name="birthDate"
              label="Nacimiento"
              disableFuture
            />
            <FormNumberField
              control={control}
              name="height"
              label="Estatura (m)"
            />
          </Stack>
          <Section title="Contacto" />
          <Stack direction="row" spacing={2}>
            <FormTextField
              control={control}
              name="phone"
              {...noAutofill('phone')}
              label="Teléfono"
              type="tel"
            />
            <FormTextField
              control={control}
              name="email"
              {...noAutofill('email')}
              label="Correo"
              type="email"
            />
          </Stack>
          <Section title="Plan" />
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {DAYS.map(([key, label, short]) => (
              <Controller
                key={key}
                control={control}
                name={`attendance.${key}`}
                render={({ field }) => (
                  <ToggleButton
                    value={key}
                    aria-label={label}
                    selected={Boolean(field.value)}
                    onChange={() => field.onChange(!field.value)}
                    size="small"
                    color="primary"
                    sx={{ width: 40 }}
                  >
                    {short}
                  </ToggleButton>
                )}
              />
            ))}
          </Stack>
          <FormSelect
            control={control}
            name="preferredClassTime"
            label="Horario preferido"
            options={timeOptions}
          />
          {isEdit && (
            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <FormControlLabel
                  label="Activo"
                  control={
                    <Switch
                      checked={Boolean(field.value)}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                />
              )}
            />
          )}
          <Section title="Observaciones" />
          <FormTextField
            control={control}
            name="observations"
            {...noAutofill('observations')}
            label="Observaciones"
            multiline
            minRows={3}
          />
        </Stack>
      </form>
    </AppSheet>
  );
}

export default MemberSheet;
