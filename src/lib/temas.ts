export type IdTema = "graphite" | "solar" | "tide" | "ember";

export interface Tema {
  id: IdTema;
  nombre: string;
  descripcion: string;
  cuando: string;
  colores: {
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    border: string;
  };
}

export const TEMAS: Record<IdTema, Tema> = {
  graphite: {
    id: "graphite",
    nombre: "graphite",
    descripcion: "página en blanco. terminal limpia.",
    cuando: "default",
    colores: {
      background: "#0F1012",
      surface: "#1A1B1E",
      textPrimary: "#E8E6E1",
      textSecondary: "#6B6A66",
      accent: "#C8B580",
      border: "#2A2A2C",
    },
  },
  solar: {
    id: "solar",
    nombre: "solar",
    descripcion: "luz cálida. la imagen como descubrimiento.",
    cuando: "camino imagen",
    colores: {
      background: "#F4EDDC",
      surface: "#FBF7EC",
      textPrimary: "#1F1B12",
      textSecondary: "#7A6F4E",
      accent: "#E8B62C",
      border: "#D4C9A8",
    },
  },
  tide: {
    id: "tide",
    nombre: "tide",
    descripcion: "profundidad. movimiento. tiempo que pasa.",
    cuando: "camino video",
    colores: {
      background: "#0F1228",
      surface: "#1A1E3D",
      textPrimary: "#DCDDF0",
      textSecondary: "#6E70A0",
      accent: "#5DD3E0",
      border: "#2A2D52",
    },
  },
  ember: {
    id: "ember",
    nombre: "ember",
    descripcion: "brasa. calidez de voz humana.",
    cuando: "camino voz",
    colores: {
      background: "#1C1010",
      surface: "#2B1A18",
      textPrimary: "#F0DDD2",
      textSecondary: "#A47866",
      accent: "#E86A3A",
      border: "#3A2522",
    },
  },
};

export const TEMA_DEFAULT: IdTema = "graphite";