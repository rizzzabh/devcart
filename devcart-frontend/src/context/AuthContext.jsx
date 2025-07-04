import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const getInitialUser = () => {
  try {
    const item = localStorage.getItem("user");
    if (!item || item === "undefined") return null;
    return JSON.parse(item);
  } catch {
    return null;
  }
};

const getInitialToken = () => {
  try {
    return localStorage.getItem("token") || null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
