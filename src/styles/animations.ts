import { keyframes } from '@mui/material/styles';

// フェードインアニメーション
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// スケールアップアニメーション
export const scaleUp = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

// キラキラエフェクト
export const sparkle = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// ホバーエフェクト用の共通スタイル
export const hoverEffect = {
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: (theme: any) => theme.shadows[8],
  },
};

// グラデーションアニメーション用の背景
export const gradientBackground = {
  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96E6A1)',
  backgroundSize: '300% 300%',
  animation: `${sparkle} 15s ease infinite`,
};

// ページトランジション用のスタイル
export const pageTransition = {
  animation: `${fadeIn} 0.5s ease-out`,
};

// カード用のホバーエフェクト
export const cardHoverEffect = {
  ...hoverEffect,
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  '& img': {
    transition: 'transform 0.3s ease-in-out',
  },
};

// ボタン用のホバーエフェクト
export const buttonHoverEffect = {
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(-100%)',
  },
  '&:hover::after': {
    transform: 'translateX(0)',
    transition: 'transform 0.3s ease-out',
  },
}; 