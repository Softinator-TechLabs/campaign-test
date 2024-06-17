'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase_client'; // Ensure this path is correct

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  settingUpUser: (value: User | null) => void;
  setLoading: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start with loading true

  const settingUpUser = (value: User | null): void => {
    setUser(value);
  };

  useEffect(() => {
    console.log('Setting up onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed, user is:', user);
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      console.log('Cleaning up onAuthStateChanged listener');
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, settingUpUser, setLoading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
