import { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Fade,
  CircularProgress,
  Pagination,
  Skeleton,
  Alert,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Explore as ExploreIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  SortByAlpha as SortIcon,
} from '@mui/icons-material';
import NFTGrid from '../components/NFTGrid';
import SearchFilters, { SearchFiltersValue } from '../components/SearchFilters';
import type { NFT } from '../types/nft';
import { useNotification } from '../contexts/NotificationContext';
import { pageTransition, buttonHoverEffect } from '../styles/animations';
import { useErrorHandler } from '../hooks/useErrorHandler';
import ErrorFallback from '../components/ErrorFallback';

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
    creator: '0x7890...abcd',
    owner: '0x7890...abcd',
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
    creator: '0x7890...abcd',
    owner: '0x7890...abcd',
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
    creator: '0x7890...abcd',
    owner: '0x7890...abcd',
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
    creator: '0x7890...abcd',
    owner: '0x7890...abcd',
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
    creator: '0xabcd...ef12',
    owner: '0xabcd...ef12',
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
    creator: '0x1234...5678',
    owner: '0x1234...5678',
    createdAt: new Date('2024-02-01'),
    likes: 42,
    isLiked: false,
    category: 'illustration',
    style: 'cyberpunk',
    rarity: 'epic',
  },
];

const DEFAULT_FILTERS: SearchFiltersValue = {
  category: 'all',
  style: 'all',
  rarity: 'all',
  minPrice: 0,
  maxPrice: 10,
  sortBy: 'newest',
};

const ITEMS_PER_PAGE = 6;

const LOADING_NFT: Partial<NFT> = {
  id: '',
  title: 'Loading...',
  description: 'Loading...',
  imageUrl: '',
  price: 0,
  creator: '',
  owner: '',
  createdAt: new Date(),
  likes: 0,
  isLiked: false,
  category: 'illustration',
  style: 'minimalist',
  rarity: 'common',
};

type SortFunction = (a: NFT, b: NFT) => number;
type SortFunctions = {
  [key in SearchFiltersValue['sortBy']]: SortFunction;
};

const ExplorePage = () => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<NFT[]>(SAMPLE_NFTS);
  const [filters, setFilters] = useState<SearchFiltersValue>(() => {
    const savedFilters = localStorage.getItem('nftFilters');
    return savedFilters ? JSON.parse(savedFilters) : DEFAULT_FILTERS;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const {
    error,
    isLoading: isErrorLoading,
    retryCount,
    executeWithRetry,
    clearError
  } = useErrorHandler({
    timeout: 5000,    // 5秒でタイムアウト
    maxRetries: 3,    // 最大3回リトライ
    retryDelay: 1000  // 1秒間隔でリトライ
  });
  const theme = useTheme();
  const { showNotification } = useNotification();

  // フィルターが変更されたらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('nftFilters', JSON.stringify(filters));
    setCurrentPage(1); // フィルター変更時にページをリセット
  }, [filters]);

  // フィルター変更時のローディング状態を最適化
  useEffect(() => {
    const fetchData = async () => {
      try {
        await executeWithRetry(async () => {
          // 実際のAPIコールをシミュレート
          await new Promise((resolve, reject) => {
            // ランダムにエラーを発生させる（デモ用）
            if (Math.random() < 0.3) {
              reject(new Error('ネットワークエラーが発生しました'));
            }
            setTimeout(resolve, 300);
          });
        });
      } catch (error) {
        // エラーは useErrorHandler で処理されるため、ここでは何もしない
      }
    };

    fetchData();
  }, [filters, executeWithRetry]);

  const handleLike = (id: string) => {
    setNfts((prevNfts) =>
      prevNfts.map((nft) =>
        nft.id === id
          ? {
              ...nft,
              likes: nft.isLiked ? nft.likes - 1 : nft.likes + 1,
              isLiked: !nft.isLiked,
            }
          : nft
      )
    );
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    showNotification('フィルターをリセットしました', 'info');
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // フィルタリングと並び替えを最適化
  const filteredAndSortedNfts = useMemo(() => {
    // 一度の反復で全フィルターを適用
    const result = nfts.filter(nft => {
      const categoryMatch = filters.category === 'all' || nft.category === filters.category;
      const styleMatch = filters.style === 'all' || nft.style === filters.style;
      const rarityMatch = filters.rarity === 'all' || nft.rarity === filters.rarity;
      const priceMatch = nft.price >= filters.minPrice && nft.price <= filters.maxPrice;
      
      return categoryMatch && styleMatch && rarityMatch && priceMatch;
    });

    // 並び替えロジックを最適化
    const rarityOrder = {
      legendary: 5,
      epic: 4,
      rare: 3,
      uncommon: 2,
      common: 1,
    };

    const sortFunctions: SortFunctions = {
      newest: (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      oldest: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      price_high: (a, b) => b.price - a.price,
      price_low: (a, b) => a.price - b.price,
      likes: (a, b) => b.likes - a.likes,
    };

    return result.sort(sortFunctions[filters.sortBy]);
  }, [filters, nfts]);

  // ページネーション用のNFTデータ
  const paginatedNfts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedNfts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedNfts, currentPage]);

  // 総ページ数の計算
  const totalPages = Math.ceil(filteredAndSortedNfts.length / ITEMS_PER_PAGE);

  // アクティブなフィルターの数を計算
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.style !== 'all') count++;
    if (filters.rarity !== 'all') count++;
    if (filters.minPrice !== 0 || filters.maxPrice !== 10) count++;
    if (filters.sortBy !== 'newest') count++;
    return count;
  }, [filters]);

  // NFTグリッドのローディング件数を最適化
  const loadingCount = useMemo(() => {
    if (filteredAndSortedNfts.length === 0) return ITEMS_PER_PAGE;
    return Math.min(filteredAndSortedNfts.length, ITEMS_PER_PAGE);
  }, [filteredAndSortedNfts.length]);

  return (
    <Fade in timeout={500}>
      <Box 
        sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 4 },
          ...pageTransition,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            p: { xs: 2, sm: 3, md: 4 },
            background: (theme) => `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
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
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ExploreIcon 
                sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  color: 'primary.main',
                }}
              />
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  fontWeight: 600,
                  background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                NFTを探索
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {activeFiltersCount > 0 && (
                <Tooltip title="フィルターをリセット">
                  <IconButton
                    onClick={handleResetFilters}
                    sx={{
                      ...buttonHoverEffect,
                      bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                      color: 'error.main',
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          <SearchFilters value={filters} onChange={setFilters} />
        </Paper>

        <Box sx={{ width: '100%', position: 'relative' }}>
          {/* 結果サマリー */}
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <SearchIcon fontSize="small" />
              {loading ? (
                <Skeleton width={150} />
              ) : (
                `${filteredAndSortedNfts.length}件のNFTが見つかりました`
              )}
            </Typography>
            {activeFiltersCount > 0 && (
              <Typography 
                variant="body2" 
                color="primary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <FilterIcon fontSize="small" />
                {`${activeFiltersCount}個のフィルターが適用中`}
              </Typography>
            )}
          </Box>

          {/* エラー表示 */}
          <ErrorFallback
            error={error}
            isLoading={isErrorLoading}
            retryCount={retryCount}
          />

          {/* NFTグリッド */}
          {loading ? (
            <NFTGrid
              nfts={Array(loadingCount).fill(LOADING_NFT)}
              loading={true}
              loadingCount={loadingCount}
            />
          ) : filteredAndSortedNfts.length === 0 ? (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'background.default',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                NFTが見つかりませんでした
              </Typography>
              <Typography color="text.secondary">
                フィルター条件を変更して再度お試しください
              </Typography>
            </Paper>
          ) : (
            <>
              <NFTGrid 
                nfts={paginatedNfts} 
                onLike={handleLike}
                loading={loading}
              />
              {totalPages > 1 && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    mt: 4,
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                        '&.Mui-selected': {
                          fontWeight: 'bold',
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Fade>
  );
};

export default ExplorePage; 