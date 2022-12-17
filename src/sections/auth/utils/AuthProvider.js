import * as React from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useLocalStorage("auth-user", null);

  const handleLogin = () => {
    const user = {
      userName: 'dragoshomner',
      token: 'ddawd-dawdwa-fwaghr-fefae'
    };

    setAuthUser(user);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    setAuthUser(null);
  };

  const value = React.useMemo(() =>  ({
    authUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [authUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};