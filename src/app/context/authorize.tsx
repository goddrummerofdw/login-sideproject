"use client";
import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  alertMessage: string;
  isAlertVisible: boolean;
  isAuthenticated: boolean;
  setAlertVisible: any;
  login: (data: { email: string, password: string, rememberPassword: boolean }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAlertVisible, setAlertVisible] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("")
  const router = useRouter();

  const timeout = setTimeout(() => {
    setAlertVisible(false)
  }, 5000)

  const timeoutFunc = () => clearTimeout(timeout);
  const login = (data: { email: string, password: string, rememberPassword: boolean }) => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          router.push('/dashboard')
        } else {
          setAlertVisible(true)
          timeoutFunc()
          setAlertMessage(data.message)
        }
      });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  const authContextValue = {
    alertMessage,
    isAlertVisible,
    setAlertVisible,
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext)