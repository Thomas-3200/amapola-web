"use client";

import Image from "next/image";

export default function HeroBanner() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "90vh",
        minHeight: "520px",
        overflow: "hidden",
        backgroundColor: "#e9e6e2",   // tono que acompaña el fondo de la foto
      }}
    >
      {/* ── Imagen cuadrada centrada con Ken Burns ───────────────────────────
          La imagen hero es cuadrada (~452×452px).
          En lugar de escalarla para llenar el ancho (lo que recorta mucho),
          la mostramos como un cuadrado cuya altura = 110% del hero.
          Así la cartera completa siempre es visible y el zoom Ken Burns
          solo aplica escala pura (sin traslación que desencuadre).
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="hero-bg">
        <Image
          src="/images/lifestyle/hero1.png"
          alt="Amapola — Nueva Colección"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center center" }}
          sizes="(max-width: 600px) 110vw, 110vh"
        />
      </div>

      {/* Gradiente lateral (cubre las franjas de fondo en desktop) */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, #e9e6e2 0%, transparent 18%, transparent 82%, #e9e6e2 100%)",
        pointerEvents: "none",
      }} />

      {/* Gradiente inferior para legibilidad del texto */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 40%, rgba(80,60,50,0.55) 100%)",
        pointerEvents: "none",
      }} />

      {/* ── Contenido ─────────────────────────────────────────────────────── */}
      <div className="hero-content">
        <p
          className="label-section hero-label"
          style={{ color: "rgba(255,255,255,0.85)", marginBottom: "1rem" }}
        >
          Nueva Colección · 2026
        </p>

        <h1
          className="hero-title"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--white)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: "2rem",
          }}
        >
          El arte de llevarte bien.
        </h1>

        <a href="/catalogo" className="btn-pill-white hero-cta">
          Descubrir la Colección
        </a>
      </div>

      <style>{`
        /* ── Texto centrado ───────────────────────────────────────────────── */
        .hero-content {
          position: absolute;
          bottom: 4rem;
          left: 0;
          right: 0;
          text-align: center;
          padding: 0 2rem;
          box-sizing: border-box;
        }
        .hero-title { font-size: clamp(2.2rem, 6vw, 5rem); }

        /* ── Imagen cuadrada centrada con Ken Burns ───────────────────────
            height: 110% da margen para el zoom sin exponer el fondo.
            aspect-ratio: 1 → el ancho sigue automáticamente a la altura.
            La imagen (cuadrada) llena el div cuadrado → cartera visible.
        ──────────────────────────────────────────────────────────────────── */
        .hero-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          height: 110%;
          aspect-ratio: 1 / 1;
          animation: kenburns 20s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes kenburns {
          0%   { transform: translate(-50%, -50%) scale(1);    }
          100% { transform: translate(-50%, -50%) scale(1.07); }
        }

        /* ── Entradas fade-up escalonadas ─────────────────────────────────── */
        .hero-label { animation: fadeUpHero 1s ease 0.25s both; }
        .hero-title { animation: fadeUpHero 1.1s ease 0.55s both; }
        .hero-cta   { animation: fadeUpHero 1s ease 0.9s both; }
        @keyframes fadeUpHero {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Mobile ─────────────────────────────────────────────────────────
            En portrait la imagen cuadrada (110% height) ya cubre bien.
            Ocultamos el gradiente lateral en mobile (no hay franjas).
        ──────────────────────────────────────────────────────────────────── */
        @media (max-width: 600px) {
          .hero-content { bottom: 3rem; padding: 0 1.25rem; }
          .hero-title   { font-size: 2.2rem !important; margin-bottom: 1.5rem !important; }
          .hero-bg      { animation: kenburns-mobile 22s ease-in-out infinite alternate; }
          @keyframes kenburns-mobile {
            0%   { transform: translate(-50%, -50%) scale(1);    }
            100% { transform: translate(-50%, -50%) scale(1.05); }
          }
        }

        /* Respeta preferencias de movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .hero-bg { animation: none !important; transform: translate(-50%, -50%) !important; }
          .hero-label, .hero-title, .hero-cta { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
}
