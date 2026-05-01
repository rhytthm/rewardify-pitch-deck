/* kid-screens-2.jsx — Wallet, Achievements, Learn, Garden (invest), Me */

const { useState: useS2, useEffect: useE2 } = React;

/* ──────────────── WALLET / HISTORY ──────────────── */
function KidWallet({ kid, history, onPlant }) {
  const earned = history.filter(h => h.amount > 0).reduce((s, h) => s + h.amount, 0);
  const spent = history.filter(h => h.amount < 0).reduce((s, h) => s + Math.abs(h.amount), 0);
  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px' }}>
        <h1 style={{ font: '900 30px/1 Nunito', margin: 0, letterSpacing: '-0.02em' }}>Wallet</h1>
      </div>

      {/* Balance card */}
      <div style={{
        background: 'linear-gradient(135deg, #2A1F12 0%, #4A3318 100%)',
        borderRadius: 24,
        padding: 22,
        color: '#FFE08A',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,201,60,0.25), transparent 70%)' }}/>
        <div style={{ font: '700 11px/1 Nunito', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.75 }}>Balance</div>
        <div style={{ font: '900 42px/1 Nunito', marginTop: 8, color: '#FFE08A', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Coin size={32}/>{kid.coins}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 16, font: '700 12px/1 Nunito' }}>
          <div><span style={{ opacity: 0.6 }}>Earned</span> <span style={{ color: '#58D6A8', marginLeft: 6 }}>+{earned}</span></div>
          <div><span style={{ opacity: 0.6 }}>Spent</span> <span style={{ color: '#FF7A6B', marginLeft: 6 }}>-{spent}</span></div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
        <button onClick={onPlant} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 14, cursor: 'pointer', border: 0, font: 'inherit' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(88,214,168,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🌱</div>
          <div style={{ font: '800 12px/1 Nunito' }}>Plant</div>
        </button>
        <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 14, cursor: 'pointer', border: 0, font: 'inherit' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(87,181,245,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎁</div>
          <div style={{ font: '800 12px/1 Nunito' }}>Gift</div>
        </button>
        <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 14, cursor: 'pointer', border: 0, font: 'inherit' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(155,123,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💱</div>
          <div style={{ font: '800 12px/1 Nunito' }}>Convert</div>
        </button>
      </div>

      <div className="h-eyebrow">Recent activity</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {history.map(h => (
          <div key={h.id} className="row">
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: h.amount > 0 ? 'rgba(88,214,168,0.18)' : h.kind === 'plant' ? 'rgba(155,123,255,0.18)' : 'rgba(255,122,107,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>
              {h.amount > 0 ? '+' : h.kind === 'plant' ? '🌱' : '−'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ font: '800 13px/1.2 Nunito' }}>{h.label}</div>
              <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>{h.sub}</div>
            </div>
            <div style={{
              font: '900 14px/1 Nunito',
              color: h.amount > 0 ? '#1F7855' : h.kind === 'plant' ? '#5A3CC0' : '#B23A2C',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {h.amount > 0 ? '+' : ''}{h.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── ACHIEVEMENTS ──────────────── */
function KidAchievements({ kid, badges }) {
  const earned = badges.filter(b => b.earned);
  const inProgress = badges.filter(b => !b.earned);
  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px' }}>
        <h1 style={{ font: '900 30px/1 Nunito', margin: 0, letterSpacing: '-0.02em' }}>Trophies</h1>
        <div style={{ font: '700 13px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 6 }}>{earned.length} earned · {inProgress.length} in progress</div>
      </div>

      {/* Streak hero */}
      <div style={{
        background: 'linear-gradient(135deg, #FF7A6B 0%, #FFB14D 100%)',
        borderRadius: 24, padding: 20, color: '#fff', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 14,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontSize: 56 }}>🔥</div>
        <div style={{ flex: 1 }}>
          <div style={{ font: '900 32px/1 Nunito' }}>{kid.streak} day streak</div>
          <div style={{ font: '700 12px/1.3 Nunito', opacity: 0.9, marginTop: 6 }}>Keep going! 7 more days for a 🏆 14-Day badge</div>
        </div>
      </div>

      {/* Earned badges */}
      <div className="h-eyebrow">Earned</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
        {earned.map(b => (
          <div key={b.id} style={{
            background: '#fff',
            borderRadius: 16, padding: 12,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            border: '0.5px solid var(--line)',
            boxShadow: '0 2px 0 rgba(42,31,18,0.05)',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #FFE08A, #FFC93C 60%, #E59100)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 2px 0 #C28000',
            }}>{b.icon}</div>
            <div style={{ font: '800 12px/1.1 Nunito', textAlign: 'center' }}>{b.name}</div>
            <div style={{ font: '700 10px/1 Nunito', color: 'var(--ink-3)' }}>{b.date}</div>
          </div>
        ))}
      </div>

      {/* In-progress */}
      <div className="h-eyebrow">Locked</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {inProgress.map(b => (
          <div key={b.id} className="row">
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, filter: 'grayscale(0.6)', opacity: 0.7,
            }}>{b.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ font: '800 13px/1.2 Nunito' }}>{b.name}</div>
              <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>{b.desc}</div>
              <div className="progress" style={{ marginTop: 6, height: 6 }}><i style={{ width: `${b.progress * 100}%` }}/></div>
            </div>
            <Ic.lock size={16} color="var(--ink-3)"/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── LEARN ──────────────── */
function KidLearn({ lessons, onOpenLesson }) {
  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px' }}>
        <h1 style={{ font: '900 30px/1 Nunito', margin: 0, letterSpacing: '-0.02em' }}>Money School</h1>
        <div style={{ font: '700 13px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 6 }}>Earn coins by learning · 2 of 6 done</div>
      </div>

      {/* Section banner */}
      <div style={{
        background: 'linear-gradient(135deg, #58D6A8 0%, #57B5F5 100%)',
        borderRadius: 22, padding: 18,
        marginBottom: 22, color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ font: '700 11px/1 Nunito', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85 }}>Unit 1</div>
        <div style={{ font: '900 22px/1.1 Nunito', marginTop: 4, marginBottom: 8 }}>Money Basics</div>
        <div className="progress" style={{ background: 'rgba(0,0,0,0.18)', maxWidth: 200 }}>
          <i style={{ width: '34%', background: '#fff' }}/>
        </div>
        <div style={{ position: 'absolute', right: 12, top: 12, fontSize: 50 }}>📘</div>
      </div>

      {/* Lesson path */}
      <div style={{ position: 'relative' }}>
        {lessons.map((l, i) => {
          const offset = [0, 60, -40, 50, -30, 30][i % 6];
          const locked = l.status === 'locked';
          const done = l.status === 'done';
          const current = l.status === 'current';
          return (
            <div key={l.id} style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, transform: `translateX(${offset}px)` }}>
              <button
                disabled={locked}
                onClick={() => !locked && onOpenLesson(l)}
                style={{
                  appearance: 'none', border: 0, padding: 0, background: 'transparent',
                  cursor: locked ? 'not-allowed' : 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  opacity: locked ? 0.5 : 1,
                }}>
                <div style={{
                  width: 84, height: 84, borderRadius: '50%',
                  background: done ? '#58D6A8' : current ? l.color : 'rgba(0,0,0,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 38, color: '#fff',
                  boxShadow: current ? `0 6px 0 ${l.color}aa, 0 0 0 6px ${l.color}33` : done ? '0 4px 0 #2FA47B' : 'none',
                  position: 'relative',
                }}>
                  {done ? <Ic.check size={36} color="#fff" strokeWidth={3.5}/> : locked ? <Ic.lock size={28} color="var(--ink-3)"/> : '⭐'}
                  {current && (
                    <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: l.color, font: '900 9px/1 Nunito', padding: '4px 8px', borderRadius: 999, letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', whiteSpace: 'nowrap' }}>Start</div>
                  )}
                </div>
                <div style={{ textAlign: 'center', maxWidth: 140 }}>
                  <div style={{ font: '900 13px/1.2 Nunito' }}>{l.title}</div>
                  <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Ic.clock size={12}/>{l.mins} min · <Coin size={11}/>{l.xp}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LessonModal({ lesson, onClose, onComplete }) {
  return (
    <Modal onClose={onClose}>
      <div className="pop-in" style={{ width: 340, background: '#fff', borderRadius: 24, overflow: 'hidden' }}>
        <div style={{
          background: lesson.color, padding: '24px 24px 18px', color: '#fff',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ fontSize: 42 }}>📘</div>
          <div style={{ flex: 1 }}>
            <div style={{ font: '700 11px/1 Nunito', opacity: 0.85, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Lesson</div>
            <div style={{ font: '900 18px/1.15 Nunito', marginTop: 4 }}>{lesson.title}</div>
          </div>
          <button onClick={onClose} style={{ appearance: 'none', border: 0, background: 'rgba(0,0,0,0.15)', color: '#fff', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ic.x size={16}/></button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ font: '800 14px/1.5 Nunito', marginBottom: 14 }}>
            Imagine your saving jar 🫙. Every coin you don't spend can grow over time when you plant it in your Garden.
          </div>
          <div className="card" style={{ background: '#FFF8EC', padding: 14, marginBottom: 18 }}>
            <div style={{ font: '900 13px/1.2 Nunito', marginBottom: 8 }}>Quick check ⚡</div>
            <div style={{ font: '700 12px/1.3 Nunito', color: 'var(--ink-2)', marginBottom: 10 }}>If you save 5 coins each week for a month, how many do you have?</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['10', '20', '25'].map(o => (
                <button key={o} className="btn ghost sm" style={{ flex: 1 }}>{o}</button>
              ))}
            </div>
          </div>
          <button onClick={onComplete} className="btn coin full">Finish · earn <Coin size={16}/>{lesson.xp}</button>
        </div>
      </div>
    </Modal>
  );
}

/* ──────────────── COIN GARDEN (Invest) ──────────────── */
function KidGarden({ kid, planted = 64, weeklyDeposit = 5, rate = 0.08, onPlant }) {
  // Compute compound growth projection (52 weeks, weekly compounding from SIP)
  const projection = [];
  let bal = planted;
  for (let w = 0; w <= 52; w++) {
    projection.push({ w, bal: Math.round(bal) });
    bal = bal * (1 + rate / 52) + weeklyDeposit;
  }
  const maxBal = projection[projection.length - 1].bal;
  const w = 320, h = 140;
  const path = projection.map((p, i) => {
    const x = (i / 52) * w;
    const y = h - (p.bal / maxBal) * h;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const flat = planted + weeklyDeposit * 52; // no interest
  const earned = projection[52].bal - flat;

  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ font: '900 30px/1 Nunito', margin: 0, letterSpacing: '-0.02em' }}>Coin Garden</h1>
          <div style={{ font: '700 13px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 6 }}>Plant coins, watch them grow 🌱</div>
        </div>
        <div className="chip mint" style={{ height: 30 }}>+{(rate * 100).toFixed(0)}% / yr</div>
      </div>

      {/* Growth visualization */}
      <div style={{
        background: 'linear-gradient(180deg, #DFF7E9 0%, #B5ECD2 100%)',
        borderRadius: 22, padding: '18px 16px 14px',
        position: 'relative', overflow: 'hidden',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ font: '700 11px/1 Nunito', color: '#1F7855', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Planted</div>
            <div style={{ font: '900 32px/1 Nunito', color: '#0F4029', display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <Coin size={24}/>{planted}
            </div>
          </div>
          <div style={{ fontSize: 56 }}>🌱</div>
        </div>
        <svg width="100%" height={h + 20} viewBox={`0 -10 ${w} ${h + 20}`} style={{ display: 'block' }}>
          <defs>
            <linearGradient id="garden-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F7855" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#1F7855" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#garden-grad)"/>
          <path d={path} stroke="#1F7855" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          {/* end dot */}
          <circle cx={w} cy={h - (projection[52].bal / maxBal) * h} r="5" fill="#1F7855"/>
          <circle cx={w} cy={h - (projection[52].bal / maxBal) * h} r="9" fill="#1F7855" opacity="0.2"/>
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', font: '700 11px/1 Nunito', color: '#1F7855', marginTop: 4 }}>
          <span>Today</span><span>6 mo</span><span>1 year</span>
        </div>
      </div>

      {/* Projection card */}
      <div className="card" style={{ marginBottom: 16, padding: 16 }}>
        <div style={{ font: '800 13px/1.2 Nunito', marginBottom: 10 }}>In 1 year, you'll have</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <Coin size={24}/>
          <div style={{ font: '900 28px/1 Nunito' }}>{projection[52].bal}</div>
          <div className="chip mint" style={{ height: 22, fontSize: 11 }}>+{earned} from interest ✨</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <Stat label="Planted" value={planted} unit="coins"/>
          <Stat label="Weekly SIP" value={weeklyDeposit} unit="/week"/>
          <Stat label="Earned" value={earned} unit="coins" mint/>
        </div>
      </div>

      {/* What is this? */}
      <div className="card" style={{ marginBottom: 16, padding: 16, background: 'rgba(255,201,60,0.12)', borderColor: 'rgba(255,201,60,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 18 }}>✨</span>
          <div style={{ font: '900 13px/1 Nunito' }}>The magic of compounding</div>
        </div>
        <div style={{ font: '700 12px/1.4 Nunito', color: 'var(--ink-2)' }}>
          Each week your coins earn a tiny bit of interest. Then those coins earn interest too! That's how a small jar becomes a treasure chest.
        </div>
      </div>

      <button onClick={onPlant} className="btn coin full">Plant 10 coins 🌱</button>
      <button className="btn ghost full" style={{ marginTop: 8 }}>Set up weekly SIP</button>
    </div>
  );
}

function Stat({ label, value, unit, mint }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.04)', borderRadius: 12, padding: 10 }}>
      <div style={{ font: '700 10px/1 Nunito', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ font: '900 16px/1 Nunito', marginTop: 6, color: mint ? '#1F7855' : 'var(--ink)' }}>{value}<span style={{ font: '700 10px/1 Nunito', marginLeft: 3, color: 'var(--ink-3)' }}>{unit}</span></div>
    </div>
  );
}

Object.assign(window, { KidWallet, KidAchievements, KidLearn, LessonModal, KidGarden });
