"use client";

import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

interface AdminShellProps {
  role: string | null;
  nuevasReservas: number;
  children: React.ReactNode;
}

export default function AdminShell({ role, nuevasReservas, children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} nuevasReservas={nuevasReservas} />

      <div className="flex flex-col flex-1">
        <AdminHeader role={role} />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}