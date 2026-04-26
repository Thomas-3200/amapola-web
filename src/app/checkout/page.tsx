"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Truck, Store, CreditCard, Loader2, ArrowLeft } from "lucide-react";
import { useCart, fmtARS } from "@/lib/cart";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ShippingMethod = "retiro" | "envio";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [shipping, setShipping] = useState<ShippingMethod>("retiro");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [cp, setCp] = useState("");
  const [notas, setNotas] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEnvio = shipping === "envio";

  const canSubmit =
    items.length > 0 &&
    nombre.trim() &&
    apellido.trim() &&
    email.trim() &&
    telefono.trim() &&
    dni.trim() &&
    (!isEnvio || (direccion.trim() && ciudad.trim() && provincia.trim() && cp.trim()));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            codigo: i.codigo,
            nombre: i.nombre,
            precio: i.precio,
            cantidad: i.cantidad,
            imagen: i.imagen,
          })),
          cliente: {
            nombre,
            apellido,
            email,
            telefono,
            dni,
          },
          envio: {
            metodo: shipping,
            direccion: isEnvio ? direccion : undefined,
            ciudad: isEnvio ? ciudad : undefined,
            provincia: isEnvio ? provincia : undefined,
            cp: isEnvio ? cp : undefined,
            notas: notas || undefined,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "No se pudo iniciar el pago. Intentá de nuevo.");
      }

      if (data.init_point) {
        // Redirect to Mercado Pago Checkout Pro
        window.location.href = data.init_point;
        return;
      }

      throw new Error("Respuesta inválida del servidor.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido.";
      setError(msg);
      setSubmitting(false);
    }
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <section style={{ maxWidth: 720, margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
          <p className="label-section" style={{ marginBottom: "0.75rem" }}>Checkout</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", marginBottom: "1rem" }}>
            Tu carrito está vacío.
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-light)", marginBottom: "2rem" }}>
            Agregá productos a tu carrito para continuar con la compra.
          </p>
          <Link href="/catalogo" className="btn-pill">Ver catálogo</Link>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />

      <section className="checkout-section-pad" style={{ padding: "3rem 1.25rem 4rem", backgroundColor: "var(--white)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-light)",
              textDecoration: "none",
              marginBottom: "1.25rem",
            }}
          >
            <ArrowLeft size={14} /> Seguir comprando
          </Link>

          <p className="label-section" style={{ marginBottom: "0.5rem" }}>Checkout</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", marginBottom: "2.5rem", lineHeight: 1.1 }}>
            Finalizá tu compra.
          </h1>

          <div className="checkout-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "3rem", alignItems: "start" }}>
            {/* Left: Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Contact */}
              <fieldset style={fieldsetStyle}>
                <legend style={legendStyle}>Datos de contacto</legend>
                <div style={rowStyle}>
                  <Input label="Nombre" value={nombre} onChange={setNombre} required autoComplete="given-name" />
                  <Input label="Apellido" value={apellido} onChange={setApellido} required autoComplete="family-name" />
                </div>
                <Input label="Email" type="email" value={email} onChange={setEmail} required autoComplete="email" />
                <div style={rowStyle}>
                  <Input label="Teléfono" type="tel" value={telefono} onChange={setTelefono} required autoComplete="tel" />
                  <Input label="DNI" value={dni} onChange={setDni} required inputMode="numeric" />
                </div>
              </fieldset>

              {/* Shipping method */}
              <fieldset style={fieldsetStyle}>
                <legend style={legendStyle}>Método de entrega</legend>

                <label
                  style={{
                    ...shipOptionStyle,
                    borderColor: shipping === "retiro" ? "var(--text)" : "var(--border)",
                    background: shipping === "retiro" ? "var(--bg-card)" : "var(--white)",
                  }}
                >
                  <input
                    type="radio"
                    name="ship"
                    checked={shipping === "retiro"}
                    onChange={() => setShipping("retiro")}
                    style={{ accentColor: "var(--text)" }}
                  />
                  <Store size={18} strokeWidth={1.5} />
                  <div>
                    <p style={shipTitle}>Retiro en local · Gratis</p>
                    <p style={shipSub}>Av. Mitre 4553, Villa Domínico — Coordinamos horario por WhatsApp.</p>
                  </div>
                </label>

                <label
                  style={{
                    ...shipOptionStyle,
                    borderColor: shipping === "envio" ? "var(--text)" : "var(--border)",
                    background: shipping === "envio" ? "var(--bg-card)" : "var(--white)",
                  }}
                >
                  <input
                    type="radio"
                    name="ship"
                    checked={shipping === "envio"}
                    onChange={() => setShipping("envio")}
                    style={{ accentColor: "var(--text)" }}
                  />
                  <Truck size={18} strokeWidth={1.5} />
                  <div>
                    <p style={shipTitle}>Envío a coordinar</p>
                    <p style={shipSub}>Calculamos el costo según tu dirección y te lo informamos por WhatsApp/email antes de despachar.</p>
                  </div>
                </label>

                {isEnvio && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginTop: "0.75rem" }}>
                    <Input label="Dirección (calle y número)" value={direccion} onChange={setDireccion} required autoComplete="street-address" />
                    <div style={rowStyle}>
                      <Input label="Ciudad / Localidad" value={ciudad} onChange={setCiudad} required autoComplete="address-level2" />
                      <Input label="Provincia" value={provincia} onChange={setProvincia} required autoComplete="address-level1" />
                    </div>
                    <Input label="Código postal" value={cp} onChange={setCp} required inputMode="numeric" autoComplete="postal-code" />
                  </div>
                )}
              </fieldset>

              {/* Notes */}
              <fieldset style={fieldsetStyle}>
                <legend style={legendStyle}>Notas (opcional)</legend>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={3}
                  placeholder="Aclaraciones, preferencias de entrega, etc."
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.9rem",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    background: "var(--white)",
                    resize: "vertical",
                    color: "var(--text)",
                  }}
                />
              </fieldset>

              {error && (
                <div style={{ padding: "0.9rem 1rem", border: "1px solid #c00", background: "#fff5f5", color: "#c00", fontFamily: "var(--font-sans)", fontSize: "0.8rem", borderRadius: 6 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className="btn-pill"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.55rem",
                  background: "var(--text)",
                  color: "var(--white)",
                  border: "1px solid var(--text)",
                  padding: "1rem 2rem",
                  cursor: canSubmit && !submitting ? "pointer" : "not-allowed",
                  opacity: canSubmit && !submitting ? 1 : 0.55,
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="spin" /> Redirigiendo a Mercado Pago…
                  </>
                ) : (
                  <>
                    <CreditCard size={16} strokeWidth={1.6} /> Pagar con Mercado Pago
                  </>
                )}
              </button>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6 }}>
                Pago 100% seguro procesado por Mercado Pago. Tarjeta de crédito, débito, efectivo o dinero en cuenta.
              </p>
            </form>

            {/* Right: Order summary */}
            <aside className="checkout-summary" style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "1.5rem", position: "sticky", top: "80px", background: "var(--white)" }}>
              <p className="label-section" style={{ marginBottom: "1rem" }}>Tu pedido</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", maxHeight: 360, overflowY: "auto", marginBottom: "1rem" }}>
                {items.map((i) => (
                  <div key={i.codigo} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div style={{ position: "relative", width: 56, height: 72, flexShrink: 0, background: "var(--bg-card)", borderRadius: 4, overflow: "hidden" }}>
                      <Image src={`/images/products/${i.imagen}`} alt={i.nombre} fill sizes="56px" style={{ objectFit: "cover" }} />
                      <span style={{
                        position: "absolute", top: -6, right: -6,
                        background: "var(--text)", color: "var(--white)",
                        borderRadius: 999, minWidth: 18, height: 18,
                        fontSize: "0.6rem", fontWeight: 600,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "0 5px",
                      }}>{i.cantidad}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--text)", marginBottom: 2 }}>{i.nombre}</p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--text-muted)" }}>{i.codigo}</p>
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--text)", whiteSpace: "nowrap" }}>{fmtARS(i.precio * i.cantidad)}</p>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.82rem" }}>
                <div style={rowBetween}><span style={{ color: "var(--text-muted)" }}>Subtotal</span><span>{fmtARS(subtotal)}</span></div>
                <div style={rowBetween}>
                  <span style={{ color: "var(--text-muted)" }}>Envío</span>
                  <span style={{ color: "var(--text-muted)" }}>
                    {shipping === "retiro" ? "Gratis" : "A coordinar"}
                  </span>
                </div>
                <div style={{ ...rowBetween, paddingTop: "0.75rem", borderTop: "1px solid var(--border)", marginTop: "0.25rem", fontSize: "1rem", fontWeight: 500 }}>
                  <span>Total</span><span>{fmtARS(subtotal)}</span>
                </div>
                {shipping === "envio" && (
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.4rem", lineHeight: 1.5 }}>
                    El costo de envío se suma por separado y se coordina después del pago del pedido según tu dirección.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── Desktop → 2 columnas ─────────────────────────────────────────── */
        @media (max-width: 900px) {
          .checkout-grid    { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .checkout-summary { position: static !important; order: -1; }
        }

        /* ── Mobile fino (≤ 480px) ─────────────────────────────────────────── */
        @media (max-width: 480px) {
          .checkout-section-pad { padding: 2rem 1rem 3rem !important; }
          .checkout-row { flex-direction: column !important; }
        }

        /* ── Spinner ─────────────────────────────────────────────────────── */
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Prevent "unused" warnings when clear isn't triggered on success redirect */}
      <span style={{ display: "none" }} aria-hidden>{String(!!router && !!clear)}</span>
    </>
  );
}

/* ────────── Reusable form bits ────────── */

function Input({
  label, value, onChange, type = "text", required, autoComplete, inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1, minWidth: "140px" }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-light)" }}>
        {label}{required && <span style={{ color: "#c00", marginLeft: 2 }}>*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        style={{
          padding: "0.7rem 0.85rem",
          border: "1px solid var(--border)",
          borderRadius: 6,
          fontFamily: "var(--font-sans)",
          fontSize: "0.88rem",
          background: "var(--white)",
          color: "var(--text)",
          outline: "none",
        }}
      />
    </label>
  );
}

const fieldsetStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "1.25rem 1.25rem 1.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.9rem",
};

const legendStyle: React.CSSProperties = {
  padding: "0 0.5rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text)",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.9rem",
  flexWrap: "wrap",
};

const shipOptionStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.75rem",
  padding: "0.9rem 1rem",
  border: "1px solid var(--border)",
  borderRadius: 6,
  cursor: "pointer",
  transition: "border-color 0.2s, background 0.2s",
};

const shipTitle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.82rem",
  color: "var(--text)",
  marginBottom: "0.2rem",
  fontWeight: 500,
};

const shipSub: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.72rem",
  color: "var(--text-light)",
  lineHeight: 1.5,
};

const rowBetween: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
