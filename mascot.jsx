/* mascot.jsx — Pip wrapper.
   The actual squirrel art lives in pip-duo.jsx (PipDuo).
   This file keeps the legacy <Pip size mood wave speak/> API working
   by proxying to PipDuo, plus exports Coin / CoinAmount used across the app.
*/

function Pip({ size = 88, mood = 'happy', wave = false, speak = null }) {
  // Map legacy moods → PipDuo moods
  const moodMap = {
    happy: 'happy',
    smile: 'smile',
    wink: 'wink',
    star: 'excited',
    excited: 'excited',
    sleep: 'sleep',
    sleeping: 'sleep',
  };
  const m = moodMap[mood] || 'happy';

  return (
    <div
      className="pip"
      style={{
        width: size,
        height: size * (440 / 400),
        position: 'relative',
        display: 'inline-block',
        animation: wave ? 'pip-bob 1.6s ease-in-out infinite' : 'none',
      }}
    >
      <window.PipDuo size={size} mood={m}/>
      {speak && (
        <div
          style={{
            position: 'absolute',
            left: '92%',
            top: 4,
            background: '#fff',
            borderRadius: 16,
            padding: '10px 14px',
            font: '800 13px/1.2 Nunito',
            color: '#2A1F12',
            boxShadow: '0 4px 0 rgba(0,0,0,0.08)',
            border: '2px solid #1A1208',
            minWidth: 130,
            maxWidth: 200,
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -8,
              top: 18,
              width: 14,
              height: 14,
              background: '#fff',
              borderLeft: '2px solid #1A1208',
              borderBottom: '2px solid #1A1208',
              transform: 'rotate(45deg)',
            }}
          />
          {speak}
        </div>
      )}
      <style>{`
        @keyframes pip-bob {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-4px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   Coin chip + amount — used everywhere in the kid app.
   These are unchanged from the previous Pip file.
─────────────────────────────────────────────────────────── */

function Coin({ size = 18, label }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 30% 30%, #FFE9A3, #FFC93C 60%, #E59100)',
        border: '1.5px solid #1A1208',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
        font: `900 ${Math.round(size * 0.55)}px/1 Nunito`,
        color: '#6E4A00',
        verticalAlign: 'middle',
      }}
    >
      {label || '$'}
    </span>
  );
}

function CoinAmount({ amount, size = 18, color }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontWeight: 800,
        color: color || 'inherit',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <Coin size={size}/>
      <span>{amount.toLocaleString()}</span>
    </span>
  );
}

Object.assign(window, { Pip, Coin, CoinAmount });
