import { CASOS_AULA } from "../lib/casosAula";

interface Props {
  proceso: string;
  onProcesoChange: (valor: string) => void;
  onSiguiente: () => void;
}

function Momento01Proceso({ proceso, onProcesoChange, onSiguiente }: Props) {
  const puedeAvanzar = proceso.trim().length >= 30;

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
          momento 01 / 04
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
          Empecemos por tu proceso real.
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Escríbeme un proceso de tu trabajo que sientes que se podría intervenir
          con IA. Sin formatear, sin pulir. Como se lo contarías a un colega de
          confianza.
        </p>
      </header>

      <textarea
        value={proceso}
        onChange={(e) => onProcesoChange(e.target.value)}
        placeholder="Por ejemplo: recibimos 200 reclamos al mes, los clasifica un analista a mano, demora 3 días..."
        rows={8}
        style={{
          width: "100%",
          background: "var(--surface)",
          color: "var(--text-primary)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "16px",
          fontSize: "15px",
          lineHeight: 1.6,
          outline: "none",
          fontFamily: "var(--font-sans)",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      />

      <p
        className="mono"
        style={{
          fontSize: "11px",
          color: "var(--text-secondary)",
          margin: "8px 0 0",
        }}
      >
        {proceso.trim().length} caracteres · mínimo sugerido 30
      </p>

      <div style={{ marginTop: "2.5rem" }}>
        <p
          className="mono"
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            letterSpacing: "0.05em",
            margin: "0 0 12px",
          }}
        >
          o parte de un caso del aula
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {CASOS_AULA.map((caso) => (
            <button
              key={caso.id}
              type="button"
              onClick={() => onProcesoChange(caso.proceso)}
              style={{
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "100px",
                padding: "6px 14px",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {caso.sector} · {caso.titulo}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          onClick={onSiguiente}
          disabled={!puedeAvanzar}
          style={{
            background: puedeAvanzar ? "var(--accent)" : "transparent",
            color: puedeAvanzar ? "var(--bg)" : "var(--text-secondary)",
            border: puedeAvanzar
              ? "1px solid var(--accent)"
              : "1px solid var(--border)",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: puedeAvanzar ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          siguiente →
        </button>
      </div>
    </section>
  );
}

export default Momento01Proceso;