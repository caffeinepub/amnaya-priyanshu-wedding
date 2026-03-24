import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  type: "heart" | "sparkle";
}

export default function FlyingCompanion() {
  const posRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const targetRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const animFrameRef = useRef<number>(0);
  const lastParticleTimeRef = useRef(0);
  const particleIdRef = useRef(0);
  const isMobileRef = useRef(false);

  const mobileTimeRef = useRef(0);

  const [pos, setPos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [flipped, setFlipped] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    isMobileRef.current = window.matchMedia("(pointer: coarse)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    if (!isMobileRef.current) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    let prevX = posRef.current.x;

    const tick = (now: number) => {
      if (isMobileRef.current) {
        // Figure-8 auto pattern
        mobileTimeRef.current += 0.008;
        const t = mobileTimeRef.current;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const rx = window.innerWidth * 0.3;
        const ry = window.innerHeight * 0.2;
        targetRef.current = {
          x: cx + rx * Math.sin(t),
          y: cy + ry * Math.sin(t * 2),
        };
      }

      const lerp = 0.06;
      const newX =
        posRef.current.x + (targetRef.current.x - posRef.current.x) * lerp;
      const newY =
        posRef.current.y + (targetRef.current.y - posRef.current.y) * lerp;
      posRef.current = { x: newX, y: newY };

      setFlipped(newX < prevX);
      prevX = newX;

      setPos({ x: newX, y: newY });

      // Spawn particles
      const dx = Math.abs(newX - posRef.current.x);
      const dy = Math.abs(newY - posRef.current.y);
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (now - lastParticleTimeRef.current > 120 || speed > 1) {
        if (now - lastParticleTimeRef.current > 150) {
          lastParticleTimeRef.current = now;
          const id = particleIdRef.current++;
          const pType = Math.random() > 0.5 ? "heart" : "sparkle";
          setParticles((prev) => [
            ...prev.slice(-12),
            {
              id,
              x: newX,
              y: newY,
              opacity: 1,
              scale: 0.8 + Math.random() * 0.5,
              type: pType,
            },
          ]);
          setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== id));
          }, 800);
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x - 8,
            top: p.y - 8,
            zIndex: 9998,
            pointerEvents: "none",
            fontSize: "14px",
            transform: `scale(${p.scale})`,
            animation: "companion-particle-fade 0.8s ease-out forwards",
          }}
        >
          {p.type === "heart" ? "💗" : "✨"}
        </div>
      ))}

      {/* Butterfly / Dove companion */}
      <div
        style={{
          position: "fixed",
          left: pos.x - 20,
          top: pos.y - 20,
          zIndex: 9999,
          pointerEvents: "none",
          transform: `scaleX(${flipped ? -1 : 1})`,
          transition: "transform 0.2s",
          filter: "drop-shadow(0 0 6px rgba(200,150,255,0.7))",
        }}
      >
        <svg
          aria-label="Flying butterfly companion"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "butterfly-flap 0.45s ease-in-out infinite alternate",
          }}
        >
          <title>Flying butterfly companion</title>
          {/* Left upper wing */}
          <ellipse
            cx="13"
            cy="14"
            rx="12"
            ry="9"
            fill="rgba(220,180,255,0.85)"
            stroke="rgba(180,100,240,0.9)"
            strokeWidth="0.8"
            style={{
              transformOrigin: "20px 20px",
              animation: "wing-left 0.45s ease-in-out infinite alternate",
            }}
          />
          {/* Right upper wing */}
          <ellipse
            cx="27"
            cy="14"
            rx="12"
            ry="9"
            fill="rgba(220,180,255,0.85)"
            stroke="rgba(180,100,240,0.9)"
            strokeWidth="0.8"
            style={{
              transformOrigin: "20px 20px",
              animation: "wing-right 0.45s ease-in-out infinite alternate",
            }}
          />
          {/* Left lower wing */}
          <ellipse
            cx="12"
            cy="26"
            rx="9"
            ry="7"
            fill="rgba(255,180,230,0.75)"
            stroke="rgba(200,80,180,0.8)"
            strokeWidth="0.8"
          />
          {/* Right lower wing */}
          <ellipse
            cx="28"
            cy="26"
            rx="9"
            ry="7"
            fill="rgba(255,180,230,0.75)"
            stroke="rgba(200,80,180,0.8)"
            strokeWidth="0.8"
          />
          {/* Body */}
          <ellipse cx="20" cy="21" rx="2.5" ry="8" fill="rgba(60,0,80,0.9)" />
          {/* Head */}
          <circle cx="20" cy="12" r="2.5" fill="rgba(60,0,80,0.9)" />
          {/* Antennae */}
          <line
            x1="19"
            y1="10"
            x2="15"
            y2="5"
            stroke="rgba(60,0,80,0.8)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <line
            x1="21"
            y1="10"
            x2="25"
            y2="5"
            stroke="rgba(60,0,80,0.8)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="15" cy="5" r="1.2" fill="rgba(200,100,255,0.9)" />
          <circle cx="25" cy="5" r="1.2" fill="rgba(200,100,255,0.9)" />
          {/* Wing pattern dots */}
          <circle cx="13" cy="14" r="2" fill="rgba(180,80,240,0.4)" />
          <circle cx="27" cy="14" r="2" fill="rgba(180,80,240,0.4)" />
        </svg>
      </div>

      <style>{`
        @keyframes butterfly-flap {
          0% { transform: scaleY(1) translateY(0px); }
          100% { transform: scaleY(0.85) translateY(2px); }
        }
        @keyframes wing-left {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(40deg); }
        }
        @keyframes wing-right {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-40deg); }
        }
        @keyframes companion-particle-fade {
          0% { opacity: 1; transform: scale(1) translateY(0px); }
          100% { opacity: 0; transform: scale(0.3) translateY(-20px); }
        }
      `}</style>
    </>
  );
}
