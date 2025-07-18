import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import apiAuth from "../apis/apiAuth";

interface Restaurant {
  id: number;
  name: string;
  address?: string;
  // Puedes agregar más campos si los necesitas (phone, city, etc.)
}
interface User {
  id: number;
  email: string;
  fullName: string;
  role: {
    code: string;
    name: string;
  };
  restaurant: Restaurant;
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
    if (storedToken) {
      setToken(storedToken);
      // Obtiene el usuario desde el backend
      apiAuth
        .get("/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
    setLoading(false);
  }, []);
  const apiUrlLogin = import.meta.env.VITE_API_URL_AUTH;
  const login = async (email: string, password: string) => {
    const res = await axios.post(`${apiUrlLogin}/login`, {
      email,
      password,
    });

    setToken(res.data.value);
    sessionStorage.setItem("token", res.data.value);

    // Pide los datos del usuario desde /me
    const meRes = await apiAuth.get("/me");
    setUser(meRes.data);

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
