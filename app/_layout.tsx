import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider } from './context/AuthContext';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="SignUp"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={30} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
       <Stack.Screen
        name="Login"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={30} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={'/Help'} asChild>
              <TouchableOpacity>
                <Ionicons name="help-circle-outline" size={30} color={Colors.dark} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Stack.Screen
      name="Help"
      options={{
        title: 'Ayuda',
        presentation: 'modal',
        animation: 'fade_from_bottom',
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.dark,
        headerTitleStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <Link href={'/Login'} replace asChild>
            <TouchableOpacity>
              <Ionicons name="close" size={30} color={Colors.dark} />
            </TouchableOpacity>
          </Link>
            ),
          }}
        />
        <Stack.Screen name = "(auth)/(tabs)" options = {{ headerShown: false }} />
        <Stack.Screen name="(auth)/(profile)" options={{ headerShown: false }} />


    </Stack>
  );
}
