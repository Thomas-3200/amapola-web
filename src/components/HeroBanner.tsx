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
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* ── Ken Burns ────────────────────────────────────────────────────────
          inset: -6% da espacio para el zoom sin exponer bordes.
          En mobile la animación se reduce para no afectar performance.
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="hero-bg">
        <Image
          src="/images/lifestyle/hero1.png"
          alt="Amapola — Nueva Colección"
          fill
          priority
          className="hero-img"
          style={{ objectFit: "cover", opacity: 0.88 }}
          sizes="100vw"
        />
      </div>

      {/* Vignette bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* ── Contenido ─────────────────────────────────────────────────────── */}
      <div className="hero-content">
        <p
          className="label-section hero-label"
          style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}
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
        /* ── Contenedor del texto (centrado y responsivo) ─────────────────── */
        .hero-content {
          position: absolute;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          width: 100%;
          padding: 0 2rem;
        }
        .hero-title {
          font-size: clamp(2.2rem, 6vw, 5rem);
        }

        /* ── object-position por breakpoint ──────────────────────────────── */
        /* Centra el encuadre sobre el cuerpo de la cartera, no la mano */
        .hero-img { object-position: center 58%; }
        @media (max-width: 900px) { .hero-img { object-position: center 50%; } }
        @media (max-width: 600px) { .hero-img { object-position: center 44%; } }

        /* ── Ken Burns ────────────────────────────────────────────────────── */
        /* Solo zoom puro — sin traslación para no desplazar la cartera */
        .hero-bg {
          position: absolute;
          inset: -5%;
          animation: kenburns 20s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes kenburns {
          0%   { transform: scale(1);    }
          100% { transform: scale(1.07); }
        }

        /* ── Entradas fade-up escalonadas ─────────────────────────────────── */
        .hero-label { animation: fadeUpHero 1s ease 0.25s both; }
        .hero-title { animation: fadeUpHero 1.1s ease 0.55s both; }
        .hero-cta   { animation: fadeUpHero 1s ease 0.9s both; }
        @keyframes fadeUpHero {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Mobile ────────────────────────────────────────────────────────── */
        @media (max-width: 600px) {
          .hero-content {
            bottom: 3rem;
            padding: 0 1.25rem;
          }
          .hero-title {
            font-size: 2.2rem !important;
            margin-bottom: 1.5rem !important;
          }
          .hero-bg {
            animation: kenburns-mobile 22s ease-in-out infinite alternate;
          }
          @keyframes kenburns-mobile {
            0%   { transform: scale(1);    }
            100% { transform: scale(1.05); }
          }
        }

        /* Respeta preferencias de movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .hero-bg { animation: none !important; }
          .hero-label, .hero-title, .hero-cta { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
}
