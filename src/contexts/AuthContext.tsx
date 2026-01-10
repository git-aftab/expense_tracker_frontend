import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Children,
} from "react";
import api from '../utils/api';
import {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types";
import { useNavigate } from "react-router-dom";

interface AuthContextTypes {
  user: User | null;
  loading: boolean;
  login: (credential: LoginCredentials) => Promise<void>;
  register: (credential: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export const Authprovider = ({ children }: { children: ReactNode }) => {
  const [user, setuser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on mount;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setuser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setuser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "login failed");
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/register",
        credentials
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setuser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setuser(null);
    navigate('/login')
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
