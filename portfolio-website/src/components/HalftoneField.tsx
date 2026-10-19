import { useEffect, useRef } from "react";

export default function HalftoneField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !context || !host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrame = 0;
    let startedAt = performance.now();

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (reduceMotion.matches) draw(performance.now());
    };

    const draw = (time: number) => {
      if (!width || !height) return;
      if (!reduceMotion.matches && time - lastFrame < 32) return;

      lastFrame = time;
      pointer.x += (pointer.targetX - pointer.x) * 0.075;
      pointer.y += (pointer.targetY - pointer.y) * 0.075;
      context.clearRect(0, 0, width, height);

      const centerX = width * (width < 640 ? 0.76 : 0.73);
      const centerY = height * 0.48;
      const spacing = width < 640 ? 17 : 19;
      const radius = Math.min(width * 0.38, height * 0.48, 320);
      const pointerActive = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;
      const elapsed = (time - startedAt) * 0.001;

      for (let y = centerY - radius; y <= centerY + radius; y += spacing) {
        for (let x = centerX - radius; x <= centerX + radius; x += spacing) {
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.hypot(dx, dy);
          if (distance > radius) continue;

          const intensity = Math.max(0, 1 - distance / radius);
          const mouseDistance = pointerActive ? Math.hypot(x - pointer.x, y - pointer.y) : radius;
          const influence = pointerActive ? Math.max(0, 1 - mouseDistance / 220) : 0;
          const pulse = Math.sin(elapsed * 1.3 - distance * 0.012) * 0.5 + 0.5;
          const pointRadius = 0.7 + intensity * 1.25 + influence * 0.55;
          const alpha = 0.1 + intensity * 0.38 + influence * 0.34 + pulse * intensity * 0.13;

          context.beginPath();
          context.arc(x, y, pointRadius, 0, Math.PI * 2);
          if ((Math.floor(x / spacing) + Math.floor(y / spacing)) % 7 === 0 && intensity > 0.32) {
            context.fillStyle = `rgba(232, 91, 112, ${alpha})`;
            context.fill();
          } else {
            context.strokeStyle = `rgba(232, 91, 112, ${alpha})`;
            context.lineWidth = 0.85;
            context.stroke();
          }
        }
      }

    };

    const animate = (time: number) => {
      draw(time);
      if (!reduceMotion.matches) frameId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = event.clientX - bounds.left;
      pointer.targetY = event.clientY - bounds.top;
      if (reduceMotion.matches) draw(performance.now());
    };

    const handlePointerLeave = () => {
      pointer.targetX = -1000;
      pointer.targetY = -1000;
      if (reduceMotion.matches) draw(performance.now());
    };

    const handleMotionPreference = () => {
      cancelAnimationFrame(frameId);
      startedAt = performance.now();
      if (reduceMotion.matches) draw(performance.now());
      else frameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", handlePointerLeave);
    reduceMotion.addEventListener("change", handleMotionPreference);
    resize();
    if (!reduceMotion.matches) frameId = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
      reduceMotion.removeEventListener("change", handleMotionPreference);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-halftone" aria-hidden="true" />;
}
