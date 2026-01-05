import { useState, useCallback, type ReactNode } from "react";
import { ConfigurationProvider } from "../api/client-base";
import { AuthContext } from "./auth-context";
import { getFromCache, removeCacheIfPossible, setCacheIfPossible } from "./cache-helper";
import { requireMessage } from "../api/api-utils";
import { type AuthResponseDto, type AuthResponseDtoApiResponse, type LoginRequestDto, type RegisterUserDto, AuthClient } from "../api/client";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponseDto | null>(() =>
    getFromCache<AuthResponseDto>("authToken", true)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const login = useCallback(async (credentials: LoginRequestDto) => {
    setLoading(true);
    setError("");

    try {
      const client = new AuthClient(new ConfigurationProvider(undefined, baseUrl));
      const response = await client.login(credentials);

      if (!response.success || !response.data) {
        setError(requireMessage(response.message));
        return;
      }

      setUser(response.data);
      setCacheIfPossible("authToken", response.data, true);

    } catch (err: any) {

      if (err?.response) {
        try {
          const apiError = JSON.parse(err.response) as AuthResponseDtoApiResponse;
          setError(requireMessage(apiError.message));
          return;
        } catch { }
      }

      setError("Ett oväntat serverfel uppstod");
    }
    finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterUserDto) => {
    setLoading(true);
    setError("");
    try {
      const client = new AuthClient(new ConfigurationProvider(undefined, baseUrl));
      
      await client.register(credentials);
      await login({ email: credentials.email, password: credentials.password });

    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [login]);



  const logout = useCallback(() => {
    removeCacheIfPossible("authToken", true);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>{children}</AuthContext.Provider>
  );
};
