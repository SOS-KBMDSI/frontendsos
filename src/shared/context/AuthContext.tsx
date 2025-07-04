"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import { AuthProfile, authService } from "@/api/services/auth";

interface AuthContextType {
  user: AuthProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

let authPromise: Promise<AuthProfile | null> | null = null;
let authCache: { data: AuthProfile | null; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;
const MIN_REFETCH_INTERVAL = 2000;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

let lastRefetchTime = 0;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);
  const initializationRef = useRef(false);
  const requestInProgressRef = useRef(false);

  const pathname = usePathname();

  const fetchCurrentUser = useCallback(
    async (forceRefresh = false): Promise<void> => {
      if (!mountedRef.current) return;

      if (requestInProgressRef.current && !forceRefresh) return;

      const now = Date.now();
      if (!forceRefresh && now - lastRefetchTime < MIN_REFETCH_INTERVAL) return;

      if (
        !forceRefresh &&
        authCache &&
        now - authCache.timestamp < CACHE_DURATION
      ) {
        if (mountedRef.current) {
          setUser(authCache.data);
          setIsLoading(false);
        }
        return;
      }

      if (authPromise && !forceRefresh) {
        try {
          const result = await authPromise;
          if (mountedRef.current) {
            setUser(result);
            setIsLoading(false);
          }
        } catch {
          if (mountedRef.current) {
            setUser(null);
            setIsLoading(false);
          }
        }
        return;
      }

      requestInProgressRef.current = true;
      lastRefetchTime = now;

      authPromise = (async (): Promise<AuthProfile | null> => {
        let attempts = 0;

        while (attempts < MAX_RETRY_ATTEMPTS) {
          try {
            const response = await authService.getMe();
            const userData: AuthProfile = response?.data;

            authCache = {
              data: userData,
              timestamp: Date.now(),
            };

            return userData;
          } catch (error) {
            const axiosError = error as {
              response?: { status?: number };
            };

            attempts++;

            if (axiosError?.response?.status === 429) {
              if (attempts < MAX_RETRY_ATTEMPTS) {
                await delay(RETRY_DELAY * attempts);
                continue;
              }
            }

            if (
              attempts >= MAX_RETRY_ATTEMPTS ||
              axiosError?.response?.status === 401
            ) {
              authCache = { data: null, timestamp: Date.now() };
              return null;
            }

            await delay(RETRY_DELAY);
          }
        }

        return null;
      })();

      try {
        const result = await authPromise;
        if (mountedRef.current) {
          setUser(result);
        }
      } finally {
        authPromise = null;
        requestInProgressRef.current = false;
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const publicPaths = ["/login", "/register", "/", "/about", "/contact"];
    if (
      publicPaths.some(
        (path) => pathname === path || pathname.startsWith(path + "/")
      )
    ) {
      setIsLoading(false);
      setUser(null);
      return;
    }

    if (initializationRef.current) return;

    initializationRef.current = true;
    mountedRef.current = true;

    fetchCurrentUser();

    return () => {
      mountedRef.current = false;
    };
  }, [pathname, fetchCurrentUser]);

  const refetch = useCallback(async (): Promise<void> => {
    if (!mountedRef.current) return;

    const now = Date.now();
    if (now - lastRefetchTime < MIN_REFETCH_INTERVAL) return;

    setIsLoading(true);

    authCache = null;
    authPromise = null;

    await fetchCurrentUser(true);
  }, [fetchCurrentUser]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    refetch,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
