"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";

export default function SuccessPage() {
  const { clear } = useCart();
  useEffect(() => { clear(); }, [clear]);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
        <CheckCircle2 size={56} strokeWidth={1.2} color="#1a6d3a" style={{ marginBottom: "1.25rem" }} />
        <p className="label-section" style={{ marginBottom: "0.75rem" }}>Pago aprobado</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", marginBottom: "1rem", lineHeight: 1.1 }}>
          ¡Gracias por tu compra!
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-light)", marginBottom: "0.5rem", lineHeight: 1.7 }}>
          Recibirás un email con el detalle de tu pedido.
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-light)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          Si elegiste envío a coordinar, nos contactaremos por WhatsApp para informarte el costo y organizar la entrega.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-pill">Volver al inicio</Link>
          <Link href="/catalogo" className="btn-pill" style={{ background: "var(--text)", color: "var(--white)", border: "1px solid var(--text)" }}>
            Seguir comprando
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
