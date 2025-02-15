import {
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  alpha,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { buttonHoverEffect } from '../styles/animations';

interface ErrorFallbackProps {
  error: {
    message: string;
    retry?: () => Promise<void>;
  } | null;
  isLoading?: boolean;
  retryCount?: number;
}

const ErrorFallback = ({ error, isLoading, retryCount }: ErrorFallbackProps) => {
  if (!error) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: 'center',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.05),
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'error.main',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <ErrorIcon
          color="error"
          sx={{
            fontSize: '3rem',
            animation: 'shake 0.5s ease-in-out',
            '@keyframes shake': {
              '0%, 100%': { transform: 'translateX(0)' },
              '25%': { transform: 'translateX(-5px)' },
              '75%': { transform: 'translateX(5px)' },
            },
          }}
        />
        <Typography variant="h6" color="error" gutterBottom>
          エラーが発生しました
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {error.message}
        </Typography>
        {retryCount !== undefined && retryCount > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            リトライ回数: {retryCount}
          </Typography>
        )}
        {error.retry && (
          <Button
            variant="contained"
            color="primary"
            onClick={error.retry}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <RefreshIcon />}
            sx={{
              ...buttonHoverEffect,
              minWidth: 200,
            }}
          >
            {isLoading ? 'リトライ中...' : 'もう一度試す'}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ErrorFallback; 