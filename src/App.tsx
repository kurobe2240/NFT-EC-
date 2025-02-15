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
            WebkitTapHighlightColor: 'transparent',
            '&:focus': {
              outline: 'none',
            },
          },
          'button, a': {
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'manipulation',
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
