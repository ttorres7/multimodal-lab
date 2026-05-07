import type { IdTema } from "./lib/temas";

export type CaminoMultimodal = "imagen" | "video" | "voz";

export type TipoImagen = "flujo" | "antes_despues" | "roles" | "timeline" | "impacto";

export type NumeroMomento = 1 | 2 | 3 | 4;

export interface EstadoApp {
  momento: NumeroMomento;
  proceso: string;
  camino: CaminoMultimodal | null;
  audiencia: string;
  decision: string;
  restriccionEtica: string;
  estilo: string;
  tipoImagen: TipoImagen | null;
  temaActivo: IdTema;
  temaManual: boolean;
}

export interface Caso {
  id: string;
  sector: string;
  titulo: string;
  proceso: string;
}

export const ESTADO_INICIAL: EstadoApp = {
  momento: 1,
  proceso: "",
  camino: null,
  audiencia: "",
  decision: "",
  restriccionEtica: "",
  estilo: "",
  tipoImagen: null,
  temaActivo: "graphite",
  temaManual: false,
};