"use client";

import Image from "next/image";

// Exact LV pattern: label above headline, 4-column image grid with caption below
const categories = [
  { label: "Carteras", caption: "Cuero & Diseño Propio", image: "/images/products/IMG_4690.jpg", href: "#carteras" },
  { label: "Billeteras", caption: "Oreiro Love · Chimola · ch/ml", image: "/images/products/IMG_4648.jpg", href: "#billeteras" },
  { label: "Crossbody", caption: "Barbara Bags Collection", image: "/images/products/IMG_4666.jpg", href: "#crossbody" },
  { label: "Riñoneras", caption: "Marca Propia Amapola", image: "/images/products/IMG_4629.jpg", href: "#rinoneras" },
];

export default function CategoryGrid() {
  return (
    <section id="coleccion" style={{ backgroundColor: "var(--white)", padding: "5rem 0" }}>

      {/* Section header — LV style */}
      <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
        <p className="label-section" style={{ marginBottom: "0.75rem" }}>Explorar</p>
        <h2 className="headline-lg">
          Descubrí la selección de Amapola
        </h2>
      </div>

      {/* 4-column grid — full width, no padding */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0",
      }} className="cat-grid">
        {categories.map((cat, i) => (
          <a key={i} href={cat.href} style={{ textDecoration: "none", display: "block" }}>
            {/* Image */}
            <div style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              backgroundColor: "var(--bg-card)",
            }}>
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)" }}
                sizes="25vw"
                className="cat-img"
              />
            </div>
            {/* Caption below — LV style */}
            <div style={{ padding: "1.1rem 1rem 1.5rem", textAlign: "center" }}>
              <p className="label-section" style={{ color: "var(--text-muted)", fontSize: "0.58rem", marginBottom: "0.3rem" }}>
                {cat.caption}
              </p>
              <p className="headline-sm" style={{ fontStyle: "normal", fontSize: "1.05rem" }}>
                {cat.label}
              </p>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .cat-img:hover { transform: scale(1.04) !important; }
        @media (max-width: 768px) { .cat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .cat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
