import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
import { LoginFormContainer } from 'src/sections/auth/login/LoginFormContainer';
import { RegisterFormContainer } from 'src/sections/auth/register/RegisterFormContainer';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const VIEWS = {
  LOGIN: "LOGIN_VIEW",
  REGISTER: "REGISTER_VIEW"
};

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [currentScreen, setCurrentScreen] = React.useState({ 
    view: VIEWS.LOGIN,
    alert: {
      severity: "error",
      message: ""
    }
  });

  const getcurrentScreen = () => {
    if (currentScreen.view === VIEWS.REGISTER) {
      const goToLoginView = (message) => {
        setCurrentScreen({
          view: VIEWS.LOGIN,
          alert: {
            severity: "success",
            message: message
          }
        });
      }
      return <RegisterFormContainer 
        goToLoginView={goToLoginView} 
      />; 
    }
    return <LoginFormContainer 
      goToRegisterView={() => setCurrentScreen({...currentScreen, view: VIEWS.REGISTER })}
      setAlert={(_alert) => setCurrentScreen({...currentScreen, alert: _alert})}
      alert={currentScreen.alert} 
    />;
  }

  return (
    <>
      <Helmet>
        <title> Authenticate </title>
      </Helmet>

      <StyledRoot>

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            { getcurrentScreen() }
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
