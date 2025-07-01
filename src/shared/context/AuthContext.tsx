"use client";

import { AuthProfile, authService } from "@/api/services/auth";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from "react";

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
const MIN_REFETCH_INTERVAL = 1000;

let lastRefetchTime = 0;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);
  const initializationRef = useRef(false);
  const fetchCurrentUser = useCallback(
    async (forceRefresh = false): Promise<void> => {
      if (!mountedRef.current) return;

      if (
        !forceRefresh &&
        authCache &&
        Date.now() - authCache.timestamp < CACHE_DURATION
      ) {
        if (mountedRef.current) {
          setUser(authCache.data);
          setIsLoading(false);
        }
        return;
      }

      if (authPromise) {
        try {
          const result = await authPromise;
          if (mountedRef.current) {
            setUser(result);
            setIsLoading(false);
          }
        } catch (error) {
          if (mountedRef.current) {
            console.error("Auth check failed:", error);
            setUser(null);
            setIsLoading(false);
          }
        }
        return;
      }

      authPromise = (async (): Promise<AuthProfile | null> => {
        try {
          const response = await authService.getMe();
          const userData = response?.data || null;

          authCache = {
            data: userData,
            timestamp: Date.now(),
          };

          return userData;
        } catch (error) {
          console.error("Auth check failed:", error);

          authCache = null;

          return null;
        } finally {
          authPromise = null;
        }
      })();

      try {
        const result = await authPromise;
        if (mountedRef.current) {
          setUser(result);
        }
      } catch {
        if (mountedRef.current) {
          setUser(null);
        }
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (initializationRef.current) return;

    initializationRef.current = true;
    mountedRef.current = true;

    fetchCurrentUser();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchCurrentUser]);

  const refetch = useCallback(async (): Promise<void> => {
    if (!mountedRef.current) return;

    const now = Date.now();
    if (now - lastRefetchTime < MIN_REFETCH_INTERVAL) {
      console.warn("Refetch called too frequently, ignoring");
      return;
    }
    lastRefetchTime = now;

    setIsLoading(true);

    authCache = null;
    authPromise = null;

    await fetchCurrentUser(true);
  }, [fetchCurrentUser]);

  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    refetch,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
