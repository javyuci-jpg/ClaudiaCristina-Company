"use client";

import { useState } from "react";
import type { Category } from "./types";

interface CategoryFormProps {
  category?: Category | null;
  onClose: () => void;
  onSave: (name: string, icon: string) => void;
}

export default function CategoryForm({ category, onClose, onSave }: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? "");
  const [icon, setIcon] = useState(category?.icon ?? "Flower2");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4">
          {category ? "Editar categoría" : "Nueva categoría"}
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="Flower2">Flor</option>
          <option value="Heart">Corazón</option>
          <option value="Camera">Cámara</option>
          <option value="Gift">Regalo</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancelar
          </button>

          <button
            onClick={() => onSave(name, icon)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}