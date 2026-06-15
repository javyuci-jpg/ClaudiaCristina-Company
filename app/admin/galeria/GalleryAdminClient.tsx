"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { GalleryImage } from "./types";
import imageCompression from "browser-image-compression";
import pica from "pica";

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

// Función para procesar imagen (redimensionar + comprimir)
async function processImage(file: File, targetWidth = 1200, targetHeight = 1200) {
  const img = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  await pica().resize(img, canvas);
  const blobResized = await pica().toBlob(canvas, "image/jpeg", 0.9);

  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(
    new File([blobResized], file.name, { type: "image/jpeg" }),
    options
  );

  return compressedFile;
}

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

    try {
      const processedFile = await processImage(file, 1200, 1200);

      const sanitizedName = processedFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const filename = `${Date.now()}-${sanitizedName}`;

      const { data: userCheck } = await supabase.auth.getUser();
      if (!userCheck?.user) {
        setErrorMsg("No hay sesión activa");
        setLoading(false);
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filename, processedFile);

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
        published: true,
      });

      if (insertError) {
        console.error(insertError);
        setErrorMsg("Error guardando en la base de datos");
        setLoading(false);
        return;
      }

      setSuccessMsg("Imagen subida y publicada correctamente");
      setLoading(false);

      setPreviewImage(null);
      setFile(null);

      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error procesando la imagen");
      setLoading(false);
    }
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

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Administrar Galería</h1>

      {/* FORMULARIO */}
      {/* ... (la parte del formulario que ya compartiste) ... */}

     {/* LISTADO */}
<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
  <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
    <div className="space-y-4">
      {items.map((img) => (
        <SortableItem key={img.id} id={img.id}>
          <div className="flex items-center gap-4 p-2 border rounded bg-white shadow">
            <img
              src={img.src}
              alt={img.category_id ? `Imagen de categoría ${img.category_id}` : "Imagen"}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={() => deleteImage(img.id, img.src)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Eliminar
              </button>
              <button
                onClick={() => setEditing(img)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Editar
              </button>
              <button
                onClick={() => setPreview(img.src)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Vista previa
              </button>
            </div>
          </div>
        </SortableItem>
      ))}
    </div>
  </SortableContext>
</DndContext>

{/* MODALES */}
{editing && (
  <EditCategoryModal
    image={editing}
    categories={categories}
    onClose={() => setEditing(null)}
    onSave={(newCatId) => updateCategory(editing.id, newCatId)}
  />
)}

{preview && <PreviewModal src={preview} onClose={() => setPreview(null)} />}

    </div>
  );
}
