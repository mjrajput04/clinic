'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'doctor' | 'admin' | 'receptionist' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  loginWithPhone: (phone: string, otp: string) => Promise<User>;
  logout: () => void;
  getOTP: (phone: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users database
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'doctor@clinic.com': {
    password: 'demo123',
    user: {
      id: 'doc-001',
      name: 'Dr. Sarah Mitchell',
      email: 'doctor@clinic.com',
      phone: '+1-555-0101',
      role: 'doctor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      specialization: 'Internal Medicine',
    },
  },
  'admin@clinic.com': {
    password: 'demo123',
    user: {
      id: 'admin-001',
      name: 'Admin User',
      email: 'admin@clinic.com',
      phone: '+1-555-0102',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
  },
  'reception@clinic.com': {
    password: 'demo123',
    user: {
      id: 'rec-001',
      name: 'Emma Johnson',
      email: 'reception@clinic.com',
      phone: '+1-555-0103',
      role: 'receptionist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
  },
};

// Demo phone users
const DEMO_PHONE_USERS: Record<string, { otp: string; user: User }> = {
  '+1-555-0101': {
    otp: '123456',
    user: {
      id: 'doc-002',
      name: 'Dr. James Wilson',
      email: 'james@clinic.com',
      phone: '+1-555-0101',
      role: 'doctor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      specialization: 'Cardiology',
    },
  },
  '+1-555-0102': {
    otp: '123456',
    user: {
      id: 'admin-002',
      name: 'Admin Portal',
      email: 'admin2@clinic.com',
      phone: '+1-555-0102',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminPortal',
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('clinix_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('clinix_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const credentials = DEMO_USERS[email];
      if (!credentials || credentials.password !== password) {
        throw new Error('Invalid email or password');
      }

      const userData = credentials.user;
      setUser(userData);
      localStorage.setItem('clinix_user', JSON.stringify(userData));
      return userData;
    } finally {
      setIsLoading(false);
    }
  };

  const getOTP = async (phone: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!DEMO_PHONE_USERS[phone]) {
        throw new Error('Phone number not registered');
      }
      // In real app, this would send OTP via SMS
      console.log(`[v0] OTP sent to ${phone}: 123456`);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string, otp: string): Promise<User> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const phoneData = DEMO_PHONE_USERS[phone];
      if (!phoneData || phoneData.otp !== otp) {
        throw new Error('Invalid phone or OTP');
      }

      const userData = phoneData.user;
      setUser(userData);
      localStorage.setItem('clinix_user', JSON.stringify(userData));
      return userData;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clinix_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithPhone,
        logout,
        getOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
