import { keyframes } from 'stitches.config';

import Box from 'components/base/Box';

interface PulseProps {
  size?: number;
  color?: string;
}

const centerPulse = keyframes({
  '0%': {
    transform: 'translate(-50%, -50%) scale(0.8)',
  },
  '20%': {
    transform: 'translate(-50%, -50%) scale(1)',
  },
  '40%': {
    transform: 'translate(-50%, -50%) scale(1)',
  },
  '100%': {
    transform: 'translate(-50%, -50%) scale(0.8)',
  },
});

const outerPulse = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.1)',
  },
  '50%': {
    opacity: 0.6,
  },
  '100%': {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export default function Pulse(props: PulseProps): JSX.Element {
  const { size = 18, color = '$black100' } = props;
  // 60% of outer circle
  const innerCircleSize = size - (size / 100) * 60;

  return (
    <Box css={{ position: 'relative', width: size, height: size }}>
      <Box
        css={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '$round',
          backgroundColor: color,
          top: '50%',
          left: '50%',
          opacity: 0,
          animation: `${outerPulse} 1.6s ease-out infinite`,
        }}
      />
      <Box
        css={{
          position: 'absolute',
          width: innerCircleSize,
          height: innerCircleSize,
          backgroundColor: color,
          borderRadius: '$round',
          top: '50%',
          left: '50%',
          animation: `${centerPulse} 1.6s linear infinite alternate`,
        }}
      />
    </Box>
  );
}
