import ProtectedRoute from '@/components/ProtectedRoute';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <ProtectedRoute>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ProtectedRoute>
  );
}
