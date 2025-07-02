"use client";

import Sidebar from "@/shared/components/admin/sidebar/Sidebar";
import { AuthProvider } from "@/shared/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex  ">
      <AuthProvider>
        <Sidebar />
      </AuthProvider>
      <section className="right-0 px-24 py-24 w-4/5 xl:w-4/5 lg:w-3/4 absolute bg-[#E9E9E9CC]  min-h-screen overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
