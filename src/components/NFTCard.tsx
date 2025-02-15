import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
  Skeleton,
  CardActionArea,
  Button,
  alpha,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  AccountCircle,
  LocalOffer,
  AddShoppingCart,
  ShoppingCart,
  RemoveShoppingCart,
} from '@mui/icons-material';
import type { NFT } from '../types/nft';
import { useCart } from '../contexts/CartContext';
import { cardHoverEffect, buttonHoverEffect } from '../styles/animations';

interface NFTCardProps {
  nft: NFT;
  onLike?: (id: string) => void;
  loading?: boolean;
  isInCart: boolean;
  onCartAction: (nft: NFT) => void;
}

const NFTCard = ({ nft, onLike, loading = false, isInCart, onCartAction }: NFTCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(nft.id);
  };

  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCartAction(nft);
  };

  const handleClick = () => {
    navigate(`/nft/${nft.id}`);
  };

  if (loading) {
    return (
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          ...cardHoverEffect,
        }}
      >
        <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
        <CardContent sx={{ p: 3, flexGrow: 1 }}>
          <Skeleton variant="text" height={24} width="80%" />
          <Skeleton variant="text" height={20} width="60%" />
          <Box sx={{ mt: 1, display: 'flex', gap: 0.5 }}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={60} height={24} />
          </Box>
        </CardContent>
        <CardActions sx={{ p: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider', justifyContent: 'space-between' }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="rounded" width={100} height={32} />
        </CardActions>
      </Card>
    );
  }

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        ...cardHoverEffect,
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%' }}>
        <CardMedia
          component="img"
          image={nft.imageUrl}
          alt={nft.title}
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isHovered 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)'
              : 'none',
            transition: 'background 0.3s ease-in-out',
          }}
        />
      </Box>
      <CardContent 
        sx={{ 
          p: 3, 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          transition: 'all 0.3s ease-in-out',
          transform: isHovered ? 'translateY(-4px)' : 'none',
        }}
      >
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.3,
            height: '2.6rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 0.5,
            color: 'text.primary',
          }}
        >
          {nft.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '2.4rem',
            lineHeight: 1.2,
            fontSize: '0.875rem',
            mb: 0.5,
            opacity: 0.8,
          }}
        >
          {`${nft.description.split('。')[0]}...`}
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 0.5, 
            flexWrap: 'wrap',
            mb: 'auto',
            mt: 0.5,
          }}
        >
          <Chip 
            label={nft.category} 
            color="primary" 
            variant="outlined"
            size="small"
            sx={{ 
              height: '24px',
              '& .MuiChip-label': {
                px: 1,
                fontSize: '0.75rem',
              },
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Chip 
            label={nft.style} 
            color="secondary" 
            variant="outlined"
            size="small"
            sx={{ 
              height: '24px',
              '& .MuiChip-label': {
                px: 1,
                fontSize: '0.75rem',
              },
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Chip 
            label={nft.rarity} 
            color="success" 
            variant="outlined"
            size="small"
            sx={{ 
              height: '24px',
              '& .MuiChip-label': {
                px: 1,
                fontSize: '0.75rem',
              },
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Typography 
            variant="h5" 
            color="primary" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <LocalOffer sx={{ fontSize: '1.25rem' }} />
            Ξ {nft.price.toFixed(3)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions 
        sx={{ 
          p: 3,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          justifyContent: 'space-between',
          bgcolor: isHovered ? alpha('#000', 0.02) : 'transparent',
          transition: 'all 0.3s ease-in-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            onClick={handleLike}
            color={nft.isLiked ? "error" : "default"}
            size="medium"
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            {nft.isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              transition: 'all 0.2s ease-in-out',
              transform: isHovered ? 'scale(1.05)' : 'none',
            }}
          >
            {nft.likes}
          </Typography>
        </Box>
        <Button
          variant={isInCart ? "outlined" : "contained"}
          size="small"
          startIcon={isInCart ? <RemoveShoppingCart /> : <AddShoppingCart />}
          onClick={handleCartAction}
          sx={{
            minWidth: 130,
            ...buttonHoverEffect,
          }}
        >
          {isInCart ? 'カートから削除' : 'カートに追加'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default NFTCard; 