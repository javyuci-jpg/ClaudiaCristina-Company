"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function CallToAction() {
  const { t } = useTranslation("callToAction"); // namespace "callToAction"

  return (
    <section className="w-full py-10 bg-[#D6CFC7]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Botón principal */}
        <Link
          href="/locale/cotizar"
          className="inline-block px-12 py-4 bg-[#A4161A] text-white font-semibold text-lg rounded-lg hover:bg-[#7f1013] transition-all font-[Inter] cursor-pointer"
        >
          {t("button")}
        </Link>
      </div>
    </section>
  );
}