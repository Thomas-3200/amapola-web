import Link from "next/link";
import { Clock } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Pago pendiente — Amapola" };

export default function PendingPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
        <Clock size={56} strokeWidth={1.2} color="#b07a00" style={{ marginBottom: "1.25rem" }} />
        <p className="label-section" style={{ marginBottom: "0.75rem" }}>Pago pendiente</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", marginBottom: "1rem", lineHeight: 1.1 }}>
          Tu pago está en proceso.
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-light)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          Mercado Pago aún está confirmando la operación. Te avisaremos por email cuando se acredite.
        </p>
        <Link href="/" className="btn-pill">Volver al inicio</Link>
      </section>
      <Footer />
    </>
  );
}
