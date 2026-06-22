"use client";

import { useState } from "react";
import type { Category } from "./types";

interface Props {
  category: Category | null;
  onClose: () => void;
  onSave: (name: string, icon: string) => Promise<void>;
}

export default function CategoryForm({ category, onClose, onSave }: Props) {
  const [name, setName] = useState(category?.name || "");
  const [icon, setIcon] = useState(category?.icon || "");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">
          {category ? "Editar categoría" : "Nueva categoría"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Icono (opcional)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>

          <button
            onClick={() => onSave(name, icon)}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
