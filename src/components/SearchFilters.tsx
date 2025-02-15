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
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 3,
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          <FormControl>
            <InputLabel>カテゴリ</InputLabel>
            <Select
              value={value.category}
              label="カテゴリ"
              onChange={handleCategoryChange}
              sx={{ 
                '& .MuiSelect-select': { 
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                },
              }}
            >
              {CATEGORIES.map(category => (
                <MenuItem 
                  key={category.value} 
                  value={category.value}
                  sx={{ 
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {category.icon}
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>スタイル</InputLabel>
            <Select
              value={value.style}
              label="スタイル"
              onChange={handleStyleChange}
              sx={{ 
                '& .MuiSelect-select': { 
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                },
              }}
            >
              {STYLES.map(style => (
                <MenuItem 
                  key={style.value} 
                  value={style.value}
                  sx={{ 
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {style.icon}
                  {style.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>レアリティ</InputLabel>
            <Select
              value={value.rarity}
              label="レアリティ"
              onChange={handleRarityChange}
              sx={{ 
                '& .MuiSelect-select': { 
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                },
              }}
            >
              {RARITY.map(rarity => (
                <MenuItem 
                  key={rarity.value} 
                  value={rarity.value}
                  sx={{ 
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {rarity.icon}
                  {rarity.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>並び替え</InputLabel>
            <Select
              value={value.sortBy}
              label="並び替え"
              onChange={handleSortChange}
              sx={{ 
                '& .MuiSelect-select': { 
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                },
              }}
            >
              {SORT_OPTIONS.map(option => (
                <MenuItem 
                  key={option.value} 
                  value={option.value}
                  sx={{ 
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Sort />
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box 
            sx={{ 
              gridColumn: '1 / -1',
              mt: 1,
              px: 2,
            }}
          >
            <Typography 
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                mb: 2,
              }}
            >
              <LocalOffer fontSize="small" />
              価格範囲 (Ξ)
            </Typography>
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
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${value} Ξ`}
              sx={{
                '& .MuiSlider-thumb': {
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                },
                '& .MuiSlider-track': {
                  transition: 'background-color 0.3s ease-in-out',
                },
              }}
            />
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default SearchFilters; 