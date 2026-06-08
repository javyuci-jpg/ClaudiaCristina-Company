"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="p-2 rounded-md border border-gray-300 md:hidden"
    >
      {open ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
}

