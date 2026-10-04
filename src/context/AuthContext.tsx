import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, PlanType } from '../types';
import { DEMO_USERS } from '../data/demo';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password?: string, plan?: PlanType) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  switchDemoUser: (role: UserRole) => void;
  updateUserPlan: (plan: PlanType) => void;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'tiktok_mastery_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with saved user or default demo student
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading user session:', e);
    }
    // Default to the first student demo account for instant ease of testing
    return DEMO_USERS[0];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, _password?: string) => {
    const trimmed = email.trim().toLowerCase();
    
    // Check known demo accounts
    const foundDemo = DEMO_USERS.find(u => u.email.toLowerCase() === trimmed);
    if (foundDemo) {
      setUser(foundDemo);
      return { success: true };
    }

    // Check previously stored accounts or create a new student session
    const isNewAdmin = trimmed.includes('admin');
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: trimmed.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: trimmed,
      role: isNewAdmin ? 'ADMIN' : 'STUDENT',
      plan: isNewAdmin ? 'PREMIUM' : 'PRO',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return { success: true };
  };

  const register = async (name: string, email: string, _password?: string, plan: PlanType = 'PRO') => {
    const trimmed = email.trim().toLowerCase();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: trimmed,
      role: 'STUDENT',
      plan: plan,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    return {
      success: true,
      message: `Un lien sécurisé de réinitialisation a été préparé pour l'adresse ${email}. (En production, le serveur SMTP délivre l'email de récupération).`
    };
  };

  const switchDemoUser = (role: UserRole) => {
    if (role === 'ADMIN') {
      const admin = DEMO_USERS.find(u => u.role === 'ADMIN');
      if (admin) setUser(admin);
    } else {
      const student = DEMO_USERS.find(u => u.role === 'STUDENT');
      if (student) setUser(student);
    }
  };

  const updateUserPlan = (plan: PlanType) => {
    if (user) {
      setUser({ ...user, plan });
    }
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const isAdmin = user?.role === 'ADMIN';
  const isStudent = user?.role === 'STUDENT';
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isStudent,
        login,
        register,
        logout,
        forgotPassword,
        switchDemoUser,
        updateUserPlan,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
