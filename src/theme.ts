import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#646cff',
      light: '#747bff',
      dark: '#535bf2',
    },
    secondary: {
      main: '#61dafb',
      light: '#74e1fc',
      dark: '#4eb3d3',
    },
    background: {
      default: '#242424',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3.2em',
      lineHeight: 1.1,
    },
    button: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          '&:hover': {
            borderColor: '#646cff',
            backgroundColor: 'rgba(100, 108, 255, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#1a1a1a',
        },
      },
    },
  },
});

export default theme; 