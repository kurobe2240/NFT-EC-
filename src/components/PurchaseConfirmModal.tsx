import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Divider,
  alpha,
  Paper,
} from '@mui/material';
import {
  ShoppingCart,
  LocalOffer,
  CheckCircleOutline,
} from '@mui/icons-material';
import type { NFT } from '../types/nft';
import { buttonHoverEffect } from '../styles/animations';

interface PurchaseConfirmModalProps {
  open: boolean;
  onClose: () => void;
  items: NFT[];
  total: number;
  onConfirm: () => Promise<void>;
}

const PurchaseConfirmModal = ({
  open,
  onClose,
  items,
  total,
  onConfirm,
}: PurchaseConfirmModalProps) => {
  const [processing, setProcessing] = useState(false);

  const handleConfirm = async () => {
    setProcessing(true);
    try {
      await onConfirm();
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!processing ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
        },
      }}
      TransitionProps={{
        timeout: 500,
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
        }}
      >
        <ShoppingCart sx={{ fontSize: '1.5rem' }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
          購入の確認
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              mb: 2,
            }}
          >
            購入アイテム
          </Typography>
          <Paper
            elevation={0}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.background.default, 0.6),
              p: 2,
              borderRadius: 1,
            }}
          >
            {items.map((item, index) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.title}
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1,
                        objectFit: 'cover',
                      }}
                    />
                    <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
                  </Box>
                  <Typography
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <LocalOffer sx={{ fontSize: '0.9rem' }} />
                    Ξ {item.price.toFixed(3)}
                  </Typography>
                </Box>
                {index < items.length - 1 && (
                  <Divider sx={{ my: 1 }} />
                )}
              </Box>
            ))}
          </Paper>
        </Box>

        <Box
          sx={{
            p: 3,
            pt: 0,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 1,
              background: (theme) =>
                `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
                  theme.palette.secondary.main,
                  0.1
                )})`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                合計
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <LocalOffer sx={{ fontSize: '1.2rem' }} />
                Ξ {total.toFixed(3)}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          gap: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          onClick={onClose}
          disabled={processing}
          variant="outlined"
          sx={{
            flex: 1,
            py: 1,
            ...buttonHoverEffect,
          }}
        >
          キャンセル
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={processing}
          sx={{
            flex: 1,
            py: 1,
            position: 'relative',
            ...buttonHoverEffect,
          }}
        >
          {processing ? (
            <>
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  marginLeft: '-12px',
                }}
              />
              <Typography
                sx={{
                  visibility: 'hidden',
                }}
              >
                購入する
              </Typography>
            </>
          ) : (
            <>
              <CheckCircleOutline sx={{ mr: 1 }} />
              購入する
            </>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseConfirmModal; 