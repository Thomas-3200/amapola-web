import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

type IncomingItem = {
  codigo: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
};

type IncomingCliente = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
};

type IncomingEnvio = {
  metodo: "retiro" | "envio";
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  cp?: string;
  notas?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items = body?.items as IncomingItem[] | undefined;
    const cliente = body?.cliente as IncomingCliente | undefined;
    const envio = body?.envio as IncomingEnvio | undefined;

    if (!items?.length) {
      return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
    }
    if (!cliente?.email || !cliente?.nombre) {
      return NextResponse.json({ error: "Faltan datos del cliente." }, { status: 400 });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json(
        { error: "MP_ACCESS_TOKEN no está configurado en el servidor." },
        { status: 500 }
      );
    }

    // Resolve base URL (Vercel provides VERCEL_URL without protocol)
    const envBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const vercelBase = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
    const reqOrigin = req.headers.get("origin") || req.nextUrl.origin;
    const baseUrl = envBase || vercelBase || reqOrigin;

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const mpItems = items.map((i) => ({
      id: i.codigo,
      title: i.nombre,
      quantity: Math.max(1, Math.floor(i.cantidad)),
      unit_price: Math.round(i.precio),
      currency_id: "ARS" as const,
    }));

    const external_reference = `AMP-${Date.now()}`;

    const result = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: cliente.nombre,
          surname: cliente.apellido,
          email: cliente.email,
          phone: { number: cliente.telefono },
          identification: { type: "DNI", number: cliente.dni },
          ...(envio?.metodo === "envio" && envio.direccion
            ? {
                address: {
                  street_name: envio.direccion,
                  zip_code: envio.cp,
                },
              }
            : {}),
        },
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          pending: `${baseUrl}/checkout/pending`,
          failure: `${baseUrl}/checkout/failure`,
        },
        auto_return: "approved",
        statement_descriptor: "AMAPOLA",
        external_reference,
        metadata: {
          metodo_envio: envio?.metodo,
          direccion: envio?.direccion,
          ciudad: envio?.ciudad,
          provincia: envio?.provincia,
          cp: envio?.cp,
          notas: envio?.notas,
          dni: cliente.dni,
          telefono: cliente.telefono,
        },
        notification_url: `${baseUrl}/api/mp-webhook`,
      },
    });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
      external_reference,
    });
  } catch (err) {
    console.error("[create-preference] error:", err);
    const message = err instanceof Error ? err.message : "Error creando preferencia.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
