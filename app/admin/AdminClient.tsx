"use client";

import type { User } from "@supabase/supabase-js";

interface Stats {
  gallery: number;
  reservas: number;
  cotizaciones: number;
}

interface AdminClientProps {
  user: User | null;
  stats: Stats;
}

export default function AdminClient({ user, stats }: AdminClientProps) {
  return (
    <div className="min-h-screen bg-[#f7f3ef] p-10">
      <div className="max-w-5xl mx-auto">

        {/* Título del dashboard */}
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-10">
          Dashboard
        </h1>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-900">Fotos en galería</h2>
            <p className="text-4xl font-bold text-[#8a6f4d] mt-2">{stats.gallery}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-900">Reservas</h2>
            <p className="text-4xl font-bold text-[#8a6f4d] mt-2">{stats.reservas}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-900">Cotizaciones</h2>
            <p className="text-4xl font-bold text-[#8a6f4d] mt-2">{stats.cotizaciones}</p>
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Actividad reciente</h2>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600">
              Próximamente: historial de reservas, cotizaciones y subidas de fotos.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}