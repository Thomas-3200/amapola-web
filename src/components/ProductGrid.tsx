"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";

const products = [
  { name: "Riñonera Amapola Bordo", price: 19000, category: "Riñoneras", image: "/images/products/IMG_4627.jpg" },
  { name: "Oreiro Love — Vino", price: 15000, category: "Billeteras", image: "/images/products/IMG_4653.jpg" },
  { name: "Chimola Vino", price: 28000, category: "Billeteras", image: "/images/products/IMG_4660.jpg" },
  { name: "Chimola Camel", price: 28000, category: "Billeteras", image: "/images/products/IMG_4658.jpg" },
  { name: "ch/ml Gris", price: 12000, category: "Billeteras Compactas", image: "/images/products/IMG_4673.jpg" },
  { name: "Barbara Crossbody Beige", price: 35000, category: "Crossbody", image: "/images/products/IMG_4666.jpg" },
  { name: "The Tote Bag — Caramelo", price: 52000, category: "Tote Bags", image: "/images/products/IMG_4677.jpg" },
  { name: "Cartera Cuero Negro", price: 45000, category: "Carteras", image: "/images/products/IMG_4691.jpg" },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

function ProductCard({ p }: { p: typeof products[0] }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: "var(--bg-card)" }}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          style={{ objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.25,0.1,0.25,1)", transform: hovered ? "scale(1.04)" : "scale(1)" }}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Heart icon — top right like LV */}
        <button
          onClick={() => setLiked(!liked)}
          style={{
            position: "absolute", top: "0.75rem", right: "0.75rem",
            background: "none", border: "none", cursor: "pointer", padding: "0.3rem",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
          aria-label="Guardar"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            color={liked ? "#c00" : "var(--text)"}
            fill={liked ? "#c00" : "none"}
          />
        </button>
      </div>

      {/* Caption — LV style: name then price, no border, clean */}
      <div style={{ padding: "0.85rem 0.25rem 1.25rem" }}>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.75rem",
          fontWeight: 400,
          color: "var(--text)",
          marginBottom: "0.3rem",
          lineHeight: 1.3,
        }}>
          {p.name}
        </p>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.72rem",
          fontWeight: 400,
          color: "var(--text-light)",
        }}>
          {fmt(p.price)}
        </p>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  return (
    <section style={{ backgroundColor: "var(--white)", padding: "5rem 0" }}>

      {/* Full-width editorial video banner above products */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "50vh",
        minHeight: "280px",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        marginBottom: "5rem",
      }}>
        <video
          autoPlay muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
        >
          <source src="/videos/IMG_4686.MOV" type="video/mp4" />
        </video>
      </div>

      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
        <p className="label-section" style={{ marginBottom: "0.75rem" }}>Nuevos Ingresos</p>
        <h2 className="headline-lg">Nueva Colección</h2>
      </div>

      {/* 4-col product grid */}
      <div style={{
        maxWidth: "var(--container)",
        margin: "0 auto",
        padding: "0 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem 1.5rem",
      }} className="prod-grid">
        {products.map((p, i) => <ProductCard key={i} p={p} />)}
      </div>

      {/* LV-style centered pill CTA */}
      <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
        <a href="/catalogo" className="btn-pill">
          Ver catálogo completo
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) { .prod-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 640px) { .prod-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
