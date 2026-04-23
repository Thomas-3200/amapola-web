import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

// Mercado Pago notifies payment events to this endpoint.
// Configure the URL as your site's `/api/mp-webhook` in the MP dashboard.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const type = body?.type || req.nextUrl.searchParams.get("type");
    const dataId = body?.data?.id || req.nextUrl.searchParams.get("data.id");

    if (type !== "payment" || !dataId) {
      // Acknowledge anyway — MP expects 200 on non-payment topics too
      return NextResponse.json({ received: true });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("[mp-webhook] MP_ACCESS_TOKEN missing");
      return NextResponse.json({ error: "not configured" }, { status: 500 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const payment = await new Payment(client).get({ id: String(dataId) });

    // TODO: persist order to DB (Supabase) once schema is ready.
    // For now we just log so it's visible in Vercel runtime logs.
    console.log("[mp-webhook] payment:", {
      id: payment.id,
      status: payment.status,
      external_reference: payment.external_reference,
      amount: payment.transaction_amount,
      payer_email: payment.payer?.email,
      metadata: payment.metadata,
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[mp-webhook] error:", err);
    return NextResponse.json({ received: true }); // still 200 so MP doesn't retry-storm
  }
}

export async function GET(req: NextRequest) {
  // MP sometimes pings GET for validation
  return NextResponse.json({ ok: true, path: req.nextUrl.pathname });
}
