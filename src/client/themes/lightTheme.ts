import { createTheme } from '@mui/material';
import { palette } from '../constants/themes';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: palette.primary.main,
      contrastText: palette.primary.contrastText,
      light: palette.primary.light,
    },
    secondary: {
      main: palette.secondary.main,
      contrastText: palette.secondary.contrastText,
    },
  },
});

export default lightTheme;
