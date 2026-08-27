import { useMediaQuery, Paper, Typography, Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: theme.spacing(4),
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  },
  form: {
    maxWidth: theme.spacing(50),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '55%',
    position: 'relative',
    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      minHeight: '400px',
    },
  },
  // Placeholder diagonal shapes for the background
  shape1: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: '60%',
    height: '120%',
    background: '#ffffff',
    transform: 'rotate(-45deg)',
    opacity: 0.1,
  },
  shape2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '60%',
    height: '120%',
    background: '#ffffff',
    transform: 'rotate(-45deg)',
    opacity: 0.05,
  },
  robotPlaceholder: {
    zIndex: 1,
    maxWidth: '80%',
    maxHeight: '60%',
    // We will use an image if provided, else just empty space
  },
  appsCard: {
    position: 'absolute',
    bottom: theme.spacing(4),
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      bottom: theme.spacing(2),
      width: '90%',
      padding: theme.spacing(2),
    },
  },
  appsTitle: {
    fontSize: '0.9rem',
    color: '#475569',
    marginBottom: theme.spacing(2),
  },
  appsIconRow: {
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    width: '100%',
  },
  appIconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  appIconBox: {
    width: 50,
    height: 50,
    borderRadius: theme.spacing(1),
    border: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
  appIconLabel: {
    fontSize: '0.7rem',
    fontWeight: 'bold',
    color: '#000',
  }
}));

const AppIcon = ({ icon: Icon, label }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.appIconWrapper}>
      <div className={classes.appIconBox}>
        <Icon />
      </div>
      <span className={classes.appIconLabel}>{label}</span>
    </div>
  );
};

const LoginLayout = ({ children }) => {
  const { classes } = useStyles();

  return (
    <main className={classes.root}>
      {/* Lado Izquierdo: Formulario */}
      <Box className={classes.formContainer}>
        <form className={classes.form}>{children}</form>
      </Box>

      {/* Lado Derecho: Visual */}
      <div className={classes.sidebar}>
        <div className={classes.shape1} />
        <div className={classes.shape2} />
        
        <Box className={classes.appsCard}>
          <Typography className={classes.appsTitle}>
            Accede a todas nuestras aplicaciones
          </Typography>
          <div className={classes.appsIconRow}>
            {/* These will need material UI icons, we can add them later or in LoginPage */}
            <AppIcon icon={() => <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>} label="GPS" />
            <AppIcon icon={() => <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>} label="ERP" />
            <AppIcon icon={() => <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>} label="CONNECT" />
            <AppIcon icon={() => <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>} label="SECURITY" />
            <AppIcon icon={() => <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>} label="AUTOMATION" />
          </div>
        </Box>
      </div>
    </main>
  );
};

export default LoginLayout;
