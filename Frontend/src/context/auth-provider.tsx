import { useState, useCallback, type ReactNode } from "react";
import { ConfigurationProvider } from "../api/client-base";
import { AuthContext } from "./auth-context";
import { getFromCache, getFromCacheOrUseCallback, removeCacheIfPossible, setCacheIfPossible } from "./cache-helper";
import { type AuthResponseDto, type LoginRequestDto, AuthClient } from "../api/client";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponseDto | null>(() =>
    getFromCache<AuthResponseDto>("authToken", true)
  );
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials: LoginRequestDto) => {
    setLoading(true);
    try {
      const client = new AuthClient(new ConfigurationProvider(undefined, baseUrl));
      const response = await getFromCacheOrUseCallback<AuthResponseDto>(
        "authToken",
        async () => {
          const loginResponse = await client.login(credentials);
          if (!loginResponse?.token) throw new Error("Login failed");
          return loginResponse;
        },
        true,
        true
      );
      setCacheIfPossible("authToken", response, true);
      setUser(response);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeCacheIfPossible("authToken", true);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  );
};
