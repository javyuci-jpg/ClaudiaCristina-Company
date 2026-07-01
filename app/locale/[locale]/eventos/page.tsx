"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "../../../components/SectionTitle";

// Componentes globales
import HeroGallery from "../../../components/HeroGallery";
import Header from "../../../components/Header";
import CallToAction from "../../../components/CallToAction";
import Footer from "../../../components/Footer";
import FloatingChat from "../../../components/FloatingChat";


export default function eventos() {
  const [selected, setSelected] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("Todos");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
  
     return (
        <main className="bg-[#F7F3EE] text-[#111111] font-[Inter]">
          {/* HEADER */}
        
    
          {/* HERO */}
          <HeroGallery
            title="Claudia Cristina"
            subtitle="Elegancia en cada movimiento."
            backgroundImage="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
            height="55vh"
          />
    <section className="w-full py-8 bg-[#E8E1D9]">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
              <SectionTitle>Eventos</SectionTitle> 
              
            </h2>
    
            </div>
        </section>
  
    
          {/* CTA */}
          <CallToAction />
    
       
    
          {/* CHAT */}
          <FloatingChat />
        </main>
      );
  }