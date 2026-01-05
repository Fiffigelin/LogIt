import { createContext, useContext } from "react";
import type { AuthResponseDto, LoginRequestDto, RegisterUserDto } from "../api/client";

export type AuthContextType = {
  user: AuthResponseDto | null;
  login: (credentials: LoginRequestDto) => Promise<void>;
  register: (credentials: RegisterUserDto) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
