"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const lastSeen = localStorage.getItem("splashLastSeen");

    if (lastSeen !== today) {
      // Mostrar splash
      localStorage.setItem("splashLastSeen", today);
      router.replace("/splash");
    } else {
      // Ir directo al Home
      router.replace("/home");
    }

    setLoading(false);
  }, [router]);

  return <div />;
}

