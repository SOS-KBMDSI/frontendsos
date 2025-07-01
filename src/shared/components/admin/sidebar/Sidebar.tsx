"use client";

import { useAuthContext } from "@/shared/hooks/useAuthContext";
import { authService } from "@/api/services/auth";
import React from "react";
import { sidebarMenuItems } from "@/shared/data/SidebarData";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { user } = useAuthContext();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  return (
    <div className=" border-r bg-white relative border-gray-200 shadow-xl flex flex-col px-5 py-7 w-80 h-screen">
      <div className="flex items-center gap-3">
        <div className="bg-gray-500 w-16 h-16 rounded-xl"></div>
        <p className="text-sm w-3/4 font-semibold">
          Synergy Of Symphony & Shaping The Future
        </p>
      </div>
      <div className="mt-4 px-4 py-2 bg-gray-200 rounded-lg">
        <span className="text-gray-700 font-medium">
          Welcome, Admin {user?.nama}!
        </span>
      </div>
      <ul className="mt-18 flex flex-col gap-5">
        {sidebarMenuItems.map((sidebar) => {
          const isActive = pathname === sidebar.path;

          return (
            <Link key={sidebar.id} href={sidebar.path} passHref>
              <li
                className={`px-4 py-5 flex gap-x-3 text-lg transition-all duration-300 rounded-xl ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-primary-500 hover:bg-primary-500 hover:text-white"
                }`}
              >
                {React.createElement(sidebar.icon)}
                {sidebar.label}
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="absolute bottom-0 h-20 w-full left-0">
        <button
          onClick={handleLogout}
          className="w-full flex gap-2 items-center justify-center bg-primary-500 h-full text-white p-2 hover:bg-red-600 transition-colors"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
