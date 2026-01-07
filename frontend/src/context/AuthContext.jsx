import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { me as meApi } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("bdms_token") : null;

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        if (!token) {
          if (mounted) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        const data = await meApi();
        if (mounted) setUser(data.user);
      } catch (err) {
        localStorage.removeItem("bdms_token");
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, [token]);

  function setAuth(tokenValue, userValue) {
    localStorage.setItem("bdms_token", tokenValue);
    setUser(userValue);
  }

  function logout() {
    localStorage.removeItem("bdms_token");
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, setAuth, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
