"use client";

import { useState } from "react";
import type { Category } from "./types";
import CategoryForm from "./CategoryForm";
import toast from "react-hot-toast";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "./actions";

interface Props {
  initialCategories: Category[];
}

export default function CategoriesClient({ initialCategories }: Props) {
  const [items, setItems] = useState<Category[]>(initialCategories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);

  async function handleDelete(id: string) {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    try {
      await deleteCategory(id);
      setItems(items.filter((c) => c.id !== id));
      toast.success("Categoría eliminada");
    } catch (err: any) {
      toast.error(`Error eliminando categoría: ${err.message}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categorías</h1>

        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Nueva categoría
        </button>
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((cat) => (
          <div
            key={cat.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{cat.name}</p>
              <p className="text-xs text-gray-500">Icono: {cat.icon}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditing(cat)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-sm text-gray-500">
            No hay categorías creadas todavía.
          </p>
        )}
      </div>

      {/* MODAL CREAR */}
      {creating && (
        <CategoryForm
          category={null}
          onClose={() => setCreating(false)}
          onSave={async (name, icon) => {
            try {
              const data = await createCategory(name, icon);
              setItems([...items, data]);
              toast.success("Categoría creada");
              setCreating(false);
            } catch (err: any) {
              toast.error(`Error creando categoría: ${err.message}`);
            }
          }}
        />
      )}

      {/* MODAL EDITAR */}
      {editing && (
        <CategoryForm
          category={editing}
          onClose={() => setEditing(null)}
          onSave={async (name, icon) => {
            try {
              const updated = await updateCategory(editing.id, name, icon);

              setItems(
                items.map((c) =>
                  c.id === editing.id ? { ...c, name, icon } : c
                )
              );

              toast.success("Categoría actualizada");
              setEditing(null);
            } catch (err: any) {
              toast.error(`Error actualizando categoría: ${err.message}`);
            }
          }}
        />
      )}
    </div>
  );
}
