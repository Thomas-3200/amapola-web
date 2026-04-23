"use client";

import Image from "next/image";

export default function HeroBanner() {
  return (
    <section style={{ position: "relative", width: "100%", height: "90vh", minHeight: "520px", overflow: "hidden", backgroundColor: "#0a0a0a" }}>

      {/* Full-bleed background image */}
      <Image
        src="/images/lifestyle/hero1.png"
        alt="Amapola — Nueva Colección"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 30%", opacity: 0.88 }}
        sizes="100vw"
      />

      {/* Subtle gradient bottom fade */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.55) 100%)",
      }} />

      {/* Content — centered bottom like LV */}
      <div style={{
        position: "absolute",
        bottom: "4rem",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        width: "100%",
        padding: "0 2rem",
      }}>
        <p className="label-section" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>
          Nueva Colección · 2026
        </p>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          color: "var(--white)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          marginBottom: "2rem",
        }}>
          El arte de llevarte bien.
        </h1>
        <a href="#coleccion" className="btn-pill-white" style={{ fontSize: "0.72rem" }}>
          Descubrir la Colección
        </a>
      </div>
    </section>
  );
}
