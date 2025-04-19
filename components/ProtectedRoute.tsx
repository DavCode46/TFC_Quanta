
import { useAuth } from '@/app/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import React, { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/Login" />;
  }

  return <>{children}</>;
}
