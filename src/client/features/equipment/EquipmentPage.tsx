import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Card, CardContent, Skeleton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { EmptyState, PageHeader } from '../../design-system';
import { Category, Equipment, EquipmentCategoriesDocument } from './api';
import CategoryCard from './CategoryCard';
import CategorySheet from './CategorySheet';

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
  const [dialog, setDialog] = useState<Dialog>(null);

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
      {!loading && categories.length === 0 && (
        <EmptyState title="Aún no hay equipo registrado" action={newCategory} />
      )}
    </Box>
  );
}

export default EquipmentPage;
