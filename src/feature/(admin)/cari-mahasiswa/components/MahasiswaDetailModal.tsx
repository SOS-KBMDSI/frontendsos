"use client";

import { MahasiswaDetail } from "@/api/services/admin/mahasiswa";
import { Loader2 } from "lucide-react";

interface MahasiswaDetailViewProps {
  isLoading: boolean;
  error: string | null;
  mahasiswa: MahasiswaDetail | null;
}

export const MahasiswaDetailView = ({
  isLoading,
  error,
  mahasiswa,
}: MahasiswaDetailViewProps) => {
  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!mahasiswa) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p>Data mahasiswa tidak ditemukan.</p>
      </div>
    );
  }

  const identitasFields = [
    { label: "Nama Lengkap", value: mahasiswa.nama },
    { label: "ID Line", value: mahasiswa.line },
    { label: "NIM", value: mahasiswa.nim },
    { label: "Jenis Kelamin", value: mahasiswa.kelamin },
    { label: "Email", value: mahasiswa.email },
    { label: "Agama", value: mahasiswa.agama },
    { label: "Nomor Telepon", value: mahasiswa.telp },
    { label: "Golongan Darah", value: mahasiswa.golongan_darah },
  ];

  const kesehatanFields = [
    { label: "Riwayat Penyakit", value: mahasiswa.riwayat_penyakit },
    { label: "Alergi Obat", value: mahasiswa.alergi_obat },
    { label: "Alergi Makanan", value: mahasiswa.alergi_makanan },
  ];
  return (
    <>
      <h3 className="mb-4 text-center text-xl font-semibold  text-gray-900">
        Identitas Mahasiswa
      </h3>
      <div className="grid grid-cols-1 gap-x-12 px-10 gap-y-4 md:grid-cols-2">
        {identitasFields.map((field) => (
          <div key={field.label}>
            <p className="text-sm text-primary-500">{field.label}</p>
            <p className="font-medium">{field.value || "-"}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-4 text-center text-xl border-b border-[#D9D9D9] pb-3 pt-12 font-semibold text-gray-900">
        Informasi Kesehatan
      </h3>
      <div className="grid grid-cols-1 gap-x-12 px-10 gap-y-4 pb-10 md:grid-cols-2">
        {kesehatanFields.map((field) => (
          <div key={field.label}>
            <p className="text-sm text-primary-500">{field.label}</p>
            <p className="font-medium">{field.value || "-"}</p>
          </div>
        ))}
      </div>
    </>
  );
};
