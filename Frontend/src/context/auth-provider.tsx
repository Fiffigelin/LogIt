import { useState, useCallback, type ReactNode } from "react";
import { ConfigurationProvider } from "../api/client-base";
import { AuthContext, type AuthStatus } from "./auth-context";
import { getFromCache, removeCacheIfPossible, setCacheIfPossible } from "./cache-helper";
import { requireMessage } from "../api/api-utils";
import { LoginClient, RegisterClient, type LoginRequestDto, type RegisterRequestDto, type RegisterResponseDtoApiResponse, type UserProfileDto } from "../api/client";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfileDto | null>(() =>
    getFromCache("auth_user", true)
  );

  const [token, setToken] = useState<string | null>(() =>
    getFromCache("auth_token", true)
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus | null>(null);

  const login = useCallback(async (credentials: LoginRequestDto) => {
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const client = new LoginClient(new ConfigurationProvider(undefined, baseUrl));
      const response = await client.login(credentials);

      if (!response.success || !response.data?.token || !response.data.user) {
        setStatus({ type: "error", message: requireMessage(response.message), id: "login" });
        return;
      }

      setUser(response.data.user);
      setToken(response.data.token);

      setCacheIfPossible("auth_user", response.data.user, true);
      setCacheIfPossible("auth_token", response.data.token, true);

      setStatus({ type: "success", message: response.message, id: "login" });

    } catch {
      setStatus({ type: "error", message: "Kunde inte logga in", id: "login" });
    }
    finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterRequestDto): Promise<RegisterResponseDtoApiResponse> => {
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const client = new RegisterClient(new ConfigurationProvider(undefined, baseUrl));
      const resp = await client.register(credentials);

      if (resp.success) {
        setStatus({ type: "success", message: resp.message, id: "register" });
      } else {
        setStatus({ 
          type: "error", 
          message: resp.error?.message ?? resp.message ?? "Unknown error", 
          id: "register" 
        });
      }

      return resp;

    } catch (err) {
      const msg = (err as Error)?.message ?? "Unexpected network error";
      setStatus({ type: "error", message: msg, id: "register" });
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeCacheIfPossible("auth_user", true);
    removeCacheIfPossible("auth_token", true);

    setUser(null);
    setToken(null);

    setStatus(null);
  }, []);

  const clearStatus = useCallback(() => {
    setStatus(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, status, login, register, logout, clearStatus, loading, error }}>{children}</AuthContext.Provider>
  );
};
