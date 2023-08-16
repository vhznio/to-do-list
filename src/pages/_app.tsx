/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import lightTheme from '@/client/themes/lightTheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
