import { styled } from 'stitches.config';

interface ProgressCircleProps {
  percent: number;
  size: number;
  strokeWidth: number;
}

export default function ProgressCircle(props: ProgressCircleProps) {
  const { percent, size, strokeWidth = 2 } = props;

  const RADIUS = size / 2 - 2;
  const CIRCUMFERENCE = RADIUS * 2 * Math.PI;

  const offset = CIRCUMFERENCE + (percent / 100) * CIRCUMFERENCE;

  return (
    <svg
      width={size}
      height={size}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={RADIUS}
        css={{
          stroke: '$black10',
          strokeWidth,
        }}
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={RADIUS}
        css={{
          stroke: '$black100',
          strokeLinecap: 'round',
          strokeDasharray: `${CIRCUMFERENCE} ${CIRCUMFERENCE}`,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
          transition: 'stroke-dashoffset 0.35s',
        }}
        style={{
          strokeDashoffset: offset,
          strokeWidth,
        }}
      />
    </svg>
  );
}

const Circle = styled('circle', { fill: 'transparent' });
