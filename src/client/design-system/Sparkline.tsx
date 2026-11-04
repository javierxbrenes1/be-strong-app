type Props = { points: number[]; height?: number };

const WIDTH = 100;

function Sparkline({ points, height = 34 }: Props) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const range = Math.max(...points) - min || 1;
  const pad = 2;
  const coords = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * WIDTH;
      const y = pad + (1 - (p - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${height}`}
      preserveAspectRatio="none"
      width="100%"
      height={height}
    >
      <polyline
        points={coords}
        fill="none"
        stroke="var(--mui-palette-primaryInk)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default Sparkline;
