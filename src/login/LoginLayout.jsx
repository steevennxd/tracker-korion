import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  // === LEFT PANEL: Form ===
  formPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 0 45%',
    padding: theme.spacing(6),
    backgroundColor: '#ffffff',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      flex: 'none',
      width: '100%',
      padding: theme.spacing(4, 3),
    },
  },
  form: {
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
  },
  // === RIGHT PANEL: Visual ===
  visualPanel: {
    flex: '0 0 55%',
    position: 'relative',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flex: 'none',
      width: '100%',
      minHeight: '380px',
    },
  },
  bgKImage: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '85%',
    height: '85%',
    objectFit: 'contain',
    objectPosition: 'top right',
    zIndex: 0,
  },
  robotImage: {
    position: 'relative',
    zIndex: 1,
    width: '75%',
    maxWidth: '380px',
    objectFit: 'contain',
    marginBottom: '110px',
    [theme.breakpoints.down('md')]: {
      width: '55%',
      marginBottom: '90px',
    },
  },
  appsCard: {
    position: 'absolute',
    bottom: theme.spacing(3),
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: theme.spacing(2, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    zIndex: 2,
    width: '85%',
    maxWidth: '420px',
    [theme.breakpoints.down('md')]: {
      width: '92%',
    },
  },
  appsTitle: {
    fontSize: '0.82rem',
    color: '#64748B',
    marginBottom: theme.spacing(1.5),
    fontWeight: 500,
  },
  appsIconRow: {
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    width: '100%',
  },
  appItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  appIconBox: {
    width: 44,
    height: 44,
    borderRadius: '10px',
    border: '1px solid #F1F5F9',
    backgroundColor: '#F8FAFC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2563EB',
  },
  appLabel: {
    fontSize: '0.65rem',
    fontWeight: 600,
    color: '#1E293B',
    letterSpacing: '0.03em',
  },
}));

const AppItem = ({ svgPath, label }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.appItem}>
      <div className={classes.appIconBox}>
        <svg width="20" height="20" fill="#2563EB" viewBox="0 0 24 24">
          <path d={svgPath} />
        </svg>
      </div>
      <span className={classes.appLabel}>{label}</span>
    </div>
  );
};

const LoginLayout = ({ children }) => {
  const { classes } = useStyles();

  return (
    <main className={classes.root}>
      {/* LEFT: Form Panel */}
      <div className={classes.formPanel}>
        <div className={classes.form}>{children}</div>
      </div>

      {/* RIGHT: Visual Panel */}
      <div className={classes.visualPanel}>
        {/* K background image positioned in upper-right */}
        <img src="/bg_k.png" alt="" className={classes.bgKImage} aria-hidden="true" />

        {/* Robot */}
        <img src="/robot.png" alt="Robot Korion" className={classes.robotImage} />

        {/* Apps Card */}
        <div className={classes.appsCard}>
          <Typography className={classes.appsTitle}>
            Accede a todas nuestras aplicaciones
          </Typography>
          <div className={classes.appsIconRow}>
            <AppItem svgPath="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" label="GPS" />
            <AppItem svgPath="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" label="ERP" />
            <AppItem svgPath="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" label="CONNECT" />
            <AppItem svgPath="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" label="SECURITY" />
            <AppItem svgPath="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" label="AUTOMATION" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginLayout;
