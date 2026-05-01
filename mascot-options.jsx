/* Pip — three mascot directions, all the same character (acorn-coin squirrel) */

/* ──────────────────────────────────────────────────────────────────────── */
/* A · Chunky 3D / plush — soft gradients, dimensional shading              */
/* ──────────────────────────────────────────────────────────────────────── */
function Squirrel3D({ size = 320, mood = 'happy', pose = 'front' }) {
  const w = size, h = size;
  // Eyes by mood
  const eyes = {
    happy:  <g><circle cx="160" cy="195" r="11" fill="#1A1208"/><circle cx="240" cy="195" r="11" fill="#1A1208"/><circle cx="163" cy="191" r="3.5" fill="#fff"/><circle cx="243" cy="191" r="3.5" fill="#fff"/></g>,
    smile:  <g><path d="M150 198 Q160 188 170 198" stroke="#1A1208" strokeWidth="6" fill="none" strokeLinecap="round"/><path d="M230 198 Q240 188 250 198" stroke="#1A1208" strokeWidth="6" fill="none" strokeLinecap="round"/></g>,
    wink:   <g><circle cx="160" cy="195" r="11" fill="#1A1208"/><circle cx="163" cy="191" r="3.5" fill="#fff"/><path d="M230 198 Q240 188 250 198" stroke="#1A1208" strokeWidth="6" fill="none" strokeLinecap="round"/></g>,
    excited:<g><path d="M155 188 L165 200 M165 188 L155 200" stroke="#1A1208" strokeWidth="5" strokeLinecap="round"/><path d="M235 188 L245 200 M245 188 L235 200" stroke="#1A1208" strokeWidth="5" strokeLinecap="round"/></g>,
    sleep:  <g><path d="M150 195 Q160 200 170 195" stroke="#1A1208" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M230 195 Q240 200 250 195" stroke="#1A1208" strokeWidth="5" fill="none" strokeLinecap="round"/></g>,
    sad:    <g><circle cx="160" cy="200" r="9" fill="#1A1208"/><circle cx="240" cy="200" r="9" fill="#1A1208"/><path d="M150 188 Q160 184 170 188" stroke="#1A1208" strokeWidth="4" fill="none" strokeLinecap="round"/><path d="M230 188 Q240 184 250 188" stroke="#1A1208" strokeWidth="4" fill="none" strokeLinecap="round"/></g>,
  }[mood] || null;

  return (
    <svg viewBox="0 0 400 400" width={w} height={h} style={{ display: 'block' }}>
      <defs>
        <radialGradient id="s3-body" cx="0.4" cy="0.35" r="0.85">
          <stop offset="0" stopColor="#FFB070"/>
          <stop offset="0.6" stopColor="#E5742D"/>
          <stop offset="1" stopColor="#A24B14"/>
        </radialGradient>
        <radialGradient id="s3-belly" cx="0.5" cy="0.45" r="0.7">
          <stop offset="0" stopColor="#FFF1D8"/>
          <stop offset="1" stopColor="#F4D9AE"/>
        </radialGradient>
        <radialGradient id="s3-tail" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#FFC68C"/>
          <stop offset="1" stopColor="#C45A18"/>
        </radialGradient>
        <radialGradient id="s3-acorn-cap" cx="0.4" cy="0.3">
          <stop offset="0" stopColor="#7A4920"/>
          <stop offset="1" stopColor="#3D2208"/>
        </radialGradient>
        <radialGradient id="s3-coin" cx="0.4" cy="0.3">
          <stop offset="0" stopColor="#FFE89C"/>
          <stop offset="0.7" stopColor="#F2B53A"/>
          <stop offset="1" stopColor="#A36F0F"/>
        </radialGradient>
        <filter id="s3-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4"/>
        </filter>
      </defs>

      {/* tail — big curl behind body */}
      <g>
        <path d="M 75 250 C 30 200 30 100 90 80 C 150 60 180 130 165 200 C 158 235 130 270 100 280 C 80 285 70 270 75 250 Z"
              fill="url(#s3-tail)"/>
        {/* tail tuft highlight */}
        <path d="M 80 100 C 110 80 145 95 150 130" stroke="rgba(255,255,255,0.3)" strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* tail stripes */}
        <path d="M 95 130 C 115 120 135 130 140 160" stroke="rgba(122,73,32,0.3)" strokeWidth="4" fill="none"/>
        <path d="M 90 175 C 115 165 140 175 145 200" stroke="rgba(122,73,32,0.3)" strokeWidth="4" fill="none"/>
      </g>

      {/* body */}
      <ellipse cx="200" cy="270" rx="115" ry="105" fill="url(#s3-body)"/>

      {/* belly — lighter cream */}
      <ellipse cx="200" cy="285" rx="80" ry="78" fill="url(#s3-belly)"/>

      {/* feet */}
      <ellipse cx="160" cy="370" rx="28" ry="14" fill="#A24B14"/>
      <ellipse cx="240" cy="370" rx="28" ry="14" fill="#A24B14"/>

      {/* coin-acorn held in arms */}
      <g transform="translate(200,300)">
        <circle r="42" fill="url(#s3-coin)" stroke="#9F6810" strokeWidth="2"/>
        {/* dollar sign */}
        <text x="0" y="12" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="50" fill="#7A4D08">$</text>
        {/* acorn cap on top */}
        <path d="M -42 -10 Q -45 -30 -25 -38 Q 0 -48 25 -38 Q 45 -30 42 -10 Z" fill="url(#s3-acorn-cap)"/>
        <circle cx="0" cy="-46" r="4" fill="#3D2208"/>
        {/* cap texture stipple */}
        <circle cx="-15" cy="-25" r="2" fill="rgba(255,255,255,0.2)"/>
        <circle cx="15" cy="-22" r="2" fill="rgba(255,255,255,0.2)"/>
        <circle cx="0" cy="-18" r="2" fill="rgba(255,255,255,0.2)"/>
      </g>

      {/* arms holding coin */}
      <ellipse cx="160" cy="290" rx="22" ry="35" fill="#C45A18" transform="rotate(-15 160 290)"/>
      <ellipse cx="240" cy="290" rx="22" ry="35" fill="#C45A18" transform="rotate(15 240 290)"/>

      {/* head — slightly smaller, on top */}
      <ellipse cx="200" cy="180" rx="92" ry="85" fill="url(#s3-body)"/>

      {/* ears */}
      <g>
        <ellipse cx="142" cy="115" rx="22" ry="32" fill="#C45A18" transform="rotate(-20 142 115)"/>
        <ellipse cx="142" cy="120" rx="11" ry="20" fill="#FFD9B0" transform="rotate(-20 142 120)"/>
        {/* tuft */}
        <path d="M 132 95 Q 128 85 138 80 Q 140 90 138 100" fill="#A24B14"/>
      </g>
      <g>
        <ellipse cx="258" cy="115" rx="22" ry="32" fill="#C45A18" transform="rotate(20 258 115)"/>
        <ellipse cx="258" cy="120" rx="11" ry="20" fill="#FFD9B0" transform="rotate(20 258 120)"/>
        <path d="M 268 95 Q 272 85 262 80 Q 260 90 262 100" fill="#A24B14"/>
      </g>

      {/* face mask — light fur around eyes/snout */}
      <ellipse cx="200" cy="210" rx="55" ry="42" fill="rgba(255,241,216,0.85)"/>

      {/* cheeks */}
      <circle cx="148" cy="225" r="13" fill="#FF8B6B" opacity="0.55"/>
      <circle cx="252" cy="225" r="13" fill="#FF8B6B" opacity="0.55"/>

      {/* eyes */}
      {eyes}

      {/* nose */}
      <ellipse cx="200" cy="225" rx="9" ry="7" fill="#1A1208"/>
      {/* mouth */}
      <path d="M 200 232 Q 200 245 188 245 M 200 232 Q 200 245 212 245" stroke="#1A1208" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* tooth */}
      <rect x="196" y="246" width="8" height="10" rx="2" fill="#fff" stroke="#1A1208" strokeWidth="1.5"/>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* B · Flat vector — clean shapes, sticker-ready                           */
/* ──────────────────────────────────────────────────────────────────────── */
function SquirrelFlat({ size = 320, mood = 'happy' }) {
  const eyes = {
    happy: <g><circle cx="160" cy="195" r="9" fill="#1A1208"/><circle cx="240" cy="195" r="9" fill="#1A1208"/></g>,
    smile: <g><path d="M152 195 Q160 188 168 195" stroke="#1A1208" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M232 195 Q240 188 248 195" stroke="#1A1208" strokeWidth="5" fill="none" strokeLinecap="round"/></g>,
    wink:  <g><circle cx="160" cy="195" r="9" fill="#1A1208"/><path d="M232 195 Q240 188 248 195" stroke="#1A1208" strokeWidth="5" fill="none" strokeLinecap="round"/></g>,
    excited:<g><path d="M155 188 L165 200 M165 188 L155 200" stroke="#1A1208" strokeWidth="4" strokeLinecap="round"/><path d="M235 188 L245 200 M245 188 L235 200" stroke="#1A1208" strokeWidth="4" strokeLinecap="round"/></g>,
    sleep: <g><path d="M150 195 Q160 200 170 195" stroke="#1A1208" strokeWidth="4" fill="none" strokeLinecap="round"/><path d="M230 195 Q240 200 250 195" stroke="#1A1208" strokeWidth="4" fill="none" strokeLinecap="round"/></g>,
    sad:   <g><circle cx="160" cy="198" r="8" fill="#1A1208"/><circle cx="240" cy="198" r="8" fill="#1A1208"/><path d="M150 188 Q160 184 170 188" stroke="#1A1208" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M230 188 Q240 184 250 188" stroke="#1A1208" strokeWidth="3.5" fill="none" strokeLinecap="round"/></g>,
  }[mood] || null;

  return (
    <svg viewBox="0 0 400 400" width={size} height={size} style={{ display: 'block' }}>
      {/* tail */}
      <path d="M 70 250 C 25 200 30 100 90 80 C 145 65 175 130 160 200 C 153 235 125 270 100 280 C 78 285 70 268 70 250 Z"
            fill="#E55A1F"/>
      {/* tail inner stripe */}
      <path d="M 90 100 C 130 90 150 130 140 175"
            stroke="#FFB070" strokeWidth="14" fill="none" strokeLinecap="round"/>

      {/* body */}
      <ellipse cx="200" cy="275" rx="115" ry="105" fill="#E55A1F"/>
      {/* belly */}
      <ellipse cx="200" cy="285" rx="78" ry="76" fill="#FFE0B0"/>
      {/* feet */}
      <ellipse cx="160" cy="370" rx="26" ry="12" fill="#1A1208"/>
      <ellipse cx="240" cy="370" rx="26" ry="12" fill="#1A1208"/>

      {/* arms */}
      <ellipse cx="155" cy="290" rx="20" ry="32" fill="#E55A1F" transform="rotate(-15 155 290)"/>
      <ellipse cx="245" cy="290" rx="20" ry="32" fill="#E55A1F" transform="rotate(15 245 290)"/>

      {/* coin held */}
      <circle cx="200" cy="300" r="40" fill="#FFC93C" stroke="#1A1208" strokeWidth="4"/>
      <text x="200" y="312" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="44" fill="#1A1208">$</text>

      {/* head */}
      <ellipse cx="200" cy="180" rx="92" ry="82" fill="#E55A1F"/>

      {/* ears */}
      <ellipse cx="142" cy="115" rx="22" ry="30" fill="#E55A1F" transform="rotate(-20 142 115)"/>
      <ellipse cx="142" cy="118" rx="10" ry="18" fill="#FFB070" transform="rotate(-20 142 118)"/>
      <ellipse cx="258" cy="115" rx="22" ry="30" fill="#E55A1F" transform="rotate(20 258 115)"/>
      <ellipse cx="258" cy="118" rx="10" ry="18" fill="#FFB070" transform="rotate(20 258 118)"/>
      {/* ear tufts */}
      <path d="M 130 92 L 128 78 L 138 88 Z" fill="#E55A1F"/>
      <path d="M 270 92 L 272 78 L 262 88 Z" fill="#E55A1F"/>

      {/* face mask */}
      <ellipse cx="200" cy="210" rx="52" ry="38" fill="#FFE0B0"/>

      {/* cheeks */}
      <circle cx="150" cy="225" r="11" fill="#FF6B35" opacity="0.45"/>
      <circle cx="250" cy="225" r="11" fill="#FF6B35" opacity="0.45"/>

      {eyes}

      {/* nose */}
      <ellipse cx="200" cy="225" rx="8" ry="6" fill="#1A1208"/>
      {/* mouth */}
      <path d="M 200 230 L 200 240 M 200 240 Q 192 245 188 240 M 200 240 Q 208 245 212 240"
            stroke="#1A1208" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* C · Geometric — circles + arcs only                                     */
/* ──────────────────────────────────────────────────────────────────────── */
function SquirrelGeo({ size = 320, mood = 'happy' }) {
  const eyes = {
    happy: <g><circle cx="160" cy="195" r="8" fill="#2A1A0A"/><circle cx="240" cy="195" r="8" fill="#2A1A0A"/></g>,
    smile: <g><path d="M152 198 Q160 190 168 198" stroke="#2A1A0A" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M232 198 Q240 190 248 198" stroke="#2A1A0A" strokeWidth="5" fill="none" strokeLinecap="round"/></g>,
    wink:  <g><circle cx="160" cy="195" r="8" fill="#2A1A0A"/><path d="M232 198 Q240 190 248 198" stroke="#2A1A0A" strokeWidth="5" fill="none" strokeLinecap="round"/></g>,
    excited:<g><circle cx="160" cy="195" r="11" fill="#2A1A0A"/><circle cx="160" cy="193" r="3" fill="#fff"/><circle cx="240" cy="195" r="11" fill="#2A1A0A"/><circle cx="240" cy="193" r="3" fill="#fff"/></g>,
    sleep: <g><path d="M152 195 Q160 200 168 195" stroke="#2A1A0A" strokeWidth="4" fill="none" strokeLinecap="round"/><path d="M232 195 Q240 200 248 195" stroke="#2A1A0A" strokeWidth="4" fill="none" strokeLinecap="round"/></g>,
    sad:   <g><circle cx="160" cy="200" r="7" fill="#2A1A0A"/><circle cx="240" cy="200" r="7" fill="#2A1A0A"/></g>,
  }[mood] || null;

  return (
    <svg viewBox="0 0 400 400" width={size} height={size} style={{ display: 'block' }}>
      {/* tail — quarter-arc */}
      <path d="M 90 280 A 110 110 0 0 1 90 80 A 60 60 0 0 1 160 130 A 70 70 0 0 0 90 280 Z"
            fill="#D9531B"/>
      {/* tail inner — concentric arc */}
      <path d="M 105 240 A 70 70 0 0 1 110 110 A 25 25 0 0 1 130 130"
            stroke="#FFD0A8" strokeWidth="14" fill="none" strokeLinecap="round"/>

      {/* body — pure circle */}
      <circle cx="200" cy="265" r="105" fill="#E66B2C"/>
      {/* belly — smaller circle */}
      <circle cx="200" cy="280" r="72" fill="#FFE6BD"/>

      {/* feet — circles */}
      <circle cx="165" cy="360" r="14" fill="#2A1A0A"/>
      <circle cx="235" cy="360" r="14" fill="#2A1A0A"/>

      {/* coin — circle (held in front) */}
      <circle cx="200" cy="295" r="38" fill="#FFC93C" stroke="#2A1A0A" strokeWidth="3"/>
      <circle cx="200" cy="295" r="32" fill="none" stroke="#2A1A0A" strokeWidth="1.5" strokeDasharray="3 3"/>
      <text x="200" y="307" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="40" fill="#2A1A0A">$</text>

      {/* head — circle */}
      <circle cx="200" cy="180" r="80" fill="#E66B2C"/>

      {/* ears — circles */}
      <circle cx="148" cy="120" r="22" fill="#E66B2C"/>
      <circle cx="148" cy="120" r="11" fill="#FFD0A8"/>
      <circle cx="252" cy="120" r="22" fill="#E66B2C"/>
      <circle cx="252" cy="120" r="11" fill="#FFD0A8"/>

      {/* face mask — circle */}
      <circle cx="200" cy="210" r="42" fill="#FFE6BD"/>

      {/* cheeks */}
      <circle cx="156" cy="222" r="9" fill="#FF6B35" opacity="0.5"/>
      <circle cx="244" cy="222" r="9" fill="#FF6B35" opacity="0.5"/>

      {eyes}

      {/* nose — small circle */}
      <circle cx="200" cy="225" r="6" fill="#2A1A0A"/>
      {/* mouth — arc */}
      <path d="M 192 238 Q 200 244 208 238" stroke="#2A1A0A" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Cards / showcases                                                       */
/* ──────────────────────────────────────────────────────────────────────── */
function MascotCard({ label, name, tag, personality, mascot, bg, accent }) {
  return (
    <div style={{ width: '100%', height: '100%', background: bg, borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '900 16px/1 Nunito' }}>{label}</div>
        <div style={{ font: '700 11px/1 Nunito', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.55)', textAlign: 'right' }}>{tag}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{mascot}</div>
      <div>
        <h3 style={{ font: '800 32px/1 Fraunces', margin: '0 0 8px' }}>{name}<span style={{ color: accent }}>.</span></h3>
        <p style={{ font: '500 13px/1.45 Nunito', color: 'rgba(0,0,0,0.7)', margin: 0 }}>{personality}</p>
      </div>
    </div>
  );
}

function ExpressionsRow({ style }) {
  const Mascot = style === '3d' ? Squirrel3D : style === 'flat' ? SquirrelFlat : SquirrelGeo;
  const moods = ['happy', 'smile', 'wink', 'excited', 'sleep', 'sad'];
  const labels = ['Default', 'Smile', 'Wink', 'Excited', 'Sleeping', 'Aw…'];
  return (
    <div style={{ width: '100%', height: '100%', background: '#FFF8EC', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      {moods.map((m, i) => (
        <div key={m} style={{ textAlign: 'center' }}>
          <div style={{ width: 200, height: 200 }}><Mascot size={200} mood={m}/></div>
          <div style={{ font: '700 12px/1 Nunito', color: '#5b5b58', marginTop: 6, letterSpacing: '0.05em' }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

function ScalePoses() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#FFF8EC', padding: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: 32 }}>
      {[
        { size: 48, label: 'App icon · 48px', bg: '#E55A1F', round: 14 },
        { size: 96, label: 'Header · 96px', bg: '#FFE0B0', round: 18 },
        { size: 160, label: 'Sticker · 160px', bg: '#FFC93C', round: 22 },
        { size: 240, label: 'Hero · 240px', bg: '#FAF6EE', round: 26 },
      ].map(({ size, label, bg, round }) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <div style={{ width: size + 24, height: size + 24, borderRadius: round, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SquirrelFlat size={size}/>
          </div>
          <div style={{ font: '700 11px/1 Nunito', color: '#5b5b58', marginTop: 8, letterSpacing: '0.04em' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function BrandLockup({ style }) {
  const Mascot = style === '3d' ? Squirrel3D : style === 'flat' ? SquirrelFlat : SquirrelGeo;
  return (
    <div style={{ width: '100%', height: '100%', background: '#FAF6EE', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 20 }}>
      <Mascot size={140}/>
      <div>
        <h2 style={{ font: '800 60px/1 Fraunces', margin: 0 }}>Rewardify<span style={{ color: '#E55A1F' }}>.</span></h2>
        <div style={{ font: '700 12px/1 Nunito', color: '#7a6a52', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 6 }}>with Pip · your money buddy</div>
      </div>
    </div>
  );
}

function AppliedHero({ style }) {
  const Mascot = style === '3d' ? Squirrel3D : style === 'flat' ? SquirrelFlat : SquirrelGeo;
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #FFF8EC 0%, #FFE0B0 100%)', borderRadius: 32, padding: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', font: '900 13px/1 Nunito', marginBottom: 10 }}>
        <span>9:41</span><span>● ● ●</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ font: '700 11px/1 Nunito', color: '#7a6a52', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Hi Maya 👋</div>
          <h2 style={{ font: '800 24px/1.1 Fraunces', margin: '4px 0 0' }}>Let's earn coins!</h2>
        </div>
        <div style={{ background: '#fff', borderRadius: 999, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, font: '900 14px/1 Nunito', boxShadow: '0 2px 0 rgba(0,0,0,0.08)' }}>
          <span style={{ color: '#F2B53A' }}>●</span> 142
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <Mascot size={200}/>
          <div style={{ position: 'absolute', top: -10, right: -90, background: '#fff', borderRadius: 14, padding: '8px 12px', font: '700 12px/1.3 Nunito', boxShadow: '0 3px 0 rgba(0,0,0,0.08)', maxWidth: 140 }}>
            "Make your bed for <b>+10</b> coins!"
            <div style={{ position: 'absolute', bottom: -6, left: 12, width: 12, height: 12, background: '#fff', transform: 'rotate(45deg)' }}></div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 18, padding: 14, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 3px 0 rgba(0,0,0,0.08)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FFE0B0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🛏</div>
        <div style={{ flex: 1 }}>
          <div style={{ font: '800 13px/1.2 Nunito' }}>Make your bed</div>
          <div style={{ font: '700 10px/1 Nunito', color: '#7a6a52', marginTop: 3 }}>Daily · 8am</div>
        </div>
        <div style={{ background: '#E55A1F', color: '#fff', padding: '8px 14px', borderRadius: 999, font: '900 13px/1 Nunito' }}>+10</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Squirrel3D, SquirrelFlat, SquirrelGeo,
  MascotCard, ExpressionsRow, ColorRow: null, BrandLockup, ScalePoses, AppliedHero,
});
