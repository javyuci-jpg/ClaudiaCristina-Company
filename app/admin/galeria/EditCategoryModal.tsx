"use client";

import { useState, useEffect } from "react";
import type { GalleryImage, Category } from "./types";

interface Props {
  image: GalleryImage;
  categories: Category[];
  onClose: () => void;
  onSave: (id: string, newCategoryId: string) => void;
}

export default function EditCategoryModal({ image, categories, onClose, onSave }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(image.category_id ?? "");

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSave = () => {
    if (!selectedCategory) return; // evita guardar sin categoría
    onSave(image.id, selectedCategory);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={onClose} // cerrar al hacer clic fuera
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-96 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // evita cerrar si se hace clic dentro
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          Editar categoría
        </h2>

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
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={!selectedCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
