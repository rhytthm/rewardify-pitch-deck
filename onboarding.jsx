/* onboarding.jsx — Onboarding + Badge unlock + Task complete celebration */

const { useState: useSO } = React;

function Onboarding({ onDone }) {
  const [step, setStep] = useSO(0);
  const slides = [
    {
      title: 'Meet Pip!',
      sub: 'Your coin-keeping buddy. Pip helps you earn, save, and grow.',
      art: <Pip size={180} mood="happy" wave/>,
      bg: 'linear-gradient(180deg, #FFE9A3, #FFC93C)',
    },
    {
      title: 'Squirrels stash for the future',
      sub: 'Pip is a squirrel — and squirrels are nature\'s savers. He\'ll help you stash coins today so you have plenty tomorrow.',
      art: <Pip size={180} mood="excited"/>,
      bg: 'linear-gradient(180deg, #FFE0B0, #FF9D3F)',
    },
    {
      title: 'Earn coins for missions',
      sub: 'Make your bed, finish homework, walk the dog — every mission earns real coins.',
      art: <div style={{ fontSize: 110 }}>🛏✨</div>,
      bg: 'linear-gradient(180deg, #FFD9D2, #FF7A6B)',
    },
    {
      title: 'Spend on real rewards',
      sub: 'Your parents stock the shop with toys, games, treats. You decide when to spend.',
      art: <div style={{ fontSize: 110 }}>🎁</div>,
      bg: 'linear-gradient(180deg, #C7E8FF, #57B5F5)',
    },
    {
      title: 'Or grow them in the Garden 🌱',
      sub: 'Plant coins and they grow over time. Welcome to compounding!',
      art: <div style={{ fontSize: 110 }}>🌱</div>,
      bg: 'linear-gradient(180deg, #DFF7E9, #58D6A8)',
    },
  ];
  const s = slides[step];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: s.bg, transition: 'background 0.4s ease' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '90px 32px 0' }}>
        <div className="pop-in" key={step} style={{ marginBottom: 32 }}>{s.art}</div>
        <h1 style={{ font: '900 30px/1.1 Nunito', margin: 0, textAlign: 'center', color: '#2A1F12', letterSpacing: '-0.02em' }}>{s.title}</h1>
        <p style={{ font: '700 15px/1.4 Nunito', textAlign: 'center', color: 'rgba(42,31,18,0.7)', margin: '12px 0 0', maxWidth: 280 }}>{s.sub}</p>
      </div>
      <div style={{ padding: '0 24px 50px' }}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 24 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 999, background: i === step ? '#2A1F12' : 'rgba(42,31,18,0.25)', transition: 'all 0.2s ease' }}/>
          ))}
        </div>
        <button
          onClick={() => step < slides.length - 1 ? setStep(step + 1) : onDone()}
          className="btn full"
          style={{ background: '#2A1F12', color: '#fff' }}
        >
          {step < slides.length - 1 ? 'Next' : 'Let\'s go!'}
        </button>
        {step < slides.length - 1 && (
          <button onClick={onDone} className="btn ghost full" style={{ marginTop: 8, height: 40, fontSize: 13, background: 'transparent' }}>Skip intro</button>
        )}
      </div>
    </div>
  );
}

function BadgeUnlock({ badge, onClose }) {
  return (
    <Modal onClose={onClose}>
      <Confetti onDone={() => {}} durationMs={3000}/>
      <div className="pop-in" style={{ width: 320, background: '#fff', borderRadius: 28, padding: '36px 28px 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Achievement unlocked</div>
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #FFE08A, #FFC93C 60%, #E59100)',
          margin: '16px auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 60,
          boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.5), 0 8px 0 #C28000, 0 12px 30px rgba(255,201,60,0.5)',
          animation: 'badge-spin 0.8s cubic-bezier(.34,1.56,.64,1)',
        }}>{badge.icon}</div>
        <h2 style={{ font: '900 24px/1.1 Nunito', margin: '0 0 6px' }}>{badge.name}</h2>
        <p style={{ font: '700 13px/1.4 Nunito', color: 'var(--ink-2)', margin: '0 0 20px' }}>{badge.desc || 'You earned a new badge!'}</p>
        <button onClick={onClose} className="btn coin full">Awesome!</button>
        <style>{`
          @keyframes badge-spin {
            0% { transform: scale(0) rotate(-180deg); }
            70% { transform: scale(1.15) rotate(10deg); }
            100% { transform: scale(1) rotate(0); }
          }
        `}</style>
      </div>
    </Modal>
  );
}

Object.assign(window, { Onboarding, BadgeUnlock });
