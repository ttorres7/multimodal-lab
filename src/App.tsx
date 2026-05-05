import { useReducer, useEffect } from "react";
import type { EstadoApp, CaminoMultimodal } from "./types";
import { ESTADO_INICIAL } from "./types";
import type { IdTema } from "./lib/temas";
import ThemeSwitcher from "./components/ThemeSwitcher";
import HeroCanvas from "./components/HeroCanvas";
import Momento01Proceso from "./components/Momento01Proceso";
import Momento02Decision from "./components/Momento02Decision";
import Momento03Refinamiento from "./components/Momento03Refinamiento";
import Momento04Pieza from "./components/Momento04Pieza";

type Accion =
  | { tipo: "setProceso"; valor: string }
  | { tipo: "elegirCamino"; camino: CaminoMultimodal }
  | { tipo: "setAudiencia"; valor: string }
  | { tipo: "setDecision"; valor: string }
  | { tipo: "setRestriccion"; valor: string }
  | { tipo: "setEstilo"; valor: string }
  | { tipo: "setTemaManual"; tema: IdTema }
  | { tipo: "irA"; momento: 1 | 2 | 3 | 4 }
  | { tipo: "reiniciar" };

const TEMA_POR_CAMINO: Record<CaminoMultimodal, IdTema> = {
  imagen: "solar",
  video: "tide",
  voz: "ember",
};

function reducer(estado: EstadoApp, accion: Accion): EstadoApp {
  switch (accion.tipo) {
    case "setProceso":
      return { ...estado, proceso: accion.valor };
    case "elegirCamino": {
      const nuevoTema = estado.temaManual
        ? estado.temaActivo
        : TEMA_POR_CAMINO[accion.camino];
      return {
        ...estado,
        camino: accion.camino,
        temaActivo: nuevoTema,
        momento: 3,
      };
    }
    case "setAudiencia":
      return { ...estado, audiencia: accion.valor };
    case "setDecision":
      return { ...estado, decision: accion.valor };
    case "setRestriccion":
      return { ...estado, restriccionEtica: accion.valor };
    case "setEstilo":
      return { ...estado, estilo: accion.valor };
    case "setTemaManual":
      return { ...estado, temaActivo: accion.tema, temaManual: true };
    case "irA":
      return { ...estado, momento: accion.momento };
    case "reiniciar":
      return { ...ESTADO_INICIAL, temaActivo: estado.temaActivo, temaManual: estado.temaManual };
  }
}

function App() {
  const [estado, dispatch] = useReducer(reducer, ESTADO_INICIAL);

  useEffect(() => {
    document.body.setAttribute("data-tema", estado.temaActivo);
  }, [estado.temaActivo]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "1.5rem 1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            className="mono"
            style={{
              fontSize: "16px",
              fontWeight: 500,
              margin: 0,
              color: "var(--text-primary)",
              letterSpacing: "0.02em",
            }}
          >
            multimodal.lab
          </h1>
          <p
            className="mono"
            style={{
              fontSize: "11px",
              color: "var(--text-secondary)",
              margin: "4px 0 0",
              letterSpacing: "0.05em",
            }}
          >
            tatiana torres · centrum pucp
          </p>
        </div>
        <ThemeSwitcher
          temaActivo={estado.temaActivo}
          onCambiar={(tema) => dispatch({ tipo: "setTemaManual", tema })}
        />
      </header>

      {estado.momento === 1 && (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <HeroCanvas temaActivo={estado.temaActivo} />
        </div>
      )}

      <main>
        {estado.momento === 1 && (
          <Momento01Proceso
            proceso={estado.proceso}
            onProcesoChange={(valor) => dispatch({ tipo: "setProceso", valor })}
            onSiguiente={() => dispatch({ tipo: "irA", momento: 2 })}
          />
        )}

        {estado.momento === 2 && (
          <Momento02Decision
            onElegir={(camino) => dispatch({ tipo: "elegirCamino", camino })}
            onAtras={() => dispatch({ tipo: "irA", momento: 1 })}
          />
        )}

        {estado.momento === 3 && estado.camino && (
          <Momento03Refinamiento
            camino={estado.camino}
            audiencia={estado.audiencia}
            decision={estado.decision}
            restriccionEtica={estado.restriccionEtica}
            estilo={estado.estilo}
            onAudienciaChange={(valor) => dispatch({ tipo: "setAudiencia", valor })}
            onDecisionChange={(valor) => dispatch({ tipo: "setDecision", valor })}
            onRestriccionChange={(valor) => dispatch({ tipo: "setRestriccion", valor })}
            onEstiloChange={(valor) => dispatch({ tipo: "setEstilo", valor })}
            onSiguiente={() => dispatch({ tipo: "irA", momento: 4 })}
            onAtras={() => dispatch({ tipo: "irA", momento: 2 })}
          />
        )}

        {estado.momento === 4 && estado.camino && (
          <Momento04Pieza
            estado={estado}
            camino={estado.camino}
            onAtras={() => dispatch({ tipo: "irA", momento: 3 })}
            onReiniciar={() => dispatch({ tipo: "reiniciar" })}
          />
        )}
      </main>

      <footer
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 1.5rem 2rem",
          borderTop: "1px solid var(--border)",
          marginTop: "3rem",
        }}
      >
        <p
          className="mono"
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            margin: 0,
            letterSpacing: "0.03em",
          }}
        >
          no estamos creando piezas bonitas. estamos haciendo visible una
          automatización antes de implementarla.
        </p>
      </footer>
    </div>
  );
}

export default App;