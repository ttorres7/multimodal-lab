import type { Caso } from "../types";

export const CASOS_AULA: Caso[] = [
  {
    id: "mineria-social",
    sector: "Minería",
    titulo: "Gestión social",
    proceso:
      "Recibimos cerca de 200 consultas y reclamos al mes de comunidades cercanas a la operación minera. Hoy un analista los clasifica a mano, demora hasta 3 días en derivarlos al área correspondiente y a veces se pierden en correo. Queremos automatizar la clasificación y el seguimiento sin perder la sensibilidad de la relación con comunidad.",
  },
  {
    id: "mineria-operaciones",
    sector: "Minería",
    titulo: "Operaciones",
    proceso:
      "El reporte diario de incidentes de seguridad operacional se llena en planillas físicas, se digita después en un Excel y se envía por correo al supervisor. Queremos que los operarios reporten desde campo y que un sistema clasifique severidad antes de que llegue a gerencia.",
  },
  {
    id: "banco-procesos",
    sector: "Banco / Seguros",
    titulo: "Procesos críticos",
    proceso:
      "Tenemos un proceso de aprobación de pólizas de salud que pasa por 4 áreas y demora 5 días hábiles. Cada paso es manual y requiere validación humana. Queremos identificar dónde se puede intervenir con IA sin perder el control regulatorio.",
  },
  {
    id: "retail-abastecimiento",
    sector: "Retail / Logística",
    titulo: "Abastecimiento",
    proceso:
      "El equipo de compras revisa cada día el stock en 80 tiendas y decide qué reabastecer manualmente, basándose en la experiencia del comprador. Queremos un agente que sugiera órdenes de compra y que el comprador apruebe o rechace, no que decida solo.",
  },
  {
    id: "comercial-cyber",
    sector: "Comercial B2B",
    titulo: "Ciberseguridad",
    proceso:
      "Como ejecutivo comercial de Bitdefender necesito explicarle a un comité directivo de un banco por qué deberían cambiar su solución actual de endpoint protection. Tengo 15 minutos y compiten contra mí dos marcas con relaciones existentes.",
  },
  {
    id: "agilidad-procesos",
    sector: "Agilidad / Procesos",
    titulo: "Reducción de operatividad",
    proceso:
      "Mi equipo de 12 personas pasa el 40% del tiempo en tareas repetitivas: actualizar tableros, copiar datos entre sistemas, generar reportes. Queremos identificar qué automatizar primero y cómo justificarlo ante finanzas.",
  },
  {
    id: "educacion-tutores",
    sector: "Educación universitaria",
    titulo: "Tutores virtuales",
    proceso:
      "Queremos implementar un tutor virtual de IA para estudiantes de primer ciclo en cursos de matemáticas. Hoy los profesores reciben las mismas 30 preguntas básicas todas las semanas. El tutor debe responder dudas conceptuales sin reemplazar al profesor.",
  },
  {
    id: "empresa-unipersonal",
    sector: "Empresa unipersonal con IA",
    titulo: "Diseño operativo",
    proceso:
      "Estoy diseñando una empresa de consultoría unipersonal donde yo soy la única persona y la IA hace todo lo operativo: propuestas, facturación, seguimiento, contenido en redes. Necesito decidir qué procesos automatizar primero sin perder la voz humana frente al cliente.",
  },
];