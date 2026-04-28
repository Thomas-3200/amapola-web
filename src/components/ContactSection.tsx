"use client";

import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contacto" style={{ backgroundColor: "var(--bg-dark)", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="label-section" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>Contacto</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--white)", lineHeight: 1.15 }}>
            Estamos para ayudarte.
          </h2>
        </div>

        {/* Two columns: info + map */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="contact-grid">

          {/* Left: contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {[
              { icon: <MapPin size={18} strokeWidth={1.5} />, title: "Locales", lines: ["Av. Mitre 4553 — Local 29 y Local 47", "Villa Domínico, Avellaneda (CP 1874)"] },
              { icon: <Phone size={18} strokeWidth={1.5} />, title: "Teléfono", lines: ["+54 9 11 6667-6467"] },
              { icon: <Clock size={18} strokeWidth={1.5} />, title: "Horarios", lines: ["Viernes, Sábados, Domingos y Feriados", "10:00–20:00 hs"] },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ color: "rgba(255,255,255,0.4)", marginTop: "2px", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <p className="label-section" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "0.4rem" }}>{item.title}</p>
                  {item.lines.map((l, j) => (
                    <p key={j} style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 300, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>{l}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5491166676467?text=Hola%20Amapola!%20Me%20gustaría%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "100px",
                padding: "0.85rem 1.75rem",
                color: "var(--white)",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
                alignSelf: "flex-start",
                transition: "background-color 0.25s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              Escribinos por WhatsApp
            </a>
          </div>

          {/* Right: Google Maps embed */}
          <div style={{ borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <iframe
              src="https://www.google.com/maps?q=Avenida+Mitre+4553,+Villa+Dominico,+Avellaneda&output=embed"
              width="100%"
              height="360"
              style={{ display: "block", border: "none", filter: "grayscale(0.3) contrast(0.9)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Amapola"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
