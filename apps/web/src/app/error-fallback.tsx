import { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  Stack,
  Typography,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material';

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
  className?: string;
};

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
  className = '',
}: ErrorFallbackProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const isDev = import.meta.env.DEV;

  const handleCopyError = async () => {
    try {
      await navigator.clipboard.writeText(`${error.message}\n\n${error.stack}`);
    } catch (err) {
      console.warn('Failed to copy error details:', err);
    }
  };

  return (
    <div role="alert" aria-live="assertive" className={`p-6 ${className}`}>
      <Alert severity="error" icon={<ErrorIcon />}>
        <AlertTitle>
          <Typography variant="h6">
            {isDev ? 'Development Error' : 'Something went wrong'}
          </Typography>
        </AlertTitle>

        {isDev ? (
          <Stack spacing={2}>
            <Typography variant="body2">{error.message}</Typography>

            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide' : 'Show'} Details
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<CopyIcon />}
                onClick={handleCopyError}
              >
                Copy Error
              </Button>
            </Stack>

            <Collapse in={showDetails}>
              <pre
                style={{
                  fontSize: '0.75rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '4px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {error.stack}
              </pre>
            </Collapse>
          </Stack>
        ) : (
          <Typography variant="body2">
            An unexpected error occurred. Please try refreshing the page.
          </Typography>
        )}

        <Button
          sx={{ mt: 3 }}
          variant="contained"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={resetErrorBoundary}
        >
          Try Again
        </Button>
      </Alert>
    </div>
  );
};
