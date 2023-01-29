import * as React from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { ROLE_DELIVERY, ROLE_RESTMAN } from '../login/constants';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useLocalStorage("auth-user", null);

  const handleLogin = async (credentials) => {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/auth", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      setAuthUser(data);
      if (data.role === ROLE_DELIVERY || data.role === ROLE_RESTMAN) {
        navigate('/dashboard/orders', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
    return false;
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