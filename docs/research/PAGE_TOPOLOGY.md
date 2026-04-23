# Page Topology — adidas.com.ar

## URL: https://www.adidas.com.ar/
## Total height: 7357px | Width: 1351px

## Design System
- **Font primary**: AdihausDIN, Helvetica, Arial, sans-serif (substitute: Barlow, Inter)
- **Font condensed**: AdihausDIN Cn (substitute: Barlow Condensed)
- **Color background**: #ffffff
- **Color text**: #000000
- **Color gray bg**: #eceff1 (light gray banners)
- **Color red accent**: rgb(255, 0, 0) (sale labels)
- **Primary nav**: font-size 16px, font-weight 700, UPPERCASE
- **Utility nav**: font-size 12px, font-weight 400

## Sections (top → bottom)

| # | Name | Height | Interaction | Notes |
|---|------|--------|-------------|-------|
| 1 | **TopAnnouncementBar** | ~40px | Static (carousel) | Black bg, white text: "DESCUBRÍ LAS PROMOCIONES BANCARIAS" + chevron |
| 2 | **Header** | 121px | Sticky on scroll | Logo + utility links + main nav + search/cart/wishlist |
| 3 | **SecondaryBanner** | 64px | Static | Gray bg (#eceff1): "TU EXPERIENCIA PERSONALIZADA TE ESPERA. INICIÁ SESIÓN Y DESCUBRILA." + arrow |
| 4 | **PromoBannerGrid** | 437px | Static | 1 black promo card + 3 product image cards (MUJER, HOMBRE, NIÑOS) |
| 5 | **HeroVideoBanner** | 547px | Video autoplay | Argentina jersey campaign: "Cuando arte y fútbol se encuentran" |
| 6 | **CategorySelector** | 302px | Click carousel | "¿Para quién estás comprando?" - gender/age category carousel |
| 7 | **DiscoverBanner** | 244px | Static | "DESCUBRÍ MÁS" - single image banner |
| 8 | **ShopTheLook** | 726px | Scroll carousel | "COMPRÁ EL LOOK E INSPIRATE" + "VER TODO" - product carousel |
| 9 | **TeamsCarousel** | 378px | Scroll carousel | "ENCONTRÁ TU EQUIPO" - football clubs (Selecciones, Clubes locales, Clubes internacionales) |
| 10 | **FIFABanner** | 603px | Static | "Camisetas alternativas Copa Mundial de la FIFA 26™" |
| 11 | **RubySection** | 574px | Carousel | Rugby / Argentina / Trondía / Novedades / Colecciones / Gift Card |
| 12 | **RecommendationsFeed** | 597px | Scroll carousel | Personalized product recommendations (microfrontend) |
| 13 | **OurProducts** | 324px | Static grid | "NUESTROS PRODUCTOS" - Zapatillas / Ropa / Accesorios tiles |
| 14 | **SeoTextBlock** | 916px | Accordion | "ADIDAS TIENDA DEPORTIVA: RENDIMIENTO, ESTILO E INNOVACIÓN" - SEO text |
| 15 | **Footer** | 1102px | Static | Multi-column links + social + legal |

## Header Behavior
- Starts transparent/white at scroll 0
- After scrolling ~50px: gains box-shadow, announcement bar scrolls away, header "floats"
- Sticky (position: sticky, z-index: 8000)
- Top bar utility links: 12px, normal weight
- Main nav items: 16px, bold, UPPERCASE

## Color Theme Classes
- `color-theme-black`: bg=#000, text=#fff
- `color-theme-white`: bg=#fff, text=#000
- `color-theme-light`: bg=#f5f5f5, text=#000
