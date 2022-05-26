import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {ToastContainer} from "react-toastify"
config.autoAddCss = false

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
        BMW Material Planner
        </title>
        <link rel="icon" type="image/x-icon" href="https://pngimg.com/uploads/bmw_logo/bmw_logo_PNG19714.png"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Roboto:ital,wght@0,300;400;600,1,300&display=swap" rel="stylesheet" /> 
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      
      </Head>
      <script src="https://use.fontawesome.com/589b55b0ea.js"></script>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<><ToastContainer /><Component {...pageProps} /></>)}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
