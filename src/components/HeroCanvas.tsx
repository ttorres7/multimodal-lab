import { useEffect, useRef } from "react";
import type { IdTema } from "../lib/temas";

interface Props {
  temaActivo: IdTema;
}

function HeroCanvas({ temaActivo }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animacionRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const ESPACIADO = 28;
    const RADIO_BASE = 1.2;
    const RADIO_MAX = 3.5;
    const DISTANCIA_INFLUENCIA = 120;

    const ajustarTamano = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const obtenerColores = () => {
      const styles = getComputedStyle(canvas);
      const accent = styles.getPropertyValue("--accent").trim() || "#C8B580";
      const textSecondary = styles.getPropertyValue("--text-secondary").trim() || "#6B6A66";
      return { accent, textSecondary };
    };

    let colores = obtenerColores();

    const dibujar = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const cols = Math.floor(rect.width / ESPACIADO);
      const rows = Math.floor(rect.height / ESPACIADO);
      const offsetX = (rect.width - cols * ESPACIADO) / 2 + ESPACIADO / 2;
      const offsetY = (rect.height - rows * ESPACIADO) / 2 + ESPACIADO / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * ESPACIADO;
          const y = offsetY + j * ESPACIADO;

          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          let radio = RADIO_BASE;
          let color = colores.textSecondary;
          let opacidad = 0.35;

          if (distancia < DISTANCIA_INFLUENCIA) {
            const factor = 1 - distancia / DISTANCIA_INFLUENCIA;
            radio = RADIO_BASE + factor * (RADIO_MAX - RADIO_BASE);
            opacidad = 0.35 + factor * 0.65;
            if (factor > 0.5) {
              color = colores.accent;
            }
          }

          ctx.globalAlpha = opacidad;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, radio, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animacionRef.current = requestAnimationFrame(dibujar);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const onResize = () => {
      ajustarTamano();
      colores = obtenerColores();
    };

    ajustarTamano();
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    animacionRef.current = requestAnimationFrame(dibujar);

    return () => {
      if (animacionRef.current !== null) {
        cancelAnimationFrame(animacionRef.current);
      }
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [temaActivo]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "180px",
        display: "block",
      }}
      aria-hidden="true"
    />
  );
}

export default HeroCanvas;