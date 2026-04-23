"use client";

import { MapPin, Phone, Clock } from "lucide-react";

const footerLinks = [
  {
    title: "Colección",
    links: [
      { label: "Catálogo completo", href: "/catalogo" },
      { label: "Carteras", href: "/catalogo" },
      { label: "Billeteras", href: "/catalogo" },
      { label: "Crossbody", href: "/catalogo" },
      { label: "Riñoneras", href: "/catalogo" },
      { label: "Accesorios", href: "/catalogo" },
    ],
  },
  {
    title: "Información",
    links: [
      { label: "Envíos y entregas", href: "/#faq" },
      { label: "Cambios y devoluciones", href: "/#faq" },
      { label: "Medios de pago", href: "/#faq" },
      { label: "Preguntas frecuentes", href: "/#faq" },
    ],
  },
  {
    title: "Amapola",
    links: [
      { label: "Nuestra historia", href: "/#contacto" },
      { label: "Instagram", href: "https://www.instagram.com/ok.amapola" },
      { label: "WhatsApp", href: "https://wa.me/5491166676467" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--white)", borderTop: "1px solid var(--border)" }}>

      {/* Main footer grid */}
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem" }} className="footer-grid">

        {/* Brand column */}
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "1.5rem" }}>
            Amapola
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 300, color: "var(--text-light)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "240px" }}>
            Carteras, billeteras y accesorios con identidad propia. Villa Domínico, Avellaneda.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { icon: <MapPin size={13} strokeWidth={1.5} />, text: "Av. Mitre 4553, Villa Domínico" },
              { icon: <Phone size={13} strokeWidth={1.5} />, text: "+54 9 11 6667-6467" },
              { icon: <Clock size={13} strokeWidth={1.5} />, text: "Lun–Sáb 10:00–19:00" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)" }}>{item.icon}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-light)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerLinks.map((col, i) => (
          <div key={i}>
            <p className="label-section" style={{ marginBottom: "1.25rem" }}>{col.title}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      fontWeight: 300,
                      color: "var(--text-light)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-light)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
          © 2026 Amapola. Todos los derechos reservados.
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Términos y condiciones", "Política de privacidad"].map((t, i) => (
            <a key={i} href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>
              {t}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
