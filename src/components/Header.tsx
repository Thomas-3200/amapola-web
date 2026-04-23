"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X, Heart, User } from "lucide-react";

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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: "var(--white)",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "border-color 0.3s ease",
    }}>

      {/* ── Main row ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        height: "60px",
        padding: "0 2rem",
        maxWidth: "var(--container)",
        margin: "0 auto",
        position: "relative",
      }}>

        {/* LEFT: Menu + Search (desktop) */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flex: 1 }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0" }}
            aria-label="Menú"
          >
            {menuOpen
              ? <X size={16} strokeWidth={1.5} color="var(--text)" />
              : <Menu size={16} strokeWidth={1.5} color="var(--text)" />}
            <span className="label-nav" style={{ fontSize: "0.7rem" }}>Menú</span>
          </button>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0" }}
            aria-label="Buscar"
          >
            <Search size={16} strokeWidth={1.5} color="var(--text)" />
            <span className="label-nav" style={{ fontSize: "0.7rem" }} >Buscar</span>
          </button>

          {/* Desktop nav left */}
          <nav style={{ display: "flex", gap: "2rem", marginLeft: "1rem" }} className="lv-nav-desktop">
            {navLeft.map((l) => (
              <a key={l.label} href={l.href} className="label-nav" style={{ textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
              >{l.label}</a>
            ))}
          </nav>
        </div>

        {/* CENTER: Logo */}
        <a href="/" style={{ textDecoration: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "1.1rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text)",
            whiteSpace: "nowrap",
          }}>
            Amapola
          </span>
        </a>

        {/* RIGHT: Nav right + icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flex: 1, justifyContent: "flex-end" }}>
          {/* Desktop nav right */}
          <nav style={{ display: "flex", gap: "2rem" }} className="lv-nav-desktop">
            {navRight.map((l) => (
              <a key={l.label} href={l.href} className="label-nav" style={{ textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
              >{l.label}</a>
            ))}
          </nav>

          <a href="https://wa.me/5491166676467" target="_blank" rel="noopener noreferrer"
            className="label-nav" style={{ textDecoration: "none", opacity: 0.8, whiteSpace: "nowrap" }}>
            Escribinos
          </a>
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }} aria-label="Guardados">
            <Heart size={18} strokeWidth={1.5} color="var(--text)" />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }} aria-label="Cuenta">
            <User size={18} strokeWidth={1.5} color="var(--text)" />
          </button>
        </div>
      </div>

      {/* ── Search bar ── */}
      {searchOpen && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "0.8rem 2rem", backgroundColor: "var(--white)" }}>
          <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid var(--text)", paddingBottom: "0.4rem" }}>
            <Search size={14} color="var(--text-muted)" strokeWidth={1.5} />
            <input autoFocus type="text" placeholder="Buscar carteras, billeteras, accesorios..."
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--text)" }} />
          </div>
        </div>
      )}

      {/* ── Mobile + Full menu ── */}
      {menuOpen && (
        <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--white)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {[...navLeft, ...navRight].map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", textDecoration: "none", borderBottom: "1px solid var(--border)", paddingBottom: "1.75rem" }}>
              {l.label}
            </a>
          ))}
          <a href="https://wa.me/5491166676467" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
            Escribinos por WhatsApp
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .lv-nav-desktop { display: none !important; } }
      `}</style>
    </header>
  );
}
