/* coin-garden-art.jsx — SVG art for plants.
   Each plant has 3 viz needs:
     • TopDown(stage)     — what you see in the garden grid (top-down)
     • Side(stage)        — canopy shown above ground in cross-section
     • Roots(stage)       — root system shown below ground in cross-section
   Stage: 0 seed, 1 sprout, 2 young, 3 mature, 4 ready
*/

const STROKE = '#1A1208';
const SOIL_DARK = '#5C3318';
const SOIL_MID = '#8B5A2B';

/* ───────── Common helpers ───────── */
const Outline = { stroke: STROKE, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' };

/* ═══════════════════════════════════════════════════════════
   TOP-DOWN VIEWS (what you see looking down at the soil)
   viewBox 0 0 100 100 — soil-coloured background owned by parent.
═══════════════════════════════════════════════════════════ */

function TopSprout({ stage }) {
  if (stage === 0) return <SeedDot/>;
  const leaves = stage >= 3 ? 8 : stage >= 2 ? 6 : 3;
  const r = 6 + stage * 4;
  const arr = Array.from({ length: leaves });
  return (
    <g transform="translate(50,50)">
      {arr.map((_, i) => {
        const a = (i / leaves) * Math.PI * 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        return <ellipse key={i} cx={x} cy={y} rx="8" ry="4" fill="#7FD89A" {...Outline} transform={`rotate(${a * 180 / Math.PI} ${x} ${y})`}/>;
      })}
      <circle r="4" fill="#3FA265" {...Outline}/>
    </g>
  );
}

function TopAcorn({ stage }) {
  if (stage === 0) return <SeedDot color="#7D4D24"/>;
  if (stage === 1) return (
    <g transform="translate(50,50)">
      <ellipse rx="9" ry="5" fill="#7FD89A" {...Outline}/>
      <ellipse rx="3" ry="2" cy="-2" fill="#3FA265" {...Outline} strokeWidth="1.5"/>
    </g>
  );
  // mature: small bushy crown of acorn-tree leaves
  const r = 16 + stage * 4;
  return (
    <g transform="translate(50,50)">
      <circle r={r} fill="#5BA84B" {...Outline}/>
      <circle r={r - 4} cx="-6" cy="-4" fill="#7DCB6B" {...Outline} strokeWidth="1.5"/>
      <circle r="4" cx="0" cy="6" fill="#7D4D24" {...Outline} strokeWidth="1.5"/>
    </g>
  );
}

function TopSunflower({ stage }) {
  if (stage === 0) return <SeedDot color="#D49000"/>;
  if (stage === 1) return <TopSprout stage={1}/>;
  const petals = 12;
  const r = 8 + stage * 5;
  return (
    <g transform="translate(50,50)">
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i / petals) * Math.PI * 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        return <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill="#FFC93C" {...Outline} strokeWidth="1.5" transform={`rotate(${a * 180 / Math.PI} ${x} ${y})`}/>;
      })}
      <circle r={r * 0.55} fill="#5C3318" {...Outline}/>
      <circle r={r * 0.4} fill="#3D2008"/>
    </g>
  );
}

function TopBerry({ stage }) {
  if (stage === 0) return <SeedDot color="#5A3CC0"/>;
  if (stage === 1) return <TopSprout stage={1}/>;
  // bushy cluster from above
  const dots = stage >= 3 ? 7 : 5;
  return (
    <g transform="translate(50,50)">
      <circle r={14 + stage * 3} fill="#3FA265" {...Outline}/>
      {Array.from({ length: dots }).map((_, i) => {
        const a = (i / dots) * Math.PI * 2 + i * 0.3;
        const x = Math.cos(a) * 8;
        const y = Math.sin(a) * 8;
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#9B7BFF" {...Outline} strokeWidth="1.5"/>;
      })}
      <circle cx="-2" cy="-2" r="3.5" fill="#9B7BFF" {...Outline} strokeWidth="1.5"/>
    </g>
  );
}

function TopOak({ stage }) {
  if (stage === 0) return <SeedDot color="#1F5A37"/>;
  if (stage === 1) return <TopSprout stage={1}/>;
  // big lobed canopy from above
  const r = 18 + stage * 5;
  return (
    <g transform="translate(50,50)">
      <circle r={r} fill="#3FA265" {...Outline}/>
      <circle cx={-r * 0.4} cy={-r * 0.4} r={r * 0.6} fill="#3FA265" {...Outline}/>
      <circle cx={r * 0.4} cy={-r * 0.3} r={r * 0.55} fill="#3FA265" {...Outline}/>
      <circle cx={r * 0.3} cy={r * 0.4} r={r * 0.5} fill="#3FA265" {...Outline}/>
      <circle cx={-r * 0.3} cy={r * 0.3} r={r * 0.5} fill="#3FA265" {...Outline}/>
      <circle r={r * 0.6} cx={-r * 0.2} cy={-r * 0.2} fill="#5BC57F" opacity="0.6"/>
      <circle r={2.5} fill="#5C3318"/>
    </g>
  );
}

function TopCactus({ stage }) {
  if (stage === 0) return <SeedDot color="#2E7A45"/>;
  // round cactus from above
  const r = 8 + stage * 3.5;
  return (
    <g transform="translate(50,50)">
      <circle r={r} fill="#5BBF7A" {...Outline}/>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const x = Math.cos(a) * r * 0.7;
        const y = Math.sin(a) * r * 0.7;
        return <line key={i} x1={x - 1.5} y1={y - 1.5} x2={x + 1.5} y2={y + 1.5} stroke="#1A1208" strokeWidth="1" strokeLinecap="round"/>;
      })}
      {stage >= 3 && <circle r="2.5" cx="0" cy={-r + 1} fill="#FF6B7A" {...Outline} strokeWidth="1.2"/>}
    </g>
  );
}

function TopBean({ stage }) {
  if (stage === 0) return <SeedDot color="#B23A2C"/>;
  if (stage === 1) return <TopSprout stage={1}/>;
  // chaotic curly vine from above
  return (
    <g transform="translate(50,50)">
      <path d="M -16 -2 Q -8 -16 4 -10 Q 16 -4 12 8 Q 6 18 -6 14 Q -18 10 -16 -2 Z"
            fill="#FF7A6B" {...Outline}/>
      <path d="M -8 -2 Q -2 -10 6 -6 Q 10 0 6 6 Q 0 10 -6 6 Q -10 2 -8 -2 Z"
            fill="#FFB870" {...Outline} strokeWidth="1.5"/>
      {stage >= 3 && (
        <>
          <circle cx="-12" cy="-8" r="2" fill="#FFD93C" {...Outline} strokeWidth="1"/>
          <circle cx="10" cy="6" r="2" fill="#FFD93C" {...Outline} strokeWidth="1"/>
        </>
      )}
    </g>
  );
}

function SeedDot({ color = '#5C3318' }) {
  return <ellipse cx="50" cy="50" rx="5" ry="3" fill={color} {...Outline} strokeWidth="1.5"/>;
}

const TOPVIEW = {
  sprout: TopSprout, acorn: TopAcorn, sunflower: TopSunflower,
  berry: TopBerry, oak: TopOak, cactus: TopCactus, bean: TopBean,
};

/* ═══════════════════════════════════════════════════════════
   SIDE / CROSS-SECTION VIEWS
   viewBox each component is responsible for its own translate.
   Origin should be at ground level, x ~0. Y< 0 = up, Y > 0 = down.
═══════════════════════════════════════════════════════════ */

/* ─── canopies (above ground) ─── */
function CanSprout({ stage }) {
  const h = 8 + stage * 14;
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2={-h} stroke="#3FA265" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx={-8} cy={-h * 0.6} rx="9" ry="5" fill="#7FD89A" {...Outline} transform={`rotate(-30 -8 ${-h * 0.6})`}/>
      <ellipse cx={8} cy={-h * 0.4} rx="9" ry="5" fill="#7FD89A" {...Outline} transform={`rotate(30 8 ${-h * 0.4})`}/>
      {stage >= 3 && <ellipse cx={0} cy={-h - 4} rx="10" ry="6" fill="#5BC57F" {...Outline}/>}
    </g>
  );
}
function CanAcorn({ stage }) {
  const h = 14 + stage * 16;
  return (
    <g>
      <rect x={-3} y={-h} width="6" height={h} fill="#7D4D24" {...Outline}/>
      <ellipse cx="0" cy={-h - 8} rx={12 + stage * 4} ry={10 + stage * 3} fill="#5BA84B" {...Outline}/>
      <ellipse cx={-6} cy={-h - 12} rx="8" ry="6" fill="#7DCB6B" {...Outline} strokeWidth="1.5"/>
      {stage >= 3 && (
        <g transform={`translate(0 ${-h + 8})`}>
          <ellipse rx="3" ry="4" fill="#FFD89A" {...Outline} strokeWidth="1.5"/>
          <path d="M -3 -3 Q 0 -6 3 -3 L 3 -1 L -3 -1 Z" fill="#7D4D24" {...Outline} strokeWidth="1.5"/>
        </g>
      )}
    </g>
  );
}
function CanSunflower({ stage }) {
  const h = 10 + stage * 22;
  const petals = 10;
  const r = 6 + stage * 3;
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2={-h} stroke="#3FA265" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx={-7} cy={-h * 0.45} rx="9" ry="4" fill="#5BC57F" {...Outline} strokeWidth="1.5" transform={`rotate(-25 -7 ${-h * 0.45})`}/>
      <ellipse cx={7} cy={-h * 0.7} rx="9" ry="4" fill="#5BC57F" {...Outline} strokeWidth="1.5" transform={`rotate(25 7 ${-h * 0.7})`}/>
      <g transform={`translate(0 ${-h - r})`}>
        {Array.from({ length: petals }).map((_, i) => {
          const a = (i / petals) * Math.PI * 2;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          return <ellipse key={i} cx={x} cy={y} rx="5" ry="2.5" fill="#FFC93C" {...Outline} strokeWidth="1.5" transform={`rotate(${a * 180 / Math.PI} ${x} ${y})`}/>;
        })}
        <circle r={r * 0.6} fill="#5C3318" {...Outline}/>
      </g>
    </g>
  );
}
function CanBerry({ stage }) {
  const h = 8 + stage * 10;
  return (
    <g>
      {[-h * 0.7, -h, -h * 1.1].map((y, i) => (
        <circle key={i} cx={(i - 1) * 6} cy={y} r={6 + stage * 2} fill="#5BA84B" {...Outline}/>
      ))}
      {stage >= 2 && [
        [-6, -h * 0.6], [4, -h * 0.9], [-2, -h - 4], [8, -h * 0.5], [-8, -h - 2],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#9B7BFF" {...Outline} strokeWidth="1.2"/>
      ))}
    </g>
  );
}
function CanOak({ stage }) {
  const h = 16 + stage * 22;
  return (
    <g>
      <rect x={-5} y={-h} width="10" height={h} fill="#7D4D24" {...Outline}/>
      <line x1="0" y1={-h * 0.5} x2="-8" y2={-h * 0.7} stroke="#7D4D24" strokeWidth="3" strokeLinecap="round"/>
      <line x1="0" y1={-h * 0.4} x2="9" y2={-h * 0.6} stroke="#7D4D24" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="0" cy={-h - 8} rx={20 + stage * 6} ry={16 + stage * 4} fill="#3FA265" {...Outline}/>
      <circle cx={-12} cy={-h - 4} r={9 + stage * 2} fill="#3FA265" {...Outline}/>
      <circle cx={12} cy={-h - 12} r={8 + stage * 2} fill="#3FA265" {...Outline}/>
      <circle cx={-4} cy={-h - 16} r={9 + stage * 2} fill="#5BC57F" {...Outline}/>
      {stage >= 3 && (
        <>
          <circle cx={-14} cy={-h - 6} r="2.5" fill="#7D4D24" {...Outline} strokeWidth="1"/>
          <circle cx={10} cy={-h - 10} r="2.5" fill="#7D4D24" {...Outline} strokeWidth="1"/>
        </>
      )}
    </g>
  );
}
function CanCactus({ stage }) {
  const h = 12 + stage * 12;
  return (
    <g>
      <rect x={-7} y={-h} width="14" height={h} rx="6" fill="#5BBF7A" {...Outline}/>
      {stage >= 2 && <path d={`M -7 ${-h * 0.4} Q -16 ${-h * 0.5} -16 ${-h * 0.7} L -12 ${-h * 0.7} L -12 ${-h * 0.5} Q -7 ${-h * 0.45} -7 ${-h * 0.4} Z`} fill="#5BBF7A" {...Outline}/>}
      {stage >= 2 && <path d={`M 7 ${-h * 0.6} Q 16 ${-h * 0.7} 16 ${-h * 0.85} L 12 ${-h * 0.85} L 12 ${-h * 0.7} Q 7 ${-h * 0.65} 7 ${-h * 0.6} Z`} fill="#5BBF7A" {...Outline}/>}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1="0" y1={-h * 0.15 - i * (h / 6)} x2="2" y2={-h * 0.18 - i * (h / 6)} stroke="#1A1208" strokeWidth="1" strokeLinecap="round"/>
      ))}
      {stage >= 3 && <ellipse cx="0" cy={-h - 4} rx="5" ry="3" fill="#FF6B7A" {...Outline} strokeWidth="1.5"/>}
    </g>
  );
}
function CanBean({ stage }) {
  const h = 8 + stage * 18;
  return (
    <g>
      {/* curly twisty vine */}
      <path
        d={`M 0 0 Q -8 ${-h * 0.25} 4 ${-h * 0.4} Q 14 ${-h * 0.55} -2 ${-h * 0.7} Q -12 ${-h * 0.85} 2 ${-h}`}
        stroke="#3FA265" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {stage >= 2 && (
        <>
          <ellipse cx="6" cy={-h * 0.4} rx="6" ry="3.5" fill="#FF7A6B" {...Outline} strokeWidth="1.5" transform={`rotate(40 6 ${-h * 0.4})`}/>
          <ellipse cx="-2" cy={-h * 0.7} rx="6" ry="3.5" fill="#FFB870" {...Outline} strokeWidth="1.5" transform={`rotate(-40 -2 ${-h * 0.7})`}/>
          <ellipse cx="2" cy={-h - 2} rx="7" ry="4" fill="#FFD93C" {...Outline} strokeWidth="1.5"/>
        </>
      )}
      {stage >= 3 && <text x="0" y={-h - 1} textAnchor="middle" fontSize="6" fontWeight="900" fill="#1A1208">$</text>}
    </g>
  );
}

const CANOPY = {
  sprout: CanSprout, acorn: CanAcorn, sunflower: CanSunflower,
  berry: CanBerry, oak: CanOak, cactus: CanCactus, bean: CanBean,
};

/* ─── roots (below ground) ─── */
function RootsFibrous({ stage }) {
  // many small thin roots (sprout)
  const d = 14 + stage * 8;
  return (
    <g stroke="#7D4D24" strokeWidth="2" fill="none" strokeLinecap="round">
      <line x1="0" y1="0" x2="0" y2={d}/>
      <path d={`M 0 4 Q -6 ${d * 0.5} -10 ${d * 0.8}`}/>
      <path d={`M 0 6 Q 6 ${d * 0.5} 10 ${d * 0.8}`}/>
      <path d={`M 0 4 Q -3 ${d * 0.6} -5 ${d}`}/>
      <path d={`M 0 4 Q 3 ${d * 0.6} 5 ${d}`}/>
      <line x1="0" y1="2" x2="0" y2={d * 0.95} strokeWidth="2.5"/>
    </g>
  );
}
function RootsTaproot({ stage }) {
  // single deep taproot (acorn)
  const d = 22 + stage * 14;
  return (
    <g stroke="#7D4D24" strokeLinecap="round" fill="none">
      <line x1="0" y1="0" x2="0" y2={d} strokeWidth="5"/>
      <line x1="0" y1={d * 0.4} x2={-8} y2={d * 0.55} strokeWidth="2"/>
      <line x1="0" y1={d * 0.55} x2={8} y2={d * 0.7} strokeWidth="2"/>
      <line x1="0" y1={d * 0.75} x2={-6} y2={d * 0.92} strokeWidth="2"/>
      <ellipse cx="0" cy={d - 1} rx="3" ry="2" fill="#7D4D24"/>
    </g>
  );
}
function RootsTapLateral({ stage }) {
  // sunflower — central tap + lateral spread
  const d = 18 + stage * 12;
  return (
    <g stroke="#7D4D24" strokeLinecap="round" fill="none">
      <line x1="0" y1="0" x2="0" y2={d} strokeWidth="4"/>
      <path d={`M 0 4 Q -10 6 -16 ${d * 0.4}`} strokeWidth="2.5"/>
      <path d={`M 0 4 Q 10 6 16 ${d * 0.4}`} strokeWidth="2.5"/>
      <path d={`M 0 ${d * 0.4} Q -8 ${d * 0.5} -12 ${d * 0.8}`} strokeWidth="2"/>
      <path d={`M 0 ${d * 0.4} Q 8 ${d * 0.5} 12 ${d * 0.8}`} strokeWidth="2"/>
    </g>
  );
}
function RootsShallowWide({ stage }) {
  // berry / cactus — shallow but wide
  const w = 14 + stage * 6;
  const d = 8 + stage * 5;
  return (
    <g stroke="#7D4D24" strokeLinecap="round" fill="none" strokeWidth="2">
      <path d={`M 0 0 Q ${-w * 0.4} 4 ${-w} ${d * 0.4}`}/>
      <path d={`M 0 0 Q ${-w * 0.2} 6 ${-w * 0.4} ${d}`}/>
      <path d={`M 0 0 Q 0 6 0 ${d}`}/>
      <path d={`M 0 0 Q ${w * 0.2} 6 ${w * 0.4} ${d}`}/>
      <path d={`M 0 0 Q ${w * 0.4} 4 ${w} ${d * 0.4}`}/>
    </g>
  );
}
function RootsDeepMassive({ stage }) {
  // mighty oak — huge sprawling deep system
  const d = 28 + stage * 16;
  const w = 22 + stage * 8;
  return (
    <g stroke="#5C3318" strokeLinecap="round" fill="none">
      <line x1="0" y1="0" x2="0" y2={d} strokeWidth="6"/>
      <path d={`M -2 4 Q ${-w * 0.4} 8 ${-w} ${d * 0.5}`} strokeWidth="4"/>
      <path d={`M 2 4 Q ${w * 0.4} 8 ${w} ${d * 0.5}`} strokeWidth="4"/>
      <path d={`M 0 ${d * 0.5} Q ${-w * 0.3} ${d * 0.7} ${-w * 0.5} ${d}`} strokeWidth="3"/>
      <path d={`M 0 ${d * 0.5} Q ${w * 0.3} ${d * 0.7} ${w * 0.5} ${d}`} strokeWidth="3"/>
      <path d={`M 0 ${d * 0.3} Q ${-w * 0.2} ${d * 0.4} ${-w * 0.3} ${d * 0.7}`} strokeWidth="2.5"/>
      <path d={`M 0 ${d * 0.3} Q ${w * 0.2} ${d * 0.4} ${w * 0.3} ${d * 0.7}`} strokeWidth="2.5"/>
    </g>
  );
}
function RootsTwisty({ stage }) {
  // bean — chaotic, twisty, unpredictable
  const d = 16 + stage * 10;
  return (
    <g stroke="#7D4D24" strokeLinecap="round" fill="none" strokeWidth="2.5">
      <path d={`M 0 0 Q -10 ${d * 0.2} 4 ${d * 0.4} Q 16 ${d * 0.55} -4 ${d * 0.75} Q -14 ${d * 0.9} 2 ${d}`}/>
      <path d={`M 0 4 Q 8 ${d * 0.3} -6 ${d * 0.5}`} strokeWidth="2"/>
      <path d={`M 0 6 Q -6 ${d * 0.4} 10 ${d * 0.7}`} strokeWidth="2"/>
    </g>
  );
}

const ROOTS = {
  fibrous: RootsFibrous,
  taproot: RootsTaproot,
  'tap+lateral': RootsTapLateral,
  'shallow-wide': RootsShallowWide,
  'deep-massive': RootsDeepMassive,
  twisty: RootsTwisty,
};

Object.assign(window, { TOPVIEW, CANOPY, ROOTS });
