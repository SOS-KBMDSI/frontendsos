"use client";

import { useAuthContext } from "@/shared/hooks/useAuthContext";
import { authService } from "@/api/services/auth";
import React from "react";

const Sidebar = () => {
  const { user } = useAuthContext();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  return (
    <div className="bg-white border-r-2 border-gray-200 flex flex-col justify-between p-4 w-64 h-screen">
      <div>
        <div className="text-center mb-10">
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-600">Selamat Datang,</p>
          <p className="font-semibold">{user?.Nama}</p>
        </div>
        <nav>
          <ul>
            <li className="p-2 hover:bg-gray-100 rounded-md">Dashboard</li>
            <li className="p-2 hover:bg-gray-100 rounded-md">A</li>
            <li className="p-2 hover:bg-gray-100 rounded-md">B</li>
          </ul>
        </nav>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
