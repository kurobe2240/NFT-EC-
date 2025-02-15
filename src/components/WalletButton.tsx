import { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Paper,
  Popover,
  IconButton,
  alpha,
} from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useWallet } from '../contexts/WalletContext';
import { useNotification } from '../contexts/NotificationContext';
import { buttonHoverEffect } from '../styles/animations';

const WalletButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { isConnected, address, balance, connect, disconnect, formatBalance } = useWallet();
  const { showNotification } = useNotification();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isConnected) {
      await connect();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    disconnect();
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        color="primary"
        variant={isConnected ? "outlined" : "contained"}
        onClick={handleClick}
        sx={{
          ...buttonHoverEffect,
          px: 2,
          py: 1,
          borderRadius: '24px',
          minWidth: '180px',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            opacity: isConnected ? 0 : 0.1,
            transition: 'opacity 0.3s ease-in-out',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
            '&::before': {
              opacity: isConnected ? 0.05 : 0.2,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WalletIcon 
            sx={{
              animation: isConnected ? 'none' : 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
                '50%': {
                  transform: 'scale(1.1)',
                  opacity: 0.7,
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
              },
            }}
          />
          <Box sx={{ textAlign: 'left' }}>
            {isConnected ? (
              <>
                <Typography variant="body2" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  {formatBalance(balance)}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                  {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </Typography>
              </>
            ) : (
              "ウォレット接続"
            )}
          </Box>
        </Box>
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            overflow: 'hidden',
            width: 280,
            borderRadius: 2,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            background: (theme) => alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              接続中のウォレット
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                  {formatBalance(balance)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleDisconnect}
            sx={{
              ...buttonHoverEffect,
              borderRadius: '12px',
            }}
          >
            切断する
          </Button>
        </Paper>
      </Popover>
    </>
  );
};

export default WalletButton; 