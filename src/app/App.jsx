import React from 'react';
import PublicRoutes from '../routes/PublicRoute';
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/montserrat/500.css';
import './styles/App.scss';
import AlertBox from '../views/components/customized/AlertBox';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PublicRoutes />
      <AlertBox />
    </ThemeProvider>
  );
}

export default App;
