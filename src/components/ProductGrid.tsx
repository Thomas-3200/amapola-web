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

      <div style={{ padding: "0.85rem 0.25rem 1.25rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 400, color: "var(--text)", marginBottom: "0.3rem", lineHeight: 1.3 }}>
          {p.nombre}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.74rem", fontWeight: 400, color: "var(--text-light)", marginBottom: "0.6rem" }}>
          {fmtARS(p.precio)}
        </p>

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
    <section style={{ backgroundColor: "var(--white)", paddingBottom: "5rem" }}>

      {/* ── Banner de video con slogan ─────────────────────────────────────────
          · El video .MOV funciona en iOS/Safari.
          · poster= actúa como fallback para Chrome/Firefox desktop:
            muestra una imagen editorial cuando el browser no puede reproducir MOV.
          · El overlay con slogan se ve siempre, en todos los browsers.
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="video-banner">

        {/* Video — poster actúa como fallback estático en Chrome/Firefox si el MOV no carga */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/lifestyle/hero4.png"
          className="video-el"
        >
          <source src="/videos/IMG_4686.MOV" type="video/quicktime" />
          <source src="/videos/IMG_4686.MOV" type="video/mp4" />
        </video>

        {/* Gradiente */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)",
        }} />

        {/* ── Slogan overlay ── */}
        <div className="video-slogan">
          <p className="label-section video-label">
            Nueva Colección · 2026
          </p>
          <h2 className="video-headline">
            Piezas que se notan.
          </h2>
          <a href="/catalogo" className="btn-pill-white video-cta">
            Ver colección
          </a>
        </div>
      </div>

      {/* ── Encabezado productos ─────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", margin: "4rem 0 3rem", padding: "0 2rem" }}>
        <p className="label-section" style={{ marginBottom: "0.75rem" }}>Nuevos Ingresos</p>
        <h2 className="headline-lg">Nueva Colección</h2>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────────── */}
      <div
        style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem 1.5rem" }}
        className="prod-grid"
      >
        {FEATURED.map((p) => <ProductCard key={p.codigo} p={p} />)}
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
        <a href="/catalogo" className="btn-pill">Ver catálogo completo</a>
      </div>

      <style>{`
        /* ── Video banner ──────────────────────────────────────────────────── */
        .video-banner {
          position: relative;
          width: 100%;
          height: 58vh;
          min-height: 320px;
          overflow: hidden;
          background-color: #0f0d0b;
        }
        .video-el {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
        }

        /* ── Slogan ────────────────────────────────────────────────────────── */
        .video-slogan {
          position: absolute;
          bottom: 3.5rem;
          left: 0;
          right: 0;
          text-align: center;
          padding: 0 2rem;
          box-sizing: border-box;
          animation: fadeUpHero 1s ease 0.3s both;
        }
        .video-label {
          color: rgba(255,255,255,0.65);
          margin-bottom: 0.85rem;
          letter-spacing: 0.22em;
        }
        .video-headline {
          font-family: var(--font-serif);
          font-weight: 400;
          font-style: italic;
          font-size: clamp(2rem, 4.5vw, 3.8rem);
          color: var(--white);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 1.75rem;
        }
        .video-cta {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
        }

        /* ── Product grid breakpoints ──────────────────────────────────────── */
        @media (max-width: 900px) { .prod-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 640px) { .prod-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (hover: none), (max-width: 768px) {
          .lv-quick-add { display: none !important; }
          .lv-add-mobile { display: inline-flex !important; }
        }

        /* ── Mobile video ──────────────────────────────────────────────────── */
        @media (max-width: 600px) {
          .video-banner { height: 52vh; min-height: 280px; }
          .video-slogan { bottom: 2rem; padding: 0 1.25rem; }
          .video-headline { font-size: 1.9rem !important; margin-bottom: 1.1rem !important; }
        }
      `}</style>
    </section>
  );
}
