import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material';
import { AppSheet } from '../../design-system';
import { FormNumberField, FormTextField } from '../../design-system/form';
import BsShowError from '../../components/BsShowError';
import {
  Category,
  Equipment,
  EquipmentCategoriesDocument,
  UpsertEquipmentDocument,
} from './api';
import { EquipmentForm, EquipmentValues, equipmentSchema } from './schemas';

type Props = {
  open: boolean;
  category: Category;
  equipment?: Equipment;
  onClose: () => void;
};

const FORM_ID = 'equipment-sheet-form';

const toDefaults = (equipment?: Equipment): EquipmentForm => ({
  description: equipment?.description ?? '',
  brand: equipment?.brand ?? '',
  total: equipment ? String(equipment.total) : '',
});

function EquipmentSheet({ open, category, equipment, onClose }: Props) {
  const client = useApolloClient();
  const { control, handleSubmit, reset, formState } = useForm<
    EquipmentForm,
    unknown,
    EquipmentValues
  >({
    resolver: zodResolver(equipmentSchema),
    defaultValues: toDefaults(equipment),
  });

  useEffect(() => {
    if (open) reset(toDefaults(equipment));
  }, [open, equipment, reset]);

  const onSubmit = async (v: EquipmentValues) => {
    try {
      await client.mutate({
        mutation: UpsertEquipmentDocument,
        variables: {
          input: {
            uuid: equipment?.uuid,
            description: v.description,
            brand: v.brand,
            total: v.total ?? 0,
            equipmentCategoryUuid: category.uuid,
          },
        },
      });
      await client.refetchQueries({ include: [EquipmentCategoriesDocument] });
      toast.success('Equipo guardado');
      onClose();
    } catch (err) {
      BsShowError(err, 'No se pudo guardar el equipo. Intenta de nuevo.');
    }
  };

  return (
    <AppSheet
      open={open}
      onClose={onClose}
      title={equipment ? 'Editar equipo' : 'Agregar equipo'}
      subtitle={category.name}
      dirty={formState.isDirty}
      primaryAction={{
        label: 'Guardar',
        type: 'submit',
        form: FORM_ID,
        loading: formState.isSubmitting,
      }}
    >
      <form
        id={FORM_ID}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2.5}>
          <FormTextField
            control={control}
            name="description"
            label="Descripción"
            autoFocus
          />
          <Stack direction="row" spacing={2}>
            <FormTextField control={control} name="brand" label="Marca" />
            <FormNumberField int control={control} name="total" label="Total" />
          </Stack>
        </Stack>
      </form>
    </AppSheet>
  );
}

export default EquipmentSheet;
