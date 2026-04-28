"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check, Send, Save, Download } from "lucide-react";
import { CATALOG } from "@/lib/products";

// Usamos los 19 productos reales del catálogo
const PRODUCTS = CATALOG;

type ProductData = { precio: string; descripcion: string; stock: string };
type DataMap = Record<string, ProductData>;

const STORAGE_KEY = "amapola_carga_v2";
const DESTINATION_EMAIL = "cabj.lopez.thomas@gmail.com";

export default function CargaPage() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<DataMap>({});
  const [showSummary, setShowSummary] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData(parsed.data || {});
        setIndex(parsed.index || 0);
      }
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, index }));
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 1500);
      return () => clearTimeout(t);
    } catch {}
  }, [data, index]);

  const current = PRODUCTS[index];
  const currentData = data[current.codigo] || { precio: "", descripcion: "", stock: "" };

  // Pre-populate precio if already defined in CATALOG
  const catalogPrecio = current.precio > 0 ? String(current.precio) : "";

  const completedCount = useMemo(
    () => Object.values(data).filter((d) => d.precio.trim() && d.descripcion.trim() && d.stock.trim()).length,
    [data]
  );

  function updateField(field: "precio" | "descripcion" | "stock", value: string) {
    setData((d) => ({
      ...d,
      [current.codigo]: { ...currentData, [field]: value },
    }));
  }

  function go(dir: 1 | -1) {
    const next = index + dir;
    if (next >= 0 && next < PRODUCTS.length) setIndex(next);
  }

  function jumpTo(i: number) {
    setIndex(i);
    setShowSummary(false);
  }

  // Build CSV text
  function buildCSV() {
    const header = "codigo,nombre,categoria,imagen_hero,precio_ars,stock,descripcion_corta";
    const rows = PRODUCTS.map((p) => {
      const d = data[p.codigo] || { precio: "", descripcion: "", stock: "" };
      const precio = d.precio.replace(/[^\d]/g, "") || (p.precio > 0 ? String(p.precio) : "");
      const stock = d.stock.replace(/[^\d]/g, "");
      const desc = `"${d.descripcion.replace(/"/g, '""')}"`;
      return `${p.codigo},"${p.nombre}","${p.categoria}",${p.imagen},${precio},${stock},${desc}`;
    });
    return [header, ...rows].join("\n");
  }

  function buildEmailBody() {
    const lines = [`Catálogo Amapola — completado por Paola`, ``, `Total productos cargados: ${completedCount} de ${PRODUCTS.length}`, ``, `---`, ``];
    PRODUCTS.forEach((p) => {
      const d = data[p.codigo];
      if (d && (d.precio || d.descripcion || d.stock)) {
        lines.push(`${p.codigo} — ${p.nombre} (${p.categoria})`);
        if (d.precio) lines.push(`  Precio: $${d.precio}`);
        if (d.stock) lines.push(`  Stock: ${d.stock} unidades`);
        if (d.descripcion) lines.push(`  Descripción: ${d.descripcion}`);
        lines.push(``);
      }
    });
    return lines.join("\n");
  }

  function sendEmail() {
    const subject = `Amapola — Catálogo completo (${completedCount}/${PRODUCTS.length} productos)`;
    const body = buildEmailBody();
    const mailto = `mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  function downloadCSV() {
    const csv = buildCSV();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `amapola_catalogo_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetAll() {
    if (confirm("¿Borrar todo lo cargado y empezar de nuevo?")) {
      localStorage.removeItem(STORAGE_KEY);
      setData({});
      setIndex(0);
      setShowSummary(false);
    }
  }

  // ── SUMMARY SCREEN ──
  if (showSummary) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--white)", padding: "1.5rem 1rem 3rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <button
            onClick={() => setShowSummary(false)}
            style={{ background: "none", border: "none", color: "var(--text-light)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "0.8rem", padding: "0.5rem 0", marginBottom: "1rem" }}
          >
            ← Volver a cargar
          </button>

          <h1 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "1.8rem", color: "var(--text)", marginBottom: "0.5rem" }}>
            Resumen
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-light)", marginBottom: "2rem" }}>
            {completedCount} de {PRODUCTS.length} productos completos
          </p>

          {/* Lista resumida */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
            {PRODUCTS.map((p, i) => {
              const d = data[p.codigo];
              const precioFinal = d?.precio?.trim() || (p.precio > 0 ? String(p.precio) : "");
              const complete = precioFinal && d?.descripcion?.trim() && d?.stock?.trim();
              const partial = (precioFinal || d?.descripcion?.trim() || d?.stock?.trim()) && !complete;
              return (
                <button
                  key={p.codigo}
                  onClick={() => jumpTo(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.6rem 0.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    background: complete ? "#f4f7f2" : partial ? "#fffaf0" : "var(--white)",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    color: "var(--text)",
                    textAlign: "left",
                  }}
                >
                  <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0, borderRadius: 4, overflow: "hidden", background: "var(--bg-card)" }}>
                    <Image src={`/images/products/${p.imagen}`} alt={p.nombre} fill sizes="40px" style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{p.nombre}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.65rem", marginBottom: "0.15rem" }}>{p.codigo} · {p.categoria}</div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.7rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {precioFinal && <span>${precioFinal}</span>}
                      {d?.stock && <span>· {d.stock} u.</span>}
                    </div>
                  </div>
                  {complete && <Check size={16} color="#4a7a3a" />}
                  {partial && <span style={{ color: "#c08040", fontSize: "0.7rem" }}>incompleto</span>}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              onClick={sendEmail}
              disabled={completedCount === 0}
              style={{
                background: "var(--text)",
                color: "var(--white)",
                border: "none",
                borderRadius: "100px",
                padding: "1rem 2rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: completedCount > 0 ? "pointer" : "not-allowed",
                opacity: completedCount > 0 ? 1 : 0.4,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <Send size={14} /> Enviar por email
            </button>
            <button
              onClick={downloadCSV}
              style={{
                background: "transparent",
                color: "var(--text)",
                border: "1px solid var(--text)",
                borderRadius: "100px",
                padding: "1rem 2rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <Download size={14} /> Descargar CSV
            </button>
            <button
              onClick={resetAll}
              style={{
                background: "transparent",
                color: "var(--text-muted)",
                border: "none",
                padding: "0.75rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                cursor: "pointer",
              }}
            >
              Borrar todo y reiniciar
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── FORM SCREEN ──
  return (
    <main style={{ minHeight: "100vh", background: "var(--white)", display: "flex", flexDirection: "column" }}>

      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "0.75rem 1rem", zIndex: 10 }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)" }}>
            Amapola · Carga
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--text-light)" }}>
              {index + 1} / {PRODUCTS.length}
            </span>
            <button
              onClick={() => setShowSummary(true)}
              style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: "100px", padding: "0.4rem 0.9rem", fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text)", cursor: "pointer" }}
            >
              Resumen · {completedCount}
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ maxWidth: "640px", margin: "0.5rem auto 0", height: "2px", background: "var(--border)", borderRadius: "1px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((index + 1) / PRODUCTS.length) * 100}%`, background: "var(--text)", transition: "width 0.3s" }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "1.5rem 1rem 6rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>

          {/* Header del producto */}
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.2rem" }}>
              {current.codigo} · {current.categoria}
            </p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "1.6rem", color: "var(--text)", lineHeight: 1.2 }}>
              {current.nombre}
            </h1>
          </div>

          {/* Foto hero */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", background: "var(--bg-card)", borderRadius: "8px", overflow: "hidden", marginBottom: "0.75rem" }}>
            <Image
              src={`/images/products/${current.imagen}`}
              alt={current.nombre}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Tira de miniaturas (sólo si hay más de 1 foto) */}
          {current.imagenes.length > 1 && (
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
              {current.imagenes.map((img, i) => (
                <div key={i} style={{ position: "relative", flexShrink: 0, width: 54, height: 54, borderRadius: 6, overflow: "hidden", background: "var(--bg-card)", border: i === 0 ? "2px solid var(--text)" : "2px solid transparent" }}>
                  <Image src={`/images/products/${img}`} alt={`Ángulo ${i + 1}`} fill sizes="54px" style={{ objectFit: "cover" }} />
                </div>
              ))}
              <p style={{ alignSelf: "center", fontFamily: "var(--font-sans)", fontSize: "0.62rem", color: "var(--text-muted)", whiteSpace: "nowrap", paddingLeft: "0.25rem" }}>
                {current.imagenes.length} fotos
              </p>
            </div>
          )}

          {/* Campos */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.5rem" }}>

            {/* Precio + Stock en una fila */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <div style={{ flex: "1 1 55%" }}>
                <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.5rem" }}>
                  Precio (ARS)
                </label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "8px", padding: "0 0.9rem", background: "var(--white)" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--text-muted)", marginRight: "0.4rem" }}>$</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={currentData.precio || catalogPrecio}
                    onChange={(e) => updateField("precio", e.target.value)}
                    placeholder={catalogPrecio || "42000"}
                    style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--text)", padding: "0.9rem 0", minWidth: 0 }}
                  />
                </div>
                {current.precio > 0 && !currentData.precio && (
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: "#4a7a3a", marginTop: "0.3rem" }}>
                    ✓ Precio cargado: ${current.precio.toLocaleString("es-AR")}
                  </p>
                )}
              </div>

              <div style={{ flex: "1 1 40%" }}>
                <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.5rem" }}>
                  Stock (unidades)
                </label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--white)" }}>
                  {/* − */}
                  <button
                    type="button"
                    onClick={() => {
                      const v = Math.max(0, parseInt(currentData.stock || "0", 10) - 1);
                      updateField("stock", String(v));
                    }}
                    style={{ padding: "0.9rem 0.85rem", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1 }}
                    aria-label="Restar"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={currentData.stock}
                    onChange={(e) => updateField("stock", e.target.value)}
                    placeholder="0"
                    style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--text)", padding: "0.9rem 0", textAlign: "center", minWidth: 0 }}
                  />
                  {/* + */}
                  <button
                    type="button"
                    onClick={() => {
                      const v = parseInt(currentData.stock || "0", 10) + 1;
                      updateField("stock", String(v));
                    }}
                    style={{ padding: "0.9rem 0.85rem", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1 }}
                    aria-label="Sumar"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.5rem" }}>
                Descripción
              </label>
              <textarea
                value={currentData.descripcion}
                onChange={(e) => updateField("descripcion", e.target.value)}
                placeholder="Ej: Cartera en cuero sintético, con compartimento amplio y cierre. Incluye bandolera desmontable."
                rows={4}
                style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.9rem", fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.5, resize: "vertical", background: "var(--white)", outline: "none", boxSizing: "border-box" }}
              />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                1–2 oraciones. Describí material, estilo y detalles.
              </p>
            </div>
          </div>

          {/* Save indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: saved ? "#4a7a3a" : "var(--text-muted)", minHeight: "1.2rem" }}>
            {saved ? <><Check size={12} /> Guardado automáticamente</> : <><Save size={12} /> Se guarda solo</>}
          </div>
        </div>
      </div>

      {/* Bottom nav fija */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "var(--white)", borderTop: "1px solid var(--border)", padding: "0.75rem 1rem", zIndex: 10 }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            style={{
              flex: "0 0 auto",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "0.85rem 1rem",
              background: "var(--white)",
              cursor: index === 0 ? "not-allowed" : "pointer",
              opacity: index === 0 ? 0.3 : 1,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            <ChevronLeft size={14} /> Atrás
          </button>

          {index === PRODUCTS.length - 1 ? (
            <button
              onClick={() => setShowSummary(true)}
              style={{
                flex: 1,
                background: "var(--text)",
                color: "var(--white)",
                border: "none",
                borderRadius: "100px",
                padding: "0.85rem 1.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
              }}
            >
              Ver resumen <Check size={14} />
            </button>
          ) : (
            <button
              onClick={() => go(1)}
              style={{
                flex: 1,
                background: "var(--text)",
                color: "var(--white)",
                border: "none",
                borderRadius: "100px",
                padding: "0.85rem 1.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
              }}
            >
              Siguiente <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
