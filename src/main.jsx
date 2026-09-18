import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/globalStyles';
import AppProvider from './hooks';
import { Elements } from '@stripe/react-stripe-js';
import stripePromisse from './config/stripeConfig';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standart';
import { Router } from './routes';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromisse}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Elements>
        <GlobalStyles />
        <ToastContainer autoClose={2000} theme='colored' />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
