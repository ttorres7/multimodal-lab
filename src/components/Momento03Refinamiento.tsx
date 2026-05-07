import type { CaminoMultimodal, TipoImagen } from "../types";

interface Props {
  camino: CaminoMultimodal;
  audiencia: string;
  decision: string;
  restriccionEtica: string;
  estilo: string;
  tipoImagen: TipoImagen | null;
  onAudienciaChange: (valor: string) => void;
  onDecisionChange: (valor: string) => void;
  onRestriccionChange: (valor: string) => void;
  onEstiloChange: (valor: string) => void;
  onTipoImagenChange: (valor: TipoImagen) => void;
  onSiguiente: () => void;
  onAtras: () => void;
}

const AUDIENCIAS = [
  "gerencia",
  "comité directivo",
  "operarios",
  "equipo técnico",
  "equipo comercial",
  "clientes",
  "usuarios internos",
];

const DECISIONES = [
  "aprobar la propuesta",
  "entender el cambio",
  "comprar la solución",
  "capacitarse",
  "vender internamente",
];

const ESTILOS_POR_CAMINO: Record<CaminoMultimodal, string[]> = {
  imagen: [
    "realista documental",
    "minimalista ejecutivo",
    "isométrico empresarial",
    "técnico industrial",
  ],
  video: [
    "corporativo sobrio",
    "cinemático",
    "capacitación clara",
    "storytelling de caso",
  ],
  voz: [
    "voz ejecutiva neutral",
    "voz cercana de servicio",
    "narración documental",
    "agente conversacional",
  ],
};

interface OpcionTipoImagen {
  id: TipoImagen;
  titulo: string;
  cuando: string;
}

const TIPOS_IMAGEN: OpcionTipoImagen[] = [
  {
    id: "flujo",
    titulo: "Flujo de proceso",
    cuando: "cuando importa secuencia y supervisión humana",
  },
  {
    id: "antes_despues",
    titulo: "Antes / Después",
    cuando: "cuando importa convencer del cambio",
  },
  {
    id: "roles",
    titulo: "Mapa de roles",
    cuando: "cuando importa dejar claro responsabilidades",
  },
  {
    id: "timeline",
    titulo: "Línea de tiempo",
    cuando: "cuando importa proyectar viabilidad",
  },
  {
    id: "impacto",
    titulo: "Diagrama de impacto",
    cuando: "cuando importa defender el ROI",
  },
];

function Momento03Refinamiento(props: Props) {
  const {
    camino,
    audiencia,
    decision,
    restriccionEtica,
    estilo,
    tipoImagen,
    onAudienciaChange,
    onDecisionChange,
    onRestriccionChange,
    onEstiloChange,
    onTipoImagenChange,
    onSiguiente,
    onAtras,
  } = props;

  const estilos = ESTILOS_POR_CAMINO[camino];
  const requiereTipoImagen = camino === "imagen";
  const puedeAvanzar =
    audiencia !== "" &&
    decision !== "" &&
    estilo !== "" &&
    (!requiereTipoImagen || tipoImagen !== null);

  return (
    <section
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
      }}
    >
      <header style={{ marginBottom: "2.5rem" }}>
        <p
          className="mono"
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            letterSpacing: "0.08em",
            margin: "0 0 12px",
          }}
        >
          momento 03 / 04
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
          Antes de generar nada, decidamos juntos.
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Estas decisiones son las que diferencian una imagen genérica de una pieza
          que sirve para algo. No las saltes.
        </p>
      </header>

      <Pregunta
        numero="01"
        titulo="¿A quién va dirigido?"
        ayuda="No le hablas igual a tu gerente que a un operario. La audiencia define el tono."
      >
        <ChipsSeleccion
          opciones={AUDIENCIAS}
          valor={audiencia}
          onChange={onAudienciaChange}
        />
      </Pregunta>

      <Pregunta
        numero="02"
        titulo="¿Qué decisión quieres provocar?"
        ayuda="Una pieza sin decisión es una pieza decorativa. ¿Qué quieres que haga tu audiencia después de verla?"
      >
        <ChipsSeleccion
          opciones={DECISIONES}
          valor={decision}
          onChange={onDecisionChange}
        />
      </Pregunta>

      <Pregunta
        numero="03"
        titulo="¿Qué dato sensible NO puede aparecer?"
        ayuda="Opcional, pero recomendado. Si dejas esto en blanco, la app aplica una restricción genérica de protección de datos."
      >
        <textarea
          value={restriccionEtica}
          onChange={(e) => onRestriccionChange(e.target.value)}
          placeholder="Ej: nombres reales de comunidades, montos exactos, datos de clientes específicos..."
          rows={3}
          style={{
            width: "100%",
            background: "var(--surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "14px",
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
      </Pregunta>

      {requiereTipoImagen && (
        <Pregunta
          numero="04"
          titulo="¿Qué tipo de imagen necesitas?"
          ayuda="Cada tipo responde a una pregunta directiva distinta. Elige según qué quieres argumentar, no según qué se ve más bonito."
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
            {TIPOS_IMAGEN.map((opcion) => {
              const activo = opcion.id === tipoImagen;
              return (
                <button
                  key={opcion.id}
                  type="button"
                  onClick={() => onTipoImagenChange(opcion.id)}
                  style={{
                    background: activo ? "var(--surface)" : "transparent",
                    border: activo
                      ? "1px solid var(--accent)"
                      : "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    color: "inherit",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (!activo) {
                      e.currentTarget.style.borderColor = "var(--text-secondary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!activo) {
                      e.currentTarget.style.borderColor = "var(--border)";
                    }
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      fontSize: "10px",
                      color: activo ? "var(--accent)" : "var(--text-secondary)",
                      letterSpacing: "0.05em",
                      margin: "0 0 4px",
                    }}
                  >
                    {opcion.cuando}
                  </p>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      margin: 0,
                      color: "var(--text-primary)",
                    }}
                  >
                    {opcion.titulo}
                  </h4>
                </button>
              );
            })}
          </div>
        </Pregunta>
      )}

      <Pregunta
        numero={requiereTipoImagen ? "05" : "04"}
        titulo="¿Qué registro estético o sonoro?"
        ayuda={`Opciones específicas para el camino "${camino}".`}
      >
        <ChipsSeleccion
          opciones={estilos}
          valor={estilo}
          onChange={onEstiloChange}
        />
      </Pregunta>

      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
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
          generar pieza →
        </button>
      </div>
    </section>
  );
}

interface PreguntaProps {
  numero: string;
  titulo: string;
  ayuda: string;
  children: React.ReactNode;
}

function Pregunta({ numero, titulo, ayuda, children }: PreguntaProps) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
        <span
          className="mono"
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            letterSpacing: "0.05em",
          }}
        >
          {numero}
        </span>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 500,
            margin: 0,
            color: "var(--text-primary)",
          }}
        >
          {titulo}
        </h3>
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          margin: "0 0 12px",
          paddingLeft: "28px",
        }}
      >
        {ayuda}
      </p>
      <div style={{ paddingLeft: "28px" }}>{children}</div>
    </div>
  );
}

interface ChipsProps {
  opciones: string[];
  valor: string;
  onChange: (valor: string) => void;
}

function ChipsSeleccion({ opciones, valor, onChange }: ChipsProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {opciones.map((op) => {
        const activo = op === valor;
        return (
          <button
            key={op}
            type="button"
            onClick={() => onChange(op)}
            style={{
              background: activo ? "var(--accent)" : "transparent",
              color: activo ? "var(--bg)" : "var(--text-secondary)",
              border: activo ? "1px solid var(--accent)" : "1px solid var(--border)",
              borderRadius: "100px",
              padding: "6px 14px",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: activo ? 500 : 400,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!activo) {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.borderColor = "var(--text-secondary)";
              }
            }}
            onMouseLeave={(e) => {
              if (!activo) {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "var(--border)";
              }
            }}
          >
            {op}
          </button>
        );
      })}
    </div>
  );
}

export default Momento03Refinamiento;