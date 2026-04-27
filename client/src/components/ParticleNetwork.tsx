import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 145;
    const MOUSE_REPEL_DIST = 125;

    const getSize = () => ({
      w: canvas.parentElement?.clientWidth || window.innerWidth,
      h: canvas.parentElement?.clientHeight || Math.round(window.innerHeight * 0.9),
    });

    const resize = () => {
      const { w, h } = getSize();
      canvas.width = w;
      canvas.height = h;
    };

    const initParticles = () => {
      const w = canvas.width || window.innerWidth;
      const h = canvas.height || Math.round(window.innerHeight * 0.9);
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2 + 1.2,
        baseOpacity: Math.random() * 0.35 + 0.4,
      }));
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      // Update particles
      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = ((MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST) * 0.14;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) {
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONNECTION_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(10, 10, 10, ${alpha * 0.5})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearMouse = dist < MOUSE_REPEL_DIST;
        const opacity = nearMouse ? Math.min(p.baseOpacity + 0.35, 1) : p.baseOpacity;
        const r = nearMouse ? p.radius * 2 : p.radius;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 10, 10, ${opacity * 0.55})`;
        ctx.fill();
      }

      // Mouse glow
      if (mx > 0 && mx < w && my > 0 && my < h) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_REPEL_DIST * 1.3);
        g.addColorStop(0, "rgba(255, 229, 82, 0.35)");
        g.addColorStop(1, "rgba(255, 229, 82, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_REPEL_DIST * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const onResize = () => {
      resize();
    };

    // Use rAF to ensure layout is complete before reading dimensions
    requestAnimationFrame(() => {
      resize();
      initParticles();
      draw();
    });

    window.addEventListener("resize", onResize);
    // Capture mouse on the whole section, not just canvas
    const section = canvas.parentElement;
    section?.addEventListener("mousemove", onMouseMove as EventListener);
    section?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
      section?.removeEventListener("mousemove", onMouseMove as EventListener);
      section?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
