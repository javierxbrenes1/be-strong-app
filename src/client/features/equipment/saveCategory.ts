import { Equipment } from './api';
import { EquipmentValues } from './schemas';

// Compara las filas originales con las editadas (ya validadas por zod).
export function planCategoryChanges(
  original: Equipment[],
  edited: EquipmentValues[]
) {
  const byUuid = new Map(original.map((e) => [e.uuid, e]));
  const kept = new Set(edited.map((e) => e.uuid).filter(Boolean));
  return {
    create: edited.filter((e) => !e.uuid),
    update: edited.filter((e) => {
      const o = e.uuid ? byUuid.get(e.uuid) : undefined;
      return (
        o &&
        (o.description !== e.description ||
          o.brand !== e.brand ||
          o.total !== e.total)
      );
    }),
    remove: original.filter((o) => !kept.has(o.uuid)).map((o) => o.uuid),
  };
}
