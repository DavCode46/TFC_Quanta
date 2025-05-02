import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface AuthContextType {
  user: any;
  accountContext: any;
  login: (userData: any) => void;
  setAccountData: (accountData: any) => void;
  logout: (confirm: Boolean) => void;
  reloadFlag: boolean;
  triggerReload: () => void;
  updateUser: (updatedData: any) => void;
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
    console.log('userData', userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    router.push('/(auth)/(tabs)/Home');
  };

  const setAccountData = async (accountData: any) => {
    setAccountContext(accountData);
    await AsyncStorage.setItem('account', JSON.stringify(accountData));
  };

  const updateUser = async (updatedData: any) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = async (confirm: Boolean) => {
    if(confirm){
      setUser(null);
      setAccountContext(null);
      await AsyncStorage.removeItem('account');
      await AsyncStorage.removeItem('user');
      router.replace('/');
    } else {
    Alert.alert('Salir', '¿Estás seguro que deseas cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Salir',
        onPress: async () => {
          setUser(null);
          setAccountContext(null);
          await AsyncStorage.removeItem('account');
          await AsyncStorage.removeItem('user');
          Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
          router.replace('/');
        },
      },
    ]);
  }
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
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('not inside an AuthProvider');
  }
  return context;
};

export default AuthContext;
