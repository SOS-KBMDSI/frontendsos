"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Loader2 } from "lucide-react";
import { useDetailDistrikData } from "../hooks/useDetailDistrikData";
import { Input } from "@/shared/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import PjlTable from "../components/PjlTable";
import AnggotaKelompokTable from "../components/TableKelompok";
import { AnggotaKelompok } from "../type/anggotaKelompokColumns";

const DetailDistrikContainer = ({ distrikId }: { distrikId: string }) => {
  const { distrik, anggota, isLoading, error } =
    useDetailDistrikData(distrikId);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedKelompok, setSelectedKelompok] = useState("");

  const displayedKelompok = useMemo(() => {
    if (!distrik) return [];
    if (!selectedKelompok) return distrik.list_kelompok;
    return distrik.list_kelompok.filter(
      (k) => k.nama_kelompok === selectedKelompok
    );
  }, [selectedKelompok, distrik]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error || !distrik) {
    return (
      <div className="text-red-500 text-center">
        {error || "Data tidak dapat dimuat."}
      </div>
    );
  }

  return (
    <div className="p-8 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-1/2">
          <Link
            href="/admin/distrik"
            className="flex items-center gap-1/2 text-primary-500 hover:text-primary-600 transition-colors w-fit"
          >
            <ChevronLeft size={24} />
            <span className="text-xl">Kembali</span>
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-default-dark">
          {distrik.nama_distrik}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <Select
          value={selectedKelompok}
          onValueChange={(value) =>
            setSelectedKelompok(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Kelompok" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kelompok</SelectItem>
            {distrik.list_kelompok.map((k) => (
              <SelectItem key={k.id_kelompok} value={k.nama_kelompok}>
                {k.nama_kelompok}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative w-full max-w-lg">
          <Input
            className="pl-10"
            placeholder="Cari Nama Mahasiswa"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-700" />
        </div>
      </div>

      <PjlTable pjlList={distrik.list_pjl} distrikName={distrik.nama_distrik} />

      {displayedKelompok.map((kelompok) => {
        const tableData: AnggotaKelompok[] = (anggota || [])
          .filter((a) => a.kelompok === kelompok.nama_kelompok)
          .map((a) => ({ ...a, nama_kelompok: a.kelompok }));

        return (
          <AnggotaKelompokTable
            key={kelompok.id_kelompok}
            kelompokName={kelompok.nama_kelompok}
            anggotaList={tableData}
            globalFilter={globalFilter}
            isLoading={false}
          />
        );
      })}
    </div>
  );
};

export default DetailDistrikContainer;
