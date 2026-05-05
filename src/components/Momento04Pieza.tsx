import { useState } from "react";
import type { EstadoApp, CaminoMultimodal } from "../types";
import { construirPieza, construirGuiaCompleta } from "../lib/generadorPrompt";

interface Props {
  estado: EstadoApp;
  camino: CaminoMultimodal;
  onAtras: () => void;
  onReiniciar: () => void;
}

function Momento04Pieza({ estado, camino, onAtras, onReiniciar }: Props) {
  const pieza = construirPieza(estado, camino);
  const [copiadoPrompt, setCopiadoPrompt] = useState(false);
  const [copiadoGuia, setCopiadoGuia] = useState(false);

  const copiar = async (texto: string, cual: "prompt" | "guia") => {
    try {
      await navigator.clipboard.writeText(texto);
      if (cual === "prompt") {
        setCopiadoPrompt(true);
        setTimeout(() => setCopiadoPrompt(false), 2000);
      } else {
        setCopiadoGuia(true);
        setTimeout(() => setCopiadoGuia(false), 2000);
      }
    } catch (err) {
      console.error("No se pudo copiar:", err);
    }
  };

  const guiaCompleta = construirGuiaCompleta(estado, pieza);

  return (
    <section
      style={{
        maxWidth: "780px",
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
          momento 04 / 04
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
          Tu pieza está lista.
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Esto es lo que vas a pegar en{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
            {pieza.herramienta}
          </span>
          . Léelo antes de copiar — si algo no te suena, vuelve atrás y ajústalo.
        </p>
      </header>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <p
            className="mono"
            style={{
              fontSize: "11px",
              color: "var(--text-secondary)",
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            prompt operativo
          </p>
          <button
            type="button"
            onClick={() => copiar(pieza.prompt, "prompt")}
            style={{
              background: copiadoPrompt ? "var(--accent)" : "transparent",
              color: copiadoPrompt ? "var(--bg)" : "var(--text-primary)",
              border: copiadoPrompt
                ? "1px solid var(--accent)"
                : "1px solid var(--border)",
              borderRadius: "6px",
              padding: "6px 14px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {copiadoPrompt ? "✓ copiado" : "copiar prompt"}
          </button>
        </div>
        <pre
          className="mono"
          style={{
            fontSize: "13px",
            color: "var(--text-primary)",
            lineHeight: 1.7,
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontFamily: "var(--font-mono)",
          }}
        >
          {pieza.prompt}
        </pre>
      </div>

      <div
        style={{
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "1.5rem",
        }}
      >
        <p
          className="mono"
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            letterSpacing: "0.05em",
            margin: "0 0 16px",
          }}
        >
          cómo evaluar si la salida sirve
        </p>
        <ol
          style={{
            margin: 0,
            paddingLeft: "20px",
            color: "var(--text-primary)",
          }}
        >
          {pieza.criterios.map((c, i) => (
            <li
              key={i}
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                marginBottom: i === pieza.criterios.length - 1 ? 0 : "10px",
                paddingLeft: "8px",
              }}
            >
              {c}
            </li>
          ))}
        </ol>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: `1px solid var(--accent)`,
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "1.5rem",
        }}
      >
        <p
          className="mono"
          style={{
            fontSize: "11px",
            color: "var(--accent)",
            letterSpacing: "0.05em",
            margin: "0 0 6px",
          }}
        >
          y ahora · cómo usarla en tu contexto
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: "0 0 18px",
          }}
        >
          La pieza no es el destino. Es el medio para una conversación, una decisión o una capacitación. Aquí tres maneras de aterrizarla, y una cosa que no debes hacer.
        </p>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {pieza.escenariosUso.map((e, i) => (
            <li
              key={i}
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                marginBottom: i === pieza.escenariosUso.length - 1 ? 0 : "14px",
                color: "var(--text-primary)",
                paddingLeft: "0",
              }}
              dangerouslySetInnerHTML={{
                __html: e
                  .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 500; color: var(--text-primary);">$1</strong>')
              }}
            />
          ))}
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <button
          type="button"
          onClick={() => copiar(guiaCompleta, "guia")}
          style={{
            background: copiadoGuia ? "var(--accent)" : "transparent",
            color: copiadoGuia ? "var(--bg)" : "var(--text-primary)",
            border: copiadoGuia
              ? "1px solid var(--accent)"
              : "1px solid var(--text-secondary)",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {copiadoGuia ? "✓ guía copiada" : "copiar guía completa"}
        </button>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: 0,
            alignSelf: "center",
            flex: 1,
            minWidth: "200px",
          }}
        >
          Incluye contexto, prompt, criterios de evaluación y escenarios de uso. Útil para tu carpeta de casos o para compartir con tu equipo.
        </p>
      </div>

      <div
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
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
          ← ajustar
        </button>
        <button
          type="button"
          onClick={onReiniciar}
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
          empezar otro proceso
        </button>
      </div>
    </section>
  );
}

export default Momento04Pieza;