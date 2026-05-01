/* Pip — Duolingo-tier polish.
   Rules followed (lifted from how Duo is constructed):
   - FLAT fills, no gradients
   - One uniform thick black outline (#1A1208) on every silhouette
   - Big head, small body proportions for cuteness
   - Oversized eyes with TWO white sparkle dots (signature)
   - Single-tone shadows under chin/belly (not gradients)
   - Mouth breaks the face silhouette (open smile = personality)
   - The hero prop is the acorn-coin: acorn cap on top, coin body w/ $
*/

const PIP_COLORS = {
  body: '#FF7A2E',         // signature orange
  bodyShade: '#E55A1F',    // one tone darker — used as flat fill, not gradient
  belly: '#FFE3B0',
  bellyShade: '#F4CA85',
  tailStripe: '#FFD89A',
  outline: '#1A1208',
  cheek: '#FF6B7A',
  cheekDark: '#E84455',
  acornCap: '#5C3318',
  acornCapDark: '#3D2008',
  coin: '#FFCB45',
  coinShade: '#E8A722',
  white: '#FFFFFF',
};

function PipDuo({ size = 320, mood = 'happy' }) {
  const C = PIP_COLORS;
  const stroke = C.outline;
  const sw = 7; // outline weight, scaled with viewBox

  // ── EYES ──
  // Default eye: white circle + dark iris + 2 white sparkles (signature Duo move)
  const Eye = ({ cx, cy = 200, variant = 'open', look = 'center' }) => {
    if (variant === 'closed-up') {
      // happy curve — closed eye smiling
      return <path d={`M ${cx - 22} ${cy + 4} Q ${cx} ${cy - 18} ${cx + 22} ${cy + 4}`}
                   stroke={stroke} strokeWidth="8" fill="none" strokeLinecap="round"/>;
    }
    if (variant === 'closed-down') {
      // sleeping
      return <path d={`M ${cx - 22} ${cy} Q ${cx} ${cy + 14} ${cx + 22} ${cy}`}
                   stroke={stroke} strokeWidth="7" fill="none" strokeLinecap="round"/>;
    }
    // open eye
    const offX = look === 'left' ? -3 : look === 'right' ? 3 : 0;
    return (
      <g>
        <ellipse cx={cx} cy={cy} rx="26" ry="34" fill={C.white} stroke={stroke} strokeWidth={sw}/>
        <ellipse cx={cx + offX} cy={cy + 5} rx="17" ry="24" fill={stroke}/>
        {/* big sparkle */}
        <ellipse cx={cx + offX - 5} cy={cy - 5} rx="6.5" ry="9" fill={C.white}/>
        {/* small sparkle */}
        <circle cx={cx + offX + 7} cy={cy + 12} r="3.2" fill={C.white}/>
      </g>
    );
  };

  // Per-mood eye variants
  let leftEye, rightEye;
  if (mood === 'smile')        { leftEye = <Eye cx={150} variant="closed-up"/>; rightEye = <Eye cx={250} variant="closed-up"/>; }
  else if (mood === 'wink')    { leftEye = <Eye cx={150}/>;                     rightEye = <Eye cx={250} variant="closed-up"/>; }
  else if (mood === 'excited') { leftEye = <Eye cx={150}/>;                     rightEye = <Eye cx={250}/>; }
  else if (mood === 'sleep')   { leftEye = <Eye cx={150} variant="closed-down"/>; rightEye = <Eye cx={250} variant="closed-down"/>; }
  else                         { leftEye = <Eye cx={150}/>;                     rightEye = <Eye cx={250}/>; }

  // ── MOUTH ── breaks the face silhouette (Duo signature)
  const Mouth = () => {
    if (mood === 'sleep') {
      return <ellipse cx="200" cy="252" rx="9" ry="3.5" fill={stroke}/>;
    }
    if (mood === 'excited') {
      // soft happy open smile — rounded, no harsh tooth block
      return (
        <g>
          <path
            d="M 178 246
               Q 200 274 222 246"
            stroke={stroke}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"/>
          {/* tiny tongue dot — barely peeking, adds charm */}
          <path d="M 196 260 Q 200 268 204 260 Q 200 264 196 260 Z" fill="#FF6B7A"/>
        </g>
      );
    }
    // default — gentle little smile, no tooth block
    return (
      <path d="M 184 246 Q 200 262 216 246"
            stroke={stroke} strokeWidth="6.5" fill="none" strokeLinecap="round"/>
    );
  };

  return (
    <svg viewBox="0 0 400 440" width={size} height={size * 440 / 400} style={{ display: 'block', overflow: 'visible' }}>
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* TAIL — big curl behind body. Duo-style: bold flat shape, thick stroke. */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <g>
        {/* Outer tail silhouette */}
        <path
          d="M 105 320
             C 25 305 -5 215 35 130
             C 70 55 165 35 200 100
             C 232 158 200 215 152 220
             C 130 222 122 234 138 244
             C 158 254 184 250 192 240
             C 188 290 145 320 110 320 Z"
          fill={C.body}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"/>
        {/* Inner cream stripe — gives the squirrel-tail-fluff signature */}
        <path
          d="M 78 250
             C 40 215 35 150 75 95
             C 105 60 160 65 175 110"
          stroke={C.tailStripe}
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"/>
        {/* Tip curl detail */}
        <path d="M 135 245 Q 150 240 155 230"
              stroke={stroke} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5"/>
      </g>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* BODY — pear-shaped torso, smaller than head (Duo proportions) */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <path
        d="M 200 410
           C 130 410 100 360 100 310
           C 100 250 145 215 200 215
           C 255 215 300 250 300 310
           C 300 360 270 410 200 410 Z"
        fill={C.body}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"/>

      {/* Belly cream patch — flat fill, thin outline */}
      <path
        d="M 200 410
           C 158 410 138 372 138 332
           C 138 282 165 248 200 248
           C 235 248 262 282 262 332
           C 262 372 242 410 200 410 Z"
        fill={C.belly}
        stroke={stroke}
        strokeWidth="4"/>

      {/* Belly inner shadow — single flat tone, gives volume without gradient */}
      <path
        d="M 200 410
           C 240 410 258 380 258 350
           Q 245 360 200 360
           Q 155 360 142 350
           C 142 380 160 410 200 410 Z"
        fill={C.bellyShade}
        opacity="0.6"/>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* FEET — peeking out bottom */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <g>
        <ellipse cx="170" cy="408" rx="26" ry="13" fill={stroke}/>
        <ellipse cx="170" cy="404" rx="18" ry="6" fill="#FFB89A"/>
        <ellipse cx="230" cy="408" rx="26" ry="13" fill={stroke}/>
        <ellipse cx="230" cy="404" rx="18" ry="6" fill="#FFB89A"/>
      </g>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ARMS — cradling acorn-coin in front of belly */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* left arm */}
      <path
        d="M 138 295
           C 122 320 130 350 158 355
           L 195 348
           L 195 308
           L 158 285 Z"
        fill={C.body}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"/>
      {/* right arm */}
      <path
        d="M 262 295
           C 278 320 270 350 242 355
           L 205 348
           L 205 308
           L 242 285 Z"
        fill={C.body}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"/>
      {/* paws */}
      <circle cx="160" cy="350" r="15" fill="#FFB89A" stroke={stroke} strokeWidth={sw}/>
      <circle cx="240" cy="350" r="15" fill="#FFB89A" stroke={stroke} strokeWidth={sw}/>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ACORN-COIN — the hero prop. Acorn cap on top of a coin body. */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <g transform="translate(200, 348)">
        {/* coin body */}
        <circle r="42" fill={C.coin} stroke={stroke} strokeWidth={sw}/>
        {/* coin shade rim */}
        <path d="M -38 8 A 38 38 0 0 0 38 8" stroke={C.coinShade} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7"/>
        {/* dollar sign */}
        <text x="0" y="14" textAnchor="middle"
              fontFamily="Fraunces, serif" fontWeight="900" fontSize="48" fill={stroke}>$</text>
        {/* coin sparkle */}
        <ellipse cx="-15" cy="-18" rx="6" ry="9" fill={C.white} opacity="0.85"/>

        {/* acorn cap on top — the squirrel's signature */}
        <g transform="translate(0, -28)">
          <path d="M -44 4
                   Q -50 -22 -28 -32
                   Q 0 -42 28 -32
                   Q 50 -22 44 4
                   Z"
                fill={C.acornCap}
                stroke={stroke}
                strokeWidth={sw}
                strokeLinejoin="round"/>
          {/* cap crosshatch — flat, 3 short lines */}
          <line x1="-25" y1="-8" x2="-15" y2="-22" stroke={C.acornCapDark} strokeWidth="3" strokeLinecap="round"/>
          <line x1="-5" y1="-2" x2="5" y2="-30" stroke={C.acornCapDark} strokeWidth="3" strokeLinecap="round"/>
          <line x1="15" y1="-8" x2="25" y2="-22" stroke={C.acornCapDark} strokeWidth="3" strokeLinecap="round"/>
          {/* stem */}
          <rect x="-3.5" y="-44" width="7" height="14" rx="2" fill={C.acornCap} stroke={stroke} strokeWidth="4"/>
          {/* leaf */}
          <path d="M 4 -42 Q 20 -50 18 -36 Q 12 -34 4 -42 Z" fill="#5BA84B" stroke={stroke} strokeWidth="3.5"/>
        </g>
      </g>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* HEAD — big round, larger than body */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <ellipse cx="200" cy="195" rx="115" ry="108" fill={C.body} stroke={stroke} strokeWidth={sw}/>

      {/* head shadow — chin tone, single flat fill */}
      <path d="M 200 303
               Q 100 295 88 220
               Q 88 280 130 295
               Q 165 308 200 303 Z"
            fill={C.bodyShade} opacity="0.55"/>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* EARS — pointy with tufts */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <g>
        {/* left */}
        <path d="M 122 115 L 138 50 L 178 102 Z"
              fill={C.body} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M 142 100 L 148 70 L 168 100 Z" fill={C.belly}/>
        {/* tuft */}
        <path d="M 134 58 Q 128 38 140 36 Q 144 50 142 64 Z" fill={stroke}/>

        {/* right */}
        <path d="M 278 115 L 262 50 L 222 102 Z"
              fill={C.body} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M 258 100 L 252 70 L 232 100 Z" fill={C.belly}/>
        <path d="M 266 58 Q 272 38 260 36 Q 256 50 258 64 Z" fill={stroke}/>
      </g>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* FACE MASK — lighter cream around eyes/snout */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <ellipse cx="200" cy="220" rx="76" ry="58" fill={C.belly}/>
      <ellipse cx="200" cy="220" rx="76" ry="58" fill="none" stroke={stroke} strokeWidth="4" opacity="0.18"/>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* CHEEKS — flat circles, dark outline */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <ellipse cx="128" cy="232" rx="16" ry="11" fill={C.cheek}/>
      <ellipse cx="272" cy="232" rx="16" ry="11" fill={C.cheek}/>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* EYES */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {leftEye}
      {rightEye}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* NOSE — heart-shaped, dark */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <path d="M 200 226
               C 190 226 184 236 190 244
               L 200 256
               L 210 244
               C 216 236 210 226 200 226 Z"
            fill={stroke}/>
      <ellipse cx="196" cy="232" rx="2.5" ry="1.6" fill={C.white}/>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* MOUTH (mood-driven) */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <Mouth/>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* SPARKLES around head — Duo decoration trick */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <g>
        {/* coin top right */}
        <circle cx="345" cy="80" r="11" fill={C.coin} stroke={stroke} strokeWidth="3"/>
        <text x="345" y="86" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="13" fill={stroke}>$</text>
        {/* coin top left */}
        <circle cx="55" cy="65" r="9" fill={C.coin} stroke={stroke} strokeWidth="3"/>
        <text x="55" y="70" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="11" fill={stroke}>$</text>

        {/* twinkles */}
        <path d="M 355 30 L 358 22 L 361 30 L 369 33 L 361 36 L 358 44 L 355 36 L 347 33 Z" fill={C.coin} stroke={stroke} strokeWidth="2.5"/>
        <path d="M 28 130 L 30 124 L 32 130 L 38 132 L 32 134 L 30 140 L 28 134 L 22 132 Z" fill={C.coin} stroke={stroke} strokeWidth="2"/>
        <path d="M 370 200 L 372 195 L 374 200 L 379 202 L 374 204 L 372 209 L 370 204 L 365 202 Z" fill={C.coin} stroke={stroke} strokeWidth="2"/>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Showcases used by Mascot Options.html
═══════════════════════════════════════════════════════════════════════ */

function PipHeroCard({ children, name = 'Pip', desc = '', bg = '#FFE9C2', accent = '#E55A1F', tag = '' }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg,
      borderRadius: 28,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      border: '3px solid #1A1208',
      boxShadow: '0 8px 0 #1A1208',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(26,18,8,0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none',
      }}/>
      {tag && (
        <div style={{
          position: 'relative',
          alignSelf: 'flex-start',
          background: '#1A1208', color: '#fff',
          font: '900 10px/1 Nunito', letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '7px 12px', borderRadius: 999,
        }}>{tag}</div>
      )}
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <h3 style={{ font: '900 56px/1 Fraunces', margin: '0 0 8px', color: '#1A1208' }}>
          {name}<span style={{ color: accent }}>.</span>
        </h3>
        {desc && (
          <p style={{ font: '600 13px/1.5 Nunito', color: '#3d2a14', margin: 0, maxWidth: 420, marginInline: 'auto' }}>
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}

function PipExpressionsRow() {
  const moods = ['happy', 'smile', 'wink', 'excited', 'sleep'];
  const labels = ['Happy', 'Smile', 'Wink', 'Excited', 'Sleeping'];
  return (
    <div style={{ width: '100%', height: '100%', background: '#FFF8EC', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      {moods.map((m, i) => (
        <div key={m} style={{ textAlign: 'center' }}>
          <div style={{ width: 220, height: 240 }}><PipDuo size={220} mood={m}/></div>
          <div style={{
            display: 'inline-block',
            background: '#1A1208', color: '#fff',
            font: '900 12px/1 Nunito', letterSpacing: '0.08em',
            padding: '6px 14px', borderRadius: 999,
            marginTop: 10,
          }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

function PipScalePoses() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#FFF8EC', padding: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: 32 }}>
      {[
        { size: 56, label: 'App icon', sub: '56 px', bg: '#E55A1F', round: 18 },
        { size: 110, label: 'Header', sub: '110 px', bg: '#FFE0B0', round: 24 },
        { size: 180, label: 'Sticker', sub: '180 px', bg: '#FFC93C', round: 28 },
        { size: 260, label: 'Hero', sub: '260 px', bg: '#FAF6EE', round: 32 },
      ].map(({ size, label, sub, bg, round }) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <div style={{ width: size + 36, height: size + 36, borderRadius: round, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #1A1208', boxShadow: '0 4px 0 #1A1208' }}>
            <PipDuo size={size}/>
          </div>
          <div style={{ font: '900 13px/1 Nunito', color: '#1A1208', marginTop: 12, letterSpacing: '0.04em' }}>{label}</div>
          <div style={{ font: '700 10px/1 Nunito', color: '#7a6a52', marginTop: 4, letterSpacing: '0.06em' }}>{sub}</div>
        </div>
      ))}
    </div>
  );
}

function PipBrandLockup() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#FAF6EE', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 24 }}>
      <PipDuo size={170}/>
      <div>
        <h2 style={{ font: '900 70px/1 Fraunces', margin: 0, color: '#1A1208' }}>Rewardify<span style={{ color: '#E55A1F' }}>.</span></h2>
        <div style={{ font: '900 12px/1 Nunito', color: '#7a6a52', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 10 }}>with Pip · your money buddy</div>
      </div>
    </div>
  );
}

function PipAppliedHero() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg, #FFF8EC 0%, #FFD89A 100%)',
      borderRadius: 36,
      padding: 22,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      border: '3px solid #1A1208',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', font: '900 13px/1 Nunito', marginBottom: 14 }}>
        <span>9:41</span><span>● ● ●</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ font: '900 11px/1 Nunito', color: '#7a6a52', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Hi Maya 👋</div>
          <h2 style={{ font: '900 26px/1.05 Fraunces', margin: '6px 0 0' }}>Let's earn coins!</h2>
        </div>
        <div style={{ background: '#fff', borderRadius: 999, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, font: '900 14px/1 Nunito', border: '2px solid #1A1208', boxShadow: '0 3px 0 #1A1208' }}>
          <span style={{ color: '#E8A722' }}>●</span> 142
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <PipDuo size={220} mood="excited"/>
          <div style={{ position: 'absolute', top: 8, right: -110, background: '#fff', borderRadius: 14, padding: '10px 14px', font: '700 12px/1.4 Nunito', boxShadow: '0 3px 0 #1A1208', maxWidth: 150, border: '2.5px solid #1A1208' }}>
            Make your bed for <b>+10</b> coins!
            <div style={{ position: 'absolute', bottom: -10, left: 16, width: 14, height: 14, background: '#fff', borderLeft: '2.5px solid #1A1208', borderBottom: '2.5px solid #1A1208', transform: 'rotate(-45deg)' }}></div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 18, padding: 14, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 3px 0 #1A1208', border: '2.5px solid #1A1208' }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FFE0B0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '2px solid #1A1208' }}>🛏</div>
        <div style={{ flex: 1 }}>
          <div style={{ font: '900 13px/1.2 Nunito' }}>Make your bed</div>
          <div style={{ font: '700 10px/1 Nunito', color: '#7a6a52', marginTop: 3 }}>Daily · 8am</div>
        </div>
        <div style={{ background: '#E55A1F', color: '#fff', padding: '8px 14px', borderRadius: 999, font: '900 13px/1 Nunito', border: '2px solid #1A1208' }}>+10</div>
      </div>
    </div>
  );
}

Object.assign(window, { PipDuo, PipHeroCard, PipExpressionsRow, PipScalePoses, PipBrandLockup, PipAppliedHero });
