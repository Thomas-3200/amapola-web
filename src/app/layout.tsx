import type { Metadata } from "next";
import { EB_Garamond, Raleway } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amapola — Carteras, Billeteras y Accesorios | Villa Domínico, Avellaneda",
  description:
    "Descubrí la colección de carteras, billeteras, riñoneras y accesorios de Amapola. Av. Mitre 4553, Villa Domínico. Envíos a todo el país.",
  keywords: "carteras, billeteras, riñoneras, accesorios, maquillaje, perfumes, Villa Domínico, Avellaneda, Buenos Aires, Amapola",
  openGraph: {
    title: "Amapola — Carteras & Accesorios",
    description: "Carteras, billeteras y accesorios en Villa Domínico, Avellaneda.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${ebGaramond.variable} ${raleway.variable}`}>
      <body>{children}</body>
    </html>
  );
}
