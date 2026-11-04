import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import { Button, IconButton, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AppSheet } from '../../design-system';
import { FormNumberField, FormTextField } from '../../design-system/form';
import BsShowError from '../../components/BsShowError';
import {
  AddEquipmentCategoryDocument,
  Category,
  DeleteEquipmentDocument,
  EquipmentCategoriesDocument,
  UpdateEquipmentCategoryNameDocument,
  UpsertEquipmentDocument,
} from './api';
import { CategoryForm, CategoryValues, categorySchema } from './schemas';
import { planCategoryChanges } from './saveCategory';

type Props = { open: boolean; category?: Category; onClose: () => void };

const FORM_ID = 'category-sheet-form';
const EMPTY_ROW = { description: '', brand: '', total: '' };

function toDefaults(category?: Category): CategoryForm {
  return {
    name: category?.name ?? '',
    equipment: (category?.equipment ?? []).map((e) => ({
      uuid: e.uuid,
      description: e.description,
      brand: e.brand,
      total: String(e.total),
    })),
  };
}

function CategorySheet({ open, category, onClose }: Props) {
  const client = useApolloClient();
  const { control, handleSubmit, reset, formState } = useForm<
    CategoryForm,
    unknown,
    CategoryValues
  >({
    resolver: zodResolver(categorySchema),
    defaultValues: toDefaults(category),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'equipment',
  });

  useEffect(() => {
    if (open) reset(toDefaults(category));
  }, [open, category, reset]);

  const onSubmit = async (v: CategoryValues) => {
    const rows = v.equipment.map((e) => ({
      uuid: e.uuid,
      description: e.description,
      brand: e.brand,
      total: e.total ?? 0,
    }));
    let failed: PromiseRejectedResult | undefined;
    try {
      if (!category) {
        await client.mutate({
          mutation: AddEquipmentCategoryDocument,
          variables: {
            name: v.name,
            equipment: rows.map(({ description, brand, total }) => ({
              description,
              brand,
              total,
            })),
          },
        });
      } else {
        const plan = planCategoryChanges(category.equipment, v.equipment);
        const upsert = (e: (typeof v.equipment)[number]) =>
          client.mutate({
            mutation: UpsertEquipmentDocument,
            variables: {
              input: {
                uuid: e.uuid,
                description: e.description,
                brand: e.brand,
                total: e.total ?? 0,
                equipmentCategoryUuid: category.uuid,
              },
            },
          });
        const results = await Promise.allSettled([
          ...(v.name !== category.name
            ? [
                client.mutate({
                  mutation: UpdateEquipmentCategoryNameDocument,
                  variables: { uuid: category.uuid, name: v.name },
                }),
              ]
            : []),
          ...[...plan.create, ...plan.update].map(upsert),
          ...plan.remove.map((equipmentUuid) =>
            client.mutate({
              mutation: DeleteEquipmentDocument,
              variables: { equipmentUuid },
            })
          ),
        ]);
        failed = results.find(
          (r): r is PromiseRejectedResult => r.status === 'rejected'
        );
      }
      await client.refetchQueries({ include: [EquipmentCategoriesDocument] });
      if (failed) {
        // Parte de los cambios ya se aplicó: se cierra para reabrir con datos frescos.
        BsShowError(
          failed.reason,
          'Algunos cambios no se guardaron. Revisa la categoría.'
        );
        onClose();
        return;
      }
      toast.success('Categoría guardada');
      onClose();
    } catch (err) {
      BsShowError(err, 'No se pudo guardar la categoría. Intenta de nuevo.');
    }
  };

  return (
    <AppSheet
      open={open}
      onClose={onClose}
      title={category ? 'Editar categoría' : 'Nueva categoría'}
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
            name="name"
            label="Nombre"
            autoFocus
          />
          {fields.map((field, i) => (
            <Stack key={field.id} spacing={1.5}>
              <Stack direction="row" spacing={1}>
                <FormTextField
                  control={control}
                  name={`equipment.${i}.description`}
                  label="Descripción"
                />
                <IconButton
                  aria-label={`Quitar ${field.description || 'equipo'}`}
                  onClick={() => remove(i)}
                  sx={{ alignSelf: 'flex-start', mt: 1 }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormTextField
                  control={control}
                  name={`equipment.${i}.brand`}
                  label="Marca"
                />
                <FormNumberField
                  int
                  control={control}
                  name={`equipment.${i}.total`}
                  label="Total"
                />
              </Stack>
            </Stack>
          ))}
          <Button
            startIcon={<AddRoundedIcon />}
            onClick={() => append(EMPTY_ROW)}
            sx={{ alignSelf: 'flex-start' }}
          >
            Agregar equipo
          </Button>
        </Stack>
      </form>
    </AppSheet>
  );
}

export default CategorySheet;
