"use client";

import Sidebar from "@/shared/components/ui/admin/sidebar/Sidebar";
import { AuthProvider } from "@/shared/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex gap-10">
      <AuthProvider>
        <Sidebar />
      </AuthProvider>
      <section>{children}</section>
    </main>
  );
}
