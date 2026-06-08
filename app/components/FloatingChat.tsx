"use client";

import { FaComments } from "react-icons/fa";

export default function FloatingChat() {
  return (
    <div
      className="
        fixed 
        bottom-6 
        right-6 
        z-40 
        group 
        flex 
        items-center 
        pointer-events-none
      "
    >
      {/* Tooltip */}
      <span
        className="
          mr-3
          text-black
          font-bold
          text-sm
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          translate-x-2
          group-hover:translate-x-0
          border
          border-[#C9A227]
          rounded
          px-3
          py-1
          shadow-sm
          bg-transparent
          pointer-events-none
        "
      >
        ChatBox
      </span>

      {/* Botón */}
      <button
        className="
          bg-[#A4161A]
          text-white
          p-4
          rounded-full
          shadow-lg
          hover:bg-[#7f1013]
          transition
          pointer-events-auto
        "
        type="button"
        onClick={() => alert("Aquí irá tu chat o formulario")}
      >
        <FaComments size={24} />
      </button>
    </div>
  );
}