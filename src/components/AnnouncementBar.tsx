"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const messages = [
  "Envíos a todo el país · Costo fijo $3.500, gratis en compras +$25.000",
  "Retiro sin costo · Av. Mitre 4553, Villa Domínico (Avellaneda)",
  "Cambios y devoluciones dentro de los 7 días con comprobante",
  "Efectivo · Transferencia · Débito · Mercado Pago · Sin recargo",
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % messages.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      backgroundColor: "var(--bg-dark)",
      color: "rgba(255,255,255,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5rem",
      height: "38px",
      padding: "0 1rem",
    }}>
      <button
        onClick={() => setCurrent((c) => (c - 1 + messages.length) % messages.length)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", opacity: 0.5, display: "flex", alignItems: "center" }}
        aria-label="Anterior"
      >
        <ChevronLeft size={12} />
      </button>

      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.6rem",
        fontWeight: 400,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        textAlign: "center",
      }}>
        {messages[current]}
      </p>

      <button
        onClick={() => setCurrent((c) => (c + 1) % messages.length)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", opacity: 0.5, display: "flex", alignItems: "center" }}
        aria-label="Siguiente"
      >
        <ChevronRight size={12} />
      </button>
    </div>
  );
}
