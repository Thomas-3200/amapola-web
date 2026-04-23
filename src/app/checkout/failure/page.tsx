import Link from "next/link";
import { XCircle } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Pago no procesado — Amapola" };

export default function FailurePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
        <XCircle size={56} strokeWidth={1.2} color="#c00" style={{ marginBottom: "1.25rem" }} />
        <p className="label-section" style={{ marginBottom: "0.75rem" }}>Pago no procesado</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", marginBottom: "1rem", lineHeight: 1.1 }}>
          No pudimos completar tu compra.
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-light)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          El pago no fue aprobado. Tu carrito sigue disponible — podés intentar de nuevo o probar con otro medio de pago.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/checkout" className="btn-pill" style={{ background: "var(--text)", color: "var(--white)", border: "1px solid var(--text)" }}>
            Reintentar pago
          </Link>
          <Link href="/" className="btn-pill">Volver al inicio</Link>
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2rem", lineHeight: 1.6 }}>
          Si el problema persiste, escribinos por WhatsApp al +54 9 11 6667-6467 y te ayudamos a finalizar la compra.
        </p>
      </section>
      <Footer />
    </>
  );
}
