import type { EstadoApp, CaminoMultimodal, TipoImagen } from "../types";

export interface PiezaGenerada {
  prompt: string;
  criterios: string[];
  escenariosUso: string[];
  herramienta: string;
}

const restriccionLinea = (restriccion: string): string =>
  restriccion.trim()
    ? `- Dato sensible que NO puede aparecer: ${restriccion.trim()}`
    : "- Si aparece cualquier dato personal real, anonimizar antes de mostrar.";

function construirEscenariosUso(estado: EstadoApp, camino: CaminoMultimodal): string[] {
  const audiencia = estado.audiencia || "tu audiencia";
  const decision = estado.decision || "tomar una decisión";

  if (camino === "imagen") {
    return [
      `**Antes de la reunión** · Envíala por correo a ${audiencia} 24 horas antes, sin texto largo. Solo: "Para la reunión del jueves. Cualquier duda la conversamos ahí."`,
      `**Durante la presentación** · Proyéctala como slide única en pantalla mientras explicas. No la pongas con bullets al lado — la imagen y tu voz son suficientes.`,
      `**Como ancla de la conversación** · Cuando ${audiencia} la vea, pregunta primero: "¿qué les llama la atención de esto?" antes de explicar. Lo que noten primero te dice cómo están leyendo el proceso.`,
      `**Lo que NO digas** · No expliques la imagen pieza por pieza. Si necesitas explicarla toda, la imagen no está funcionando — y la pregunta de ${audiencia} te lo va a mostrar.`,
    ];
  }

  if (camino === "video") {
    return [
      `**Como abre-reunión** · Reproduce el video de 30 segundos al inicio. Apaga la pantalla. Pregunta: "¿qué fue lo que más les llamó la atención?". Lo que digan te dice cómo están leyendo tu propuesta.`,
      `**Como pre-lectura asíncrona** · Envíalo a ${audiencia} 24 horas antes con un mensaje corto: "30 segundos. Esto es lo que les voy a proponer mañana." Sin más texto. La brevedad genera atención.`,
      `**Como respaldo, no como argumento** · El video plantea la decisión, tú la sostienes. Después de reproducirlo, no lo expliques. Pasa directo a "¿qué dudas tienen?". El silencio inicial vale.`,
      `**Lo que NO hagas** · No pongas el video adentro de un PowerPoint con bullets al lado. El avatar tiene que cargar el peso solo. Si necesitas bullets, el video no está funcionando — y eso te dice algo.`,
    ];
  }

  return [
    `**Como microlearning** · Envía el audio por WhatsApp o correo a ${audiencia}. Avisa que dura 90 segundos y se puede escuchar mientras manejan o caminan.`,
    `**Como simulación de práctica** · Si es un guion de llamada, úsalo en sesiones de role-play del equipo comercial o de servicio. El audio es la referencia, no el guion fijo.`,
    `**Como entrada a una conversación** · Reprodúcelo al inicio de una reunión de 30 minutos. La voz humana sintética genera atención de otro tipo que un texto leído.`,
    `**Lo que NO hagas** · No lo presentes como "audio generado por IA". Eso pone a ${audiencia} a evaluar la tecnología en lugar de ${decision}. Preséntalo como tu mensaje, en otro formato.`,
  ];
}

interface PlantillaImagen {
  descripcionVisual: string;
  criteriosEspecificos: string[];
  notaPedagogica: string;
}

function obtenerPlantillaImagen(tipo: TipoImagen): PlantillaImagen {
  if (tipo === "flujo") {
    return {
      descripcionVisual: `un DIAGRAMA DE FLUJO DE PROCESO que muestre cómo se mueve el trabajo paso a paso, de izquierda a derecha o de arriba abajo. Cada paso debe ser una caja o ícono claramente delimitado, conectado al siguiente con flechas. Marca explícitamente DÓNDE entra la IA y DÓNDE el humano supervisa, aprueba o decide. La supervisión humana NO puede ser un detalle pequeño — debe ser una caja del mismo tamaño que las demás. Composición horizontal o vertical, no circular ni abstracta.`,
      criteriosEspecificos: [
        "¿La secuencia de pasos se entiende sin necesidad de explicar?",
        "¿Las cajas de IA y de humano tienen el mismo peso visual?",
        "¿Las flechas dejan claro qué es entrada y qué es salida en cada paso?",
      ],
      notaPedagogica: "Esto es un flujo de proceso: lo lees como receta, paso por paso.",
    };
  }

  if (tipo === "antes_despues") {
    return {
      descripcionVisual: `una COMPARACIÓN VISUAL ANTES / DESPUÉS dividida en dos mitades claramente separadas. La mitad IZQUIERDA muestra el proceso ACTUAL (manual, lento, con cuellos de botella visibles, personas frustradas si aplica). La mitad DERECHA muestra el proceso CON IA (más fluido, con menos pasos, con la persona ahora en rol de supervisión y no de operación). Las dos mitades deben ser visualmente equivalentes (mismo estilo, misma escala) para que la comparación sea justa, no propagandística. Una línea vertical o un espacio en blanco las separa. Etiquetas mínimas: "Antes" / "Después" o "Hoy" / "Con IA".`,
      criteriosEspecificos: [
        "¿Las dos mitades son visualmente comparables (mismo estilo, misma escala)?",
        "¿El 'después' muestra al humano en otro rol, no eliminado?",
        "¿Se entiende qué cambió sin necesidad de explicar?",
      ],
      notaPedagogica: "Esto es un antes/después: lo usa quien necesita convencer del cambio.",
    };
  }

  if (tipo === "roles") {
    return {
      descripcionVisual: `un MAPA DE ROLES Y RESPONSABILIDADES tipo organigrama o tabla visual. Muestra de forma clara qué actor hace qué cosa: la IA, el operario, el supervisor, el aprobador final. Cada rol debe tener un ícono o avatar simple y una franja con sus tareas listadas en pocas palabras. La estructura puede ser una tabla de tres o cuatro columnas (un actor por columna) o un esquema RACI simplificado. Lo crítico: que se vea quién DECIDE, quién EJECUTA, quién SUPERVISA. Sin jerarquía dramática — todos los actores tienen presencia visual equilibrada.`,
      criteriosEspecificos: [
        "¿Se entiende quién DECIDE, quién EJECUTA y quién SUPERVISA sin ambigüedad?",
        "¿La IA aparece como un actor más, no como una caja externa flotante?",
        "¿Cada rol tiene tareas concretas, no genéricas tipo 'gestiona'?",
      ],
      notaPedagogica: "Esto es un mapa de roles: lo usa quien necesita responsabilidades sin ambigüedad.",
    };
  }

  if (tipo === "timeline") {
    return {
      descripcionVisual: `una LÍNEA DE TIEMPO HORIZONTAL DE IMPLEMENTACIÓN que muestre las fases de despliegue del proyecto en el tiempo. Eje horizontal: meses o sprints (Mes 1, Mes 2, Mes 3 o similar). Sobre la línea: hitos clave con un ícono o caja por hito (ej: "Piloto con un equipo", "Capacitación", "Despliegue completo", "Primera evaluación"). Debajo de cada hito, una línea de descripción muy breve. Los hitos donde el humano valida deben estar marcados con un ícono o color distintivo. Total: 4 a 6 hitos, no más. Composición limpia, sin sobrecargar la línea de tiempo con detalles.`,
      criteriosEspecificos: [
        "¿La línea de tiempo es realista o promete demasiado en poco tiempo?",
        "¿Los hitos de validación humana están marcados visualmente?",
        "¿Hay máximo 4-6 hitos o se siente sobrecargada?",
      ],
      notaPedagogica: "Esto es una línea de tiempo: lo usa quien necesita proyectar viabilidad.",
    };
  }

  return {
    descripcionVisual: `un DIAGRAMA DE IMPACTO Y MÉTRICAS que muestre, de forma visual, qué indicadores cambian con el proyecto y en qué orden. Estructura sugerida: 3 a 5 métricas clave (ej: tiempo de respuesta, costo operativo, satisfacción, errores, volumen procesado), cada una con un valor "antes" y un valor "después/objetivo". Puede ser una serie de tarjetas con números grandes, o un gráfico de barras horizontales con la diferencia destacada. Las flechas o íconos indican si la métrica sube o baja. Una etiqueta visual señala cuál métrica es la PRIMERA en moverse y cuál es la consecuencia. Sobrio, no sensacionalista.`,
    criteriosEspecificos: [
      "¿Las métricas son específicas y medibles, no genéricas tipo 'eficiencia'?",
      "¿Se entiende qué métrica se mueve primero y cuáles son consecuencia?",
      "¿Los números son realistas o suenan a promesa de vendedor?",
    ],
    notaPedagogica: "Esto es un diagrama de impacto: lo usa quien necesita defender el ROI.",
  };
}

const ETIQUETAS_TIPO: Record<TipoImagen, string> = {
  flujo: "Flujo de proceso",
  antes_despues: "Antes / Después",
  roles: "Mapa de roles",
  timeline: "Línea de tiempo de implementación",
  impacto: "Diagrama de impacto",
};

export function construirPromptImagen(estado: EstadoApp): PiezaGenerada {
  const { proceso, audiencia, decision, restriccionEtica, estilo, tipoImagen } = estado;

  const tipoActivo: TipoImagen = tipoImagen ?? "flujo";
  const plantilla = obtenerPlantillaImagen(tipoActivo);
  const etiquetaTipo = ETIQUETAS_TIPO[tipoActivo];

  const prompt = `[CONTEXTO]
Proceso real: ${proceso.trim()}
Audiencia: ${audiencia || "gerencia"}
Decisión que debe provocar: ${decision || "comprender el flujo"}
Tipo de imagen: ${etiquetaTipo}
Estilo visual: ${estilo || "minimalista ejecutivo"}

[PIEZA]
Genera ${plantilla.descripcionVisual}

Estilo visual general: ${estilo || "minimalista ejecutivo"}. La composición debe leerse en menos de 5 segundos.

[REGLAS]
${restriccionLinea(restriccionEtica)}
- Evita estética futurista genérica: nada de azul cyan brillante, hologramas, manos robóticas tocando pantallas, ni fondos abstractos tipo "red neuronal".
- Debe ser visible al menos un punto de supervisión humana.
- Composición clara y legible para proyección en sala de reunión.
- IDIOMA: cualquier texto, etiqueta, palabra o frase dentro de la imagen DEBE estar en ESPAÑOL. NO en inglés bajo ninguna circunstancia, ni siquiera palabras como "Approve", "Validate", "AI", "Process". Si necesitas etiquetas, usa "Aprobar", "Validar", "IA", "Proceso".
- Sin texto incrustado en la imagen, salvo etiquetas mínimas en español si son necesarias para la lectura visual.

[NOTA]
${plantilla.notaPedagogica}`;

  const criteriosBase = [
    "¿La imagen comunica el proceso sin necesidad de leer texto largo?",
    "¿La supervisión humana es visible y no quedó como mero detalle decorativo?",
    "¿Está libre del cliché visual de IA (azul cyan, hologramas, robots)?",
    "¿Todo el texto que aparece en la imagen está en español?",
    `¿Funciona como apoyo concreto para que ${audiencia || "la audiencia"} pueda ${decision || "tomar la decisión"}?`,
  ];

  const criterios = [...plantilla.criteriosEspecificos, ...criteriosBase];

  return {
    prompt,
    criterios,
    escenariosUso: construirEscenariosUso(estado, "imagen"),
    herramienta: "ChatGPT (GPT Image) o Gemini",
  };
}

export function construirPromptVideo(estado: EstadoApp): PiezaGenerada {
  const { proceso, audiencia, decision, restriccionEtica, estilo } = estado;

  const prompt = `[BRIEF PARA GOOGLE VIDS · MODO AVATAR · 30 SEGUNDOS]

Proceso real: ${proceso.trim()}
Audiencia: ${audiencia || "gerencia"}
Decisión que busco: ${decision || "aprobar la propuesta"}
Estilo: ${estilo || "corporativo sobrio"}
Idioma: español neutro latinoamericano

[CONTEXTO TÉCNICO IMPORTANTE]
Voy a usar el avatar IA de Google Vids hablando a cámara, sin clips Veo de fondo. Cada escena de avatar dura 8 segundos máximo. A velocidad natural de habla en español, 8 segundos = 18 a 22 palabras EXACTAS.

NO me des un guion continuo. Dame 4 bloques separados, uno por escena, cada uno entre 18-22 palabras. Si un bloque pasa de 22 palabras, recórtalo. La concisión es más importante que la elegancia.

[FORMATO DE SALIDA REQUERIDO]

═══════════════════════════════
ESCENA 1 · El problema actual (0:00-0:08)
═══════════════════════════════

GUION DEL AVATAR (18-22 palabras):
[texto exacto que dirá el avatar]

Conteo de palabras: [número exacto, verifica]

TEXTO EN PANTALLA (máximo 6 palabras, español):
[texto superpuesto durante esta escena]

═══════════════════════════════
ESCENA 2 · La intervención IA con supervisión humana (0:08-0:16)
═══════════════════════════════

GUION DEL AVATAR (18-22 palabras):
[debe mencionar EXPLÍCITAMENTE quién supervisa o aprueba — no asumirlo]

Conteo de palabras: [número exacto]

TEXTO EN PANTALLA (máximo 6 palabras, español):
[texto superpuesto]

═══════════════════════════════
ESCENA 3 · El resultado medible (0:16-0:24)
═══════════════════════════════

GUION DEL AVATAR (18-22 palabras):
[debe incluir una métrica concreta: tiempo, costo o calidad]

Conteo de palabras: [número exacto]

TEXTO EN PANTALLA (máximo 6 palabras, español):
[la métrica como número grande, ej: "De 3 días a 4 horas"]

═══════════════════════════════
ESCENA 4 · La decisión que pido (0:24-0:30)
═══════════════════════════════

GUION DEL AVATAR (18-22 palabras):
[debe terminar con la decisión específica que necesito de ${audiencia || "la audiencia"}]

Conteo de palabras: [número exacto]

TEXTO EN PANTALLA (máximo 6 palabras, español):
[la decisión como pregunta o frase corta]

═══════════════════════════════
CONFIGURACIÓN SUGERIDA DEL AVATAR EN GOOGLE VIDS
═══════════════════════════════

- Tipo de avatar (hombre/mujer, edad aprox, registro):
  [recomienda uno específico y justifica con 1 frase por qué encaja con la audiencia "${audiencia || "gerencia"}"]

- Vestimenta sugerida:
  [específica, sin estampados, color sólido, ej: "blusa azul marino, sin joyería visible" o "camisa celeste claro, sin corbata"]

- Fondo sugerido:
  [lugar concreto sobrio, ej: "oficina corporativa con ventanal desenfocado" o "fondo color neutro sólido beige"]

- Posición en cuadro: centro

[RESTRICCIONES GLOBALES]
${restriccionLinea(restriccionEtica)}
- Tono ejecutivo cercano. Sin "buenos días estimados", sin "muchas gracias por su atención", sin "el futuro es ahora", sin "transformación digital".
- Voz IA: voz adulta neutra latinoamericana. Sin acento exagerado.
- Texto en pantalla SIEMPRE en español, máximo 6 palabras.
- Narración SIEMPRE en español neutro latinoamericano.

ANTES DE ENTREGAR: verifica que cada guion tenga entre 18 y 22 palabras. Si alguno se pasa, recórtalo. Esto es crítico para que el video funcione en Google Vids.`;

  const criterios = [
    "¿Cada bloque de avatar tiene entre 18 y 22 palabras (no más)?",
    "¿La supervisión humana se nombra explícitamente en la escena 2?",
    "¿La escena 3 tiene una métrica concreta (no genérica)?",
    "¿La escena 4 termina pidiendo una decisión específica, no agradeciendo?",
    "¿Todo el texto en pantalla y la narración están en español?",
    `¿${audiencia || "Tu audiencia"} podría ${decision || "tomar la decisión"} con solo este video, sin más contexto?`,
  ];

  return {
    prompt,
    criterios,
    escenariosUso: construirEscenariosUso(estado, "video"),
    herramienta: "Google Vids (modo avatar IA)",
  };
}

export function construirPromptVoz(estado: EstadoApp): PiezaGenerada {
  const { proceso, audiencia, decision, restriccionEtica, estilo } = estado;

  const guion = construirGuionVoz(estado);

  const prompt = `[INSTRUCCIONES PARA TI · NO PEGAR EN ELEVENLABS]

ElevenLabs es un sintetizador de voz. Si pegas todo este bloque, la voz va a leer en voz alta hasta los corchetes y los títulos. Por eso hay dos partes:

PARTE 1 · CONFIGURACIÓN — la haces a mano en el dashboard de ElevenLabs antes de pegar nada.
PARTE 2 · TEXTO A SINTETIZAR — esto sí lo pegas en el campo de texto.

═══════════════════════════════
PARTE 1 · CONFIGURACIÓN MANUAL EN ELEVENLABS
═══════════════════════════════

- Voice (elige en la librería): voz adulta neutra en español latinoamericano, ${estilo || "tono ejecutivo cercano"}.
  Para audiencia "${audiencia || "gerencia"}", prefiere una voz que se sienta cercana, no de locutor de comercial.
- Model: Eleven Multilingual v2
- Stability: alrededor de 50% (centro)
- Similarity: alrededor de 75%
- Style exaggeration: 0% (sin énfasis dramático)
- Speaker boost: activado

═══════════════════════════════
PARTE 2 · TEXTO A SINTETIZAR
═══════════════════════════════

(Copia y pega SOLO el texto que está entre las líneas dobles abajo. Las marcas <break time="..."/> son sintaxis de ElevenLabs y se respetan literales.)

────────────────────────────────

${guion}

────────────────────────────────

═══════════════════════════════
NOTAS PARA TI ANTES DE GENERAR
═══════════════════════════════

Contexto del mensaje (no se sintetiza, solo te ayuda a juzgar el resultado):
- Proceso: ${proceso.trim()}
- Audiencia que escucha: ${audiencia || "gerencia"}
- Decisión que se busca: ${decision || "tomar acción"}

${restriccionLinea(restriccionEtica)}

Después de generar:
- Escucha el audio una vez con audífonos
- Si una palabra clave (números, nombres, métricas) suena rara, edita el texto con la palabra escrita en letras: "doce" en vez de "12", "cuarenta por ciento" en vez de "40%"
- Si una pausa quedó muy corta o muy larga, ajusta el tiempo del <break time="..."/>`;

  const criterios = [
    "¿La voz suena humana o se nota la síntesis IA en alguna palabra clave?",
    "¿Las pausas respetan el sentido del texto o cortan ideas?",
    "¿El tono se mantiene parejo o tiene picos artificiales?",
    "¿La pronunciación es claramente latinoamericana, sin sonar a doblaje ibérico?",
    "¿Los números y porcentajes se entienden bien o conviene escribirlos en letras?",
    `¿${audiencia || "Tu audiencia"} entendería el mensaje completo sin verlo escrito?`,
  ];

  return {
    prompt,
    criterios,
    escenariosUso: construirEscenariosUso(estado, "voz"),
    herramienta: "ElevenLabs (Text to Speech)",
  };
}

function construirGuionVoz(estado: EstadoApp): string {
  const { proceso, audiencia, decision } = estado;
  const procesoLimpio = proceso.trim();

  const esPlural =
    audiencia !== "gerencia" &&
    audiencia !== "comité directivo" &&
    audiencia !== "";

  const verContarles = esPlural ? "contarles" : "contarte";
  const traer = "traer";
  const proponer = esPlural ? "Les propongo" : "Te propongo";
  const pronombreObjeto = esPlural ? "les" : "te";

  const cierreDecision = (() => {
    if (!decision) return "Necesito una decisión hoy.";
    const d = decision.toLowerCase();
    if (d.includes("aprobar"))
      return esPlural
        ? "Necesito que aprueben esta propuesta."
        : "Necesito que apruebes esta propuesta.";
    if (d.includes("entender"))
      return esPlural
        ? "Necesito que entiendan el cambio antes de la próxima reunión."
        : "Necesito que entiendas el cambio antes de la próxima reunión.";
    if (d.includes("comprar"))
      return esPlural
        ? "Necesito que consideren esta solución."
        : "Necesito que consideres esta solución.";
    if (d.includes("capacitar"))
      return esPlural
        ? "Necesito que se sumen a la próxima sesión."
        : "Necesito que te sumes a la próxima sesión.";
    if (d.includes("vender"))
      return esPlural
        ? "Necesito que apoyen esta propuesta dentro del equipo."
        : "Necesito que apoyes esta propuesta dentro del equipo.";
    return esPlural
      ? "Necesito que tomen una decisión hoy."
      : "Necesito que tomes una decisión hoy.";
  })();

  return `Hoy quiero ${verContarles} algo concreto sobre cómo trabajamos.

<break time="0.6s"/>

${procesoLimpio}

<break time="0.8s"/>

La pregunta que ${pronombreObjeto} quiero ${traer} no es si la inteligencia artificial puede ayudar. Es dónde queda la supervisión humana cuando la IA entra al proceso.

<break time="0.6s"/>

${proponer} que veamos juntos un punto específico, lo decidamos, y avancemos. ${cierreDecision}`;
}

export function construirPieza(
  estado: EstadoApp,
  camino: CaminoMultimodal,
): PiezaGenerada {
  switch (camino) {
    case "imagen":
      return construirPromptImagen(estado);
    case "video":
      return construirPromptVideo(estado);
    case "voz":
      return construirPromptVoz(estado);
  }
}

export function construirGuiaCompleta(
  estado: EstadoApp,
  pieza: PiezaGenerada,
): string {
  const partes: string[] = [];

  partes.push(`# Guía completa de la pieza`);
  partes.push(``);
  partes.push(`## Contexto que diseñé`);
  partes.push(``);
  partes.push(`**Proceso real:** ${estado.proceso.trim()}`);
  partes.push(``);
  partes.push(`**Camino elegido:** ${estado.camino}`);
  if (estado.camino === "imagen" && estado.tipoImagen) {
    partes.push(`**Tipo de imagen:** ${ETIQUETAS_TIPO[estado.tipoImagen]}`);
  }
  partes.push(`**Audiencia:** ${estado.audiencia || "no definida"}`);
  partes.push(`**Decisión que busco provocar:** ${estado.decision || "no definida"}`);
  partes.push(`**Restricción ética:** ${estado.restriccionEtica.trim() || "no definida"}`);
  partes.push(`**Estilo:** ${estado.estilo || "no definido"}`);
  partes.push(``);
  partes.push(`**Herramienta sugerida:** ${pieza.herramienta}`);
  partes.push(``);
  partes.push(`## Prompt para pegar`);
  partes.push(``);
  partes.push("```");
  partes.push(pieza.prompt);
  partes.push("```");
  partes.push(``);
  partes.push(`## Cómo evaluar la salida`);
  partes.push(``);
  pieza.criterios.forEach((c, i) => {
    partes.push(`${i + 1}. ${c}`);
  });
  partes.push(``);
  partes.push(`## Cómo usarla en tu contexto`);
  partes.push(``);
  pieza.escenariosUso.forEach((e) => {
    partes.push(`- ${e}`);
  });
  partes.push(``);
  partes.push(`---`);
  partes.push(`Generado en multimodal.lab — Tatiana Torres Zapata · CENTRUM PUCP`);

  return partes.join("\n");
}