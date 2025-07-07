import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: {
    code: string;
    name: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log(email, password);
    const res = await axios.post("http://localhost:3333/api/login", {
      email,
      password,
    });
    setToken(res.data.value);
    setUser(res.data.user);

    sessionStorage.setItem("token", res.data.value);
    sessionStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/control");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
