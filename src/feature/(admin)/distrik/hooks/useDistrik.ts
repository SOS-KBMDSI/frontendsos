"use client";

import { useState, useEffect, useCallback } from "react";
import { distrikService } from "@/api/services/admin/distrik";
import { Distrik } from "../type";

export const useDistrik = () => {
  const [data, setData] = useState<Distrik[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await distrikService.getAllDistricts();
      if (response && response.data) {
        setData(response.data);
      } else {
        throw new Error("Format respons API tidak sesuai.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    data,
    isLoading,
    error,
    refresh: fetchAll,
  };
};