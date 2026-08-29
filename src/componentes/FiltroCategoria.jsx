const CATEGORIAS = ["Etica", "Tiempo", "Espacio", "Identidad", "Conocimiento", "Realidad"];

function FiltroCategoria({ categoriaActiva, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
      <button onClick={() => onChange(null)} style={{ fontWeight: !categoriaActiva ? "bold" : "normal" }}>
        Todas
      </button>
      {CATEGORIAS.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{ fontWeight: categoriaActiva === cat ? "bold" : "normal" }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FiltroCategoria;