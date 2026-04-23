"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, fmtARS } from "@/lib/cart";

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, setQty, removeItem } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s",
          zIndex: 200,
        }}
      />

      {/* Drawer */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 100vw)",
          background: "var(--white)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.25,0.1,0.25,1)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.08)",
        }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <p
              className="label-section"
              style={{ marginBottom: "0.15rem" }}
            >
              Tu carrito
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--text-light)" }}>
              {items.length === 0
                ? "Vacío"
                : `${items.reduce((a, i) => a + i.cantidad, 0)} producto${
                    items.reduce((a, i) => a + i.cantidad, 0) === 1 ? "" : "s"
                  }`}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
            }}
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                padding: "2rem 1rem",
                gap: "1rem",
              }}
            >
              <ShoppingBag size={40} strokeWidth={1.2} color="var(--text-muted)" />
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "1.2rem",
                  color: "var(--text)",
                }}
              >
                Tu carrito está vacío
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--text-light)" }}>
                Explorá la colección y agregá tus productos favoritos.
              </p>
              <Link
                href="/catalogo"
                onClick={closeCart}
                className="btn-pill"
                style={{ marginTop: "0.5rem" }}
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {items.map((item) => (
                <div
                  key={item.codigo}
                  style={{
                    display: "flex",
                    gap: "0.85rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 72,
                      height: 90,
                      flexShrink: 0,
                      background: "var(--bg-card)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={`/images/products/${item.imagen}`}
                      alt={item.nombre}
                      fill
                      sizes="72px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.78rem",
                        color: "var(--text)",
                        marginBottom: "0.2rem",
                        fontWeight: 400,
                      }}
                    >
                      {item.nombre}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.68rem",
                        color: "var(--text-muted)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.codigo}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        marginTop: "auto",
                      }}
                    >
                      {/* Qty */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid var(--border)",
                          borderRadius: 100,
                        }}
                      >
                        <button
                          onClick={() => setQty(item.codigo, item.cantidad - 1)}
                          aria-label="Restar"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.3rem 0.55rem",
                            display: "flex",
                          }}
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.75rem",
                            minWidth: 18,
                            textAlign: "center",
                          }}
                        >
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => setQty(item.codigo, item.cantidad + 1)}
                          aria-label="Sumar"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.3rem 0.55rem",
                            display: "flex",
                          }}
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.78rem",
                            color: "var(--text)",
                          }}
                        >
                          {fmtARS(item.precio * item.cantidad)}
                        </span>
                        <button
                          onClick={() => removeItem(item.codigo)}
                          aria-label="Quitar"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.2rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with summary + CTA */}
        {items.length > 0 && (
          <div
            style={{
              padding: "1.25rem 1.5rem 1.5rem",
              borderTop: "1px solid var(--border)",
              background: "var(--white)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                marginBottom: "1rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text)",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
              >
                <span>Subtotal</span>
                <span>{fmtARS(subtotal)}</span>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.7rem",
                  marginTop: "0.2rem",
                }}
              >
                El costo de envío se calcula al finalizar la compra según tu dirección.
              </p>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-pill"
              style={{
                display: "flex",
                justifyContent: "center",
                background: "var(--text)",
                color: "var(--white)",
                border: "1px solid var(--text)",
                textDecoration: "none",
                padding: "0.95rem 2rem",
              }}
            >
              Finalizar compra
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
