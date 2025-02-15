import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Paper,
  IconButton,
  Collapse,
  SelectChangeEvent,
  Chip,
  alpha,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  FilterList,
  ExpandMore,
  ExpandLess,
  Category,
  Palette,
  Star,
  LocalOffer,
  Sort,
  Clear,
} from '@mui/icons-material';
import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import { buttonHoverEffect } from '../styles/animations';

const CATEGORIES = [
  { value: 'all', label: 'すべて', icon: <Category /> },
  { value: 'illustration', label: 'イラスト', icon: <Category /> },
  { value: 'generative', label: 'ジェネラティブアート', icon: <Category /> },
  { value: 'pixel', label: 'ピクセルアート', icon: <Category /> },
  { value: '3d', label: '3Dアート', icon: <Category /> },
  { value: 'photography', label: 'フォトグラフィー', icon: <Category /> },
  { value: 'animation', label: 'アニメーション', icon: <Category /> },
  { value: 'collage', label: 'コラージュ', icon: <Category /> },
];

const STYLES = [
  { value: 'all', label: 'すべて', icon: <Palette /> },
  { value: 'anime', label: 'アニメ調', icon: <Palette /> },
  { value: 'realistic', label: 'リアル調', icon: <Palette /> },
  { value: 'abstract', label: '抽象的', icon: <Palette /> },
  { value: 'minimalist', label: 'ミニマル', icon: <Palette /> },
  { value: 'pop', label: 'ポップ', icon: <Palette /> },
  { value: 'cyberpunk', label: 'サイバーパンク', icon: <Palette /> },
  { value: 'fantasy', label: 'ファンタジー', icon: <Palette /> },
  { value: 'retro', label: 'レトロ', icon: <Palette /> },
];

const RARITY = [
  { value: 'all', label: 'すべて', icon: <Star /> },
  { value: 'common', label: 'コモン', icon: <Star /> },
  { value: 'uncommon', label: 'アンコモン', icon: <Star /> },
  { value: 'rare', label: 'レア', icon: <Star /> },
  { value: 'epic', label: 'エピック', icon: <Star /> },
  { value: 'legendary', label: 'レジェンダリー', icon: <Star /> },
];

const SORT_OPTIONS = [
  { value: 'newest', label: '新着順' },
  { value: 'oldest', label: '古い順' },
  { value: 'price_high', label: '価格が高い順' },
  { value: 'price_low', label: '価格が低い順' },
  { value: 'likes', label: 'いいね数順' },
];

export interface SearchFiltersValue {
  category: string;
  style: string;
  rarity: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

interface SearchFiltersProps {
  value: SearchFiltersValue;
  onChange: (value: SearchFiltersValue) => void;
}

const SearchFilters = ({ value, onChange }: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState([value.minPrice, value.maxPrice]);

  const debouncedPriceChange = useMemo(
    () =>
      debounce((newValue: number[]) => {
        onChange({
          ...value,
          minPrice: newValue[0],
          maxPrice: newValue[1],
        });
      }, 300),
    [onChange, value]
  );

  const handlePriceChange = useCallback((_: Event, newValue: number | number[]) => {
    const priceRange = newValue as number[];
    setLocalPriceRange(priceRange);
    debouncedPriceChange(priceRange);
  }, [debouncedPriceChange]);

  const handleCategoryChange = (e: SelectChangeEvent) => {
    onChange({ ...value, category: e.target.value });
  };

  const handleStyleChange = (e: SelectChangeEvent) => {
    onChange({ ...value, style: e.target.value });
  };

  const handleRarityChange = (e: SelectChangeEvent) => {
    onChange({ ...value, rarity: e.target.value });
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    onChange({ ...value, sortBy: e.target.value });
  };

  const handleResetFilters = () => {
    onChange({
      category: 'all',
      style: 'all',
      rarity: 'all',
      minPrice: 0,
      maxPrice: 10,
      sortBy: 'newest',
    });
    setLocalPriceRange([0, 10]);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      value.category !== 'all' ||
      value.style !== 'all' ||
      value.rarity !== 'all' ||
      value.minPrice !== 0 ||
      value.maxPrice !== 10 ||
      value.sortBy !== 'newest'
    );
  }, [value]);

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 3,
        width: '100%',
        minHeight: showFilters ? 'auto' : '80px',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: (theme) => 
            `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          opacity: hasActiveFilters ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        },
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          minHeight: '48px',
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 1.5, 
            flexWrap: 'wrap',
            flex: 1,
            minHeight: '48px',
            alignItems: 'center',
          }}
        >
          <Chip
            icon={<Category sx={{ ml: 1 }} />}
            label={`カテゴリ: ${CATEGORIES.find(c => c.value === value.category)?.label}`}
            onDelete={value.category !== 'all' ? () => onChange({ ...value, category: 'all' }) : undefined}
            sx={{ 
              height: '48px', 
              fontSize: '1rem', 
              px: 2, 
              minWidth: '200px',
              maxWidth: '300px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
              },
            }}
            color={value.category !== 'all' ? 'primary' : 'default'}
          />
          <Chip
            icon={<Palette sx={{ ml: 1 }} />}
            label={`スタイル: ${STYLES.find(s => s.value === value.style)?.label}`}
            onDelete={value.style !== 'all' ? () => onChange({ ...value, style: 'all' }) : undefined}
            sx={{ 
              height: '48px', 
              fontSize: '1rem', 
              px: 2, 
              minWidth: '200px',
              maxWidth: '300px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
              },
            }}
            color={value.style !== 'all' ? 'secondary' : 'default'}
          />
          <Chip
            icon={<Star sx={{ ml: 1 }} />}
            label={`レアリティ: ${RARITY.find(r => r.value === value.rarity)?.label}`}
            onDelete={value.rarity !== 'all' ? () => onChange({ ...value, rarity: 'all' }) : undefined}
            sx={{ 
              height: '48px', 
              fontSize: '1rem', 
              px: 2, 
              minWidth: '200px',
              maxWidth: '300px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
              },
            }}
            color={value.rarity !== 'all' ? 'info' : 'default'}
          />
          <Chip
            icon={<LocalOffer sx={{ ml: 1 }} />}
            label={`価格: Ξ${value.minPrice.toFixed(1)} - Ξ${value.maxPrice.toFixed(1)}`}
            sx={{ 
              height: '48px', 
              fontSize: '1rem', 
              px: 2, 
              minWidth: '200px',
              maxWidth: '300px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
              },
            }}
            color={value.minPrice !== 0 || value.maxPrice !== 10 ? 'success' : 'default'}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {hasActiveFilters && (
            <Tooltip title="フィルターをリセット">
              <IconButton
                onClick={handleResetFilters}
                sx={{
                  width: '48px',
                  height: '48px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'rotate(90deg)',
                  },
                }}
              >
                <Clear />
              </IconButton>
            </Tooltip>
          )}
          <IconButton 
            onClick={() => setShowFilters(!showFilters)}
            sx={{ 
              width: '48px',
              height: '48px',
              transition: 'all 0.2s ease-in-out',
              transform: showFilters ? 'rotate(180deg)' : 'none',
            }}
          >
            <ExpandMore />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={showFilters}>
        <Box 
          sx={{ 
            mt: 3,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
            width: '100%',
          }}
        >
          <FormControl fullWidth>
            <Select
              value={value.category}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                borderRadius: '12px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1.5,
                  paddingRight: '32px !important',
                },
                '& .MuiSelect-icon': {
                  right: 8,
                  top: 'calc(50% - 12px)',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 2,
                    mt: 1,
                    maxHeight: '60vh',
                  },
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              startAdornment={<Category sx={{ ml: 1, color: 'primary.main', flexShrink: 0 }} />}
            >
              <MenuItem value="">
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  width: '100%', 
                  pr: 3,
                  minHeight: '40px',
                }}>
                  <Typography noWrap>カテゴリ: すべて</Typography>
                </Box>
              </MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 4 }}>
                    <Typography>{cat.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select
              value={value.style}
              onChange={handleStyleChange}
              displayEmpty
              sx={{
                borderRadius: '12px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1.5,
                },
                '& .MuiSelect-icon': {
                  right: 12,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 2,
                    mt: 1,
                  },
                },
              }}
              startAdornment={<Palette sx={{ ml: 1, color: 'secondary.main' }} />}
            >
              <MenuItem value="">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 4 }}>
                  <Typography>スタイル: すべて</Typography>
                </Box>
              </MenuItem>
              {STYLES.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 4 }}>
                    <Typography>{s.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select
              value={value.rarity}
              onChange={handleRarityChange}
              displayEmpty
              sx={{
                borderRadius: '12px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1.5,
                },
                '& .MuiSelect-icon': {
                  right: 12,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 2,
                    mt: 1,
                  },
                },
              }}
              startAdornment={<Star sx={{ ml: 1, color: 'success.main' }} />}
            >
              <MenuItem value="">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 4 }}>
                  <Typography>レアリティ: すべて</Typography>
                </Box>
              </MenuItem>
              {RARITY.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 4 }}>
                    <Typography>{r.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select
              value={value.sortBy}
              onChange={handleSortChange}
              displayEmpty
              sx={{
                borderRadius: '12px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1.5,
                },
                '& .MuiSelect-icon': {
                  right: 12,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 2,
                    mt: 1,
                  },
                },
              }}
              startAdornment={<Sort sx={{ ml: 1, color: 'info.main' }} />}
            >
              <MenuItem value="">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 4 }}>
                  <Typography>並び替え: 新着順</Typography>
                </Box>
              </MenuItem>
              {SORT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 4 }}>
                    <Typography>{option.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 4, px: 2 }}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <LocalOffer sx={{ fontSize: '1.25rem', color: 'primary.main' }} />
              価格範囲 (Ξ)
            </Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={localPriceRange}
                onChange={handlePriceChange}
                min={0}
                max={10}
                step={0.1}
                marks={[
                  { value: 0, label: '0 Ξ' },
                  { value: 5, label: '5 Ξ' },
                  { value: 10, label: '10 Ξ' },
                ]}
                sx={{
                  '& .MuiSlider-thumb': {
                    width: 28,
                    height: 28,
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
                    },
                    '&.Mui-active': {
                      width: 34,
                      height: 34,
                    },
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.32,
                  },
                  '& .MuiSlider-mark': {
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                  },
                  '& .MuiSlider-markLabel': {
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    mt: 0.5,
                  },
                }}
              />
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {localPriceRange[0].toFixed(1)} Ξ
                  </Typography>
                </Paper>
                <Typography variant="body2" color="text.secondary">-</Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {localPriceRange[1].toFixed(1)} Ξ
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default SearchFilters; 