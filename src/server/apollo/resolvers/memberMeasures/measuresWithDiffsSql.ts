const METRICS = [
  'weight',
  'corporalFat',
  'muscle',
  'bodyMassIndex',
  'corporalWaterPct',
  'calories',
];
const RESULTS = [
  'muscleResult',
  'bodyMassIndexResult',
  'corporalFatResult',
  'corporalWaterPctResult',
  'caloriesResult',
];

const diffColumn = (c: string) =>
  `ROUND(cast("${c}" - COALESCE(lag("${c}", 1) over(partition by "memberCode" order by "date" asc), "${c}") as numeric), 2) as "${c}Diff"`;

// Diffs are computed over the member's whole history (no date filter), so the
// first row of a filtered range still shows its real delta. Callers filter on `m`.
// $1 = memberCode. Only constant identifiers are interpolated, never user input.
export const measuresWithDiffsCte = `WITH m AS (
SELECT "id", "date",
${METRICS.flatMap((c) => [`"${c}"`, diffColumn(c)]).join(',\n')},
${RESULTS.map((c) => `"${c}"`).join(', ')},
"memberCode"
FROM "app"."memberMeasures"
WHERE "memberCode" = $1
)`;
