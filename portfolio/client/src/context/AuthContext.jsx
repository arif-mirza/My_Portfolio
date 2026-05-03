import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginAdmin, getMe } from "../services/api/auth.api";

const AuthContext = createContext(null);

const TOKEN_KEY = "portfolio_token";
const USER_KEY = "portfolio_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const me = await getMe();
        setUser(me);
        localStorage.setItem(USER_KEY, JSON.stringify(me));
      } catch {
        // Token invalid — clear everything
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (credentials) => {
    const data = await loginAdmin(credentials);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const isAdmin = Boolean(user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN"));

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
