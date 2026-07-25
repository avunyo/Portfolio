import { useEffect, useRef } from "react";

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 340;
    let height = canvas.height = canvas.parentElement?.clientHeight || 420;

    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };
    
    // Resize handler
    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 340;
      height = canvas.height = canvas.parentElement?.clientHeight || 420;
    };
    window.addEventListener("resize", resize);

    // Track mouse over canvas
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.tx = width / 2;
      mouse.ty = height / 2;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // Define generative nodes
    const nodesCount = 28;
    const points: { x: number; y: number; originX: number; originY: number; angle: number; speed: number; radius: number }[] = [];

    for (let i = 0; i < nodesCount; i++) {
      const ratio = i / nodesCount;
      const radius = 40 + ratio * 110;
      const angle = ratio * Math.PI * 2;
      points.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        originX: width / 2 + Math.cos(angle) * radius,
        originY: height / 2 + Math.sin(angle) * radius,
        angle: angle,
        speed: 0.005 + Math.random() * 0.01,
        radius: radius
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(45, 10, 16, 0.15)"; // Soft wine trail
      ctx.fillRect(0, 0, width, height);

      // Damp mouse coordinates
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      // Draw aesthetic background grid
      ctx.strokeStyle = "rgba(139, 26, 43, 0.12)";
      ctx.lineWidth = 0.5;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw vector lines reacting to pointer
      ctx.strokeStyle = "rgba(168, 34, 58, 0.45)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      points.forEach((p, index) => {
        p.angle += p.speed;
        
        // Circular orbit
        p.originX = width / 2 + Math.cos(p.angle) * p.radius;
        p.originY = height / 2 + Math.sin(p.angle) * p.radius;

        // Attract toward mouse coordinates
        const dx = mouse.x - p.originX;
        const dy = mouse.y - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, (200 - dist) / 200);

        p.x = p.originX + (dx / dist) * force * 45;
        p.y = p.originY + (dy / dist) * force * 45;

        if (index === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      });
      ctx.closePath();
      ctx.stroke();

      // Draw secondary connection rays
      ctx.strokeStyle = "rgba(245, 232, 224, 0.04)";
      points.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        
        // draw tiny nodes
        ctx.fillStyle = "rgba(168, 34, 58, 0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw interactive center aura
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 2, mouse.x, mouse.y, 75);
      grad.addColorStop(0, "rgba(168, 34, 58, 0.3)");
      grad.addColorStop(0.5, "rgba(92, 15, 26, 0.1)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 75, 0, Math.PI * 2);
      ctx.fill();

      // Intersecting target hair
      ctx.strokeStyle = "rgba(245, 232, 224, 0.45)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(mouse.x - 12, mouse.y);
      ctx.lineTo(mouse.x + 12, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - 12);
      ctx.lineTo(mouse.x, mouse.y + 12);
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover select-none"
    />
  );
}
