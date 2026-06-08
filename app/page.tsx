"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastSeen = localStorage.getItem("splashLastSeen");

    if (lastSeen !== today) {
      localStorage.setItem("splashLastSeen", today);
      router.replace("/splash");
    } else {
      router.replace("/home");
    }
  }, [router]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      Cargando...
    </div>
  );
}
