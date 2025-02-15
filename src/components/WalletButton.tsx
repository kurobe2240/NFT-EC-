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
          px: { xs: 1.5, sm: 2 },
          py: 1,
          borderRadius: '24px',
          minWidth: { xs: '44px', sm: '180px' },
          height: '44px',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
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
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, sm: 1 },
          width: '100%',
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
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
          <Box sx={{ 
            textAlign: 'left',
            display: { xs: isConnected ? 'none' : 'block', sm: 'block' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {isConnected ? (
              <>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: '0.75rem', 
                    opacity: 0.8,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {formatBalance(balance)}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: '0.75rem',
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </Typography>
              </>
            ) : (
              <Typography 
                variant="body2"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  whiteSpace: 'nowrap',
                  display: { xs: 'none', sm: 'inline' }
                }}
              >
                ウォレット接続
              </Typography>
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
            width: { xs: '100%', sm: 280 },
            maxWidth: '100%',
            borderRadius: { xs: '16px 16px 0 0', sm: 2 },
            position: { xs: 'fixed', sm: 'absolute' },
            bottom: { xs: 0, sm: 'auto' },
            left: { xs: 0, sm: 'auto' },
            right: { xs: 0, sm: 'auto' },
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.2),
            backdropFilter: 'blur(4px)',
          },
        }}
        transitionDuration={{
          enter: 300,
          exit: 200,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 2 },
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
                touchAction: 'manipulation',
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
              py: { xs: 1.5, sm: 1 },
              '&:active': {
                transform: 'scale(0.98)',
              },
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