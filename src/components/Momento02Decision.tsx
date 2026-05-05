import type { CaminoMultimodal } from "../types";

interface Props {
  onElegir: (camino: CaminoMultimodal) => void;
  onAtras: () => void;
}

interface OpcionCamino {
  id: CaminoMultimodal;
  emoji: string;
  cuando: string;
  titulo: string;
  descripcion: string;
  herramienta: string;
}

const OPCIONES: OpcionCamino[] = [
  {
    id: "imagen",
    emoji: "🖼️",
    cuando: "cuando el proceso es espacial o estructural",
    titulo: "Imagen / Diagrama",
    descripcion:
      "Para cuando necesitas que alguien vea cómo se conectan las piezas. Flujos, blueprints, antes y después.",
    herramienta: "ChatGPT · Gemini",
  },
  {
    id: "video",
    emoji: "🎬",
    cuando: "cuando el proceso es temporal o secuencial",
    titulo: "Video / Storyboard",
    descripcion:
      "Para cuando importa el orden, el ritmo o la transformación. Capacitaciones, antes-después narrados, demos.",
    herramienta: "Google Vids",
  },
  {
    id: "voz",
    emoji: "🎙️",
    cuando: "cuando el proceso es conversacional o humano",
    titulo: "Audio / Voz",
    descripcion:
      "Para cuando lo que importa es el tono, la cadencia o la simulación de una interacción. Llamadas, microlearning, agentes.",
    herramienta: "ElevenLabs",
  },
];

function Momento02Decision({ onElegir, onAtras }: Props) {
  return (
    <section
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
      }}
    >
      <header style={{ marginBottom: "2rem" }}>
        <p
          className="mono"
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            letterSpacing: "0.08em",
            margin: "0 0 12px",
          }}
        >
          momento 02 / 04
        </p>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 500,
            lineHeight: 1.25,
            margin: "0 0 12px",
            color: "var(--text-primary)",
          }}
        >
          ¿Qué necesitas hacer visible, audible o comprensible<br />de este proceso?
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Tu elección no es estética. Es una decisión sobre la naturaleza del proceso.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "12px",
        }}
      >
        {OPCIONES.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            onClick={() => onElegir(opcion.id)}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "20px 24px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.2s ease, transform 0.15s ease",
              fontFamily: "inherit",
              color: "inherit",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <span
                style={{
                  fontSize: "20px",
                  lineHeight: 1,
                  marginTop: "2px",
                }}
                aria-hidden="true"
              >
                {opcion.emoji}
              </span>
              <div style={{ flex: 1 }}>
                <p
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.05em",
                    margin: "0 0 6px",
                  }}
                >
                  {opcion.cuando}
                </p>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 500,
                    margin: "0 0 8px",
                    color: "var(--text-primary)",
                  }}
                >
                  {opcion.titulo}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: "0 0 14px",
                  }}
                >
                  {opcion.descripcion}
                </p>
                <p
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  → {opcion.herramienta}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p
        className="mono"
        style={{
          fontSize: "11px",
          color: "var(--text-secondary)",
          margin: "1.5rem 0 0",
          textAlign: "center",
          letterSpacing: "0.03em",
        }}
      >
        aún no estás eligiendo herramienta. estás eligiendo lenguaje.
      </p>

      <div
        style={{
          marginTop: "2.5rem",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <button
          type="button"
          onClick={onAtras}
          style={{
            background: "transparent",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.borderColor = "var(--text-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          ← atrás
        </button>
      </div>
    </section>
  );
}

export default Momento02Decision;