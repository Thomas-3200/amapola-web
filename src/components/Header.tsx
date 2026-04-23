"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X, Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const navLeft = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Carteras", href: "/catalogo" },
  { label: "Billeteras", href: "/catalogo" },
];
const navRight = [
  { label: "Riñoneras", href: "/catalogo" },
  { label: "Accesorios", href: "/catalogo" },
  { label: "Contacto", href: "/#contacto" },
];

const WHATSAPP_URL =
  "https://wa.me/5491166676467?text=Hola%20Amapola!%20Quiero%20hacer%20una%20consulta";
const INSTAGRAM_URL = "https://www.instagram.com/ok.amapola";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--white)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* ── Main row ── */}
      <div
        className="lv-header-row"
        style={{
          display: "flex",
          alignItems: "center",
          height: "64px",
          padding: "0 1rem",
          maxWidth: "var(--container)",
          margin: "0 auto",
          position: "relative",
          gap: "0.5rem",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flex: 1,
            minWidth: 0,
          }}
        >
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 0",
            }}
            aria-label="Menú"
          >
            {menuOpen ? (
              <X size={18} strokeWidth={1.5} color="var(--text)" />
            ) : (
              <Menu size={18} strokeWidth={1.5} color="var(--text)" />
            )}
            <span className="label-nav lv-nav-text" style={{ fontSize: "0.7rem" }}>
              Menú
            </span>
          </button>

          <button
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMenuOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 0",
            }}
            aria-label="Buscar"
          >
            <Search size={18} strokeWidth={1.5} color="var(--text)" />
            <span className="label-nav lv-nav-text" style={{ fontSize: "0.7rem" }}>
              Buscar
            </span>
          </button>

          {/* Desktop nav left */}
          <nav
            style={{ display: "flex", gap: "2rem", marginLeft: "1rem" }}
            className="lv-nav-desktop"
          >
            {navLeft.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="label-nav"
                style={{
                  textDecoration: "none",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* CENTER: Logo */}
        <a
          href="/"
          className="lv-logo"
          style={{
            textDecoration: "none",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "0 0.5rem",
            backgroundColor: "var(--white)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text)",
              whiteSpace: "nowrap",
            }}
          >
            Amapola
          </span>
        </a>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            flex: 1,
            justifyContent: "flex-end",
            minWidth: 0,
          }}
        >
          {/* Desktop nav right */}
          <nav style={{ display: "flex", gap: "2rem" }} className="lv-nav-desktop">
            {navRight.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="label-nav"
                style={{
                  textDecoration: "none",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Escribinos (WhatsApp) — hidden on mobile */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-nav lv-nav-text"
            style={{
              textDecoration: "none",
              opacity: 0.8,
              whiteSpace: "nowrap",
            }}
          >
            Escribinos
          </a>

          {/* Icon: WhatsApp (visible on mobile) */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="lv-icon-mobile"
            style={{ display: "none", padding: "0.35rem" }}
          >
            <MessageCircle size={18} strokeWidth={1.5} color="var(--text)" />
          </a>

          {/* Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              padding: "0.35rem",
            }}
          >
            <Heart size={18} strokeWidth={1.5} color="var(--text)" />
          </a>

          {/* Cart button with badge */}
          <button
            onClick={openCart}
            aria-label={`Carrito (${count})`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              padding: "0.35rem",
              position: "relative",
            }}
          >
            <ShoppingBag size={18} strokeWidth={1.5} color="var(--text)" />
            {count > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-4px",
                  background: "var(--text)",
                  color: "var(--white)",
                  borderRadius: "999px",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  minWidth: 16,
                  height: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                  lineHeight: 1,
                }}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Search bar ── */}
      {searchOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "0.8rem 1rem",
            backgroundColor: "var(--white)",
          }}
        >
          <form
            action="/catalogo"
            style={{
              maxWidth: "480px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderBottom: "1px solid var(--text)",
              paddingBottom: "0.4rem",
            }}
          >
            <Search size={14} color="var(--text-muted)" strokeWidth={1.5} />
            <input
              autoFocus
              type="text"
              name="q"
              placeholder="Buscar carteras, billeteras, accesorios..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                color: "var(--text)",
              }}
            />
          </form>
        </div>
      )}

      {/* ── Mobile + Full menu ── */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--white)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {[...navLeft, ...navRight].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "1.25rem",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
            style={{
              alignSelf: "flex-start",
              marginTop: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <MessageCircle size={14} /> Escribinos por WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              color: "var(--text-light)",
              textDecoration: "none",
            }}
          >
            @ok.amapola en Instagram →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .lv-nav-desktop { display: none !important; }
          .lv-nav-text { display: none !important; }
          .lv-icon-mobile { display: inline-flex !important; }
          .lv-logo span { font-size: 0.9rem !important; letter-spacing: 0.22em !important; }
        }
      `}</style>
    </header>
  );
}
