import {
  MahasiswaDetail,
  mahasiswaService,
} from "@/api/services/admin/mahasiswa";
import { useState, useEffect, useCallback } from "react";

export const useMahasiswa = () => {
  const [data, setData] = useState<MahasiswaDetail[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await mahasiswaService.getAllMahasiswa();
      setData(response.data);
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
