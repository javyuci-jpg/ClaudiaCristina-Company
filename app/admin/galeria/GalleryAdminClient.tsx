"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from '@supabase/ssr';
import type { GalleryImage } from "./types";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import EditCategoryModal from "./EditCategoryModal";
import PreviewModal from "./PreviewModal";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GalleryAdminClient({ session, images, categories }: any) {

  useEffect(() => {
    if (session) {
      supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
    }
  }, [session]);

  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [items, setItems] = useState<GalleryImage[]>(images);

  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  async function handleUpload() {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!file) return setErrorMsg("Selecciona una imagen");
    if (!categoryId) return setErrorMsg("Selecciona una categoría");

    setLoading(true);

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filename = `${Date.now()}-${sanitizedName}`;

    const { data: userCheck } = await supabase.auth.getUser();
    if (!userCheck?.user) {
      setErrorMsg("No hay sesión activa");
      setLoading(false);
      return;
    }

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filename, file);

    if (uploadError) {
      console.error(uploadError);
      setErrorMsg("Error subiendo imagen");
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(filename);

    const publicUrl = publicUrlData.publicUrl;

    const blurResponse = await fetch("/api/generate-blur", {
      method: "POST",
      body: JSON.stringify({ imageUrl: publicUrl }),
    });

    const { blurDataURL } = await blurResponse.json();

    const { error: insertError } = await supabase.from("gallery").insert({
      src: publicUrl,
      category_id: categoryId,
      blurDataURL,
      order: items.length,
    });

    if (insertError) {
      console.error(insertError);
      setErrorMsg("Error guardando en la base de datos");
      setLoading(false);
      return;
    }

    setSuccessMsg("Imagen subida correctamente");
    setLoading(false);

    setPreviewImage(null);
    setFile(null);

    setTimeout(() => window.location.reload(), 800);
  }

  async function deleteImage(id: string, src: string) {
    await supabase.from("gallery").delete().eq("id", id);

    const path = src.split("/").pop();
    await supabase.storage.from("gallery").remove([`${path}`]);

    window.location.reload();
  }

  async function updateCategory(id: string, newCategoryId: string) {
    await supabase.from("gallery").update({ category_id: newCategoryId }).eq("id", id);
    window.location.reload();
  }

  async function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newOrder);

    for (let i = 0; i < newOrder.length; i++) {
      await supabase.from("gallery").update({ order: i }).eq("id", newOrder[i].id);
    }
  }
console.log("CATEGORIES RECIBIDAS:", categories);


  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Administrar Galería</h1>

      {/* FORMULARIO */}
      <div className="p-6 bg-white rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">Subir nueva imagen</h2>

        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const selected = e.target.files?.[0] ?? null;

            setErrorMsg(null);
            setSuccessMsg(null);

            if (!selected) return setErrorMsg("No se seleccionó ningún archivo");
            if (!selected.type.startsWith("image/")) return setErrorMsg("Debe ser una imagen");
            if (selected.size > 10 * 1024 * 1024) return setErrorMsg("Máx 10MB");

            setFile(selected);
            setPreviewImage(URL.createObjectURL(selected));
          }}
        />

        <button
          type="button"
          onClick={() => document.getElementById("fileInput")?.click()}
          className="px-4 py-2 bg-gray-200 rounded-md mr-4"
        >
          Elegir imagen
        </button>

        {file && <span className="text-sm text-gray-600">{file.name}</span>}

        {previewImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Vista previa:</p>
            <img src={previewImage} className="w-48 h-48 object-cover rounded-lg border shadow" />
          </div>
        )}

        {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}

        {/* SELECT DINÁMICO */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded w-full mt-4 mb-4"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="px-6 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {loading ? "Subiendo..." : "Subir Imagen"}
        </button>
      </div>

      {/* LISTADO */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((img) => (
              <SortableItem key={img.id} id={img.id}>
                <div className="bg-white p-4 rounded-xl shadow border relative group">
                  <img
                    src={img.src}
                    className="rounded mb-3 h-48 w-full object-cover cursor-pointer"
                    onClick={() => setPreview(img.src)}
                  />

                  <p className="text-sm text-gray-600 mb-2">
                    {img.categories?.name}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(img)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deleteImage(img.id, img.src)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {editing && (
        <EditCategoryModal
          image={editing}
          categories={categories}
          onClose={() => setEditing(null)}
          onSave={updateCategory}
        />
      )}

      {preview && (
        <PreviewModal src={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
}