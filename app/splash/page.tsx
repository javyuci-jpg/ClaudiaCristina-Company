"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true); // activa fade-out
    }, 5000);

    const timer2 = setTimeout(() => {
      router.push("/home"); // redirige después del fade-out
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <div
      className={`w-screen h-screen relative overflow-hidden ${
        fadeOut ? "fade-out" : "fade-in"
      }`}
    >
      <img
        src="/claudia.jpeg"
        alt="Claudia"
        className="w-screen h-screen object-contain bg-black"

      />

      {/* Texto centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl md:text-7xl font-light drop-shadow-lg text-appear">
  CLAUDIA
</h1>
      </div>
    </div>
  );
}

