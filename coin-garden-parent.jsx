/* coin-garden-parent.jsx — Parent's view of kid's Coin Garden.
   Includes:
     • ParentGardenSummary — list of all kids' plots, total values, alerts
     • GardenAlertBanner   — small notification chip for "Maya planted 30 coins" / "Sunflower ready"
*/

const { useState: useGPS } = React;

function ParentGardenSummary({ kids = [], garden = window.SEED_GARDEN, onBack }) {
  const totalPlanted = window.gardenTotalPlanted(garden);
  const totalValue = window.gardenTotalValue(garden);
  const grown = totalValue - totalPlanted;
  const grownPct = totalPlanted ? (grown / totalPlanted) * 100 : 0;

  // Group plots by plant for the breakdown
  const byPlant = {};
  garden.forEach((plot) => {
    if (!plot.plantId) return;
    if (!byPlant[plot.plantId]) byPlant[plot.plantId] = { coins: 0, value: 0, count: 0 };
    byPlant[plot.plantId].coins += plot.coins;
    byPlant[plot.plantId].value += plot.value;
    byPlant[plot.plantId].count += 1;
  });
  const breakdown = Object.entries(byPlant)
    .map(([id, v]) => ({ plant: window.PLANT_BY_ID[id], ...v }))
    .sort((a, b) => b.value - a.value);

  const alerts = [
    ...garden
      .filter(p => p.plantId && window.plantProgress(p) >= 1)
      .map(p => ({
        kind: 'ready',
        plot: p,
        text: `${window.PLANT_BY_ID[p.plantId].name} ready to harvest`,
        sub: `Plot #${p.id + 1} · ${Math.round(p.value)} coins (was ${p.coins})`,
      })),
    { kind: 'plant', text: 'Maya planted a Sunflower', sub: 'Yesterday · 15 coins' },
    { kind: 'weather', text: 'Sunny week ahead', sub: 'Sunflowers and Beans growing fast ☀️' },
  ];

  return (
    <div className="tab-fade screen parent" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        {onBack && (
          <button onClick={onBack} aria-label="Back" style={{
            width: 36, height: 36, borderRadius: 12,
            background: '#fff', border: '1.5px solid var(--line)',
            font: '900 18px/1 Nunito', color: 'var(--ink-1)', cursor: 'pointer',
          }}>‹</button>
        )}
        <div>
          <h1 style={{ font: '900 26px/1.1 Nunito', margin: 0 }}>Maya's Garden</h1>
          <div style={{ font: '700 12px/1 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>Where her saved coins are growing</div>
        </div>
      </div>

      {/* Top stat card */}
      <div style={{
        background: 'linear-gradient(135deg, #DFF7E9 0%, #58D6A8 100%)',
        borderRadius: 18, padding: 18, marginBottom: 14,
        border: '1.5px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ font: '700 11px/1 Nunito', color: '#0F4029', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Garden value</div>
            <div style={{ font: '900 32px/1 Nunito', color: '#0F4029', display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <Coin size={24}/>{Math.round(totalValue)}
            </div>
            <div style={{ font: '700 11px/1.3 Nunito', color: '#0F4029', marginTop: 4 }}>
              ≈ ${(totalValue * 0.10).toFixed(2)} real money equivalent
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: '900 14px/1 Nunito', color: '#fff', background: '#1F7855', padding: '5px 12px', borderRadius: 999, display: 'inline-block' }}>
              +{grownPct.toFixed(1)}%
            </div>
            <div style={{ font: '700 11px/1 Nunito', color: '#0F4029', marginTop: 6 }}>+{grown.toFixed(1)} grown</div>
          </div>
        </div>
        {/* mini bar chart */}
        <div style={{ display: 'flex', gap: 4, marginTop: 14, alignItems: 'flex-end', height: 32 }}>
          {[34, 38, 42, 41, 47, 53, 60, 65, 72, 80, 92, Math.round(totalValue)].map((v, i, a) => (
            <div key={i} style={{
              flex: 1,
              height: `${(v / Math.max(...a)) * 100}%`,
              background: i === a.length - 1 ? '#1F7855' : 'rgba(31,120,85,0.35)',
              borderRadius: 4,
            }}/>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <>
          <div style={{ font: '900 13px/1 Nunito', marginBottom: 8, color: 'var(--ink-2)', letterSpacing: '0.04em' }}>
            Recent activity
          </div>
          <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid var(--line)', padding: 4, marginBottom: 16 }}>
            {alerts.map((a, i) => (
              <GardenAlertRow key={i} alert={a} divider={i > 0}/>
            ))}
          </div>
        </>
      )}

      {/* Breakdown by plant */}
      <div style={{ font: '900 13px/1 Nunito', marginBottom: 8, color: 'var(--ink-2)', letterSpacing: '0.04em' }}>
        Portfolio breakdown
      </div>
      <div style={{ background: '#fff', borderRadius: 16, padding: 4, marginBottom: 16, border: '0.5px solid var(--line)' }}>
        {breakdown.map((row, i) => {
          const PTop = window.TOPVIEW[row.plant.id];
          const pct = (row.value / totalValue) * 100;
          return (
            <div key={row.plant.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              borderTop: i ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{ width: 44, height: 44, background: row.plant.color + '22', borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 100 100" width="36" height="36"><PTop stage={3}/></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ font: '900 14px/1 Nunito' }}>{row.plant.name}</div>
                  <div style={{ font: '900 13px/1 Nunito', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Coin size={14}/>{Math.round(row.value)}
                  </div>
                </div>
                <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>
                  {row.plant.realName} · {row.count} plot{row.count > 1 ? 's' : ''} · {pct.toFixed(0)}%
                </div>
                <div style={{ height: 5, background: 'rgba(0,0,0,0.06)', borderRadius: 999, marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: row.plant.color, borderRadius: 999 }}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk meter */}
      <div style={{ font: '900 13px/1 Nunito', marginBottom: 8, color: 'var(--ink-2)', letterSpacing: '0.04em' }}>
        Risk distribution
      </div>
      <div style={{ background: '#fff', borderRadius: 16, padding: 14, border: '0.5px solid var(--line)', marginBottom: 16 }}>
        <RiskMeter breakdown={breakdown}/>
        <div style={{ font: '700 12px/1.4 Nunito', color: 'var(--ink-3)', marginTop: 12 }}>
          Maya's mix is mostly low-risk — good for a beginner. You can adjust which plants she's allowed to grow in <b>Settings</b>.
        </div>
      </div>

      <button className="btn ghost full" style={{ marginBottom: 8 }}>Adjust allowed plants</button>
      <button className="btn ghost full">Set monthly allowance for garden</button>
    </div>
  );
}

function GardenAlertRow({ alert, divider }) {
  const palette = {
    ready:   { bg: '#FFE0B0', icon: '🎉', accent: '#E55A1F' },
    plant:   { bg: '#DFF7E9', icon: '🌱', accent: '#1F7855' },
    weather: { bg: '#C7E8FF', icon: '☀️', accent: '#2C73B5' },
    storm:   { bg: '#E5DFF7', icon: '⛈️', accent: '#5A3CC0' },
  };
  const p = palette[alert.kind] || palette.plant;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: divider ? '1px solid var(--line)' : 'none' }}>
      <div style={{ width: 36, height: 36, background: p.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
        {p.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '900 13px/1.2 Nunito' }}>{alert.text}</div>
        <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 2 }}>{alert.sub}</div>
      </div>
      <div style={{
        font: '900 10px/1 Nunito', color: p.accent,
        letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>{alert.kind}</div>
    </div>
  );
}

function RiskMeter({ breakdown }) {
  const total = breakdown.reduce((s, r) => s + r.value, 0) || 1;
  // bucket into low / med / high
  const buckets = { low: 0, med: 0, high: 0 };
  breakdown.forEach((r) => {
    const k = r.plant.risk <= 2 ? 'low' : r.plant.risk <= 3 ? 'med' : 'high';
    buckets[k] += r.value;
  });
  const segs = [
    { k: 'low',  label: 'Low',  color: '#1F7855', val: buckets.low },
    { k: 'med',  label: 'Med',  color: '#FFC93C', val: buckets.med },
    { k: 'high', label: 'High', color: '#E55A1F', val: buckets.high },
  ];
  return (
    <div>
      <div style={{ display: 'flex', height: 14, borderRadius: 999, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
        {segs.map(s => (
          <div key={s.k} style={{ flex: s.val, background: s.color }} title={`${s.label}: ${Math.round(s.val)}`}/>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {segs.map(s => (
          <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, background: s.color, borderRadius: 999 }}/>
            <span style={{ font: '800 11px/1 Nunito' }}>{s.label}</span>
            <span style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)' }}>{((s.val / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ParentGardenSummary, GardenAlertRow, RiskMeter });
