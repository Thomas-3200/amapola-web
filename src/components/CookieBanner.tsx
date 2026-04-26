"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "amapola_cookies_consent_v1";

type Consent = "all" | "essential" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent | "loading">("loading");

  // Lee preferencia guardada
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Consent;
      setConsent(saved ?? null);
    } catch {
      setConsent(null);
    }
  }, []);

  function accept(choice: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    setConsent(choice);
  }

  // No renderizar hasta leer localStorage (evita flash)
  if (consent === "loading" || consent !== null) return null;

  return (
    <>
      {/* Backdrop sutil en mobile */}
      <div className="cookie-backdrop" />

      <div className="cookie-banner" role="dialog" aria-label="Política de cookies" aria-modal="false">
        <div className="cookie-inner">

          {/* Ícono + Texto */}
          <div className="cookie-body">
            <ShieldCheck
              size={22}
              strokeWidth={1.4}
              style={{ flexShrink: 0, color: "rgba(255,255,255,0.6)", marginTop: "1px" }}
            />
            <div>
              <p className="cookie-title">Usamos cookies y almacenamiento local</p>
              <p className="cookie-text">
                Utilizamos cookies esenciales para el funcionamiento del carrito y la tienda.
                Cookies analíticas y de marketing solo se activan con tu consentimiento.
                Podés cambiar tu elección en cualquier momento.{" "}
                <Link href="/privacidad" className="cookie-link">
                  Política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="cookie-actions">
            <button
              onClick={() => accept("essential")}
              className="cookie-btn-outline"
            >
              Solo esenciales
            </button>
            <button
              onClick={() => accept("all")}
              className="cookie-btn-solid"
            >
              Aceptar todo
            </button>
          </div>

          {/* Cerrar = solo esenciales */}
          <button
            onClick={() => accept("essential")}
            className="cookie-close"
            aria-label="Cerrar — solo esenciales"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style>{`
        /* ── Banner ───────────────────────────────────────────────────────── */
        .cookie-banner {
          position: fixed;
          bottom: 1.25rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2.5rem);
          max-width: 860px;
          background: var(--bg-dark);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          z-index: 9999;
          box-shadow: 0 8px 40px rgba(0,0,0,0.28);
          animation: slideUpCookie 0.45s cubic-bezier(0.25,0.1,0.25,1) both;
        }
        @keyframes slideUpCookie {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
        }

        /* ── Layout interno ───────────────────────────────────────────────── */
        .cookie-inner {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.1rem 1.4rem;
          position: relative;
        }
        .cookie-body {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
        }

        /* ── Textos ───────────────────────────────────────────────────────── */
        .cookie-title {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: var(--white);
          margin-bottom: 0.3rem;
        }
        .cookie-text {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          line-height: 1.55;
        }
        .cookie-link {
          color: rgba(255,255,255,0.75);
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }
        .cookie-link:hover { color: var(--white); }

        /* ── Botones ──────────────────────────────────────────────────────── */
        .cookie-actions {
          display: flex;
          gap: 0.6rem;
          flex-shrink: 0;
          align-items: center;
        }
        .cookie-btn-outline {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 100px;
          padding: 0.6rem 1.1rem;
          cursor: pointer;
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s;
        }
        .cookie-btn-outline:hover {
          border-color: rgba(255,255,255,0.55);
          color: var(--white);
        }
        .cookie-btn-solid {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--bg-dark);
          background: var(--white);
          border: 1px solid var(--white);
          border-radius: 100px;
          padding: 0.6rem 1.25rem;
          cursor: pointer;
          white-space: nowrap;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .cookie-btn-solid:hover {
          background: rgba(255,255,255,0.85);
        }

        /* ── Cerrar ───────────────────────────────────────────────────────── */
        .cookie-close {
          position: absolute;
          top: 0.6rem;
          right: 0.7rem;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.35);
          display: flex;
          padding: 0.25rem;
          transition: color 0.2s;
        }
        .cookie-close:hover { color: rgba(255,255,255,0.8); }

        /* ── Backdrop mobile ──────────────────────────────────────────────── */
        .cookie-backdrop {
          display: none;
        }

        /* ── Mobile ───────────────────────────────────────────────────────── */
        @media (max-width: 640px) {
          .cookie-banner {
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            max-width: 100%;
            transform: none;
            border-radius: 14px 14px 0 0;
            animation: slideUpCookieMobile 0.4s cubic-bezier(0.25,0.1,0.25,1) both;
          }
          @keyframes slideUpCookieMobile {
            from { opacity: 0; transform: translateY(100%); }
            to   { opacity: 1; transform: translateY(0);    }
          }
          .cookie-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding: 1.25rem 1.25rem 1.5rem;
          }
          .cookie-actions {
            flex-direction: column;
          }
          .cookie-btn-outline,
          .cookie-btn-solid {
            width: 100%;
            justify-content: center;
            padding: 0.85rem 1rem;
            font-size: 0.72rem;
          }
          .cookie-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 9998;
          }
        }
      `}</style>
    </>
  );
}
