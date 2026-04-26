// ─── AMAPOLA — Catálogo central ───────────────────────────────────────────────
// Única fuente de verdad para todos los productos.
// Cuando Paola cargue el formulario (/carga), actualizar este archivo con los
// datos reales: nombre, precio, descripcion, stock.
// Los productos con precio = 0 aparecen como "Consultar precio" en el catálogo.
// ─────────────────────────────────────────────────────────────────────────────

export type Product = {
  codigo: string;         // AMP-001
  nombre: string;         // "Cartera Olivia"
  precio: number;         // 0 = sin precio / consultar
  categoria: string;
  imagen: string;         // filename.jpg  (dentro de /public/images/products/)
  descripcion?: string;
  stock?: number;         // undefined = sin dato todavía
};

// ── 8 productos con datos confirmados ──
const KNOWN: Product[] = [
  {
    codigo: "AMP-001",
    nombre: "Riñonera Amapola Bordo",
    precio: 19000,
    categoria: "Riñoneras",
    imagen: "IMG_4627.jpg",
  },
  {
    codigo: "AMP-009",
    nombre: "Oreiro Love — Vino",
    precio: 15000,
    categoria: "Billeteras",
    imagen: "IMG_4653.jpg",
  },
  {
    codigo: "AMP-016",
    nombre: "Chimola Vino",
    precio: 28000,
    categoria: "Billeteras",
    imagen: "IMG_4660.jpg",
  },
  {
    codigo: "AMP-014",
    nombre: "Chimola Camel",
    precio: 28000,
    categoria: "Billeteras",
    imagen: "IMG_4658.jpg",
  },
  {
    codigo: "AMP-028",
    nombre: "ch/ml Gris",
    precio: 12000,
    categoria: "Billeteras Compactas",
    imagen: "IMG_4673.jpg",
  },
  {
    codigo: "AMP-022",
    nombre: "Barbara Crossbody Beige",
    precio: 35000,
    categoria: "Crossbody",
    imagen: "IMG_4666.jpg",
  },
  {
    codigo: "AMP-030",
    nombre: "The Tote Bag — Caramelo",
    precio: 52000,
    categoria: "Tote Bags",
    imagen: "IMG_4677.jpg",
  },
  {
    codigo: "AMP-037",
    nombre: "Cartera Cuero Negro",
    precio: 45000,
    categoria: "Carteras",
    imagen: "IMG_4691.jpg",
  },
];

// ── Lookup por imagen para el catálogo ──────────────────────────────────────
const knownByImage: Record<string, Product> = {};
KNOWN.forEach((p) => (knownByImage[p.imagen] = p));

// ── Lista completa de imágenes (orden original del catálogo) ────────────────
const ALL_IMAGES = [
  "IMG_4627", "IMG_4629", "IMG_4630", "IMG_4633", "IMG_4648", "IMG_4649",
  "IMG_4651", "IMG_4652", "IMG_4653", "IMG_4654", "IMG_4655", "IMG_4656",
  "IMG_4657", "IMG_4658", "IMG_4659", "IMG_4660", "IMG_4661", "IMG_4662",
  "IMG_4663", "IMG_4664", "IMG_4665", "IMG_4666", "IMG_4667", "IMG_4668",
  "IMG_4669", "IMG_4671", "IMG_4672", "IMG_4673", "IMG_4674", "IMG_4677",
  "IMG_4678", "IMG_4680", "IMG_4682", "IMG_4685", "IMG_4687", "IMG_4690",
  "IMG_4691", "IMG_4693", "IMG_4699", "IMG_4702", "IMG_4703",
];

// ── Catálogo completo: mezcla conocidos + pendientes ────────────────────────
export const CATALOG: Product[] = ALL_IMAGES.map((img, i) => {
  const filename = `${img}.jpg`;
  return (
    knownByImage[filename] ?? {
      codigo: `AMP-${String(i + 1).padStart(3, "0")}`,
      nombre: `Pieza ${String(i + 1).padStart(2, "0")}`,
      precio: 0,          // sin precio todavía
      categoria: "Sin categoría",
      imagen: filename,
    }
  );
});

// ── Solo los productos con precio para el home ──────────────────────────────
export const FEATURED: Product[] = KNOWN;

export const fmtARS = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
