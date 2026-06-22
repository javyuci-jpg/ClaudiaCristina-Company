"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CotizarPage() {
  const { t } = useTranslation("cotizar");

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    fecha: "",
    ubicacion: "",
    tipoEvento: "",
    servicios: [] as string[],
    invitados: "",
    conociste: "",
    descripcion: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let servicios = [...formData.servicios];
    if (checked) {
      servicios.push(value);
    } else {
      servicios = servicios.filter(s => s !== value);
    }
    setFormData({ ...formData, servicios });
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.nombre) newErrors.nombre = t("errors.nombre");
    if (!formData.correo) newErrors.correo = t("errors.correo");
    if (!formData.telefono) newErrors.telefono = t("errors.telefono");
    if (!formData.fecha) newErrors.fecha = t("errors.fecha");

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const mensaje = `${t("heroTitle")}
${t("fields.nombre")}: ${formData.nombre}
${t("fields.correo")}: ${formData.correo}
${t("fields.telefono")}: ${formData.telefono}
${t("fields.fecha")}: ${formData.fecha}
${t("fields.ubicacion")}: ${formData.ubicacion}
${t("fields.tipoEvento")}: ${formData.tipoEvento}
${t("fields.servicios")}: ${formData.servicios.join(", ")}
${t("fields.invitados")}: ${formData.invitados}
${t("fields.conociste")}: ${formData.conociste}
${t("fields.descripcion")}: ${formData.descripcion}`;

    const url = `https://wa.me/521234567890?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    setSuccessMessage(t("success"));
  };

  const isFormValid = formData.nombre && formData.correo && formData.telefono && formData.fecha;

  return (
    <main className="bg-[#F7F3EE] text-[#111111] font-[Inter]" role="main">
      
      {/* Hero */}
      <section className="w-full h-[40vh] bg-[#E8E1D9] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111]">
          {t("heroTitle")}
        </h1>
      </section>

      {/* Formulario */}
      <section className="w-full py-12 bg-[#F7F3EE]" aria-labelledby="formulario-cotizar">
        <div className="max-w-4xl mx-auto px-6">
          <h2 id="formulario-cotizar" className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
            {t("formTitle")}
          </h2>

          <div className="bg-white p-8 rounded-xl shadow-md">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}

            {/* Campos */}
            <div className="mb-4">
              <input name="nombre" placeholder={t("fields.nombre")} onChange={handleChange} className="w-full p-3 border rounded" />
              {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>}
            </div>

            <div className="mb-4">
              <input name="correo" type="email" placeholder={t("fields.correo")} onChange={handleChange} className="w-full p-3 border rounded" />
              {errors.correo && <p className="text-red-600 text-sm mt-1">{errors.correo}</p>}
            </div>

            <div className="mb-4">
              <input name="telefono" placeholder={t("fields.telefono")} onChange={handleChange} className="w-full p-3 border rounded" />
              {errors.telefono && <p className="text-red-600 text-sm mt-1">{errors.telefono}</p>}
            </div>

            <div className="mb-4">
              <input type="date" name="fecha" onChange={handleChange} className="w-full p-3 border rounded" />
              {errors.fecha && <p className="text-red-600 text-sm mt-1">{errors.fecha}</p>}
            </div>

            <input name="ubicacion" placeholder={t("fields.ubicacion")} onChange={handleChange} className="w-full p-3 border rounded mb-4" />

            <select name="tipoEvento" onChange={handleChange} className="w-full p-3 border rounded mb-4">
              <option value="">{t("fields.tipoEvento")}</option>
              {(t("options.tipoEvento", { returnObjects: true }) as string[]).map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <label className="block mb-2 font-semibold">{t("fields.servicios")}:</label>
            {(t("options.servicios", { returnObjects: true }) as string[]).map((s) => (
              <label key={s} className="block mb-2">
                <input type="checkbox" value={s} onChange={handleCheckbox} /> {s}
              </label>
            ))}

            <input name="invitados" placeholder={t("fields.invitados")} onChange={handleChange} className="w-full p-3 border rounded mb-4" />

            <select name="conociste" onChange={handleChange} className="w-full p-3 border rounded mb-4">
              <option value="">{t("fields.conociste")}</option>
              {(t("options.conociste", { returnObjects: true }) as string[]).map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <textarea name="descripcion" placeholder={t("fields.descripcion")} onChange={handleChange} className="w-full p-3 border rounded mb-4" />

            {/* Botón */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 font-semibold text-lg rounded-lg transition-all font-[Inter]
                ${isFormValid ? "bg-[#A4161A] text-white hover:bg-[#7f1013]" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
            >
              {t("button")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
