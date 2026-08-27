import { useMediaQuery, Paper, Typography, Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0B132B 0%, #172554 100%)',
    width: '50%',
    padding: theme.spacing(5),
    color: '#ffffff',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  logo: {
    maxWidth: '300px',
    marginBottom: theme.spacing(3),
  },
  subtitle: {
    fontWeight: 300,
    fontSize: '1.2rem',
    textAlign: 'center',
    opacity: 0.9,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    boxShadow: 'none',
    backgroundColor: theme.palette.mode === 'dark' ? '#0F172A' : '#ffffff',
  },
  form: {
    maxWidth: theme.spacing(52),
    padding: theme.spacing(5),
    width: '100%',
  },
}));

const LoginLayout = ({ children }) => {
  const { classes } = useStyles();
  const theme = useTheme();

  return (
    <main className={classes.root}>
      <div className={classes.sidebar}>
        <img src="/LogoSinfondoW.png" alt="Korion Technology" className={classes.logo} />
        <Typography variant="h5" className={classes.subtitle}>
          Plataforma Inteligente de Telemetría y Rastreo Satelital
        </Typography>
      </div>
      <Paper className={classes.paper} square>
        <form className={classes.form}>{children}</form>
      </Paper>
    </main>
  );
};

export default LoginLayout;
