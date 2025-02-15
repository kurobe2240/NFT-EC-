import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        maxWidth: '100%',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        pt: { xs: 10, sm: 11, md: 12 },
        pb: { xs: 6, sm: 8, md: 10 },
        bgcolor: 'background.default',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Box
        className="wrapper"
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px', xl: '1440px' },
          px: { 
            xs: 4,    // モバイル: 32px
            sm: 6,    // タブレット: 48px
            md: 8,    // 小型デスクトップ: 64px
            lg: 10    // 大型デスクトップ: 80px
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 