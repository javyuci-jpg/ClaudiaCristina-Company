"use client";

import { useEffect, useState, useRef } from "react";

interface LightboxProps {
  images: { src: string; category: string }[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}

export default function Lightbox({ images, index, setIndex, onClose }: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [sliding, setSliding] = useState<"left" | "right" | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const translate = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const image = images[index];

  // Navegación
  const next = () => {
    setSliding("left");
    setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
      setZoom(1);
      translate.current = { x: 0, y: 0 };
      setSliding(null);
      setProgress(0);
    }, 200);
  };

  const prev = () => {
    setSliding("right");
    setTimeout(() => {
      setIndex((i) => (i - 1 + images.length) % images.length);
      setZoom(1);
      translate.current = { x: 0, y: 0 };
      setSliding(null);
      setProgress(0);
    }, 200);
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // Slideshow + barra de progreso
  useEffect(() => {
    if (!autoPlay) {
      setProgress(0);
      return;
    }

    const total = 4000;
    const step = 50;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += step;
      setProgress((elapsed / total) * 100);
      if (elapsed >= total) {
        next();
        elapsed = 0;
      }
    }, step);

    return () => clearInterval(interval);
  }, [index, autoPlay]);

  // Zoom con scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) setZoom((z) => Math.min(z + 0.2, 3));
    else setZoom((z) => Math.max(z - 0.2, 1));
  };

  // Zoom con doble clic
  const handleDoubleClick = () => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
      translate.current = { x: 0, y: 0 };
    }
  };

  // Swipe en móvil
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) prev();
    if (diff < -50) next();

    touchStartX.current = null;
  };

  // Pan (arrastrar cuando hay zoom)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    dragStart.current = { x: e.clientX - translate.current.x, y: e.clientY - translate.current.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current || zoom === 1) return;
    translate.current = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${translate.current.x}px, ${translate.current.y}px) scale(${zoom})`;
    }
  };

  const handleMouseUp = () => {
    dragStart.current = null;
  };

  // Auto-scroll miniaturas al centro
  useEffect(() => {
    if (!thumbsRef.current) return;
    const container = thumbsRef.current;
    const active = container.querySelector<HTMLImageElement>('[data-active="true"]');
    if (!active) return;

    const offsetLeft = active.offsetLeft - container.clientWidth / 2 + active.clientWidth / 2;
    container.scrollTo({ left: offsetLeft, behavior: "smooth" });
  }, [index]);

  // Fullscreen (solo visual, no API nativa)
  const toggleFullscreen = () => {
    setIsFullscreen((f) => !f);
  };

  return (
    <div
      className={`
        fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50
        ${isFullscreen ? "p-0" : "p-4"}
      `}
      onClick={onClose}
    >
      <div
        className={`
          relative w-full ${isFullscreen ? "h-full" : "max-w-5xl"} flex flex-col items-center
        `}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Contenedor de imagen con blur en transición */}
        <div
          ref={containerRef}
          className={`
            max-w-5xl w-full mx-auto rounded-xl shadow-2xl overflow-hidden
            transition-all duration-300
            ${sliding === "left" ? "-translate-x-10 opacity-0 blur-sm" : ""}
            ${sliding === "right" ? "translate-x-10 opacity-0 blur-sm" : ""}
          `}
          style={{ transform: `translate(${translate.current.x}px, ${translate.current.y}px) scale(${zoom})` }}
        >
          <img
            src={image.src}
            alt="Imagen ampliada"
            className="w-full h-auto select-none"
            draggable={false}
          />
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-light hover:opacity-70 transition"
        >
          ✕
        </button>

        {/* Flecha izquierda */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 text-white text-5xl px-3 hover:opacity-70 transition"
        >
          ‹
        </button>

        {/* Flecha derecha */}
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-white text-5xl px-3 hover:opacity-70 transition"
        >
          ›
        </button>

        {/* Barra de progreso slideshow */}
        <div className="w-full max-w-3xl mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Miniaturas tipo carrusel */}
        <div
          ref={thumbsRef}
          className="flex gap-3 mt-4 overflow-x-auto px-6 pb-4 w-full max-w-4xl"
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              data-active={i === index ? "true" : "false"}
              onClick={() => {
                setIndex(i);
                setZoom(1);
                translate.current = { x: 0, y: 0 };
              }}
              className={`
                w-20 h-20 object-cover rounded-lg cursor-pointer transition-all flex-shrink-0
                ${i === index ? "ring-4 ring-white scale-110" : "opacity-70 hover:opacity-100"}
              `}
            />
          ))}
        </div>

        {/* Controles inferiores */}
        <div className="mt-3 flex gap-3 items-center text-white">
          <button
            onClick={() => setAutoPlay((p) => !p)}
            className="text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition"
          >
            {autoPlay ? "⏸ Pausar" : "▶ Reproducir"}
          </button>

          <button
            onClick={toggleFullscreen}
            className="text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition"
          >
            {isFullscreen ? "⤢ Salir de pantalla completa" : "⤢ Pantalla completa"}
          </button>

          <span className="text-xs opacity-70">
            {index + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
