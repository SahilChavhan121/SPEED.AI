import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, ClearanceLevel } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: UserProfile;
  isAuthenticated: boolean;
  clearanceLevel: ClearanceLevel;
  availableUsers: UserProfile[];
  sessionExpiresIn: number; // in seconds
  switchUser: (userId: string) => void;
  login: (username: string, role: UserRole, clearance: ClearanceLevel) => Promise<boolean>;
  logout: () => void;
  extendSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const stored = localStorage.getItem('speed_auth_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse cached user', e);
      }
    }
    return INITIAL_USERS[0]; // V. Vance, SEC-LEVEL-5
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [sessionExpiresIn, setSessionExpiresIn] = useState<number>(3600); // 60 minutes

  // Session timer countdown
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      setSessionExpiresIn(prev => {
        if (prev <= 1) {
          setIsAuthenticated(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const switchUser = (userId: string) => {
    const found = INITIAL_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setIsAuthenticated(true);
      setSessionExpiresIn(3600);
      localStorage.setItem('speed_auth_user', JSON.stringify(found));
    }
  };

  const login = async (username: string, role: UserRole, clearance: ClearanceLevel): Promise<boolean> => {
    // Simulated credential check
    const newUser: UserProfile = {
      id: `OP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: username || 'Authorized Officer',
      role,
      clearance,
      district: 'Ambala Command Node',
      initials: username.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AO',
      status: 'Active',
      idleTime: '0m idle',
      permissions: ['ROOT', 'OVERRIDE', 'EXEC', 'ESCALATE']
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setSessionExpiresIn(3600);
    localStorage.setItem('speed_auth_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('speed_auth_user');
  };

  const extendSession = () => {
    setSessionExpiresIn(3600);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        clearanceLevel: currentUser.clearance,
        availableUsers: INITIAL_USERS,
        sessionExpiresIn,
        switchUser,
        login,
        logout,
        extendSession
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
