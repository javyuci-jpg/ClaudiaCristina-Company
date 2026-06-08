"use client";

import { useState } from "react";
import type { GalleryImage, Category } from "./types";

interface Props {
  image: GalleryImage;
  categories: Category[];
  onClose: () => void;
  onSave: (id: string, newCategoryId: string) => void;
}

export default function EditCategoryModal({ image, categories, onClose, onSave }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(image.category_id ?? "");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4">Editar categoría</h2>

        {/* SELECT DINÁMICO */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Selecciona una categoría</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(image.id, selectedCategory)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}