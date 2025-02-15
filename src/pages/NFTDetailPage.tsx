import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  AccountCircle,
  ContentCopy,
  LocalOffer,
  Timeline,
  AddShoppingCart,
  ShoppingCart,
  Delete,
} from '@mui/icons-material';
import type { NFT } from '../types/nft';
import { useCart } from '../contexts/CartContext';
import { pageTransition, buttonHoverEffect, cardHoverEffect } from '../styles/animations';
import { alpha } from '@mui/material/styles';

// 画像のインポート
import image1 from '../assets/generated_image.png';
import image2 from '../assets/generated_image (1).png';
import image3 from '../assets/generated_image (2).png';
import image4 from '../assets/generated_image (3).png';
import image5 from '../assets/generated_image (4).webp';
import image6 from '../assets/generated_image (5).webp';

// サンプルデータを更新
const SAMPLE_NFTS: NFT[] = [
  {
    id: '1',
    title: 'ネオン・ユートピア',
    description: 'サイバーパンクの未来都市が広がる、輝くネオンの楽園。無数のホログラム広告が宙を舞い、デジタルスクリーンには情報が絶えず流れ続ける。人々は仮想と現実の境界を曖昧にしながら、この光の迷宮を行き交う。中心にそびえる巨大なデータタワーは、都市の心臓として脈打ち、すべてのデータとエネルギーを供給している。ここではテクノロジーが神のように機能し、人々の生活を支配している。未来はここにあり、そして無限に広がっていく。',
    imageUrl: image6,
    price: 2.5,
    creator: '0x7890abcdef1234567890abcdef1234567890abcd',
    owner: '0x7890abcdef1234567890abcdef1234567890abcd',
    createdAt: new Date('2024-02-20'),
    likes: 62,
    isLiked: false,
    category: 'illustration',
    style: 'cyberpunk',
    rarity: 'legendary',
  },
  {
    id: '2',
    title: 'ミッドナイト・メモリーズ',
    description: '夜の都市に漂う紫煙とネオンの光が幻想的な空間を作り出す。湿ったアスファルトに反射する無数の光が、夢と現実の狭間を彷徨う旅人を誘う。暗闇に溶け込む街路には、静寂とともに無数の物語が眠っている。古びたビルの隙間から漏れるネオンの輝き、遠くで響く電子音楽、足元に広がる淡い霧が、都市の孤独とロマンを演出する。ここは記憶が交錯し、時間が曖昧になる場所。あなたの思い出の片隅に、この光景は残るだろうか？',
    imageUrl: image5,
    price: 1.8,
    creator: '0x7890abcdef1234567890abcdef1234567890abcd',
    owner: '0x7890abcdef1234567890abcdef1234567890abcd',
    createdAt: new Date('2024-02-18'),
    likes: 45,
    isLiked: false,
    category: 'illustration',
    style: 'cyberpunk',
    rarity: 'epic',
  },
  {
    id: '3',
    title: 'セレスティアル・ヴァレー',
    description: '透き通る青空と流れる滝、緑に囲まれた幻想的な渓谷。遠くにそびえる神秘的な山々、クリスタルのように輝く水流、緑の草原を吹き抜ける心地よい風。ここはまるで異世界に迷い込んだかのような美しさを持つ場所。小さな橋を渡れば、現実を離れ、静寂と安らぎに満ちた別次元へと足を踏み入れることができる。遠くに見える家々は、自然と共存する人々の暮らしを映し出し、ここにしかない特別な時間が流れている。',
    imageUrl: image4,
    price: 2.0,
    creator: '0x7890abcdef1234567890abcdef1234567890abcd',
    owner: '0x7890abcdef1234567890abcdef1234567890abcd',
    createdAt: new Date('2024-02-15'),
    likes: 56,
    isLiked: false,
    category: 'illustration',
    style: 'fantasy',
    rarity: 'legendary',
  },
  {
    id: '4',
    title: 'プールサイドの黒猫',
    description: '夏の日差しが降り注ぐプールサイド。黒のワンピースを着た少女が水に足を浸し、まるで猫のようにリラックスしている。隣には本物の猫も。',
    imageUrl: image3,
    price: 1.5,
    creator: '0x7890abcdef1234567890abcdef1234567890abcd',
    owner: '0x7890abcdef1234567890abcdef1234567890abcd',
    createdAt: new Date('2024-02-10'),
    likes: 35,
    isLiked: false,
    category: 'illustration',
    style: 'anime',
    rarity: 'rare',
  },
  {
    id: '5',
    title: 'エリートオペレーターズ',
    description: '近未来の特務部隊、クールな装備に身を包み、夜の街をパトロールする。都市の陰に潜む脅威に立ち向かう彼らの視線は鋭い。',
    imageUrl: image2,
    price: 1.2,
    creator: '0xabcdef1234567890abcdef1234567890abcdef12',
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    createdAt: new Date('2024-02-05'),
    likes: 28,
    isLiked: true,
    category: 'illustration',
    style: 'cyberpunk',
    rarity: 'legendary',
  },
  {
    id: '6',
    title: 'ネオンシティの散歩',
    description: '未来都市の夜、ネオンが輝く街を歩く二人の少女。カジュアルながらもスタイリッシュなファッションが都会の風景と溶け込んでいる。',
    imageUrl: image1,
    price: 0.8,
    creator: '0x1234567890abcdef1234567890abcdef12345678',
    owner: '0x1234567890abcdef1234567890abcdef12345678',
    createdAt: new Date('2024-02-01'),
    likes: 42,
    isLiked: false,
    category: 'illustration',
    style: 'cyberpunk',
    rarity: 'epic',
  },
];

const NFTDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [nft, setNft] = useState<NFT | null>(() => {
    const foundNft = SAMPLE_NFTS.find(nft => nft.id === id);
    return foundNft || null;
  });
  const { addToCart, removeFromCart, isInCart } = useCart();

  // ページトップへのスクロール処理を追加
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // IDが変更された時にNFTデータを再取得
  useEffect(() => {
    setLoading(true);
    const foundNft = SAMPLE_NFTS.find(nft => nft.id === id);
    setNft(foundNft || null);
    setLoading(false);
  }, [id]);

  const handleLike = () => {
    if (!nft) return;
    setNft({
      ...nft,
      likes: nft.isLiked ? nft.likes - 1 : nft.likes + 1,
      isLiked: !nft.isLiked,
    });
  };

  const handleCartAction = () => {
    if (!nft) return;
    if (isInCart(nft.id)) {
      removeFromCart(nft.id);
    } else {
      addToCart(nft);
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          width: '100%',
          display: 'grid',
          gap: { xs: 3, sm: 4 },
          ...pageTransition,
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12} md={6}>
            <Skeleton 
              variant="rectangular" 
              height={500} 
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={100} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!nft) {
    return (
      <Box 
        sx={{ 
          width: '100%',
          display: 'grid',
          placeItems: 'center',
          minHeight: 'calc(100vh - 200px)',
          ...pageTransition,
        }}
      >
        <Typography 
          variant="h4"
          sx={{ 
            color: 'text.secondary',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            textAlign: 'center'
          }}
        >
          NFTが見つかりませんでした
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'grid',
        gap: { xs: 3, sm: 4 },
        ...pageTransition,
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
        {/* 左側：NFT画像 */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              overflow: 'hidden',
              borderRadius: 2,
              width: '100%',
              position: 'relative',
              ...cardHoverEffect,
              '&:hover::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2) 100%)',
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease-in-out',
              },
              '& img': {
                width: '100%',
                height: 'auto',
                display: 'block',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          >
            <img src={nft.imageUrl} alt={nft.title} />
          </Paper>
        </Grid>

        {/* 右側：NFT情報 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: { xs: 2, sm: 3 },
            width: '100%',
          }}>
            {/* タイトルと操作 */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: { xs: 1, sm: 2 },
              width: '100%',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '100%',
                height: '2px',
                background: (theme) => `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                opacity: 0.5,
              },
            }}>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 'bold',
                }}
              >
                {nft.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton 
                  onClick={handleLike} 
                  color={nft.isLiked ? 'primary' : 'default'}
                  sx={{ 
                    p: 1,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {nft.isLiked ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Typography 
                  color="text.secondary"
                  sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {nft.likes}
                </Typography>
              </Box>
            </Box>

            {/* レアリティと分類 */}
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              flexWrap: 'wrap',
              mb: { xs: 2, sm: 3 },
              width: '100%'
            }}>
              <Chip
                label={`レアリティ: ${nft.rarity}`}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ 
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              />
              <Chip
                label={`カテゴリ: ${nft.category}`}
                color="secondary"
                variant="outlined"
                size="small"
                sx={{ 
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                  },
                }}
              />
              <Chip
                label={`スタイル: ${nft.style}`}
                color="info"
                variant="outlined"
                size="small"
                sx={{ 
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: (theme) => alpha(theme.palette.info.main, 0.1),
                  },
                }}
              />
            </Box>

            {/* 価格とカート */}
            <Paper 
              elevation={1}
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                bgcolor: 'background.paper',
                mb: { xs: 2, sm: 3 },
                width: '100%',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: (theme) => `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                現在価格
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <LocalOffer color="primary" />
                <Typography variant="h3" component="span" color="primary">
                  Ξ {nft.price.toFixed(3)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button
                  variant={isInCart(nft.id) ? "outlined" : "contained"}
                  color="primary"
                  fullWidth
                  startIcon={isInCart(nft.id) ? <Delete /> : <AddShoppingCart />}
                  onClick={handleCartAction}
                  sx={buttonHoverEffect}
                >
                  {isInCart(nft.id) ? 'カートから削除' : 'カートに追加'}
                </Button>
              </Box>
            </Paper>

            {/* 説明 */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                説明
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {nft.description}
              </Typography>
            </Paper>

            {/* 詳細情報 */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                詳細
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    クリエイター
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountCircle fontSize="small" />
                    <Typography variant="body2">
                      {nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}
                    </Typography>
                    <Tooltip title="アドレスをコピー">
                      <IconButton
                        size="small"
                        onClick={() => handleCopyAddress(nft.creator)}
                      >
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    所有者
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountCircle fontSize="small" />
                    <Typography variant="body2">
                      {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                    </Typography>
                    <Tooltip title="アドレスをコピー">
                      <IconButton
                        size="small"
                        onClick={() => handleCopyAddress(nft.owner)}
                      >
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    作成日
                  </Typography>
                  <Chip
                    icon={<Timeline />}
                    label={new Date(nft.createdAt).toLocaleDateString('ja-JP')}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NFTDetailPage; 