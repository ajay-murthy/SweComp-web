import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

export function CricketAnimation() {
  const [t, setT] = useState(0);
  const startRef = useRef(performance.now());

  useAnimationFrame(() => {
    const elapsed = (performance.now() - startRef.current) / 1000;
    setT((elapsed % 2.4) / 2.4); // 0..1 looping over 2.4s
  });

  // Ball follows a parabolic arc: starts at bat tip, flies up-right, lands
  const bx = 32 + t * 120;
  const by = 130 - Math.sin(t * Math.PI) * 90;

  // Bat rotates from address position to follow-through
  const batAngle = -35 + t * 95; // degrees

  // Shadow under ball (gets further from ball as ball rises)
  const shadowY = 138;
  const shadowOpacity = 0.08 + (1 - Math.sin(t * Math.PI)) * 0.07;
  const shadowScaleX = 0.4 + Math.sin(t * Math.PI) * 0.6;

  return (
    <svg
      viewBox="0 0 200 160"
      width="200"
      height="160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
      aria-hidden="true"
    >
      {/* Ground line */}
      <line x1="10" y1="140" x2="190" y2="140" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />

      {/* Motion trail (fades out behind ball) */}
      {[0.18, 0.12, 0.07, 0.04].map((alpha, i) => {
        const tt = Math.max(0, t - (i + 1) * 0.045);
        const tx = 32 + tt * 120;
        const ty = 130 - Math.sin(tt * Math.PI) * 90;
        return (
          <circle
            key={i}
            cx={tx}
            cy={ty}
            r={4 - i * 0.6}
            fill="currentColor"
            fillOpacity={alpha}
          />
        );
      })}

      {/* Shadow */}
      <ellipse
        cx={bx}
        cy={shadowY}
        rx={6 * shadowScaleX}
        ry={2}
        fill="currentColor"
        fillOpacity={shadowOpacity}
      />

      {/* Cricket ball */}
      <circle cx={bx} cy={by} r={5.5} fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      {/* Seam */}
      <path
        d={`M ${bx - 3},${by - 2} Q ${bx},${by + 3} ${bx + 3},${by - 2}`}
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* Bat — pivots from handle base */}
      <g transform={`translate(28, 138) rotate(${batAngle})`}>
        {/* Handle */}
        <rect x="-2" y="-52" width="4" height="18" rx="2" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" />
        {/* Grip wrap lines */}
        {[-50, -46, -42, -38].map((y) => (
          <line key={y} x1="-2" y1={y} x2="2" y2={y} stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" />
        ))}
        {/* Blade */}
        <rect x="-6" y="-34" width="12" height="34" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.5" />
        {/* Spine ridge */}
        <line x1="0" y1="-32" x2="0" y2="-2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
        {/* Edge detail */}
        <line x1="-6" y1="-32" x2="-6" y2="-2" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
        <line x1="6" y1="-32" x2="6" y2="-2" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      </g>

      {/* Batsman legs (simple sticks) */}
      <line x1="22" y1="138" x2="18" y2="112" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" strokeLinecap="round" />
      <line x1="30" y1="138" x2="34" y2="112" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" strokeLinecap="round" />
      {/* Body */}
      <line x1="26" y1="112" x2="26" y2="95" stroke="currentColor" strokeWidth="2" strokeOpacity="0.12" strokeLinecap="round" />
      {/* Head */}
      <circle cx="26" cy="90" r="5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" fill="currentColor" fillOpacity="0.05" />

      {/* Stumps */}
      {[155, 160, 165].map((x) => (
        <line key={x} x1={x} y1="140" x2={x} y2="116" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round" />
      ))}
      {/* Bails */}
      <line x1="153" y1="116" x2="158" y2="116" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="160" y1="116" x2="167" y2="116" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
    </svg>
  );
}
