import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de privacidad y cookies — Amapola",
  description: "Conocé cómo Amapola recopila, usa y protege tu información personal y el uso de cookies en nuestra tienda online.",
};

const sections = [
  {
    title: "1. Responsable del tratamiento",
    content:
      "Amapola, con local en Av. Mitre 4553, Villa Domínico, Avellaneda, Buenos Aires, Argentina (CP 1874). Contacto: +54 9 11 6667-6467 / Instagram @ok.amapola.",
  },
  {
    title: "2. Qué datos recopilamos",
    content:
      "Cuando realizás una compra o consulta recopilamos: nombre y apellido, DNI, correo electrónico, número de teléfono y dirección de envío (si corresponde). Estos datos se usan exclusivamente para procesar tu pedido y coordinar la entrega.",
  },
  {
    title: "3. Cookies y almacenamiento local",
    content:
      "Usamos almacenamiento local (localStorage) en tu navegador para guardar el contenido de tu carrito de compras mientras navegás la tienda. Esta información nunca se comparte con terceros y se elimina al vaciar el carrito o borrar los datos del navegador. Si aceptás cookies analíticas, podemos usar herramientas de medición de tráfico (como Google Analytics) para mejorar la experiencia de la tienda. Podés rechazar las cookies no esenciales sin que eso afecte tu compra.",
  },
  {
    title: "4. Mercado Pago",
    content:
      "Los pagos se procesan a través de Mercado Pago. Al hacer clic en 'Pagar', sos redirigido a su plataforma segura. Amapola no almacena datos de tarjetas ni información bancaria. Podés consultar la política de privacidad de Mercado Pago en mercadopago.com.ar.",
  },
  {
    title: "5. Compartir datos con terceros",
    content:
      "Amapola no vende, alquila ni comparte tus datos personales con terceros con fines comerciales. Los datos de envío pueden compartirse con el servicio de correo o logística necesario para entregar tu pedido.",
  },
  {
    title: "6. Tus derechos (Ley 25.326)",
    content:
      "En cumplimiento de la Ley Nacional N° 25.326 de Protección de Datos Personales, tenés derecho a acceder, rectificar, actualizar o suprimir tus datos personales. Para ejercer estos derechos escribinos a través de WhatsApp (+54 9 11 6667-6467) o Instagram (@ok.amapola).",
  },
  {
    title: "7. Seguridad",
    content:
      "Implementamos medidas de seguridad razonables para proteger la información que nos proporcionás. La transmisión de datos durante el pago se realiza mediante conexión cifrada (HTTPS) a través de Mercado Pago.",
  },
  {
    title: "8. Cambios en esta política",
    content:
      "Podemos actualizar esta política en cualquier momento. Si hay cambios significativos, te informaremos a través de nuestra tienda o redes sociales. La fecha de última actualización figura al pie de esta página.",
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <section style={{ backgroundColor: "var(--white)", padding: "4rem 2rem 2rem", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <p className="label-section" style={{ marginBottom: "0.75rem" }}>Legal</p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              color: "var(--text)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Política de privacidad y cookies.
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
            Última actualización: abril 2026
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--white)", padding: "3rem 2rem 5rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {/* Intro */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              fontWeight: 300,
              color: "var(--text-light)",
              lineHeight: 1.9,
              padding: "1.25rem 1.5rem",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--bg-card)",
            }}
          >
            En Amapola nos comprometemos a proteger tu privacidad. Esta política explica qué datos recopilamos, cómo los usamos y cuáles son tus derechos como usuario de nuestra tienda online, en cumplimiento de la legislación argentina vigente.
          </p>

          {/* Secciones */}
          {sections.map((s, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "var(--text)",
                  textTransform: "uppercase",
                  marginBottom: "0.85rem",
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 300,
                  color: "var(--text-light)",
                  lineHeight: 1.85,
                }}
              >
                {s.content}
              </p>
            </div>
          ))}

          {/* CTA */}
          <div style={{ textAlign: "center", paddingTop: "1rem" }}>
            <a
              href="https://wa.me/5491166676467?text=Hola%20Amapola!%20Tengo%20una%20consulta%20sobre%20privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
            >
              Consultas por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
