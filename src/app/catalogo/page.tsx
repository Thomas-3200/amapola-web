"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, Check, MessageCircle } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { CATALOG, fmtARS } from "@/lib/products";
import type { Product } from "@/lib/products";

const CATEGORIES = ["Todos", "Carteras", "Billeteras", "Billeteras Compactas", "Crossbody", "Riñoneras", "Tote Bags", "Accesorios"];
const WA_BASE = "https://wa.me/5491166676467?text=";

function CatalogCard({ p, index }: { p: Product; index: number }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const hasPrecio = p.precio > 0;

  const handleAdd = () => {
    if (!hasPrecio) return;
    addItem({ codigo: p.codigo, nombre: p.nombre, precio: p.precio, imagen: p.imagen });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const waHref = WA_BASE + encodeURIComponent(
    hasPrecio
      ? `Hola Amapola! Me interesa "${p.nombre}" (${fmtARS(p.precio)}). Código: ${p.codigo}`
      : `Hola Amapola! Me interesa el producto ${p.codigo} (Pieza ${String(index + 1).padStart(2, "0")}). ¿Podrías darme más información?`
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen */}
      <div
        style={{
          position: "relative", width: "100%", aspectRatio: "3/4",
          backgroundColor: "var(--bg-card)", overflow: "hidden", marginBottom: "0.9rem",
        }}
      >
        <Image
          src={`/images/products/${p.imagen}`}
          alt={hasPrecio ? p.nombre : `Amapola producto ${index + 1}`}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Guardar */}
        <button
          onClick={() => setLiked(!liked)}
          style={{
            position: "absolute", top: "0.75rem", right: "0.75rem",
            background: "rgba(255,255,255,0.85)", borderRadius: "50%",
            border: "none", cursor: "pointer", padding: "0.4rem",
            opacity: hovered || liked ? 1 : 0.5,
            transition: "opacity 0.2s",
          }}
          aria-label="Guardar"
        >
          <Heart size={15} strokeWidth={1.5} color={liked ? "#c00" : "var(--text)"} fill={liked ? "#c00" : "none"} />
        </button>

        {/* Quick-add hover (desktop) — solo si tiene precio */}
        {hasPrecio && (
          <button
            onClick={handleAdd}
            className="lv-quick-add"
            style={{
              position: "absolute", left: "50%", bottom: "0.75rem",
              transform: `translateX(-50%) translateY(${hovered || added ? "0" : "8px"})`,
              opacity: hovered || added ? 1 : 0,
              transition: "opacity 0.25s ease, transform 0.25s ease",
              background: added ? "#1a6d3a" : "var(--text)",
              color: "var(--white)",
              border: "none", cursor: "pointer",
              padding: "0.55rem 1rem", borderRadius: 999,
              fontFamily: "var(--font-sans)", fontSize: "0.68rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              whiteSpace: "nowrap",
            }}
            aria-label={`Agregar ${p.nombre} al carrito`}
          >
            {added
              ? <><Check size={13} strokeWidth={2} /> Agregado</>
              : <><ShoppingBag size={13} strokeWidth={1.6} /> Agregar</>}
          </button>
        )}

        {/* Badge "Consultar" — solo sin precio, hover */}
        {!hasPrecio && hovered && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="lv-quick-add"
            style={{
              position: "absolute", left: "50%", bottom: "0.75rem",
              transform: "translateX(-50%)",
              background: "rgba(26,26,26,0.88)",
              color: "var(--white)",
              padding: "0.55rem 1rem", borderRadius: 999,
              fontFamily: "var(--font-sans)", fontSize: "0.68rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              whiteSpace: "nowrap", textDecoration: "none",
            }}
          >
            <MessageCircle size={13} strokeWidth={1.5} /> Consultar
          </a>
        )}
      </div>

      {/* Caption */}
      <div style={{ paddingBottom: "1.25rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.25rem" }}>
          {hasPrecio ? p.nombre : `Pieza ${String(index + 1).padStart(2, "0")}`}
        </p>

        {hasPrecio ? (
          <>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-light)", fontWeight: 300, marginBottom: "0.6rem" }}>
              {fmtARS(p.precio)}
            </p>
            {/* Mobile add */}
            <button
              onClick={handleAdd}
              className="lv-add-mobile"
              style={{
                display: "none", width: "100%",
                background: added ? "#1a6d3a" : "transparent",
                color: added ? "var(--white)" : "var(--text)",
                border: `1px solid ${added ? "#1a6d3a" : "var(--border)"}`,
                cursor: "pointer", padding: "0.5rem 0.7rem", borderRadius: 999,
                fontFamily: "var(--font-sans)", fontSize: "0.65rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                alignItems: "center", justifyContent: "center", gap: "0.35rem",
              }}
            >
              {added
                ? <><Check size={12} strokeWidth={2} /> Agregado</>
                : <><ShoppingBag size={12} strokeWidth={1.6} /> Agregar</>}
            </button>
          </>
        ) : (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--text-light)", fontWeight: 300, textDecoration: "none" }}
          >
            Consultar precio →
          </a>
        )}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos"
    ? CATALOG
    : CATALOG.filter((p) => p.categoria === activeCategory);

  return (
    <>
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--white)", padding: "4rem 2rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <p className="label-section" style={{ marginBottom: "0.75rem" }}>Catálogo</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Todas nuestras piezas.
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "var(--text-light)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Explorá la colección completa de Amapola. Comprá directamente o consultanos por WhatsApp.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section style={{ backgroundColor: "var(--white)", padding: "1rem 2rem 2rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.55rem 1.25rem", borderRadius: "100px",
                border: "1px solid var(--border)",
                backgroundColor: activeCategory === cat ? "var(--text)" : "transparent",
                color: activeCategory === cat ? "var(--white)" : "var(--text)",
                fontFamily: "var(--font-sans)", fontSize: "0.7rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer", transition: "background 0.2s, color 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ backgroundColor: "var(--white)", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-light)" }}>
                No hay productos en esta categoría todavía.
              </p>
            </div>
          ) : (
            <div className="catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem 1.25rem" }}>
              {filtered.map((p, i) => (
                <CatalogCard key={p.codigo} p={p} index={CATALOG.indexOf(p)} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <a
            href={WA_BASE + encodeURIComponent("Hola Amapola! Quiero más información del catálogo")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Consultar por WhatsApp
          </a>
          <div style={{ marginTop: "1.25rem" }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-sans)", fontSize: "0.72rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--text-light)", textDecoration: "none",
                borderBottom: "1px solid var(--text-light)", paddingBottom: "2px",
              }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) { .catalog-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 600px) { .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.5rem 0.75rem !important; } }
        @media (hover: none), (max-width: 768px) {
          .lv-quick-add { display: none !important; }
          .lv-add-mobile { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
