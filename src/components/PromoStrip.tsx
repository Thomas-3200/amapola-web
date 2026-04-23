export default function PromoStrip() {
  const items = [
    { icon: "🚚", text: "Envíos a todo el país" },
    { icon: "💳", text: "MP · Transferencia · Débito" },
    { icon: "🔄", text: "Cambios en 7 días" },
    { icon: "📍", text: "Av. Mitre 4553 · Villa Domínico" },
  ];

  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      backgroundColor: "var(--white)",
    }}>
      <div style={{
        maxWidth: "var(--container)",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            padding: "1rem 0.5rem",
            borderRight: i < items.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <span style={{ fontSize: "1rem" }}>{item.icon}</span>
            <p className="label-section" style={{ color: "var(--text)", fontSize: "0.6rem" }}>{item.text}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .promo-strip-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
