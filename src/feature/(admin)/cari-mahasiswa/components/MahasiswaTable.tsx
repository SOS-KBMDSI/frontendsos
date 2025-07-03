// components/MahasiswaTable.tsx

"use client";

import React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { MahasiswaDetail } from "@/api/services/admin/mahasiswa";
import { Input } from "@/shared/components/ui/Input";
import { Search } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

// Definisikan tipe props yang akan diterima komponen ini
interface MahasiswaTableProps {
  table: Table<MahasiswaDetail>;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export const MahasiswaTable = ({
  table,
  isLoading,
  error,
}: MahasiswaTableProps) => {
  if (isLoading) {
    return <div>Loading data tabel... ⏳</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const firstRowIndex = pageIndex * pageSize + 1;
  const lastRowIndex = Math.min((pageIndex + 1) * pageSize, totalRows);
  return (
    <div className="mt-12">
      <div className="relative w-1/3">
        <Input
          className="text-base w-full mb-14 pl-10"
          variant={"default"}
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          placeholder="Cari Mahasiswa Baru"
        />
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      </div>
      {/* TABLE START DISINI */}
      <div className="bg-white w-full py-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center border-b px-6 pb-6 border-b-black">
          <h4 className="text-2xl font-bold text-primary-500">
            Data Mahasiswa Baru
          </h4>
          <span className="text-sm font-medium text-primary-500">
            Showing {firstRowIndex} - {lastRowIndex} of {totalRows}
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm text-left text-black table-fixed">
            <thead className="text-black text-lg">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-6"
                      style={{ width: header.getSize() }}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`h-20 ${index % 2 === 0 ? "bg-[#F5E6E9]" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-4 px-6 font-medium text-gray-900"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination-controls mt-4 flex justify-end gap-10">
        <Button
          arrow="left"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="pagination-arrow"
        ></Button>
        <Button
          arrow="right"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="pagination-arrow"
        ></Button>
      </div>
    </div>
  );
};
