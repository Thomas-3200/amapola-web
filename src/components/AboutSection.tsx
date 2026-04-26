import Image from "next/image";

export default function AboutSection() {
  return (
    <>
      {/* ── Banner editorial ──────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "75vh",
          minHeight: "420px",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <Image
          src="/images/lifestyle/hero2.png"
          alt="Amapola — Historia"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%", opacity: 0.82 }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.62) 100%)",
          }}
        />

        <div className="about-banner-content">
          <p
            className="label-section"
            style={{ color: "rgba(255,255,255,0.65)", marginBottom: "0.75rem" }}
          >
            Amapola
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 5vw, 4rem)",
              color: "var(--white)",
              lineHeight: 1.05,
              marginBottom: "2rem",
            }}
          >
            Diseño con identidad propia.
          </h2>
          <a href="#contacto" className="btn-pill-white">
            Conocé más
          </a>
        </div>
      </section>

      {/* ── Sección de texto + fotos ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--white)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p className="label-section" style={{ marginBottom: "0.75rem" }}>
            Nuestra Historia
          </p>
          <h2 className="headline-lg" style={{ marginBottom: "2rem" }}>
            Cada pieza, una historia.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              fontWeight: 300,
              color: "var(--text-light)",
              lineHeight: 1.9,
              marginBottom: "1.5rem",
            }}
          >
            Amapola nació con una sola idea: crear accesorios que tengan personalidad.
            Trabajamos con marcas seleccionadas y líneas propias, combinando materiales de calidad con diseño contemporáneo.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              fontWeight: 300,
              color: "var(--text-light)",
              lineHeight: 1.9,
              marginBottom: "3rem",
            }}
          >
            Cada cartera, cada billetera, cada detalle está pensado para durar y para destacar.
            Encontranos en Av. Mitre 4553, Villa Domínico (Avellaneda). Envíos a todo el país.
          </p>
          <a
            href="https://www.instagram.com/ok.amapola"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            @ok.amapola
          </a>
        </div>

        {/* Strip de 3 fotos */}
        <div
          className="about-strip"
          style={{
            maxWidth: "var(--container)",
            margin: "4rem auto 0",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
          }}
        >
          {[
            "/images/products/IMG_4627.jpg",
            "/images/products/IMG_4657.jpg",
            "/images/products/IMG_4677.jpg",
          ].map((src, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <Image
                src={src}
                alt={`Amapola ${i + 1}`}
                fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="about-img"
              />
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .about-banner-content {
          position: absolute;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          width: 100%;
          padding: 0 2rem;
        }
        .about-img:hover { transform: scale(1.04) !important; }

        @media (max-width: 640px) {
          .about-strip { grid-template-columns: 1fr !important; gap: 0.4rem !important; }
          .about-banner-content { bottom: 2.5rem; padding: 0 1.25rem; }
        }
      `}</style>
    </>
  );
}
