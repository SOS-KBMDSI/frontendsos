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
} from "@tanstack/react-table";
import { useMahasiswa } from "../hooks/useMahasiswa";
import { MahasiswaDetail } from "@/api/services/admin/mahasiswa";
import { DataTable } from "@/shared/components/table/DataTable";
import { columns } from "../type/mahasiswaColumns";

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
      <DataTable<MahasiswaDetail>
        table={table}
        isLoading={MahasiswaData.isLoading}
        error={MahasiswaData.error}
        refresh={MahasiswaData.refresh}
        title="Data Mahasiswa Baru"
        searchPlaceholder="Cari Mahasiswa..."
      />
    </main>
  );
};

export default CariMahasiswaContainer;
