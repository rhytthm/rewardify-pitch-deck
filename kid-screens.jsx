/* kid-screens.jsx — Kid view screens */

const { useState, useEffect, useRef } = React;

/* ──────────────── HOME ──────────────── */
function KidHome({ kid, tasks, quests, onCompleteTask, fly }) {
  const dailyTasks = tasks.filter(t => t.recurring === 'daily').slice(0, 4);
  const doneCount = dailyTasks.filter(t => t.status === 'done').length;
  const xpPct = Math.round(kid.xp * 100);

  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      {/* Header — greeting + balance */}
      <div style={{ padding: '6px 0 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ font: '700 13px/1 Nunito', color: 'var(--ink-3)', marginBottom: 4 }}>Hey {kid.name} 👋</div>
          <h1 style={{ font: '900 26px/1.1 Nunito', margin: 0, letterSpacing: '-0.02em' }}>Let's earn today!</h1>
        </div>
        <div className="coin-badge"><Coin size={20}/>{kid.coins}</div>
      </div>

      {/* Hero card — Pip + level/XP/streak */}
      <div style={{
        background: 'linear-gradient(135deg, #FFC93C 0%, #FF9D3F 100%)',
        borderRadius: 24,
        padding: '16px 18px',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 168,
        boxShadow: '0 4px 0 rgba(229,145,0,0.25)',
      }}>
        <div style={{ position: 'absolute', right: -18, bottom: -22, pointerEvents: 'none' }}>
          <div className="bob"><Pip size={150} mood="excited" wave/></div>
        </div>
        <div style={{ position: 'absolute', top: 14, right: 18, fontSize: 12, opacity: 0.6 }}>✦</div>

        <div style={{ paddingRight: 130 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.18)', font: '900 11px/1 Nunito', color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            🔥 {kid.streak}-day streak
          </div>
          <div style={{ font: '900 20px/1.1 Nunito', color: '#fff', marginTop: 10 }}>Level {kid.level}</div>
          <div style={{ font: '700 12px/1.2 Nunito', color: 'rgba(255,255,255,0.85)', marginTop: 4, marginBottom: 8 }}>{xpPct} / 100 XP to level up</div>
          <div className="progress" style={{ background: 'rgba(0,0,0,0.18)' }}>
            <i style={{ width: `${xpPct}%`, background: '#fff' }}/>
          </div>
        </div>
      </div>

      {/* Today's missions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ font: '900 20px/1.1 Nunito', margin: 0 }}>Today's missions</h3>
        <span style={{ font: '800 12px/1 Nunito', color: 'var(--ink-3)' }}>{doneCount}/{dailyTasks.length} done</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
        {dailyTasks.map(t => <TaskRow key={t.id} task={t} onComplete={(e) => onCompleteTask(t, e)}/>)}
      </div>

      {/* Quests */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <h3 style={{ font: '900 20px/1.1 Nunito', margin: 0 }}>Weekly quests</h3>
        <span className="chip">{quests.length}</span>
      </div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, marginLeft: -16, paddingLeft: 16 }}>
        {quests.map(q => (
          <div key={q.id} style={{
            minWidth: 180, flexShrink: 0,
            background: '#fff', borderRadius: 18, padding: 14,
            border: '0.5px solid var(--line)',
            boxShadow: '0 3px 0 rgba(42,31,18,0.05)',
          }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{q.icon}</div>
            <div style={{ font: '900 13px/1.2 Nunito' }}>{q.title}</div>
            <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 3, marginBottom: 8 }}>{q.desc}</div>
            <div style={{ height: 8, borderRadius: 999, background: 'rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ height: '100%', width: `${(q.progress/q.total)*100}%`, background: 'linear-gradient(90deg, #58D6A8, #2FA47B)', borderRadius: 999 }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', font: '800 11px/1 Nunito' }}>
              <span style={{ color: 'var(--ink-3)' }}>{q.progress}/{q.total}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Coin size={12}/>{q.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── TASKS (List view, simpler) ──────────────── */
function KidTasks({ tasks, onCompleteTask, fly }) {
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Daily', 'Learning', 'Pets', 'School', 'Family'];
  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.cat === filter);
  const pending = filtered.filter(t => t.status === 'pending');
  const review = filtered.filter(t => t.status === 'review');
  const done = filtered.filter(t => t.status === 'done');

  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Pip size={56} mood="happy"/>
        <div>
          <h1 style={{ font: '900 26px/1 Nunito', margin: 0 }}>Missions</h1>
          <div style={{ font: '700 12px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>Tap the check to complete!</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 14, marginLeft: -16, paddingLeft: 16, paddingRight: 16 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            appearance: 'none', border: 0,
            padding: '8px 14px', borderRadius: 999,
            background: filter === c ? 'var(--ink)' : 'rgba(0,0,0,0.05)',
            color: filter === c ? '#fff' : 'var(--ink-2)',
            font: '800 12px/1 Nunito',
            flexShrink: 0, cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      {pending.length > 0 && <>
        <div className="h-eyebrow">To do · {pending.length}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          {pending.map(t => <TaskRow key={t.id} task={t} onComplete={(e) => onCompleteTask(t, e)}/>)}
        </div>
      </>}
      {review.length > 0 && <>
        <div className="h-eyebrow">Awaiting parent · {review.length}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          {review.map(t => <TaskRow key={t.id} task={t} onComplete={() => {}}/>)}
        </div>
      </>}
      {done.length > 0 && <>
        <div className="h-eyebrow">Completed · {done.length}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {done.map(t => <TaskRow key={t.id} task={t} onComplete={() => {}}/>)}
        </div>
      </>}
    </div>
  );
}

function TaskRow({ task, onComplete }) {
  const isDone = task.status === 'done';
  const isReview = task.status === 'review';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      borderRadius: 18,
      background: isDone ? 'rgba(88,214,168,0.12)' : '#fff',
      border: `0.5px solid ${isDone ? 'rgba(88,214,168,0.3)' : 'rgba(0,0,0,0.06)'}`,
      opacity: isDone ? 0.85 : 1,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14,
        background: isDone ? 'var(--mint)' : 'rgba(255,201,60,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>
        {isDone ? <Ic.check size={22} color="#fff" strokeWidth={3}/> : task.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          font: '800 14px/1.2 Nunito',
          textDecoration: isDone ? 'line-through' : 'none',
          color: isDone ? 'var(--ink-3)' : 'var(--ink)',
        }}>{task.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Coin size={13}/>
          <span style={{ font: '700 12px/1 Nunito', color: 'var(--ink-2)' }}>{task.coins} coins</span>
          {isReview && <span className="chip sky" style={{ height: 20, fontSize: 10, padding: '0 8px' }}>Sent for review</span>}
        </div>
      </div>
      {!isDone && !isReview && (
        <button
          onClick={(e) => onComplete(e.currentTarget)}
          style={{
            appearance: 'none', border: 0,
            width: 36, height: 36, borderRadius: 12,
            background: 'var(--ink)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
          }}
        ><Ic.check size={18} strokeWidth={3}/></button>
      )}
    </div>
  );
}

/* ──────────────── SHOP ──────────────── */
function KidShop({ rewards, kid, onBuy }) {
  const [selected, setSelected] = useState(null);
  const tabs = ['All', 'Toys', 'Games', 'Treats'];
  const [tab, setTab] = useState('All');

  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ font: '900 30px/1 Nunito', margin: 0, letterSpacing: '-0.02em' }}>Shop</h1>
          <div style={{ font: '700 13px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 6 }}>Real rewards picked by your parents</div>
        </div>
        <div className="coin-badge"><Coin size={20}/>{kid.coins}</div>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 14, marginLeft: -16, paddingLeft: 16 }}>
        {tabs.map(c => (
          <button key={c} onClick={() => setTab(c)} style={{
            appearance: 'none', border: 0,
            padding: '8px 14px', borderRadius: 999,
            background: tab === c ? 'var(--ink)' : 'rgba(0,0,0,0.05)',
            color: tab === c ? '#fff' : 'var(--ink-2)',
            font: '800 12px/1 Nunito',
            flexShrink: 0, cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      {/* Pip cheering you on */}
      <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', marginBottom: 16, padding: '14px 16px 14px 100px', background: 'linear-gradient(135deg, #9B7BFF 0%, #57B5F5 100%)', minHeight: 110 }}>
        <div style={{ position: 'absolute', left: -8, bottom: -10 }}>
          <Pip size={110} mood="star"/>
        </div>
        <div style={{ font: '700 11px/1 Nunito', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Saving for…</div>
        <div style={{ font: '900 18px/1.1 Nunito', color: '#fff', marginBottom: 8 }}>Razor A5 Scooter 🛴</div>
        <div className="progress" style={{ background: 'rgba(0,0,0,0.18)', marginBottom: 4 }}>
          <i style={{ width: `${(kid.coins / 1200) * 100}%`, background: 'linear-gradient(90deg, #FFC93C, #FFE08A)' }}/>
        </div>
        <div style={{ font: '700 11px/1 Nunito', color: 'rgba(255,255,255,0.9)' }}>{kid.coins} / 1200</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {rewards.map(r => {
          const can = kid.coins >= r.coins;
          return (
            <button key={r.id} onClick={() => setSelected(r)} style={{
              appearance: 'none', border: 0, padding: 0, textAlign: 'left',
              background: '#fff', borderRadius: 18, overflow: 'hidden',
              border: '0.5px solid rgba(0,0,0,0.06)',
              boxShadow: '0 3px 0 rgba(42,31,18,0.06)',
              cursor: 'pointer',
            }}>
              <div className="product-img" style={{
                background: `linear-gradient(135deg, hsl(${r.hue} 80% 90%), hsl(${r.hue} 60% 80%))`,
                aspectRatio: '1/0.85', fontSize: 56, borderRadius: 0,
              }}>{r.emoji}</div>
              <div style={{ padding: 10 }}>
                <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginBottom: 3 }}>{r.vendor}</div>
                <div style={{ font: '800 13px/1.2 Nunito', minHeight: 32 }}>{r.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '900 14px/1 Nunito', color: can ? 'var(--ink)' : 'var(--ink-3)' }}>
                    <Coin size={16}/>{r.coins}
                  </span>
                  {!can && <span style={{ font: '700 10px/1 Nunito', color: 'var(--ink-3)' }}>−{r.coins - kid.coins}</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && <ProductModal product={selected} kid={kid} onClose={() => setSelected(null)} onBuy={(el) => { onBuy(selected, el); setSelected(null); }}/>}
    </div>
  );
}

function ProductModal({ product, kid, onClose, onBuy }) {
  const can = kid.coins >= product.coins;
  return (
    <Modal onClose={onClose}>
      <div className="pop-in" style={{ width: 340, background: '#fff', borderRadius: 24, overflow: 'hidden' }}>
        <div className="product-img" style={{
          background: `linear-gradient(135deg, hsl(${product.hue} 80% 90%), hsl(${product.hue} 60% 80%))`,
          aspectRatio: '1/0.7', fontSize: 110, borderRadius: 0,
        }}>{product.emoji}</div>
        <div style={{ padding: '18px 20px 20px' }}>
          <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{product.vendor}</div>
          <div style={{ font: '900 20px/1.15 Nunito', marginBottom: 12 }}>{product.title}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '0.5px solid var(--line)', borderBottom: '0.5px solid var(--line)', marginBottom: 14 }}>
            <span style={{ font: '700 12px/1 Nunito', color: 'var(--ink-3)' }}>Cost</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '900 16px/1 Nunito' }}><Coin size={18}/>{product.coins} <span style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginLeft: 6 }}>(${product.price.toFixed(2)})</span></span>
          </div>
          <button
            onClick={(e) => can && onBuy(e.currentTarget)}
            disabled={!can}
            className={`btn full ${can ? 'coral' : 'ghost'}`}
            style={{ opacity: can ? 1 : 0.6 }}
          >
            {can ? `Buy with ${product.coins} coins 🎉` : `Need ${product.coins - kid.coins} more coins`}
          </button>
          <button onClick={onClose} className="btn full ghost" style={{ marginTop: 8, height: 40, fontSize: 13 }}>Maybe later</button>
        </div>
      </div>
    </Modal>
  );
}

Object.assign(window, { KidHome, KidTasks, KidShop, TaskRow });
