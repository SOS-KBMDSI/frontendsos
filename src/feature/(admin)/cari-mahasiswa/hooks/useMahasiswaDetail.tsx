"use client";

import { useState, useCallback } from "react";
import {
  mahasiswaService,
  MahasiswaDetail,
} from "@/api/services/admin/mahasiswa";

export const useMahasiswaDetail = () => {
  const [data, setData] = useState<MahasiswaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (nim: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await mahasiswaService.getMahasiswaById(nim);
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchProfile };
};
