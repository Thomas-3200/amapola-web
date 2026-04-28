// ─── AMAPOLA — Catálogo central ───────────────────────────────────────────────
// 41 fotos → 19 productos reales agrupados por ángulo/color.
// imagen  = foto hero (la mejor para e-commerce)
// imagenes = todas las fotos del producto (hero + ángulos)
// precio  = 0 → sin precio todavía / "Consultar"
// ─────────────────────────────────────────────────────────────────────────────

export type Product = {
  codigo: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;       // hero (primera de imagenes[])
  imagenes: string[];   // todas las fotos del producto
  descripcion?: string;
  stock?: number;
};

// ─────────────────────────────────────────────────────────────────────────────
//  CATÁLOGO COMPLETO — 19 SKUs
// ─────────────────────────────────────────────────────────────────────────────
export const CATALOG: Product[] = [

  // ── 1. Riñonera Amapola (set + billetera, 3 colores: bordo · camel · negro) ──
  {
    codigo: "AMP-001",
    nombre: "Riñonera Amapola",
    precio: 19000,
    categoria: "Riñoneras",
    imagen: "IMG_4627.jpg",
    imagenes: ["IMG_4627.jpg", "IMG_4629.jpg", "IMG_4630.jpg"],
  },

  // ── 2. Barbara Crossbody Mini — Negro ─────────────────────────────────────
  {
    codigo: "AMP-002",
    nombre: "Barbara Crossbody — Negro",
    precio: 0,
    categoria: "Crossbody",
    imagen: "IMG_4633.jpg",
    imagenes: ["IMG_4633.jpg"],
  },

  // ── 3. Oreiro Love — Billetera Acolchada (3 colores: verde · negro · fucsia)
  {
    codigo: "AMP-003",
    nombre: "Oreiro Love",
    precio: 15000,
    categoria: "Billeteras",
    imagen: "IMG_4651.jpg",
    imagenes: ["IMG_4651.jpg", "IMG_4652.jpg", "IMG_4653.jpg", "IMG_4648.jpg", "IMG_4649.jpg"],
  },

  // ── 4. Chimola Camel — Billetera Grande ───────────────────────────────────
  {
    codigo: "AMP-004",
    nombre: "Chimola Camel",
    precio: 28000,
    categoria: "Billeteras",
    imagen: "IMG_4657.jpg",
    imagenes: ["IMG_4657.jpg", "IMG_4654.jpg", "IMG_4655.jpg", "IMG_4656.jpg", "IMG_4658.jpg", "IMG_4659.jpg"],
  },

  // ── 5. Chimola Vino — Billetera Grande ────────────────────────────────────
  {
    codigo: "AMP-005",
    nombre: "Chimola Vino",
    precio: 28000,
    categoria: "Billeteras",
    imagen: "IMG_4660.jpg",
    imagenes: ["IMG_4660.jpg", "IMG_4661.jpg", "IMG_4662.jpg"],
  },

  // ── 6. Barbara Crossbody Saffiano — Camel ─────────────────────────────────
  {
    codigo: "AMP-006",
    nombre: "Barbara Crossbody — Camel",
    precio: 0,
    categoria: "Crossbody",
    imagen: "IMG_4665.jpg",
    imagenes: ["IMG_4665.jpg", "IMG_4663.jpg", "IMG_4664.jpg"],
  },

  // ── 7. Barbara Crossbody Saffiano — Beige ─────────────────────────────────
  {
    codigo: "AMP-007",
    nombre: "Barbara Crossbody Beige",
    precio: 35000,
    categoria: "Crossbody",
    imagen: "IMG_4666.jpg",
    imagenes: ["IMG_4666.jpg"],
  },

  // ── 8. Chimola PAUSE — Negro ───────────────────────────────────────────────
  {
    codigo: "AMP-008",
    nombre: "Chimola PAUSE — Negro",
    precio: 0,
    categoria: "Billeteras",
    imagen: "IMG_4668.jpg",
    imagenes: ["IMG_4668.jpg", "IMG_4667.jpg"],
  },

  // ── 9. Chimola PAUSE — Camel ──────────────────────────────────────────────
  {
    codigo: "AMP-009",
    nombre: "Chimola PAUSE — Camel",
    precio: 0,
    categoria: "Billeteras",
    imagen: "IMG_4672.jpg",
    imagenes: ["IMG_4672.jpg", "IMG_4669.jpg", "IMG_4671.jpg"],
  },

  // ── 10. ch/ml Gris — Billetera Compacta ───────────────────────────────────
  {
    codigo: "AMP-010",
    nombre: "ch/ml Gris",
    precio: 12000,
    categoria: "Billeteras Compactas",
    imagen: "IMG_4674.jpg",
    imagenes: ["IMG_4674.jpg", "IMG_4673.jpg"],
  },

  // ── 11. The Tote Bag — Caramelo ───────────────────────────────────────────
  {
    codigo: "AMP-011",
    nombre: "The Tote Bag — Caramelo",
    precio: 52000,
    categoria: "Tote Bags",
    imagen: "IMG_4677.jpg",
    imagenes: ["IMG_4677.jpg", "IMG_4680.jpg"],
  },

  // ── 12. The Tote Bag — Negro ──────────────────────────────────────────────
  {
    codigo: "AMP-012",
    nombre: "The Tote Bag — Negro",
    precio: 0,
    categoria: "Tote Bags",
    imagen: "IMG_4678.jpg",
    imagenes: ["IMG_4678.jpg", "IMG_4682.jpg", "IMG_4685.jpg"],
  },

  // ── 13. Barbara Mini Tote — Camel ─────────────────────────────────────────
  {
    codigo: "AMP-013",
    nombre: "Barbara Mini Tote — Camel",
    precio: 0,
    categoria: "Carteras",
    imagen: "IMG_4687.jpg",
    imagenes: ["IMG_4687.jpg"],
  },

  // ── 14. Mini Satchel Crinkle — Camel ──────────────────────────────────────
  {
    codigo: "AMP-014",
    nombre: "Mini Satchel — Camel",
    precio: 0,
    categoria: "Carteras",
    imagen: "IMG_4690.jpg",
    imagenes: ["IMG_4690.jpg"],
  },

  // ── 15. Cartera Cuero — Negro ──────────────────────────────────────────────
  {
    codigo: "AMP-015",
    nombre: "Cartera Cuero Negro",
    precio: 45000,
    categoria: "Carteras",
    imagen: "IMG_4691.jpg",
    imagenes: ["IMG_4691.jpg"],
  },

  // ── 16. Riñonera Amaya Quilted — Negro ────────────────────────────────────
  {
    codigo: "AMP-016",
    nombre: "Riñonera Amaya — Negro",
    precio: 0,
    categoria: "Riñoneras",
    imagen: "IMG_4693.jpg",
    imagenes: ["IMG_4693.jpg"],
  },

  // ── 17. Riñonera Quilted — Chocolate ──────────────────────────────────────
  {
    codigo: "AMP-017",
    nombre: "Riñonera Quilted — Chocolate",
    precio: 0,
    categoria: "Riñoneras",
    imagen: "IMG_4699.jpg",
    imagenes: ["IMG_4699.jpg"],
  },

  // ── 18. Sling Nylon — Beige ───────────────────────────────────────────────
  {
    codigo: "AMP-018",
    nombre: "Sling Bag — Beige",
    precio: 0,
    categoria: "Riñoneras",
    imagen: "IMG_4702.jpg",
    imagenes: ["IMG_4702.jpg"],
  },

  // ── 19. Sling Nylon — Negro ───────────────────────────────────────────────
  {
    codigo: "AMP-019",
    nombre: "Sling Bag — Negro",
    precio: 0,
    categoria: "Riñoneras",
    imagen: "IMG_4703.jpg",
    imagenes: ["IMG_4703.jpg"],
  },
];

// ─── Productos destacados en el home (los que tienen precio confirmado) ───────
export const FEATURED: Product[] = CATALOG.filter((p) => p.precio > 0);

// ─── Formateo ARS ─────────────────────────────────────────────────────────────
export const fmtARS = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
