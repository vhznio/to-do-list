/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import lightTheme from '@/client/themes/lightTheme';
import 'dayjs/locale/es-mx';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider
        adapterLocale={dayjs.locale('es-mx')}
        dateAdapter={AdapterDayjs}
      >
        <Component {...pageProps} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
