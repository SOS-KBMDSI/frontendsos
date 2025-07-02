"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMahasiswa } from "../hooks/useMahasiswa";
import { MahasiswaTable } from "../components/MahasiswaTable";
import { MahasiswaDetail } from "@/api/services/admin/mahasiswa";
import Link from "next/link";

const columnHelper = createColumnHelper<MahasiswaDetail>();
const columns = [
  columnHelper.accessor("nama", {
    header: "Nama ",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nim", {
    header: "NIM",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("kelompok.distrik.nama_distrik", {
    header: "Distrik",
    cell: (info) => info.getValue() || "N/A",
  }),

  columnHelper.accessor("kelompok.nama_kelompok", {
    header: "Kelompok",
    cell: (info) => info.getValue() || "N/A",
  }),
  columnHelper.display({
    id: "detail",
    header: "Detail",
    cell: ({ row }) => (
      <Link href={`/mahasiswa/${row.original.nim}`} className="detail-link">
        Detail
      </Link>
    ),
  }),
];

const CariMahasiswaContainer = () => {
  const MahasiswaData = useMahasiswa();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: MahasiswaData.data ?? [],
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <main>
      <h4 className="text-4xl font-semibold text-black">Cari Mahasiswa</h4>
      <MahasiswaTable {...MahasiswaData} table={table} />
    </main>
  );
};

export default CariMahasiswaContainer;
