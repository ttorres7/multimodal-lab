import type { IdTema } from "../lib/temas";
import { TEMAS } from "../lib/temas";

interface Props {
  temaActivo: IdTema;
  onCambiar: (tema: IdTema) => void;
}

const ORDEN: IdTema[] = ["graphite", "solar", "tide", "ember"];

function ThemeSwitcher({ temaActivo, onCambiar }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
      role="group"
      aria-label="Selector de tema"
    >
      <span
        className="mono"
        style={{
          fontSize: "11px",
          color: "var(--text-secondary)",
          letterSpacing: "0.05em",
        }}
      >
        tema
      </span>
      {ORDEN.map((id) => {
        const tema = TEMAS[id];
        const activo = id === temaActivo;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onCambiar(id)}
            aria-label={`Activar tema ${tema.nombre}`}
            aria-pressed={activo}
            title={`${tema.nombre} · ${tema.cuando}`}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: tema.colores.accent,
              border: activo
                ? `2px solid ${tema.colores.textPrimary}`
                : `1px solid ${tema.colores.border}`,
              cursor: "pointer",
              padding: 0,
              transition: "transform 0.2s ease",
              transform: activo ? "scale(1.15)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              if (!activo) e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              if (!activo) e.currentTarget.style.transform = "scale(1)";
            }}
          />
        );
      })}
    </div>
  );
}

export default ThemeSwitcher;