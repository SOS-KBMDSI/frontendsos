"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DetailAnggotaModalTrigger } from "../components/DetailAnggotaModalTrigger";

export type AnggotaKelompok = {
  nim: string;
  nama: string;
  prodi: string;
  nama_kelompok: string;
};

export const columns: ColumnDef<AnggotaKelompok>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "nim",
    header: "NIM",
  },
  {
    accessorKey: "prodi",
    header: "Prodi",
  },
  {
    accessorKey: "nama_kelompok",
    header: "Kelompok",
  },
  {
    id: "detail",
    header: "Detail",
    cell: ({ row }) => {
      const nim = row.original.nim;
      return <DetailAnggotaModalTrigger nim={nim} />;
    },
  },
];
