"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-4">
      {parts.map((part, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/");
        return (
          <span key={i}>
            <a href={href} className="hover:underline capitalize">
              {part}
            </a>
            {i < parts.length - 1 && " / "}
          </span>
        );
      })}
    </nav>
  );
}

