import { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, Snackbar, Box, Typography, IconButton, Paper } from '@mui/material';
import {
  CheckCircle,
  Error,
  Info,
  Warning,
  Close,
} from '@mui/icons-material';
import { keyframes } from '@mui/material/styles';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <CheckCircle sx={{ fontSize: '1.5rem' }} />;
    case 'error':
      return <Error sx={{ fontSize: '1.5rem' }} />;
    case 'warning':
      return <Warning sx={{ fontSize: '1.5rem' }} />;
    case 'info':
      return <Info sx={{ fontSize: '1.5rem' }} />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'success.main';
    case 'error':
      return 'error.main';
    case 'warning':
      return 'warning.main';
    case 'info':
      return 'info.main';
  }
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('info');
  const [exiting, setExiting] = useState(false);

  const showNotification = (message: string, type: NotificationType) => {
    setMessage(message);
    setType(type);
    setExiting(false);
    setOpen(true);
  };

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setOpen(false);
      setExiting(false);
    }, 300);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            padding: 0,
            minWidth: 'auto',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            minWidth: { xs: '90vw', sm: '400px' },
            backgroundColor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
            animation: `${exiting ? slideOut : slideIn} 0.3s ease-in-out`,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              backgroundColor: getNotificationColor(type),
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              p: 2,
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                color: getNotificationColor(type),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getNotificationIcon(type)}
            </Box>
            <Box sx={{ flex: 1, mr: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                {message}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{
                mt: -0.5,
                mr: -0.5,
                color: 'text.secondary',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'text.primary',
                },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 