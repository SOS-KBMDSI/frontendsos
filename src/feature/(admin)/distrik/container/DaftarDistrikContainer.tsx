"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import DistrikList from "../components/DistrikList";
import { useDistrik } from "../hooks/useDistrik";
import { Loader2 } from "lucide-react";

const DistrikContainer = () => {
  const { data: districts, isLoading, error } = useDistrik();
  return (
    <div className="bg-white rounded-2xl shadow-lg p-16 w-full flex flex-col gap-7">
      <div className="flex items-center gap-1/2">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1/2 text-primary-500 hover:text-primary-600 transition-colors w-fit"
        >
          <ChevronLeft size={24} />
          <span className="text-xl">Kembali</span>
        </Link>
      </div>
      <h1 className="text-6xl text-black font-semibold">Daftar Distrik</h1>

      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        </div>
      )}
      {error && !isLoading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {!isLoading && !error && districts && (
        <DistrikList districts={districts} />
      )}
    </div>
  );
};

export default DistrikContainer;
