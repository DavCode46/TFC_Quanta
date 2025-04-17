import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any;
  accountContext: any;
  login: (userData: any) => void;
  setAccountData: (accountData: any) => void;
  logout: () => void;
  reloadFlag: boolean;
  triggerReload: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [accountContext, setAccountContext] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await AsyncStorage.getItem('user');
      const accountData = await AsyncStorage.getItem('account');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (accountData) {
        setAccountContext(JSON.parse(accountData));
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const login = async (userData: any) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    router.push('/(auth)/(tabs)/home');
  };

  const setAccountData = async (accountData: any) => {
    setAccountContext(accountData);
    await AsyncStorage.setItem('account', JSON.stringify(accountData));
  };

  const logout = async () => {
    setUser(null);
    setAccountContext(null);
    await AsyncStorage.removeItem('account');
    await AsyncStorage.removeItem('user');
    router.push('/login');
  };

  const triggerReload = () => {
    setReloadFlag((prev) => !prev);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accountContext,
        login,
        setAccountData,
        logout,
        reloadFlag,
        triggerReload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
