import { grey, green, indigo } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

export default (server, darkMode) => ({
  mode: darkMode ? 'dark' : 'light',
  background: {
    default: darkMode ? '#0B132B' : '#F8FAFC',
    paper: darkMode ? '#0F172A' : '#FFFFFF',
  },
  primary: {
    main:
      validatedColor(server?.attributes?.colorPrimary) || '#2563EB',
  },
  secondary: {
    main:
      validatedColor(server?.attributes?.colorSecondary) || '#10B981',
  },
  neutral: {
    main: grey[500],
  },
  geometry: {
    main: '#3bb2d0',
  },
  alwaysDark: {
    main: grey[900],
  },
});
