"use client";

import { Truck, CreditCard, RefreshCw, MapPin } from "lucide-react";

export default function PromoStrip() {
  const items = [
    {
      icon: <Truck size={18} strokeWidth={1.3} />,
      title: "Envíos",
      text: "A todo el país",
    },
    {
      icon: <CreditCard size={18} strokeWidth={1.3} />,
      title: "Pagos",
      text: "MP · Transferencia · Débito",
    },
    {
      icon: <RefreshCw size={18} strokeWidth={1.3} />,
      title: "Cambios",
      text: "Dentro de los 7 días",
    },
    {
      icon: <MapPin size={18} strokeWidth={1.3} />,
      title: "Local",
      text: "Av. Mitre 4553, V. Domínico",
    },
  ];

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--white)",
      }}
    >
      <div
        className="promo-strip-grid"
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="promo-strip-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.9rem",
              padding: "1.3rem 1.25rem",
              borderRight: i < items.length - 1 ? "1px solid var(--border)" : "none",
              minHeight: "76px",
            }}
          >
            <div
              style={{
                color: "var(--text)",
                opacity: 0.75,
                flexShrink: 0,
                display: "flex",
              }}
            >
              {item.icon}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", minWidth: 0 }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text)",
                  lineHeight: 1,
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 300,
                  color: "var(--text-light)",
                  lineHeight: 1.3,
                }}
              >
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .promo-strip-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .promo-strip-item:nth-child(2) { border-right: none !important; }
          .promo-strip-item:nth-child(1),
          .promo-strip-item:nth-child(2) { border-bottom: 1px solid var(--border); }
        }
        @media (max-width: 480px) {
          .promo-strip-item { padding: 1rem 0.9rem !important; gap: 0.7rem !important; }
        }
      `}</style>
    </div>
  );
}
