"use client";

import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { FEATURED, fmtARS } from "@/lib/products";
import type { Product } from "@/lib/products";

function ProductCard({ p }: { p: Product }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ codigo: p.codigo, nombre: p.nombre, precio: p.precio, imagen: p.imagen });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen */}
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "var(--bg-card)" }}>
        <Image
          src={`/images/products/${p.imagen}`}
          alt={p.nombre}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.25,0.1,0.25,1)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Guardar */}
        <button
          onClick={() => setLiked(!liked)}
          style={{
            position: "absolute", top: "0.75rem", right: "0.75rem",
            background: "rgba(255,255,255,0.85)", borderRadius: "50%",
            border: "none", cursor: "pointer", padding: "0.4rem",
            opacity: hovered || liked ? 1 : 0.6,
            transition: "opacity 0.2s ease",
          }}
          aria-label="Guardar"
        >
          <Heart size={16} strokeWidth={1.5} color={liked ? "#c00" : "var(--text)"} fill={liked ? "#c00" : "none"} />
        </button>

        {/* Quick-add (hover desktop) */}
        <button
          onClick={handleAdd}
          aria-label={`Agregar ${p.nombre} al carrito`}
          className="lv-quick-add"
          style={{
            position: "absolute", left: "50%", bottom: "0.85rem",
            transform: `translateX(-50%) translateY(${hovered || added ? "0" : "8px"})`,
            opacity: hovered || added ? 1 : 0,
            transition: "opacity 0.25s ease, transform 0.25s ease",
            background: added ? "#1a6d3a" : "var(--text)",
            color: "var(--white)",
            border: "none", cursor: "pointer",
            padding: "0.6rem 1.1rem", borderRadius: 999,
            fontFamily: "var(--font-sans)", fontSize: "0.7rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            whiteSpace: "nowrap",
          }}
        >
          {added ? <><Check size={14} strokeWidth={2} /> Agregado</> : <><ShoppingBag size={14} strokeWidth={1.6} /> Agregar al carrito</>}
        </button>
      </div>

      {/* Caption */}
      <div style={{ padding: "0.85rem 0.25rem 1.25rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 400, color: "var(--text)", marginBottom: "0.3rem", lineHeight: 1.3 }}>
          {p.nombre}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.74rem", fontWeight: 400, color: "var(--text-light)", marginBottom: "0.6rem" }}>
          {fmtARS(p.precio)}
        </p>

        {/* Mobile add button */}
        <button
          onClick={handleAdd}
          className="lv-add-mobile"
          aria-label={`Agregar ${p.nombre} al carrito`}
          style={{
            display: "none", width: "100%",
            background: added ? "#1a6d3a" : "transparent",
            color: added ? "var(--white)" : "var(--text)",
            border: `1px solid ${added ? "#1a6d3a" : "var(--text)"}`,
            cursor: "pointer", padding: "0.55rem 0.8rem", borderRadius: 999,
            fontFamily: "var(--font-sans)", fontSize: "0.68rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            alignItems: "center", justifyContent: "center", gap: "0.4rem",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
        >
          {added ? <><Check size={13} strokeWidth={2} /> Agregado</> : <><ShoppingBag size={13} strokeWidth={1.6} /> Agregar</>}
        </button>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  return (
    <section style={{ backgroundColor: "var(--white)", padding: "5rem 0" }}>

      {/* Video editorial */}
      <div style={{ position: "relative", width: "100%", height: "50vh", minHeight: "280px", overflow: "hidden", backgroundColor: "#0a0a0a", marginBottom: "5rem" }}>
        <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}>
          <source src="/videos/IMG_4686.MOV" type="video/mp4" />
        </video>
      </div>

      {/* Encabezado */}
      <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
        <p className="label-section" style={{ marginBottom: "0.75rem" }}>Nuevos Ingresos</p>
        <h2 className="headline-lg">Nueva Colección</h2>
      </div>

      {/* Grid */}
      <div
        style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem 1.5rem" }}
        className="prod-grid"
      >
        {FEATURED.map((p) => <ProductCard key={p.codigo} p={p} />)}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
        <a href="/catalogo" className="btn-pill">Ver catálogo completo</a>
      </div>

      <style>{`
        @media (max-width: 900px) { .prod-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 640px) { .prod-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (hover: none), (max-width: 768px) {
          .lv-quick-add { display: none !important; }
          .lv-add-mobile { display: inline-flex !important; }
        }
      `}</style>
    </section>
  );
}
