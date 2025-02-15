import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import {
  Close,
  ShoppingCart,
  Delete,
  AccountBalanceWallet,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useWallet } from '../contexts/WalletContext';
import { useNotification } from '../contexts/NotificationContext';
import PurchaseConfirmModal from './PurchaseConfirmModal';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = {
  xs: '100%',    // モバイル：フルスクリーン
  sm: '400px',   // タブレット：400px
  md: '450px'    // デスクトップ：450px
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, removeFromCart, total, clearCart } = useCart();
  const { showNotification } = useNotification();
  const { isConnected, balance, deductBalance, formatBalance } = useWallet();
  const navigate = useNavigate();
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const handleItemClick = (id: string) => {
    onClose();
    // 遷移前にスクロールをトップに戻す
    window.scrollTo(0, 0);
    // 即座に遷移を実行
    navigate(`/nft/${id}`);
  };

  const handlePurchaseClick = () => {
    if (!isConnected) {
      showNotification('購入するにはウォレットを接続してください', 'warning');
      return;
    }
    setPurchaseModalOpen(true);
  };

  const handlePurchaseConfirm = async () => {
    try {
      // 残高チェックと差し引き
      const success = deductBalance(total);
      if (!success) {
        return;
      }

      // デモ用の遅延を追加
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 購入完了後の処理
      clearCart();
      showNotification('購入が完了しました！', 'success');
      setPurchaseModalOpen(false);
      onClose();
    } catch (error) {
      showNotification('購入処理中にエラーが発生しました', 'error');
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        variant="temporary"
        elevation={3}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderLeft: '1px solid',
            borderColor: 'divider',
            transition: 'transform 0.3s ease-in-out',
            p: { xs: 2, sm: 3 },
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          gap: 2
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="h6">
              カート
              {items.length > 0 && ` (${items.length})`}
            </Typography>
            <IconButton onClick={onClose} edge="end">
              <Close />
            </IconButton>
          </Box>

          {items.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              gap: 2,
              py: 4
            }}>
              <ShoppingCart sx={{ fontSize: 48, color: 'text.secondary' }} />
              <Typography color="text.secondary">
                カートは空です
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ 
                flex: 1, 
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                {items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'background.default',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.title}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 1,
                        objectFit: 'cover',
                      }}
                      onClick={() => handleItemClick(item.id)}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 0.5, cursor: 'pointer' }}
                        onClick={() => handleItemClick(item.id)}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Ξ {item.price.toFixed(3)}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => {
                        removeFromCart(item.id);
                        showNotification('カートから削除しました', 'success');
                      }}
                      sx={{ alignSelf: 'center' }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Box sx={{ 
                p: 2, 
                borderTop: '1px solid', 
                borderColor: 'divider',
                bgcolor: 'background.default'
              }}>
                {isConnected && (
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountBalanceWallet color="primary" />
                    <Typography>
                      残高: {formatBalance(balance)}
                    </Typography>
                  </Box>
                )}
                <Tooltip title={!isConnected ? "購入するにはウォレットを接続してください" : ""}>
                  <span style={{ width: '100%' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<ShoppingCart />}
                      onClick={handlePurchaseClick}
                      disabled={!isConnected}
                    >
                      購入する ({formatBalance(total)})
                    </Button>
                  </span>
                </Tooltip>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
      <PurchaseConfirmModal
        open={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        items={items}
        total={total}
        onConfirm={handlePurchaseConfirm}
      />
    </>
  );
};

export default CartDrawer; 