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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
