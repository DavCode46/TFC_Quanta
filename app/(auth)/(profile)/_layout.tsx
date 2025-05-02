import ProfileActionsMenu from '@/components/ProfileActionsMenu';
import ProtectedRoute from '@/components/ProtectedRoute';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ProfileLayout() {
  return (
    <ProtectedRoute>
      <Stack
        screenOptions={{
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
            <TouchableOpacity onPress={() => router.push('/Help')}>
              <Ionicons name="help-circle" size={30} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      >
          <Stack.Screen
        name="(auth)/(profile)/Add"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
       <Stack.Screen
        name="(auth)/(profile)/Withdraw"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />

        <Stack.Screen
        name="(auth)/(profile)/Transfers"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
        <Stack.Screen
        name="(auth)/(profile)/Profile"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />

      <Stack.Screen
        name="(auth)/(profile)/Transactions"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
      }}
      />
      </Stack>
    </ProtectedRoute>
  );
}

