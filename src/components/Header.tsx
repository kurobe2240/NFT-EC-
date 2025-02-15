import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Badge,
  alpha,
  Slide,
  Fade,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountBalanceWallet as WalletIcon,
  ShoppingCart as CartIcon,
  Home as HomeIcon,
  Explore as ExploreIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useWallet } from '../contexts/WalletContext';
import { useCart } from '../contexts/CartContext';
import CartDrawer from './CartDrawer';
import { buttonHoverEffect } from '../styles/animations';
import WalletButton from './WalletButton';

const MENU_ITEMS = [
  { text: 'ホーム', path: '/', icon: <HomeIcon /> },
  { text: '探索', path: '/explore', icon: <ExploreIcon /> },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, address, balance, connect, disconnect, formatBalance } = useWallet();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleWalletClick = async () => {
    if (isConnected) {
      disconnect();
    } else {
      await connect();
    }
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          NFT Marketplace
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ ...buttonHoverEffect }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ flex: 1, pt: 2 }}>
        {MENU_ITEMS.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                handleDrawerToggle();
              }}
              sx={{
                py: 1.5,
                px: 3,
                transition: 'all 0.2s ease-in-out',
                '&.Mui-selected': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                  },
                },
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <Box sx={{ mr: 2, color: 'primary.main' }}>{item.icon}</Box>
              <ListItemText 
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          transform: !scrolled ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <AppBar
          elevation={scrolled ? 2 : 0}
          sx={{
            position: 'fixed',
            top: !scrolled ? 0 : '-100%',
            left: 0,
            right: 0,
            bgcolor: (theme) => scrolled 
              ? 'background.paper' 
              : alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease-in-out',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              px: { xs: 1, sm: 2, md: 3 },
              minHeight: { xs: '56px', sm: '64px' },
            }}
          >
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="メニューを開く"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ...buttonHoverEffect }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 600,
                letterSpacing: '0.5px',
                transition: 'opacity 0.2s ease-in-out',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              NFT Marketplace
            </Typography>

            <Box 
              sx={{ 
                display: { xs: 'none', sm: 'flex' }, 
                gap: 1,
                mx: 2,
              }}
            >
              {MENU_ITEMS.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{
                    px: 2,
                    py: 1,
                    position: 'relative',
                    ...buttonHoverEffect,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      bgcolor: 'primary.main',
                      transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.2s ease-in-out',
                      transformOrigin: 'left',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            <Box 
              sx={{ 
                display: 'flex', 
                gap: { xs: 0.5, sm: 1 }, 
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              <Tooltip title="カート">
                <IconButton 
                  color="inherit" 
                  onClick={handleCartClick}
                  sx={{
                    ...buttonHoverEffect,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      borderRadius: '50%',
                      border: '2px solid transparent',
                      transition: 'border-color 0.2s ease-in-out',
                    },
                    '&:hover::after': {
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  <Badge 
                    badgeContent={items.length} 
                    color="primary"
                    sx={{
                      '& .MuiBadge-badge': {
                        transform: 'scale(1) translate(25%, -25%)',
                        transition: 'transform 0.2s ease-in-out',
                      },
                      '&:hover .MuiBadge-badge': {
                        transform: 'scale(1.2) translate(25%, -25%)',
                      },
                    }}
                  >
                    <CartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <WalletButton />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component="nav"
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 320 },
            transition: 'width 0.3s ease-in-out',
          }
        }}
      >
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: { xs: '100%', sm: 320 },
              '& .MuiListItemButton-root': {
                py: 2,
                px: 3,
                minHeight: 56,
                '&:active': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
                '& .MuiListItemIcon-root': {
                  minWidth: 40,
                },
              },
            },
          }}
          SlideProps={{
            timeout: {
              enter: 300,
              exit: 200,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toolbar />
    </>
  );
};

export default Header; 