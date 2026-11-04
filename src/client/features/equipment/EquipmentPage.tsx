import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Box, Button, Card, CardContent, Skeleton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import BsShowError from '../../components/BsShowError';
import { ConfirmDialog, EmptyState, PageHeader } from '../../design-system';
import {
  Category,
  DeleteEquipmentCategoryDocument,
  DeleteEquipmentDocument,
  Equipment,
  EquipmentCategoriesDocument,
} from './api';
import CategoryCard from './CategoryCard';
import CategorySheet from './CategorySheet';
import EquipmentSheet from './EquipmentSheet';

export type Dialog =
  | { kind: 'category'; category?: Category }
  | { kind: 'equipment'; category: Category; equipment?: Equipment }
  | { kind: 'deleteCategory'; category: Category }
  | { kind: 'deleteEquipment'; equipment: Equipment }
  | null;

function EquipmentPage() {
  const { data, loading } = useQuery(EquipmentCategoriesDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const client = useApolloClient();
  const [dialog, setDialog] = useState<Dialog>(null);
  const [deleting, setDeleting] = useState(false);

  const remove = async (mutate: () => Promise<unknown>, message: string) => {
    setDeleting(true);
    try {
      await mutate();
      await client.refetchQueries({ include: [EquipmentCategoriesDocument] });
      toast.success(message);
      setDialog(null);
    } catch (err) {
      BsShowError(err, 'No se pudo eliminar. Intenta de nuevo.');
    } finally {
      setDeleting(false);
    }
  };

  const categories: Category[] = (data?.getEquipmentCategories ?? []).flatMap(
    (c) =>
      c?.uuid
        ? [
            {
              uuid: c.uuid,
              name: c.name ?? '',
              equipment: (c.equipment ?? []).flatMap((e) =>
                e?.uuid
                  ? [
                      {
                        uuid: e.uuid,
                        description: e.description ?? '',
                        brand: e.brand ?? '',
                        total: e.total ?? 0,
                      },
                    ]
                  : []
              ),
            },
          ]
        : []
  );

  const newCategory = (
    <Button
      variant="contained"
      startIcon={<AddRoundedIcon />}
      onClick={() => setDialog({ kind: 'category' })}
    >
      Nueva categoría
    </Button>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader title="Equipo" actions={newCategory} />
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}
      >
        {loading &&
          !data &&
          [0, 1, 2].map((i) => (
            <Card key={i} aria-hidden>
              <CardContent>
                <Skeleton width="50%" height={32} />
                <Skeleton width="30%" height={40} />
                <Skeleton height={24} />
                <Skeleton height={24} />
              </CardContent>
            </Card>
          ))}
        {categories.map((c) => (
          <CategoryCard
            key={c.uuid}
            category={c}
            onAddEquipment={() => setDialog({ kind: 'equipment', category: c })}
            onEditCategory={() => setDialog({ kind: 'category', category: c })}
            onDeleteCategory={() =>
              setDialog({ kind: 'deleteCategory', category: c })
            }
            onEditEquipment={(equipment) =>
              setDialog({ kind: 'equipment', category: c, equipment })
            }
            onDeleteEquipment={(equipment) =>
              setDialog({ kind: 'deleteEquipment', equipment })
            }
          />
        ))}
      </Box>
      <CategorySheet
        open={dialog?.kind === 'category'}
        category={dialog?.kind === 'category' ? dialog.category : undefined}
        onClose={() => setDialog(null)}
      />
      {dialog?.kind === 'equipment' && (
        <EquipmentSheet
          open
          category={dialog.category}
          equipment={dialog.equipment}
          onClose={() => setDialog(null)}
        />
      )}
      <ConfirmDialog
        open={dialog?.kind === 'deleteCategory'}
        title="¿Eliminar categoría?"
        description="Se eliminarán también todos sus equipos. Esta acción no se puede deshacer."
        loading={deleting}
        onCancel={() => setDialog(null)}
        onConfirm={() =>
          dialog?.kind === 'deleteCategory' &&
          remove(
            () =>
              client.mutate({
                mutation: DeleteEquipmentCategoryDocument,
                variables: { categoryUuid: dialog.category.uuid },
              }),
            'Categoría eliminada'
          )
        }
      />
      <ConfirmDialog
        open={dialog?.kind === 'deleteEquipment'}
        title="¿Eliminar equipo?"
        description="Esta acción no se puede deshacer."
        loading={deleting}
        onCancel={() => setDialog(null)}
        onConfirm={() =>
          dialog?.kind === 'deleteEquipment' &&
          remove(
            () =>
              client.mutate({
                mutation: DeleteEquipmentDocument,
                variables: { equipmentUuid: dialog.equipment.uuid },
              }),
            'Equipo eliminado'
          )
        }
      />
      {!loading && categories.length === 0 && (
        <EmptyState title="Aún no hay equipo registrado" action={newCategory} />
      )}
    </Box>
  );
}

export default EquipmentPage;
