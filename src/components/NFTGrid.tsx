import { Grid, Box } from '@mui/material';
import { useCallback, useMemo } from 'react';
import type { NFT } from '../types/nft';
import NFTCard from './NFTCard';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

interface NFTGridProps {
  nfts: NFT[];
  onLike?: (id: string) => void;
  loading?: boolean;
  loadingCount?: number;
}

const LOADING_NFT: Partial<NFT> = {
  id: '',
  title: 'Loading...',
  description: 'Loading...',
  imageUrl: '',
  price: 0,
};

const NFTGrid = ({
  nfts,
  onLike,
  loading = false,
  loadingCount = 8,
}: NFTGridProps) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { showNotification } = useNotification();

  // メモ化されたカート状態チェック
  const cartStates = useMemo(() => {
    return nfts.reduce((acc, nft) => {
      acc[nft.id] = isInCart(nft.id);
      return acc;
    }, {} as Record<string, boolean>);
  }, [nfts, isInCart]);

  // カートアクションのハンドラーをメモ化
  const handleCartAction = useCallback((nft: NFT) => {
    const isCurrentlyInCart = cartStates[nft.id];
    try {
      if (isCurrentlyInCart) {
        removeFromCart(nft.id);
        queueMicrotask(() => {
          showNotification('カートから削除しました', 'success');
        });
      } else {
        addToCart(nft);
        queueMicrotask(() => {
          showNotification('カートに追加しました', 'success');
        });
      }
    } catch (error) {
      queueMicrotask(() => {
        showNotification(
          'カートの操作に失敗しました。もう一度お試しください。',
          'error'
        );
      });
      console.error('Cart action failed:', error);
    }
  }, [addToCart, removeFromCart, cartStates, showNotification]);

  // 1件表示時のグリッドサイズを調整
  const gridItemProps = useMemo(() => {
    if (nfts.length === 1) {
      return {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
        sx: { 
          display: 'flex',
          margin: '0 auto',
          maxWidth: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' },
          flexBasis: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' },
          minHeight: '500px',
        }
      };
    }
    return {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      sx: { 
        display: 'flex',
        maxWidth: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' },
        flexBasis: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' },
        minHeight: '500px',
      }
    };
  }, [nfts.length]);

  return (
    <Box 
      sx={{ 
        width: '100%',
        py: 3,
      }}
      role="grid"
      aria-label="NFTグリッド"
    >
      <Grid 
        container 
        spacing={3}
        sx={{ 
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
        role="row"
      >
        {nfts.map((nft) => (
          <Grid 
            item 
            key={nft.id} 
            {...gridItemProps}
            role="gridcell"
            aria-label={`NFTカード: ${nft.title}`}
          >
            <NFTCard 
              nft={nft} 
              onLike={onLike}
              isInCart={cartStates[nft.id]}
              onCartAction={handleCartAction}
              loading={false}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NFTGrid; 