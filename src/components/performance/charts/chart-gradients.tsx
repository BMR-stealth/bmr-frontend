import { type ChartGradients as ChartGradientsType } from '@/lib/chart-config';

interface ChartGradientsProps {
  gradients: ChartGradientsType;
}

export function ChartGradients({ gradients }: ChartGradientsProps) {
  return (
    <>
      {Object.entries(gradients).map(([key, gradient]) => (
        <linearGradient key={key} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
          {gradient.stops.map((stop, index) => (
            <stop
              key={index}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={stop.opacity}
            />
          ))}
        </linearGradient>
      ))}
    </>
  );
}