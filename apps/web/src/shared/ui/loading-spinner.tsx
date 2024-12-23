import { Box } from '@mui/material';
import { Hamster } from './hamster';

type LoadingSpinnerProps = {
  size?: number;
  color?: 'primary' | 'secondary';
  fullScreen?: boolean;
  count?: number;
};

export const LoadingSpinner = ({
  size = 40,
  color = 'primary',
  fullScreen = false,
  count = 3,
}: LoadingSpinnerProps) => {
  const containerStyles = fullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }
    : {};

  const speed = 0.5;
  const delayOffset = speed / count;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      gap={2}
      sx={containerStyles}
    >
      {Array.from({ length: count }, (_, index) => (
        <Hamster
          key={index}
          delay={delayOffset * index}
          width={size}
          height={size}
          speed={speed}
        />
      ))}
    </Box>
  );
};
