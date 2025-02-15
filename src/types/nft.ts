export type NFTCategory = 'illustration' | 'generative' | 'pixel' | '3d' | 'photography' | 'animation' | 'collage';
export type NFTStyle = 'anime' | 'realistic' | 'abstract' | 'minimalist' | 'pop' | 'cyberpunk' | 'fantasy' | 'retro';
export type NFTRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface NFT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  creator: string;
  owner: string;
  createdAt: Date;
  likes: number;
  isLiked?: boolean;
  category: NFTCategory;
  style: NFTStyle;
  rarity: NFTRarity;
} 