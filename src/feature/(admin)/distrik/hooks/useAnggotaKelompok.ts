"use client";

import { useState, useCallback } from "react";
import { MahasiswaDetail, mahasiswaService } from "@/api/services/admin/mahasiswa";

export const useAnggotaDetail = () => {
  const [data, setData] = useState<MahasiswaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (nim: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await mahasiswaService.getMahasiswaById(nim);
      if (response && response.data) {
        setData(response.data);
      } else {
        throw new Error(response.message || "Data mahasiswa tidak ditemukan.");
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Gagal memuat profil.";
      setError(errorMessage);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchProfile };
};