import { useScroll, useTransform, motion } from "framer-motion";

const LW = { cx: 216, cy: 320 };
const RW = { cx: 748, cy: 320 };
const SPOKES = [0, 72, 144, 216, 288];

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      {/* Tire */}
      <circle cx={cx} cy={cy} r={66} stroke="currentColor" strokeWidth="1.4" />
      {/* Outer rim */}
      <circle cx={cx} cy={cy} r={50} stroke="currentColor" strokeWidth="0.7" />
      {/* Brake disc */}
      <circle cx={cx} cy={cy} r={34} stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
      {/* Hub */}
      <circle cx={cx} cy={cy} r={12} stroke="currentColor" strokeWidth="1" />
      {/* 5 turbine-style spokes */}
      {SPOKES.map((deg) => {
        const r = (deg * Math.PI) / 180;
        const r2 = ((deg + 30) * Math.PI) / 180;
        return (
          <path
            key={deg}
            d={`M ${cx + 12 * Math.cos(r)} ${cy + 12 * Math.sin(r)}
                Q ${cx + 32 * Math.cos(r)} ${cy + 32 * Math.sin(r)}
                  ${cx + 50 * Math.cos(r2)} ${cy + 50 * Math.sin(r2)}`}
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
        );
      })}
      {/* Brake caliper hint */}
      <rect
        x={cx + 36}
        y={cy - 10}
        width="14"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
    </>
  );
}

export function CarBackground() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["110vw", "-130vw"]);

  return (
    <motion.div
      style={{ x }}
      className="fixed bottom-[8%] left-0 z-0 pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1100 380"
        width="1000"
        height="345"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.055 }}
      >
        {/* ── Ground line ── */}
        <line x1="40" y1="320" x2="1060" y2="320" stroke="currentColor" strokeWidth="0.7" strokeDasharray="10 5" />

        {/* ── Main body outline — aerodynamic EV fastback ── */}
        <path
          d="M 100,320
             Q 78,318 73,298 L 70,270
             Q 70,245 87,232
             L 114,226 L 150,198
             Q 198,112 308,78
             L 480,66 L 590,66
             Q 672,66 726,96
             L 818,168 L 852,210
             L 882,220
             Q 902,230 906,254
             L 904,280
             Q 900,308 878,318 L 858,320"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ── Greenhouse left (windshield + driver window) ── */}
        <path
          d="M 166,208 L 184,170
             Q 224,104 308,80
             L 480,70 L 492,70
             L 492,208 Z"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinejoin="round"
          fill="none"
        />

        {/* ── Greenhouse right (fastback roofline) ── */}
        <path
          d="M 492,70 L 590,70
             Q 668,70 722,98
             L 818,168 L 850,208
             L 492,208 Z"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinejoin="round"
          fill="none"
        />

        {/* ── B-pillar ── */}
        <line x1="492" y1="70" x2="492" y2="208" stroke="currentColor" strokeWidth="1.1" />

        {/* ── Roofline crease ── */}
        <line x1="308" y1="80" x2="590" y2="66" stroke="currentColor" strokeWidth="1.1" />

        {/* ── Door line ── */}
        <line x1="166" y1="208" x2="850" y2="208" stroke="currentColor" strokeWidth="0.7" />

        {/* ── Body sill / rocker ── */}
        <line x1="114" y1="268" x2="858" y2="268" stroke="currentColor" strokeWidth="1" />

        {/* ── Hood crease ── */}
        <path d="M 114,228 Q 200,218 258,178 L 305,132" stroke="currentColor" strokeWidth="0.7" strokeDasharray="5 3" />

        {/* ── Rear fastback crease ── */}
        <path d="M 818,168 L 848,212" stroke="currentColor" strokeWidth="0.8" />

        {/* ── LIDAR / sensor dome on roof ── */}
        <ellipse cx="492" cy="66" rx="24" ry="9" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <line x1="492" y1="57" x2="492" y2="75" stroke="currentColor" strokeWidth="0.5" />
        <line x1="468" y1="66" x2="516" y2="66" stroke="currentColor" strokeWidth="0.5" />

        {/* ── Front sensor / radar array ── */}
        {[234, 241, 248, 255, 262].map((y, i) => (
          <line key={i} x1="70" y1={y} x2="92" y2={y} stroke="currentColor" strokeWidth="0.6" />
        ))}

        {/* ── Front LIDAR sweep arcs ── */}
        <path d="M 70,278 Q 25,200 70,122" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 5" />
        <path d="M 70,285 Q 10,200 70,115" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 7" />
        <path d="M 70,275 Q 38,210 70,145" stroke="currentColor" strokeWidth="0.35" strokeDasharray="2 5" />

        {/* ── Rear sensor arc ── */}
        <path d="M 904,265 Q 942,200 904,135" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 5" />

        {/* ── Rear diffuser fins ── */}
        {[258, 265, 272, 279, 286, 293].map((y, i) => (
          <line key={i} x1="896" y1={y} x2="910" y2={y} stroke="currentColor" strokeWidth="0.6" />
        ))}

        {/* ── DRL / headlight strip ── */}
        <path d="M 72,244 Q 76,232 88,226 L 110,224" stroke="currentColor" strokeWidth="1" />
        {[0,1,2,3,4,5].map((i) => (
          <line key={i} x1={76 + i * 5} y1="248" x2={76 + i * 5} y2="258" stroke="currentColor" strokeWidth="0.5" />
        ))}

        {/* ── Rear taillight ── */}
        <path d="M 904,242 Q 900,228 888,222 L 866,220" stroke="currentColor" strokeWidth="1" />
        <line x1="902" y1="248" x2="870" y2="248" stroke="currentColor" strokeWidth="0.6" />

        {/* ── Wheel arch left ── */}
        <path
          d="M 102,320 Q 102,252 160,236 Q 216,220 274,236 Q 332,252 332,320"
          stroke="currentColor" strokeWidth="1.2" fill="none"
        />

        {/* ── Wheel arch right ── */}
        <path
          d="M 632,320 Q 632,252 690,236 Q 748,220 806,236 Q 864,252 864,320"
          stroke="currentColor" strokeWidth="1.2" fill="none"
        />

        {/* ── Wheels ── */}
        <Wheel cx={LW.cx} cy={LW.cy} />
        <Wheel cx={RW.cx} cy={RW.cy} />

        {/* ── Battery pack cutaway ── */}
        <rect x="168" y="278" width="628" height="24" rx="3"
              stroke="currentColor" strokeWidth="0.7" strokeDasharray="8 3" fill="none" />
        {/* Cell dividers */}
        {[0,1,2,3,4,5,6,7,8].map((i) => (
          <line key={i} x1={238 + i * 62} y1="278" x2={238 + i * 62} y2="302"
                stroke="currentColor" strokeWidth="0.4" />
        ))}
        {/* + / − symbols hint */}
        <line x1="200" y1="288" x2="216" y2="288" stroke="currentColor" strokeWidth="0.5" />
        <line x1="208" y1="284" x2="208" y2="292" stroke="currentColor" strokeWidth="0.5" />
        <line x1="768" y1="288" x2="782" y2="288" stroke="currentColor" strokeWidth="0.5" />

        {/* ── Underbody / flat floor ── */}
        <path d="M 156,300 L 315,296 L 648,296 L 824,300"
              stroke="currentColor" strokeWidth="0.6" strokeDasharray="6 3" />

        {/* ── CAN / HV bus trace (circuit line through cabin) ── */}
        <path d="M 210,242 L 492,238 L 810,242"
              stroke="currentColor" strokeWidth="0.45" strokeDasharray="14 5" />
        <path d="M 114,252 Q 200,250 492,248 Q 750,250 858,252"
              stroke="currentColor" strokeWidth="0.35" strokeDasharray="4 6" />

        {/* ── Network / sensor nodes on bus ── */}
        {[210, 360, 492, 630, 810].map((nx) => (
          <circle key={nx} cx={nx} cy={242} r="3.5"
                  stroke="currentColor" strokeWidth="0.6" fill="none" />
        ))}

        {/* ── Vertical callout lines from nodes ── */}
        <line x1="210" y1="228" x2="210" y2="238" stroke="currentColor" strokeWidth="0.4" />
        <line x1="810" y1="218" x2="810" y2="238" stroke="currentColor" strokeWidth="0.4" />

        {/* ── Full-length dimension line ── */}
        <line x1="70" y1="336" x2="70" y2="344" stroke="currentColor" strokeWidth="0.6" />
        <line x1="906" y1="336" x2="906" y2="344" stroke="currentColor" strokeWidth="0.6" />
        <line x1="70" y1="340" x2="906" y2="340" stroke="currentColor" strokeWidth="0.5" strokeDasharray="7 4" />

        {/* ── Wheelbase dimension ── */}
        <line x1={LW.cx} y1="336" x2={LW.cx} y2="350" stroke="currentColor" strokeWidth="0.5" />
        <line x1={RW.cx} y1="336" x2={RW.cx} y2="350" stroke="currentColor" strokeWidth="0.5" />
        <line x1={LW.cx} y1="347" x2={RW.cx} y2="347" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 3" />

        {/* ── Suspension geometry hints ── */}
        <line x1="150" y1="268" x2={LW.cx} y2="252" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
        <line x1={LW.cx} y1="252" x2="280" y2="268" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
        <line x1="655" y1="268" x2={RW.cx} y2="252" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
        <line x1={RW.cx} y1="252" x2="840" y2="268" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />

        {/* ── Cross-hair origin at wheel centers ── */}
        {[LW, RW].map(({ cx, cy }) => (
          <g key={cx}>
            <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="currentColor" strokeWidth="0.5" />
            <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="currentColor" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
