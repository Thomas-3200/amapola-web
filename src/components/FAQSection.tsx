"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "¿Cuáles son los medios de pago?", a: "Aceptamos efectivo, transferencia bancaria, débito y Mercado Pago. Sin recargo en ningún medio." },
  { q: "¿Hacen envíos a todo el país?", a: "Sí, enviamos a todo el país. El costo de envío varía según tu dirección y destino — te lo informamos antes de despachar. También podés retirar sin costo en nuestro local." },
  { q: "¿Puedo hacer cambios o devoluciones?", a: "Sí, tenés 7 días para cambiar o devolver el producto con el comprobante de compra." },
  { q: "¿Cómo hago un pedido?", a: "Podés elegir el producto por acá o escribirnos por WhatsApp. Coordinamos el pago y el envío." },
  { q: "¿Tienen local físico?", a: "Sí, estamos en Av. Mitre 4553, Villa Domínico (Avellaneda), CP 1874. También podés retirar sin costo adicional coordinando por WhatsApp." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: "var(--white)", padding: "5rem 2rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="label-section" style={{ marginBottom: "0.75rem" }}>Preguntas frecuentes</p>
          <h2 className="headline-lg">Información útil</h2>
        </div>

        {/* Accordion */}
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.5rem 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                gap: "1rem",
              }}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 400, color: "var(--text)", letterSpacing: "0.02em" }}>
                {faq.q}
              </span>
              {open === i
                ? <Minus size={16} strokeWidth={1.5} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                : <Plus size={16} strokeWidth={1.5} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              }
            </button>
            {open === i && (
              <div style={{ paddingBottom: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 300, color: "var(--text-light)", lineHeight: 1.8 }}>
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <a
            href="https://wa.me/5491166676467?text=Hola%20Amapola!%20Tengo%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Más consultas por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
