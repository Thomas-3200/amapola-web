import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Catálogo completo — Amapola",
  description:
    "Explorá el catálogo completo de carteras, billeteras, riñoneras y accesorios de Amapola.",
};

// All 41 product photos
const allImages = [
  "IMG_4627", "IMG_4629", "IMG_4630", "IMG_4633", "IMG_4648", "IMG_4649",
  "IMG_4651", "IMG_4652", "IMG_4653", "IMG_4654", "IMG_4655", "IMG_4656",
  "IMG_4657", "IMG_4658", "IMG_4659", "IMG_4660", "IMG_4661", "IMG_4662",
  "IMG_4663", "IMG_4664", "IMG_4665", "IMG_4666", "IMG_4667", "IMG_4668",
  "IMG_4669", "IMG_4671", "IMG_4672", "IMG_4673", "IMG_4674", "IMG_4677",
  "IMG_4678", "IMG_4680", "IMG_4682", "IMG_4685", "IMG_4687", "IMG_4690",
  "IMG_4691", "IMG_4693", "IMG_4699", "IMG_4702", "IMG_4703",
];

const categories = [
  "Todos",
  "Carteras",
  "Billeteras",
  "Crossbody",
  "Riñoneras",
  "Accesorios",
];

export default function CatalogoPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      {/* Hero title */}
      <section style={{ backgroundColor: "var(--white)", padding: "4rem 2rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <p className="label-section" style={{ marginBottom: "0.75rem" }}>Catálogo</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Todas nuestras piezas.
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "var(--text-light)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Explorá la colección completa de Amapola. Consultá disponibilidad y precios por WhatsApp.
          </p>
        </div>
      </section>

      {/* Filter pills (visual only for now) */}
      <section style={{ backgroundColor: "var(--white)", padding: "1rem 2rem 2rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((c, i) => (
            <span
              key={c}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.55rem 1.25rem",
                borderRadius: "100px",
                border: "1px solid var(--border)",
                backgroundColor: i === 0 ? "var(--text)" : "transparent",
                color: i === 0 ? "var(--white)" : "var(--text)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "default",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section style={{ backgroundColor: "var(--white)", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div
            className="catalog-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem 1.25rem",
            }}
          >
            {allImages.map((name, i) => (
              <a
                key={name}
                href={`https://wa.me/5491166676467?text=Hola%20Amapola!%20Me%20interesa%20el%20producto%20${name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "3/4",
                    backgroundColor: "var(--bg-card)",
                    overflow: "hidden",
                    marginBottom: "0.9rem",
                  }}
                >
                  <Image
                    src={`/images/products/${name}.jpg`}
                    alt={`Amapola producto ${i + 1}`}
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                    style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    marginBottom: "0.3rem",
                  }}
                >
                  Pieza {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    color: "var(--text-light)",
                    fontWeight: 300,
                  }}
                >
                  Consultar por WhatsApp
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <a
            href="https://wa.me/5491166676467?text=Hola%20Amapola!%20Quiero%20más%20información%20del%20catálogo"
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
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-light)",
                textDecoration: "none",
                borderBottom: "1px solid var(--text-light)",
                paddingBottom: "2px",
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
      `}</style>
    </>
  );
}
