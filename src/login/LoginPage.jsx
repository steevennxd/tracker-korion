import { useEffect, useRef, useState } from 'react';
import {
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  Button,
  TextField,
  Link,
  Snackbar,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import CountryFlag from 'react-country-flag';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '@mui/icons-material/Close';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { useTheme } from '@mui/material/styles';
import { InputAdornment, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from '../store';
import { useLocalization, useTranslation } from '../common/components/LocalizationProvider';
import LoginLayout from './LoginLayout';
import usePersistedState from '../common/util/usePersistedState';
import {
  generateLoginToken,
  handleLoginTokenListeners,
  nativeEnvironment,
  nativePostMessage,
} from '../common/components/NativeInterface';
import LogoImage from './LogoImage';
import { useCatch } from '../reactHelper';
import QrCodeDialog from '../common/components/QrCodeDialog';
import PasswordField from '../common/components/PasswordField';

const useStyles = makeStyles()((theme) => ({
  options: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  extraContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  registerButton: {
    minWidth: 'unset',
  },
  link: {
    cursor: 'pointer',
  },
  flag: {
    marginRight: theme.spacing(1),
  },
}));

const LoginPage = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const t = useTranslation();

  const { languages, language, setLocalLanguage } = useLocalization();
  const languageList = Object.entries(languages).map((values) => ({
    code: values[0],
    country: values[1].country,
    name: values[1].name,
  }));

  const [failed, setFailed] = useState(false);

  const [email, setEmail] = usePersistedState('loginEmail', '');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showServerTooltip, setShowServerTooltip] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const registrationEnabled = useSelector((state) => state.session.server.registration);
  const languageEnabled = useSelector((state) => {
    const attributes = state.session.server.attributes;
    return !attributes.language && !attributes['ui.disableLoginLanguage'];
  });
  const changeEnabled = useSelector((state) => !state.session.server.attributes.disableChange);
  const emailEnabled = useSelector((state) => state.session.server.emailEnabled);
  const openIdEnabled = useSelector((state) => state.session.server.openIdEnabled);
  const openIdForced = useSelector(
    (state) => state.session.server.openIdEnabled && state.session.server.openIdForce,
  );
  const [codeEnabled, setCodeEnabled] = useState(false);

  const [announcementShown, setAnnouncementShown] = useState(false);
  const announcement = useSelector((state) => state.session.server.announcement);

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setFailed(false);
    try {
      const query = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await fetch('/api/session', {
        method: 'POST',
        body: new URLSearchParams(code.length ? `${query}&code=${code}` : query),
      });
      if (response.ok) {
        const user = await response.json();
        generateLoginToken();
        dispatch(sessionActions.updateUser(user));
        const target = window.sessionStorage.getItem('postLogin') || '/';
        window.sessionStorage.removeItem('postLogin');
        navigate(target, { replace: true });
      } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'TOTP') {
        setCodeEnabled(true);
      } else {
        throw Error(await response.text());
      }
    } catch {
      setFailed(true);
      setPassword('');
    }
  };

  const handleTokenLogin = useCatch(async (token) => {
    const response = await fetch(`/api/session?token=${encodeURIComponent(token)}`);
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      navigate('/');
    } else if (response.status === 401) {
      nativePostMessage('logout');
    }
  });

  const handleTokenLoginRef = useRef(handleTokenLogin);
  handleTokenLoginRef.current = handleTokenLogin;

  const handleOpenIdLogin = () => {
    document.location = '/api/session/openid/auth';
  };

  useEffect(() => nativePostMessage('authentication'), []);

  useEffect(() => {
    const listener = (token) => handleTokenLoginRef.current(token);
    handleLoginTokenListeners.add(listener);
    return () => handleLoginTokenListeners.delete(listener);
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('hostname') !== window.location.hostname) {
      window.localStorage.setItem('hostname', window.location.hostname);
      setShowServerTooltip(true);
    }
  }, []);

  return (
    <LoginLayout>
      <div className={classes.options}>
        {nativeEnvironment && changeEnabled && (
          <IconButton color="primary" onClick={() => navigate('/change-server')}>
            <Tooltip
              title={`${t('settingsServer')}: ${window.location.hostname}`}
              open={showServerTooltip}
              arrow
            >
              <VpnLockIcon />
            </Tooltip>
          </IconButton>
        )}
        {!nativeEnvironment && (
          <IconButton color="primary" onClick={() => setShowQr(true)}>
            <QrCode2Icon />
          </IconButton>
        )}
        {languageEnabled && (
          <FormControl>
            <Select value={language} onChange={(e) => setLocalLanguage(e.target.value)}>
              {languageList.map((it) => (
                <MenuItem key={it.code} value={it.code}>
                  <span className={classes.flag}>
                    <CountryFlag countryCode={it.country} svg />
                  </span>
                  {it.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <div className={classes.container}>
        {!openIdForced && (
          <>
            <img src="/LogoSinFondo.png" alt="Korion Technology" style={{ width: '220px', marginBottom: '24px', alignSelf: 'center' }} />
            <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 700, color: '#1E293B', marginTop: theme.spacing(2) }}>
              Bienvenido
            </Typography>
            <Typography variant="body1" style={{ marginBottom: theme.spacing(4), color: '#475569' }}>
              Accede a tu cuenta <span style={{ color: '#2563EB', fontWeight: 600 }}>Korion</span>
            </Typography>
            <TextField
              required
              error={failed}
              placeholder="Correo electrónico"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus={!email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={failed && 'Correo o contraseña inválidos'}
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon style={{ color: '#94A3B8' }} fontSize="small" />
                  </InputAdornment>
                ),
                style: { borderRadius: '8px', backgroundColor: '#ffffff' } 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E2E8F0' },
                  '&:hover fieldset': { borderColor: '#CBD5E1' },
                  '&.Mui-focused fieldset': { borderColor: '#2563EB' },
                },
                '& input': { color: '#1E293B' },
                '& input::placeholder': { color: '#94A3B8', opacity: 1 },
              }}
            />
            <PasswordField
              required
              error={failed}
              placeholder="Contraseña"
              name="password"
              value={password}
              autoComplete="current-password"
              autoFocus={!!email}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon style={{ color: '#94A3B8' }} fontSize="small" />
                    </InputAdornment>
                  ),
                  style: { borderRadius: '8px', backgroundColor: '#ffffff' }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E2E8F0' },
                  '&:hover fieldset': { borderColor: '#CBD5E1' },
                  '&.Mui-focused fieldset': { borderColor: '#2563EB' },
                },
                '& input': { color: '#1E293B' },
                '& input::placeholder': { color: '#94A3B8', opacity: 1 },
              }}
            />
            {codeEnabled && (
              <TextField
                required
                error={failed}
                placeholder="Código"
                name="code"
                value={code}
                type="number"
                onChange={(e) => setCode(e.target.value)}
                InputProps={{ style: { borderRadius: '8px', backgroundColor: '#ffffff' } }}
              />
            )}
            
            <Link
              onClick={() => navigate('/reset-password')}
              className={classes.link}
              underline="none"
              variant="body2"
              style={{ textAlign: 'right', width: '100%', marginTop: theme.spacing(0.5), color: '#2563EB' }}
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <Button
              onClick={handlePasswordLogin}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              style={{ borderRadius: '8px', padding: '12px 0', fontSize: '1rem', fontWeight: 600, boxShadow: 'none' }}
              fullWidth
              disabled={!email || !password || (codeEnabled && !code)}
            >
              INICIAR SESIÓN
            </Button>
            
            <Divider style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3), color: '#94a3b8', fontSize: '0.875rem' }}>
              o continúa con
            </Divider>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: theme.spacing(4) }}>
              <IconButton style={{ border: '1px solid #e2e8f0', borderRadius: '50%', padding: '12px' }}>
                <VerifiedUserOutlinedIcon color="primary" />
              </IconButton>
            </div>
            
            <Typography variant="body2" style={{ textAlign: 'center', color: '#475569', marginTop: theme.spacing(2) }}>
              <span style={{ fontWeight: 800, color: '#1E293B', fontSize: '1.2rem', marginRight: '8px', verticalAlign: 'middle' }}>K</span>
              Tecnología que <span style={{ color: '#2563EB', fontWeight: 600 }}>conecta</span>, <span style={{ color: '#2563EB', fontWeight: 600 }}>protege</span> y <span style={{ color: '#2563EB', fontWeight: 600 }}>transforma</span>.
            </Typography>
          </>
        )}
        {openIdEnabled && (
          <Button onClick={() => handleOpenIdLogin()} variant="contained" color="secondary">
            {t('loginOpenId')}
          </Button>
        )}
        {!openIdForced && (
          <div className={classes.extraContainer}>
            {registrationEnabled && (
              <Link
                onClick={() => navigate('/register')}
                className={classes.link}
                underline="none"
                variant="caption"
              >
                {t('loginRegister')}
              </Link>
            )}
            {emailEnabled && (
              <Link
                onClick={() => navigate('/reset-password')}
                className={classes.link}
                underline="none"
                variant="caption"
              >
                {t('loginReset')}
              </Link>
            )}
          </div>
        )}
      </div>
      <QrCodeDialog open={showQr} onClose={() => setShowQr(false)} />
      <Snackbar
        open={!!announcement && !announcementShown}
        message={announcement}
        action={
          <IconButton size="small" color="inherit" onClick={() => setAnnouncementShown(true)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </LoginLayout>
  );
};

export default LoginPage;
