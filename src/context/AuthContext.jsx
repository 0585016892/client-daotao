import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const savedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (savedToken && savedUser && savedUser !== "undefined") {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        logout();
      }
    }
  }, []);

  const login = ({ token, user, remember = false }) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", token);
    storage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
