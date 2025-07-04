"use client";

import { useState, useEffect, useCallback } from "react";
import { distrikService } from "@/api/services/admin/distrik";
import { Distrik, AnggotaMaba } from "../type";

export const useDetailDistrikData = (distrikId: string) => {
  const [distrik, setDistrik] = useState<Distrik | null>(null);
  const [anggota, setAnggota] = useState<AnggotaMaba[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!distrikId) return;
    setIsLoading(true);
    setError(null);
    try {
      const [distrikResponse, anggotaResponse] = await Promise.all([
        distrikService.getDistrictById(distrikId),
        distrikService.getAnggotaByDistrictId(distrikId, { page: 1, limit: 1000 }),
      ]);

      if (distrikResponse && distrikResponse.data) {
        setDistrik(distrikResponse.data);
      } else {
        throw new Error("Gagal memuat data detail distrik.");
      }

      if (anggotaResponse && anggotaResponse.data && anggotaResponse.data.records) {
        setAnggota(anggotaResponse.data.records);
      } else {
        throw new Error("Gagal memuat data anggota kelompok.");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [distrikId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { distrik, anggota, isLoading, error, refresh: fetchData };
};