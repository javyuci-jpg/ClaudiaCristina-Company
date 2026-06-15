"use client";

import { useEffect } from "react";

export default function PreviewModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose} // cerrar al hacer clic fuera
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()} // evita cerrar si se hace clic en la imagen
      >
        <img
          src={src}
          alt="Vista previa"
          className="max-h-[90vh] rounded-xl shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-2xl"
          aria-label="Cerrar vista previa"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
