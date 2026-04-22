import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function MachineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"],
  });

  const coreScale = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const topPartY = useTransform(scrollYProgress, [0, 0.35], [-120, 0]);
  const topPartOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  const bottomPartY = useTransform(scrollYProgress, [0.1, 0.45], [120, 0]);
  const bottomPartOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  const leftPartX = useTransform(scrollYProgress, [0.2, 0.55], [-120, 0]);
  const leftPartOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

  const rightPartX = useTransform(scrollYProgress, [0.3, 0.65], [120, 0]);
  const rightPartOpacity = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);

  const outerRingDash = useTransform(scrollYProgress, [0.4, 0.85], [940, 0]);
  const innerRingOpacity = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);

  const strokeColor = "hsl(220 15% 10%)";
  const strokeLight = "hsl(220 13% 78%)";
  const fillCard = "hsl(0 0% 100%)";

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] mx-auto aspect-square flex items-center justify-center"
    >
      <svg viewBox="0 0 800 800" className="w-full h-full" fill="none">

        {/* Outer tracing ring */}
        <motion.circle
          cx="400" cy="400" r="350"
          stroke={strokeLight}
          strokeWidth="1"
          strokeDasharray="940"
          style={{ strokeDashoffset: outerRingDash }}
        />

        {/* Inner details ring */}
        <motion.circle
          cx="400" cy="400" r="300"
          stroke={strokeLight}
          strokeWidth="1"
          strokeDasharray="6 10"
          style={{ opacity: innerRingOpacity }}
        />

        {/* Core assembly */}
        <motion.g style={{ scale: coreScale, opacity: coreOpacity }} className="origin-center" transform="translate(400,400) scale(1) translate(-400,-400)">
          {/* Central hub */}
          <rect x="360" y="360" width="80" height="80" fill={fillCard} stroke={strokeColor} strokeWidth="2" />
          <circle cx="400" cy="400" r="20" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="400" cy="400" r="5" fill={strokeColor} />
          {/* Cross connectors */}
          <line x1="400" y1="280" x2="400" y2="360" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="400" y1="440" x2="400" y2="520" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="280" y1="400" x2="360" y2="400" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="440" y1="400" x2="520" y2="400" stroke={strokeColor} strokeWidth="1.5" />
          {/* Corner tick marks */}
          <line x1="355" y1="355" x2="340" y2="340" stroke={strokeLight} strokeWidth="1" />
          <line x1="445" y1="355" x2="460" y2="340" stroke={strokeLight} strokeWidth="1" />
          <line x1="355" y1="445" x2="340" y2="460" stroke={strokeLight} strokeWidth="1" />
          <line x1="445" y1="445" x2="460" y2="460" stroke={strokeLight} strokeWidth="1" />
        </motion.g>

        {/* Top module */}
        <motion.g style={{ y: topPartY, opacity: topPartOpacity }}>
          <rect x="350" y="170" width="100" height="70" fill={fillCard} stroke={strokeColor} strokeWidth="1.5" />
          <line x1="370" y1="190" x2="430" y2="190" stroke={strokeLight} strokeWidth="1" />
          <line x1="370" y1="205" x2="410" y2="205" stroke={strokeLight} strokeWidth="1" />
          <rect x="380" y="218" width="40" height="8" fill={strokeLight} />
          {/* Label */}
          <rect x="358" y="155" width="84" height="14" fill={fillCard} stroke={strokeLight} strokeWidth="1" />
          <line x1="365" y1="162" x2="435" y2="162" stroke={strokeLight} strokeWidth="1" />
          {/* Connector arm */}
          <line x1="400" y1="240" x2="400" y2="280" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="400" cy="168" r="4" fill={strokeColor} />
        </motion.g>

        {/* Bottom module */}
        <motion.g style={{ y: bottomPartY, opacity: bottomPartOpacity }}>
          <rect x="340" y="560" width="120" height="70" fill={fillCard} stroke={strokeColor} strokeWidth="1.5" />
          <line x1="360" y1="580" x2="460" y2="580" stroke={strokeLight} strokeWidth="1" />
          <line x1="360" y1="595" x2="430" y2="595" stroke={strokeLight} strokeWidth="1" />
          <rect x="360" y="608" width="80" height="8" fill={strokeLight} />
          <line x1="400" y1="520" x2="400" y2="560" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="380" y1="630" x2="380" y2="650" stroke={strokeLight} strokeWidth="1" />
          <line x1="420" y1="630" x2="420" y2="650" stroke={strokeLight} strokeWidth="1" />
          <line x1="400" y1="630" x2="400" y2="655" stroke={strokeLight} strokeWidth="1" />
        </motion.g>

        {/* Left module */}
        <motion.g style={{ x: leftPartX, opacity: leftPartOpacity }}>
          <rect x="140" y="360" width="110" height="80" fill={fillCard} stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="175" cy="400" r="22" fill={fillCard} stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="175" cy="400" r="8" fill={fillCard} stroke={strokeLight} strokeWidth="1" />
          <circle cx="175" cy="400" r="3" fill={strokeColor} />
          <line x1="197" y1="400" x2="250" y2="400" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="250" y1="400" x2="280" y2="400" stroke={strokeLight} strokeWidth="1" strokeDasharray="3 5" />
          <line x1="140" y1="400" x2="110" y2="400" stroke={strokeLight} strokeWidth="1" />
          <line x1="110" y1="400" x2="110" y2="320" stroke={strokeLight} strokeWidth="1" />
          <circle cx="110" cy="320" r="3" fill={strokeLight} />
        </motion.g>

        {/* Right module */}
        <motion.g style={{ x: rightPartX, opacity: rightPartOpacity }}>
          <polygon points="550,360 660,400 550,440" fill={fillCard} stroke={strokeColor} strokeWidth="1.5" />
          <line x1="550" y1="400" x2="520" y2="400" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="520" y1="400" x2="440" y2="400" stroke={strokeLight} strokeWidth="1" strokeDasharray="3 5" />
          <line x1="660" y1="400" x2="690" y2="400" stroke={strokeLight} strokeWidth="1" />
          <line x1="690" y1="400" x2="690" y2="490" stroke={strokeLight} strokeWidth="1" />
          <rect x="680" y="490" width="20" height="14" fill={fillCard} stroke={strokeLight} strokeWidth="1" />
          <circle cx="660" cy="400" r="6" fill={fillCard} stroke={strokeColor} strokeWidth="1.5" />
        </motion.g>

      </svg>
    </div>
  );
}
