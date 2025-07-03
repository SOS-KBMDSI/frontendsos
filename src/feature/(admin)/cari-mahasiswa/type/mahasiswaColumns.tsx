"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MahasiswaDetail } from "@/api/services/admin/mahasiswa";
import { DetailModalTrigger } from "../components/DetailModalTrigger";

const columnHelper = createColumnHelper<MahasiswaDetail>();

export const columns = [
  columnHelper.accessor("nama", {
    header: "Nama",
    cell: (info) => info.getValue(),
    size: 300,
  }),
  columnHelper.accessor("nim", {
    header: "NIM",
    cell: (info) => info.getValue(),
    size: 150,
  }),
  columnHelper.accessor("kelompok.distrik.nama_distrik", {
    header: "Distrik",
    cell: (info) => info.getValue() || "N/A",
    size: 200,
  }),
  columnHelper.accessor("kelompok.nama_kelompok", {
    header: "Kelompok",
    cell: (info) => info.getValue() || "N/A",
    size: 180,
  }),
  columnHelper.display({
    id: "detail",
    header: "Detail",
    cell: ({ row }) => <DetailModalTrigger nim={row.original.nim} />,
    size: 100,
  }),
];
