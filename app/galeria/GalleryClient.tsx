"use client";

import { useState } from "react";
import Image from "next/image";

import HeroGallery from "../components/HeroGallery";
import Header from "../components/Header";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import FloatingChat from "../components/FloatingChat";
import Lightbox from "../components/Lightbox";

type GalleryImage = {
  src: string;
  category: string;
};

type Props = {
  images: GalleryImage[];
};

export default function GalleryClient({ images }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Todos");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const filteredImages = images.filter(
    (img) => filter === "Todos" || img.category === filter
  );

  return (
    <main className="bg-[#F7F3EE] text-[#111111] font-[Inter]">
      <Header />

      <HeroGallery
        title="Claudia Cristina"
        subtitle="Elegancia en cada movimiento."
        backgroundImage="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
        height="55vh"
      />

      <section className="w-full py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {["Todos", "Bodas", "Eventos", "Bouquets", "Arte Floral"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`
                    px-6 py-2 rounded-full border text-sm font-medium transition
                    ${
                      filter === cat
                        ? "bg-[#A4161A] text-white border-[#A4161A]"
                        : "bg-white text-[#111111] border-[#E8E1D9] hover:bg-[#f3ebe4]"
                    }
                  `}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 transition-all">
            {filteredImages.map((img, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-xl shadow-sm border border-[#E8E1D9] cursor-pointer"
                onClick={() => {
                  setSelected(img.src);
                  setCurrentIndex(i);
                }}
              >
                <Image
                  src={img.src}
                  alt="Foto"
                  width={600}
                  height={400}
                  placeholder="blur"
                  blurDataURL={img.blurDataURL ?? ""}
                  loading="lazy"
                  className="object-cover h-72 w-full group-hover:scale-105 transition-transform duration-500"
                />

              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <Lightbox
          images={filteredImages}
          index={currentIndex}
          setIndex={setCurrentIndex}
          onClose={() => setSelected(null)}
        />
      )}

      <CallToAction />
      <Footer />
      <FloatingChat />
    </main>
  );
}
