/* parent-screens.jsx — Parent dashboard, Add task/reward, Orders, Kids */

const { useState: useSP, useEffect: useEP } = React;

function ParentDashboard({ kids, orders, tasks, garden = window.SEED_GARDEN, onAddTask, onAddReward, onSwitchKid, onOpenGarden }) {
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const reviewTasks = tasks.filter(t => t.status === 'review');
  const totalCoins = kids.reduce((s, k) => s + k.coins, 0);
  const readyHarvests = (garden || []).filter(p => p.plantId && window.plantProgress && window.plantProgress(p) >= 1);
  return (
    <div className="tab-fade screen parent" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ font: '700 12px/1 Nunito', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Hi, Parent</div>
          <h1 style={{ font: '900 28px/1.1 Nunito', margin: '6px 0 0', letterSpacing: '-0.02em' }}>Family overview</h1>
        </div>
        <button className="btn ghost sm" style={{ width: 36, height: 36, padding: 0, borderRadius: 12 }}><Ic.bell size={18}/></button>
      </div>

      {/* Alert cards */}
      {(pendingOrders.length > 0 || reviewTasks.length > 0) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {pendingOrders.length > 0 && (
            <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,122,107,0.08)', borderColor: 'rgba(255,122,107,0.25)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--coral)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.pkg size={20}/></div>
              <div style={{ flex: 1 }}>
                <div style={{ font: '900 14px/1.2 Nunito' }}>{pendingOrders.length} order{pendingOrders.length > 1 ? 's' : ''} to fulfill</div>
                <div style={{ font: '700 12px/1.3 Nunito', color: 'var(--ink-2)', marginTop: 3 }}>{pendingOrders[0].kid} bought {pendingOrders[0].item}</div>
              </div>
              <Ic.chevR size={18} color="var(--ink-3)"/>
            </div>
          )}
          {reviewTasks.length > 0 && (
            <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(87,181,245,0.08)', borderColor: 'rgba(87,181,245,0.25)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--sky)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.camera size={20}/></div>
              <div style={{ flex: 1 }}>
                <div style={{ font: '900 14px/1.2 Nunito' }}>{reviewTasks.length} task{reviewTasks.length > 1 ? 's' : ''} need approval</div>
                <div style={{ font: '700 12px/1.3 Nunito', color: 'var(--ink-2)', marginTop: 3 }}>Photo verification submitted</div>
              </div>
              <Ic.chevR size={18} color="var(--ink-3)"/>
            </div>
          )}
          {readyHarvests.length > 0 && (
            <button onClick={onOpenGarden} className="card" style={{
              padding: 14, display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,201,60,0.14)', borderColor: 'rgba(229,90,31,0.35)',
              cursor: 'pointer', border: '1px solid', textAlign: 'left', font: 'inherit',
              animation: 'gardenPulse 1.6s ease-in-out infinite',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#E55A1F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌱</div>
              <div style={{ flex: 1 }}>
                <div style={{ font: '900 14px/1.2 Nunito' }}>{readyHarvests.length} plant{readyHarvests.length > 1 ? 's' : ''} ready to harvest</div>
                <div style={{ font: '700 12px/1.3 Nunito', color: 'var(--ink-2)', marginTop: 3 }}>Maya's garden grew {Math.round(readyHarvests.reduce((s,p) => s + p.value - p.coins, 0))} bonus coins</div>
              </div>
              <Ic.chevR size={18} color="var(--ink-3)"/>
            </button>
          )}
        </div>
      )}

      <style>{`@keyframes gardenPulse { 0%,100% { box-shadow: 0 0 0 rgba(229,90,31,0); } 50% { box-shadow: 0 0 0 4px rgba(229,90,31,0.18); } }`}</style>

      {/* Family snapshot */}
      <div className="card" style={{ marginBottom: 16, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Coins in family</div>
            <div style={{ font: '900 26px/1 Nunito', marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}><Coin size={22}/>{totalCoins}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>This week</div>
            <div style={{ font: '900 18px/1 Nunito', marginTop: 6, color: '#1F7855' }}>+87 earned</div>
          </div>
        </div>
        {/* mini sparkbar */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 50 }}>
          {[0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 0.65].map((v, i) => (
            <div key={i} style={{ flex: 1, height: `${v * 100}%`, background: i === 6 ? 'var(--ink)' : 'rgba(0,0,0,0.12)', borderRadius: 6 }}/>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', font: '700 10px/1 Nunito', color: 'var(--ink-3)', marginTop: 6 }}>
          {['M','T','W','T','F','S','S'].map((d, i) => <span key={i} style={{ color: i === 6 ? 'var(--ink)' : 'var(--ink-3)' }}>{d}</span>)}
        </div>
      </div>

      {/* Kids cards */}
      <div className="h-eyebrow">Kids</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {kids.map(k => (
          <button key={k.id} onClick={() => onSwitchKid(k.id)} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: '0.5px solid var(--line)', font: 'inherit', textAlign: 'left' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: k.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{k.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ font: '900 15px/1 Nunito' }}>{k.name}</div>
                <span className="chip" style={{ height: 20, fontSize: 10, padding: '0 8px' }}>Age {k.age}</span>
                <span className="chip coral" style={{ height: 20, fontSize: 10, padding: '0 8px' }}>🔥 {k.streak}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 6, font: '700 12px/1 Nunito', color: 'var(--ink-2)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Coin size={13}/>{k.coins}</span>
                <span>Lv {k.level}</span>
              </div>
            </div>
            <Ic.chevR size={18} color="var(--ink-3)"/>
          </button>
        ))}
      </div>

      {/* Quick actions */}
      <div className="h-eyebrow">Quick actions</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button onClick={onAddTask} className="card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer', border: '0.5px solid var(--line)', font: 'inherit' }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(88,214,168,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}><Ic.plus size={18} color="#1F7855"/></div>
          <div style={{ font: '900 13px/1.2 Nunito' }}>New task</div>
          <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>Set chores & coin values</div>
        </button>
        <button onClick={onAddReward} className="card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer', border: '0.5px solid var(--line)', font: 'inherit' }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,122,107,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}><Ic.gift size={18} color="#B23A2C"/></div>
          <div style={{ font: '900 13px/1.2 Nunito' }}>Add reward</div>
          <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>Paste any product link</div>
        </button>
        <button className="card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer', border: '0.5px solid var(--line)', font: 'inherit' }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(155,123,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}><Ic.swap size={18} color="#5A3CC0"/></div>
          <div style={{ font: '900 13px/1.2 Nunito' }}>Coin → $ rate</div>
          <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>1 coin = $0.10</div>
        </button>
        <button onClick={onOpenGarden} className="card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer', border: '0.5px solid var(--line)', font: 'inherit' }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(87,181,245,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}><Ic.sprout size={18} color="#1860A0"/></div>
          <div style={{ font: '900 13px/1.2 Nunito' }}>Coin Garden</div>
          <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>See what's growing</div>
        </button>
      </div>
    </div>
  );
}

/* ──────────────── ADD TASK ──────────────── */
function AddTaskScreen({ onClose, onSave }) {
  const [title, setTitle] = useSP('');
  const [coins, setCoins] = useSP(10);
  const [recurring, setRecurring] = useSP('daily');
  const [age, setAge] = useSP('6-14');
  const [verify, setVerify] = useSP('parent');
  const presets = [
    { t: 'Make your bed', i: '🛏', c: 5 },
    { t: 'Brush teeth', i: '🪥', c: 3 },
    { t: 'Read 30 min', i: '📚', c: 10 },
    { t: 'Empty dishwasher', i: '🍽', c: 8 },
    { t: 'Walk the dog', i: '🐕', c: 6 },
    { t: 'Homework', i: '✏️', c: 10 },
  ];

  return (
    <div className="tab-fade screen parent" style={{ padding: '0 16px 110px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0 16px' }}>
        <button onClick={onClose} className="btn ghost sm" style={{ width: 36, height: 36, padding: 0, borderRadius: 12 }}><Ic.chevL size={18}/></button>
        <h1 style={{ font: '900 22px/1.1 Nunito', margin: 0 }}>New task</h1>
      </div>

      <div className="h-eyebrow">Quick start</div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 18, marginLeft: -16, paddingLeft: 16, paddingRight: 16 }}>
        {presets.map(p => (
          <button key={p.t} onClick={() => { setTitle(p.t); setCoins(p.c); }} className="card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, cursor: 'pointer', font: 'inherit' }}>
            <span style={{ fontSize: 18 }}>{p.i}</span>
            <span style={{ font: '800 12px/1 Nunito' }}>{p.t}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, font: '900 12px/1 Nunito' }}><Coin size={13}/>{p.c}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ font: '800 12px/1 Nunito', color: 'var(--ink-3)', marginBottom: 6 }}>Title</div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Tidy up toys"
          style={{ appearance: 'none', border: 0, background: 'rgba(0,0,0,0.04)', padding: '12px 14px', borderRadius: 12, font: '700 14px/1.2 Nunito', width: '100%', outline: 'none', color: 'var(--ink)' }}/>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ font: '800 13px/1 Nunito' }}>Coin reward</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '900 18px/1 Nunito' }}><Coin size={20}/>{coins}</div>
        </div>
        <input type="range" min="1" max="50" value={coins} onChange={(e) => setCoins(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--coin-deep)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>
          <span>1</span><span>10</span><span>25</span><span>50</span>
        </div>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ font: '800 13px/1 Nunito', marginBottom: 10 }}>How often?</div>
        <Segments value={recurring} onChange={setRecurring} options={['once', 'daily', 'weekly']}/>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ font: '800 13px/1 Nunito', marginBottom: 10 }}>Age range</div>
        <Segments value={age} onChange={setAge} options={['4-7', '6-14', '10-14']}/>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 18 }}>
        <div style={{ font: '800 13px/1 Nunito', marginBottom: 10 }}>Verification</div>
        <Segments value={verify} onChange={setVerify} options={[
          { value: 'auto', label: 'Trust kid' },
          { value: 'parent', label: 'I approve' },
          { value: 'photo', label: 'Photo proof' },
        ]}/>
      </div>

      <button onClick={() => onSave({ title, coins, recurring, age, verify })} className="btn coral full" disabled={!title}>Save task</button>
    </div>
  );
}

function Segments({ value, onChange, options }) {
  const opts = options.map(o => typeof o === 'object' ? o : { value: o, label: o });
  return (
    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', borderRadius: 12, padding: 3, position: 'relative' }}>
      {opts.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)} style={{
          appearance: 'none', border: 0, flex: 1,
          padding: '10px 6px', borderRadius: 10,
          background: value === o.value ? '#fff' : 'transparent',
          font: '800 12px/1 Nunito',
          color: value === o.value ? 'var(--ink)' : 'var(--ink-2)',
          cursor: 'pointer',
          boxShadow: value === o.value ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
          textTransform: 'capitalize',
        }}>{o.label}</button>
      ))}
    </div>
  );
}

/* ──────────────── ADD REWARD ──────────────── */
function AddRewardScreen({ onClose, onSave }) {
  const [step, setStep] = useSP(1);
  const [url, setUrl] = useSP('');
  const [coins, setCoins] = useSP(120);

  const fakeProduct = {
    title: 'LEGO Friends Mini Set',
    vendor: 'Amazon',
    price: 12.99,
    emoji: '🧱',
    hue: 32,
  };

  return (
    <div className="tab-fade screen parent" style={{ padding: '0 16px 110px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0 16px' }}>
        <button onClick={onClose} className="btn ghost sm" style={{ width: 36, height: 36, padding: 0, borderRadius: 12 }}><Ic.chevL size={18}/></button>
        <h1 style={{ font: '900 22px/1.1 Nunito', margin: 0 }}>Add reward</h1>
      </div>

      {step === 1 && (
        <>
          <div style={{ background: 'linear-gradient(135deg, #FF7A6B, #FF9DC4)', borderRadius: 22, padding: 22, color: '#fff', marginBottom: 18 }}>
            <div style={{ font: '900 18px/1.2 Nunito', marginBottom: 6 }}>Paste any product link</div>
            <div style={{ font: '700 12px/1.4 Nunito', opacity: 0.92 }}>We'll auto-fetch the image, price & details from Amazon, Walmart, Target & more.</div>
          </div>

          <div className="card" style={{ padding: 14, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Ic.link size={18} color="var(--ink-3)"/>
              <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://amazon.com/lego-friends-..."
                style={{ flex: 1, appearance: 'none', border: 0, background: 'transparent', font: '700 14px/1.2 Nunito', outline: 'none', color: 'var(--ink)' }}/>
            </div>
          </div>

          <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', textAlign: 'center', marginBottom: 12 }}>OR</div>

          <button className="btn ghost full" style={{ marginBottom: 8 }}><Ic.search size={16}/> Browse partner store</button>
          <button className="btn ghost full" style={{ marginBottom: 18 }}><Ic.gift size={16}/> Custom family treat (no shipping)</button>

          <button className="btn coral full" disabled={!url} onClick={() => setStep(2)}>Fetch product</button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
            <div className="product-img" style={{
              background: `linear-gradient(135deg, hsl(${fakeProduct.hue} 80% 90%), hsl(${fakeProduct.hue} 60% 80%))`,
              aspectRatio: '1/0.55', fontSize: 80, borderRadius: 0,
            }}>{fakeProduct.emoji}</div>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="chip">{fakeProduct.vendor}</span>
                <span className="chip mint" style={{ height: 22, fontSize: 11 }}>✓ Auto-fetched</span>
              </div>
              <div style={{ font: '900 16px/1.2 Nunito', marginTop: 6 }}>{fakeProduct.title}</div>
              <div style={{ font: '700 13px/1 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>${fakeProduct.price}</div>
            </div>
          </div>

          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ font: '800 13px/1 Nunito' }}>Coin price</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '900 22px/1 Nunito' }}><Coin size={22}/>{coins}</div>
            </div>
            <input type="range" min="20" max="500" value={coins} onChange={(e) => setCoins(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--coin-deep)' }}/>
            <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 6 }}>
              Suggested: <strong>{Math.round(fakeProduct.price * 10)} coins</strong> at $0.10/coin
            </div>
          </div>

          <div className="card" style={{ padding: 16, marginBottom: 18, background: 'rgba(255,201,60,0.1)', borderColor: 'rgba(255,201,60,0.25)' }}>
            <div style={{ font: '800 12px/1.3 Nunito', color: 'var(--ink-2)' }}>
              Maya needs <strong>{Math.max(0, coins - 248)}</strong> more coins · Leo needs <strong>{Math.max(0, coins - 92)}</strong> more
            </div>
          </div>

          <button onClick={() => onSave({ ...fakeProduct, coins })} className="btn coral full">Add to family shop</button>
        </>
      )}
    </div>
  );
}

/* ──────────────── ORDERS ──────────────── */
function ParentOrders({ orders, onFulfill }) {
  const groups = [
    { id: 'pending', label: 'Need fulfillment', items: orders.filter(o => o.status === 'pending') },
    { id: 'shipped', label: 'In transit', items: orders.filter(o => o.status === 'shipped') },
    { id: 'fulfilled', label: 'Done', items: orders.filter(o => o.status === 'fulfilled') },
  ];
  return (
    <div className="tab-fade screen parent" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px' }}>
        <h1 style={{ font: '900 28px/1.1 Nunito', margin: 0 }}>Orders</h1>
        <div style={{ font: '700 13px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 6 }}>Fulfill rewards your kids earned</div>
      </div>

      {groups.map(g => g.items.length > 0 && (
        <div key={g.id} style={{ marginBottom: 18 }}>
          <div className="h-eyebrow">{g.label} · {g.items.length}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {g.items.map(o => (
              <div key={o.id} className="card" style={{ padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: o.status === 'pending' ? 12 : 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                    {o.status === 'fulfilled' ? '✓' : o.status === 'shipped' ? <Ic.truck size={22} color="#1860A0"/> : <Ic.pkg size={22}/>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: '900 14px/1.2 Nunito' }}>{o.item}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4, font: '700 12px/1 Nunito', color: 'var(--ink-2)' }}>
                      <span>{o.kid}</span>
                      <span>·</span>
                      <span>{o.vendor}</span>
                      <span>·</span>
                      <span>{o.when}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '900 13px/1 Nunito' }}><Coin size={14}/>{o.coins}</div>
                    {o.price > 0 && <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>${o.price}</div>}
                  </div>
                </div>
                {o.status === 'pending' && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => onFulfill(o)} className="btn coral sm" style={{ flex: 1 }}>
                      {o.price > 0 ? `Order on ${o.vendor}` : 'Mark fulfilled'}
                    </button>
                    <button className="btn ghost sm">Decline</button>
                  </div>
                )}
                {o.status === 'shipped' && (
                  <div style={{ marginTop: 8, paddingTop: 10, borderTop: '0.5px solid var(--line)', font: '700 12px/1.3 Nunito', color: 'var(--ink-2)' }}>
                    📦 Arriving Wed · 1Z9999W99999999999
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { ParentDashboard, AddTaskScreen, AddRewardScreen, ParentOrders, Segments });
