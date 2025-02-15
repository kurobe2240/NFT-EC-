import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import NFTDetailPage from './pages/NFTDetailPage';
import { WalletProvider } from './contexts/WalletContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            WebkitTapHighlightColor: 'transparent !important',
            WebkitTouchCallout: 'none !important',
            WebkitUserSelect: 'none !important',
            '&:focus': {
              outline: 'none !important',
            },
          },
          'button, a, [role="button"]': {
            WebkitTapHighlightColor: 'transparent !important',
            WebkitTouchCallout: 'none !important',
            WebkitUserSelect: 'none !important',
            touchAction: 'manipulation',
            '&:focus': {
              outline: 'none !important',
            },
          },
          '.MuiButtonBase-root': {
            WebkitTapHighlightColor: 'transparent !important',
            '&:focus': {
              outline: 'none !important',
            },
          },
        }}
      />
      <NotificationProvider>
        <WalletProvider>
          <CartProvider>
            <Router>
              <Header />
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/nft/:id" element={<NFTDetailPage />} />
                </Routes>
              </Layout>
            </Router>
          </CartProvider>
        </WalletProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
