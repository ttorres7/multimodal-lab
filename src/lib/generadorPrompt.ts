import type { EstadoApp, CaminoMultimodal } from "../types";

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

export function construirPromptImagen(estado: EstadoApp): PiezaGenerada {
  const { proceso, audiencia, decision, restriccionEtica, estilo } = estado;

  const prompt = `[CONTEXTO]
Proceso real: ${proceso.trim()}
Audiencia: ${audiencia || "gerencia"}
Decisión que debe provocar: ${decision || "comprender el flujo"}

[PIEZA]
Genera una imagen ${estilo || "minimalista ejecutiva"} que muestre el proceso descrito, con énfasis en el punto donde la IA y el humano colaboran. La composición debe leerse en menos de 5 segundos.

[REGLAS]
${restriccionLinea(restriccionEtica)}
- Evita estética futurista genérica: nada de azul cyan brillante, hologramas, manos robóticas tocando pantallas, ni fondos abstractos tipo "red neuronal".
- Debe ser visible al menos un punto de supervisión humana (una persona revisando, aprobando o validando).
- Composición clara y legible para proyección en sala de reunión.
- IDIOMA: cualquier texto, etiqueta, palabra o frase dentro de la imagen DEBE estar en ESPAÑOL. NO en inglés bajo ninguna circunstancia, ni siquiera palabras como "Approve", "Validate", "AI", "Process". Si necesitas etiquetas, usa "Aprobar", "Validar", "IA", "Proceso".
- Sin texto incrustado en la imagen, salvo etiquetas mínimas en español si son necesarias para la lectura del flujo.`;

  const criterios = [
    "¿La imagen comunica el proceso sin necesidad de leer texto largo?",
    "¿La supervisión humana es visible y no quedó como mero detalle decorativo?",
    "¿Está libre del cliché visual de IA (azul cyan, hologramas, robots)?",
    "¿Todo el texto que aparece en la imagen está en español?",
    `¿Funciona como apoyo concreto para que ${audiencia || "la audiencia"} pueda ${decision || "tomar la decisión"}?`,
    "¿Qué cambiarías si tuvieras que mostrarla a alguien fuera de tu industria?",
  ];

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

  const prompt = `[GUION PARA ELEVENLABS]

Voz sugerida: voz adulta neutra en ESPAÑOL latinoamericano, ${estilo || "tono ejecutivo cercano"}
Estilo de entrega: pausada, articulada, sin énfasis exagerado

[CONTEXTO PARA QUIEN GENERA]
Proceso: ${proceso.trim()}
Audiencia que escucha: ${audiencia || "gerencia"}
Decisión que se busca: ${decision || "tomar acción"}

[TEXTO A SINTETIZAR]

${construirGuionVoz(estado)}

[DIRECCIÓN DE INTERPRETACIÓN]
${restriccionLinea(restriccionEtica)}
- Tono profesional pero humano. Nada de voz robótica ni de locutor de comercial.
- Pausas naturales entre ideas. No leer corrido.
- Sin énfasis exagerado en palabras clave. La pausa hace el énfasis.
- Velocidad media, ligeramente más lenta de lo natural para audiencias que escuchan en segundo plano.
- IDIOMA: ESPAÑOL neutro latinoamericano. NO inglés ni español ibérico (sin "vosotros", sin "z" pronunciada como "th").`;

  const criterios = [
    "¿La voz suena humana o se nota la síntesis IA en alguna palabra clave?",
    "¿Las pausas respetan el sentido del texto o cortan ideas?",
    "¿El tono se mantiene parejo o tiene picos artificiales?",
    "¿La pronunciación es claramente latinoamericana, sin sonar a doblaje ibérico?",
    "¿Funciona si alguien lo escucha mientras hace otra cosa, o requiere atención total?",
    `¿${audiencia || "Tu audiencia"} entendería el mensaje completo sin verlo escrito?`,
  ];

  return {
    prompt,
    criterios,
    escenariosUso: construirEscenariosUso(estado, "voz"),
    herramienta: "ElevenLabs",
  };
}

function construirGuionVoz(estado: EstadoApp): string {
  const { proceso, decision } = estado;
  const procesoLimpio = proceso.trim();

  return `Hoy quiero contarte algo concreto sobre cómo trabajamos.

<break time="0.6s"/>

${procesoLimpio}

<break time="0.8s"/>

La pregunta que te traigo no es si la IA puede ayudar. Es dónde queda la supervisión humana cuando la IA entra al proceso.

<break time="0.6s"/>

Te propongo que veamos juntos un punto específico, lo decidamos, y avancemos. ${decision ? `Necesito que ${decision.toLowerCase()}.` : "Necesito una decisión hoy."}`;
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