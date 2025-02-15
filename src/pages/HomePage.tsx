import { Typography, Box, Button, Container, Paper, alpha } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { buttonHoverEffect } from '../styles/animations';

const HomePage = () => {
  const { showNotification } = useNotification();

  const handleListNFTClick = () => {
    showNotification('デモ用のサイトのため現在出品できません', 'info');
  };

  return (
    <Container 
      sx={{
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        minHeight: 'calc(100vh - 200px)', // ヘッダーとマージンを考慮
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 4, md: 5 },
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 700,
            mb: { xs: 1, sm: 2 },
            textAlign: 'center',
            width: '100%',
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          NFT Marketplace
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'warning.main',
            maxWidth: '600px',
            width: '100%',
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: 'warning.main',
              mb: 1,
            }}
          >
            ポートフォリオ用デモサイト
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            このサイトはポートフォリオ用のデモサイトです。実際の取引機能は実装されていません。
            デモ用のウォレットを使用して、NFTの閲覧、カートへの追加、いいねなどの機能をお試しいただけます。
          </Typography>
        </Paper>
        
        <Typography 
          variant="h5" 
          component="h2" 
          color="text.secondary"
          sx={{
            maxWidth: '600px',
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            mb: { xs: 2, sm: 3 },
            textAlign: 'center',
            width: '100%'
          }}
        >
          あなたのデジタルアートをNFTとして売買できるプラットフォーム
        </Typography>

        <Box
          sx={{ 
            display: 'flex', 
            gap: 2,
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Button
            component={Link}
            to="/explore"
            variant="contained"
            size="large"
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              ...buttonHoverEffect,
            }}
          >
            NFTを探す
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleListNFTClick}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              ...buttonHoverEffect,
            }}
          >
            NFTを出品
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage; 