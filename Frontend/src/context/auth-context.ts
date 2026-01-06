import { createContext, useContext } from "react";
import type { LoginRequestDto, RegisterRequestDto, UserProfileDto } from "../api/client";

export type AuthStatus = {
  type: "success" | "error";
  message: string | undefined;
};

export type AuthContextType = {
  user: UserProfileDto | null;
  token: string | null;

  login: (credentials: LoginRequestDto) => Promise<void>;
  register: (credentials: RegisterRequestDto) => Promise<void>;
  logout: () => void;

  loading: boolean;
  error: string | null;

  status: AuthStatus | null;
  clearStatus: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
