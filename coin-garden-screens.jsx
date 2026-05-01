/* coin-garden-screens.jsx — Coin Garden screens (kid side).
   Screens:
     • KidGardenV2     — top-down 3×3 garden + weather chip + summary header
     • PlantPickerSheet — bottom sheet to pick which plant + amount
     • PlantDetailScreen — cross-section view of a planted plot (canopy + roots)
     • WeatherEventScreen — this week's weather + history
     • HarvestModal     — celebratory harvest screen with reinvest/cash-out
*/

const { useState: useGS, useEffect: useGE, useMemo: useGM } = React;

/* ─── tiny helpers ─── */
const G_INK = '#1A1208';

function PlantTopThumb({ plot, size = 60 }) {
  const p = window.PLANT_BY_ID[plot.plantId];
  const Top = window.TOPVIEW[plot.plantId];
  const stage = window.plantStage(plot);
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }}>
      <Top stage={stage}/>
    </svg>
  );
}

function StageLabel({ stage }) {
  const labels = ['Seed', 'Sprout', 'Young', 'Mature', 'Ready!'];
  const colors = ['#7D4D24', '#5BC57F', '#3FA265', '#1F7855', '#E55A1F'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 10px', borderRadius: 999,
      background: colors[stage], color: '#fff',
      font: '900 10px/1 Nunito', letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>{labels[stage]}</span>
  );
}

/* ═══════════════════════════════════════════════════════════
   1) KID GARDEN — top-down 3×3 garden
═══════════════════════════════════════════════════════════ */

function KidGardenV2({ kid, garden = window.SEED_GARDEN, weather = window.WEATHER.sun, onPlantEmpty, onOpenPlot, onOpenWeather, onPlantNew }) {
  const totalPlanted = window.gardenTotalPlanted(garden);
  const totalValue = window.gardenTotalValue(garden);
  const earned = totalValue - totalPlanted;
  const readyCount = garden.filter(p => p.plantId && window.plantProgress(p) >= 1).length;

  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      {/* Header */}
      <div style={{ padding: '6px 0 14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ font: '900 28px/1 Nunito', margin: 0, letterSpacing: '-0.02em' }}>Coin Garden</h1>
          <div style={{ font: '700 12px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>Plant coins. Watch them grow.</div>
        </div>
        <button
          onClick={onOpenWeather}
          aria-label="Weather"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: weather.color, color: '#fff',
            border: '2px solid #1A1208', borderRadius: 999,
            padding: '6px 12px', height: 34,
            font: '900 12px/1 Nunito', cursor: 'pointer',
            boxShadow: '0 2px 0 #1A1208',
          }}
        >
          <span style={{ fontSize: 16 }}>{weather.icon}</span>
          <span>{weather.label.replace(' week', '')}</span>
        </button>
      </div>

      {/* Summary card */}
      <div style={{
        background: 'linear-gradient(135deg, #DFF7E9 0%, #58D6A8 100%)',
        borderRadius: 22,
        padding: '14px 16px',
        marginBottom: 14,
        border: '2px solid #1A1208',
        boxShadow: '0 4px 0 #1A1208',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ font: '700 10px/1 Nunito', color: '#0F4029', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Garden value</div>
          <div style={{ font: '900 30px/1 Nunito', color: '#0F4029', display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <Coin size={22}/>{Math.round(totalValue)}
          </div>
          <div style={{ font: '800 11px/1 Nunito', color: '#0F4029', marginTop: 6 }}>
            +{Math.round(earned)} grown · {totalPlanted} planted
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {readyCount > 0 ? (
            <>
              <div style={{ font: '900 11px/1 Nunito', color: '#fff', background: '#E55A1F', padding: '4px 10px', borderRadius: 999, border: '2px solid #1A1208', display: 'inline-block' }}>
                {readyCount} ready!
              </div>
              <div style={{ font: '700 10px/1.2 Nunito', color: '#0F4029', marginTop: 8, maxWidth: 110 }}>Tap a glowing plot to harvest.</div>
            </>
          ) : (
            <div style={{ width: 70, height: 70 }}><Pip size={70} mood="happy"/></div>
          )}
        </div>
      </div>

      {/* 3×3 Garden grid */}
      <div style={{
        background: '#8B5A2B',
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.18) 2px, transparent 2.5px)',
        backgroundSize: '14px 14px',
        border: '3px solid #1A1208',
        borderRadius: 22,
        padding: 12,
        boxShadow: '0 5px 0 #1A1208',
        marginBottom: 16,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {garden.map((plot) => {
            const isReady = plot.plantId && window.plantProgress(plot) >= 1;
            return (
              <button
                key={plot.id}
                onClick={() => plot.plantId ? onOpenPlot(plot) : onPlantEmpty(plot.id)}
                style={{
                  aspectRatio: '1', position: 'relative',
                  background: '#A87045',
                  backgroundImage: 'radial-gradient(rgba(0,0,0,0.15) 1.5px, transparent 2px)',
                  backgroundSize: '8px 8px',
                  border: '2.5px solid #1A1208',
                  borderRadius: 14,
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                  boxShadow: isReady ? '0 0 0 3px #FFC93C, 0 0 16px rgba(255,201,60,0.7)' : 'inset 0 -3px 0 rgba(0,0,0,0.2)',
                  animation: isReady ? 'plot-glow 1.4s ease-in-out infinite' : 'none',
                }}
              >
                {plot.plantId ? (
                  <PlantTopThumb plot={plot} size="100%"/>
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    font: '900 32px/1 Nunito',
                  }}>+</div>
                )}
                {isReady && (
                  <div style={{
                    position: 'absolute', top: 4, right: 4,
                    background: '#E55A1F', color: '#fff',
                    border: '2px solid #1A1208',
                    borderRadius: 999,
                    padding: '2px 7px',
                    font: '900 8px/1 Nunito',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>Ready</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={() => onPlantNew(null)} className="btn full" style={{ background: '#1F7855', color: '#fff', border: '2px solid #1A1208', boxShadow: '0 3px 0 #1A1208' }}>
        🌱  Plant something new
      </button>

      <style>{`
        @keyframes plot-glow {
          0%, 100% { box-shadow: 0 0 0 3px #FFC93C, 0 0 12px rgba(255,201,60,0.6); }
          50%      { box-shadow: 0 0 0 4px #FFC93C, 0 0 22px rgba(255,201,60,0.95); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2) PLANT PICKER — full screen (was sheet, now full)
═══════════════════════════════════════════════════════════ */

function PlantPickerScreen({ kidCoins = 142, onClose, onPlant }) {
  const [selected, setSelected] = useGS(window.PLANTS[0].id);
  const [amount, setAmount] = useGS(window.PLANTS[0].minCost);
  const plant = window.PLANT_BY_ID[selected];

  // Snap amount up to plant.minCost when changing plants
  useGE(() => {
    if (amount < plant.minCost) setAmount(plant.minCost);
  }, [selected]);

  const projected = Math.round(amount * Math.pow(1 + plant.rate, plant.weeksToHarvest / 52));
  const canAfford = kidCoins >= amount;
  const Top = window.TOPVIEW[selected];

  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px', minHeight: '100%' }}>
      <div style={{ padding: '6px 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} aria-label="Back" style={{
          width: 36, height: 36, borderRadius: 12,
          background: '#fff', border: '2px solid #1A1208',
          font: '900 18px/1 Nunito', color: '#1A1208', cursor: 'pointer',
          boxShadow: '0 2px 0 #1A1208',
        }}>‹</button>
        <div>
          <h1 style={{ font: '900 22px/1.1 Nunito', margin: 0 }}>Pick a plant</h1>
          <div style={{ font: '700 12px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>Each plant grows differently</div>
        </div>
        <div style={{ marginLeft: 'auto' }} className="coin-badge"><Coin size={18}/>{kidCoins}</div>
      </div>

      {/* Plant grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {window.PLANTS.map((p) => {
          const sel = p.id === selected;
          const PTop = window.TOPVIEW[p.id];
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                background: sel ? p.color : '#fff',
                border: '2.5px solid #1A1208',
                borderRadius: 16,
                padding: '10px 12px',
                cursor: 'pointer',
                font: 'inherit',
                textAlign: 'left',
                boxShadow: sel ? '0 4px 0 #1A1208' : '0 2px 0 rgba(26,18,8,0.5)',
                transform: sel ? 'translateY(-2px)' : 'none',
                transition: 'transform 0.12s ease',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <div style={{
                width: 44, height: 44, flexShrink: 0,
                background: sel ? 'rgba(255,255,255,0.45)' : p.color + '33',
                borderRadius: 10,
                border: '2px solid #1A1208',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 100 100" width="38" height="38">
                  <PTop stage={3}/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '900 13px/1 Nunito', color: sel ? '#1A1208' : '#1A1208' }}>{p.name}</div>
                <div style={{ font: '700 10px/1.2 Nunito', color: sel ? '#1A1208' : 'var(--ink-3)', marginTop: 3 }}>
                  {p.weeksToHarvest}w · {Math.round(p.rate * 100)}%
                </div>
                <div style={{ display: 'flex', gap: 1, marginTop: 4 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{
                      width: 5, height: 5, borderRadius: 999,
                      background: i < p.risk ? '#E55A1F' : 'rgba(0,0,0,0.15)',
                    }}/>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected plant detail */}
      <div style={{
        background: '#FFF8EC',
        border: '2.5px solid #1A1208',
        borderRadius: 18,
        padding: 14,
        marginBottom: 14,
        boxShadow: '0 3px 0 #1A1208',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 56, height: 56, background: plant.color, borderRadius: 14,
            border: '2.5px solid #1A1208',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 100 100" width="50" height="50"><Top stage={3}/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ font: '900 18px/1 Nunito', margin: 0 }}>{plant.name}</h3>
            <div style={{ font: '700 11px/1.3 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>{plant.desc}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 10 }}>
          <Stat label="Min" value={plant.minCost} unit="coins"/>
          <Stat label="Time" value={plant.weeksToHarvest} unit="weeks"/>
          <Stat label="Risk" value={['Tiny','Low','Med','High','Wild'][plant.risk - 1]}/>
        </div>
      </div>

      {/* Amount stepper */}
      <div style={{
        background: '#fff', border: '2.5px solid #1A1208', borderRadius: 18, padding: 14, marginBottom: 14,
        boxShadow: '0 3px 0 #1A1208',
      }}>
        <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>How many coins?</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setAmount(Math.max(plant.minCost, amount - 5))} style={{
            width: 40, height: 40, borderRadius: 12,
            background: '#FFE0B0', border: '2px solid #1A1208',
            font: '900 22px/1 Nunito', cursor: 'pointer', boxShadow: '0 2px 0 #1A1208',
          }}>−</button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ font: '900 32px/1 Nunito', color: '#1A1208', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Coin size={26}/>{amount}
            </div>
            <div style={{ font: '700 10px/1 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>
              You'll have <b>{kidCoins - amount}</b> left
            </div>
          </div>
          <button onClick={() => setAmount(Math.min(kidCoins, amount + 5))} style={{
            width: 40, height: 40, borderRadius: 12,
            background: '#FFE0B0', border: '2px solid #1A1208',
            font: '900 22px/1 Nunito', cursor: 'pointer', boxShadow: '0 2px 0 #1A1208',
          }}>+</button>
        </div>
      </div>

      {/* Projection */}
      <div style={{
        background: 'linear-gradient(135deg, #DFF7E9, #58D6A8)',
        border: '2.5px solid #1A1208', borderRadius: 18, padding: 14, marginBottom: 16,
        boxShadow: '0 3px 0 #1A1208',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ fontSize: 32 }}>🔮</div>
        <div>
          <div style={{ font: '700 10px/1 Nunito', color: '#0F4029', letterSpacing: '0.1em', textTransform: 'uppercase' }}>If weather is normal</div>
          <div style={{ font: '900 18px/1 Nunito', color: '#0F4029', marginTop: 4 }}>
            ≈ <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Coin size={18}/>{projected}</span> in {plant.weeksToHarvest} weeks
          </div>
          <div style={{ font: '700 10px/1.3 Nunito', color: '#0F4029', marginTop: 4 }}>
            (+{projected - amount} grown)
          </div>
        </div>
      </div>

      <button
        disabled={!canAfford}
        onClick={() => onPlant(plant, amount)}
        className="btn full"
        style={{
          background: canAfford ? '#1F7855' : '#9DA3A6',
          color: '#fff',
          border: '2px solid #1A1208',
          boxShadow: '0 3px 0 #1A1208',
          opacity: canAfford ? 1 : 0.7,
          cursor: canAfford ? 'pointer' : 'not-allowed',
        }}
      >
        {canAfford ? `Plant ${plant.name} — ${amount} coins` : `Need ${amount - kidCoins} more coins`}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3) PLANT DETAIL — cross-section (canopy + roots)
═══════════════════════════════════════════════════════════ */

function PlantDetailScreen({ plot, onClose, onHarvest }) {
  const plant = window.PLANT_BY_ID[plot.plantId];
  const stage = window.plantStage(plot);
  const progress = window.plantProgress(plot);
  const Canopy = window.CANOPY[plot.plantId];
  const Roots = window.ROOTS[plant.rootStyle];
  const isReady = progress >= 1;
  const earned = plot.value - plot.coins;
  const weeksLeft = Math.max(0, plant.weeksToHarvest - plot.weeksGrowing);

  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px', minHeight: '100%' }}>
      <div style={{ padding: '6px 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} aria-label="Back" style={{
          width: 36, height: 36, borderRadius: 12,
          background: '#fff', border: '2px solid #1A1208',
          font: '900 18px/1 Nunito', color: '#1A1208', cursor: 'pointer',
          boxShadow: '0 2px 0 #1A1208',
        }}>‹</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ font: '900 22px/1 Nunito', margin: 0 }}>{plant.name}</h1>
          <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>Plot #{plot.id + 1} · {plot.weeksGrowing} weeks growing</div>
        </div>
        <StageLabel stage={stage}/>
      </div>

      {/* CROSS SECTION */}
      <div style={{
        position: 'relative',
        height: 360,
        border: '3px solid #1A1208',
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: '0 5px 0 #1A1208',
        marginBottom: 14,
      }}>
        {/* Sky */}
        <div style={{
          position: 'absolute', inset: 0, top: 0, height: '50%',
          background: 'linear-gradient(180deg, #BCE4FF 0%, #FFE9C2 100%)',
        }}>
          {/* sun */}
          <div style={{ position: 'absolute', top: 14, right: 18, width: 38, height: 38, background: '#FFC93C', borderRadius: '50%', border: '2.5px solid #1A1208' }}/>
          {/* clouds */}
          <div style={{ position: 'absolute', top: 24, left: 30 }}>
            <svg viewBox="0 0 60 28" width="60" height="28">
              <path d="M 8 20 Q 0 20 4 12 Q 6 6 14 8 Q 18 0 28 4 Q 38 0 44 8 Q 56 6 56 18 Q 56 22 50 22 L 12 22 Q 8 22 8 20 Z"
                    fill="#fff" stroke="#1A1208" strokeWidth="2.5"/>
            </svg>
          </div>
        </div>
        {/* Soil */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%',
          background: 'linear-gradient(180deg, #8B5A2B 0%, #5C3318 100%)',
        }}>
          {/* soil dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${(i * 23) % 100}%`,
              top: `${(i * 17) % 90 + 5}%`,
              width: 4, height: 4, borderRadius: '50%',
              background: 'rgba(0,0,0,0.25)',
            }}/>
          ))}
          {/* worm */}
          <svg style={{ position: 'absolute', left: '12%', bottom: 30 }} viewBox="0 0 60 14" width="60" height="14">
            <path d="M 4 8 Q 12 0 22 8 Q 32 14 44 6 Q 52 0 56 6"
                  stroke="#FF6B7A" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        {/* Ground line */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 4, background: '#1A1208', boxShadow: '0 -2px 0 rgba(0,0,0,0.2)' }}/>

        {/* PLANT — canopy */}
        <svg
          viewBox="-100 -180 200 180"
          style={{ position: 'absolute', left: 0, right: 0, top: 0, width: '100%', height: '50%' }}
          preserveAspectRatio="xMidYEnd meet"
        >
          <Canopy stage={stage}/>
        </svg>

        {/* PLANT — roots */}
        <svg
          viewBox="-100 0 200 180"
          style={{ position: 'absolute', left: 0, right: 0, top: '50%', width: '100%', height: '50%' }}
          preserveAspectRatio="xMidYStart meet"
        >
          <Roots stage={stage}/>
        </svg>

        {/* Coin label sitting on the soil line */}
        <div style={{
          position: 'absolute', top: 'calc(50% - 14px)', left: '50%', transform: 'translateX(-50%)',
          background: '#fff', border: '2px solid #1A1208', borderRadius: 999,
          padding: '3px 10px', font: '900 11px/1 Nunito', display: 'flex', alignItems: 'center', gap: 4,
          boxShadow: '0 2px 0 #1A1208', whiteSpace: 'nowrap',
        }}>
          <Coin size={14}/>{Math.round(plot.value)}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        background: '#fff', border: '2.5px solid #1A1208', borderRadius: 16, padding: 14, marginBottom: 12,
        boxShadow: '0 3px 0 #1A1208',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ font: '900 12px/1 Nunito' }}>Growth</div>
          <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)' }}>
            {isReady ? 'Ready to harvest!' : `${weeksLeft} weeks left`}
          </div>
        </div>
        <div style={{
          height: 14, background: '#FFE0B0', borderRadius: 999,
          border: '2px solid #1A1208', overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            width: `${progress * 100}%`, height: '100%',
            background: isReady ? 'repeating-linear-gradient(45deg, #FFC93C, #FFC93C 8px, #E55A1F 8px, #E55A1F 16px)' : '#5BC57F',
            transition: 'width 0.4s ease',
          }}/>
        </div>
      </div>

      {/* stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        <Stat label="Planted" value={plot.coins} unit="coins"/>
        <Stat label="Now worth" value={Math.round(plot.value)} unit="coins" mint/>
        <Stat label="Grown" value={`+${earned.toFixed(1)}`} unit="coins" mint/>
      </div>

      {/* fact card */}
      <div style={{
        background: plant.color + '22',
        border: '2.5px solid #1A1208',
        borderRadius: 16, padding: '12px 14px', marginBottom: 16,
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <div style={{ fontSize: 22 }}>💡</div>
        <div style={{ font: '700 12px/1.4 Nunito' }}>
          <b>{plant.name}</b> is like a <b>{plant.realName.toLowerCase()}</b>. {plant.realDesc}
        </div>
      </div>

      {/* Actions */}
      {isReady ? (
        <button onClick={() => onHarvest(plot)} className="btn full" style={{
          background: '#E55A1F', color: '#fff',
          border: '2px solid #1A1208', boxShadow: '0 3px 0 #1A1208',
          animation: 'pulse 1.4s ease-in-out infinite',
        }}>
          🎉  Harvest {Math.round(plot.value)} coins
        </button>
      ) : plant.canDigEarly ? (
        <button onClick={() => onHarvest(plot, true)} className="btn ghost full" style={{
          border: '2px solid #1A1208',
        }}>
          Dig up early ({plot.coins} coins · no bonus)
        </button>
      ) : (
        <div className="card" style={{ padding: 12, textAlign: 'center', font: '700 12px/1.4 Nunito', color: 'var(--ink-3)' }}>
          🔒 {plant.name} is locked until ready — that's how the bonus is guaranteed.
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4) WEATHER EVENT
═══════════════════════════════════════════════════════════ */

function WeatherScreen({ onClose, weather = window.WEATHER.sun, history = window.WEATHER_HISTORY }) {
  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} aria-label="Back" style={{
          width: 36, height: 36, borderRadius: 12,
          background: '#fff', border: '2px solid #1A1208',
          font: '900 18px/1 Nunito', color: '#1A1208', cursor: 'pointer',
          boxShadow: '0 2px 0 #1A1208',
        }}>‹</button>
        <h1 style={{ font: '900 22px/1 Nunito', margin: 0 }}>Garden Weather</h1>
      </div>

      {/* Hero this week */}
      <div style={{
        background: weather.color,
        borderRadius: 22,
        border: '3px solid #1A1208',
        boxShadow: '0 5px 0 #1A1208',
        padding: '22px 18px',
        textAlign: 'center',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ font: '700 11px/1 Nunito', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>This week</div>
        <div style={{ fontSize: 80, marginTop: 8, marginBottom: 2 }}>{weather.icon}</div>
        <div style={{ font: '900 26px/1 Fraunces', color: '#fff' }}>{weather.label}</div>
        <div style={{ font: '700 13px/1.4 Nunito', color: 'rgba(255,255,255,0.92)', marginTop: 8, maxWidth: 280, marginInline: 'auto' }}>
          {weather.desc}
        </div>
      </div>

      {/* How each plant feels */}
      <div style={{ font: '900 14px/1 Nunito', marginBottom: 8 }}>How each plant feels this week</div>
      <div style={{ background: '#fff', border: '2.5px solid #1A1208', borderRadius: 16, padding: 4, marginBottom: 18, boxShadow: '0 3px 0 #1A1208' }}>
        {window.PLANTS.map((p, i) => {
          const m = p.weather[weather.id];
          const tone = m > 1.05 ? 'good' : m < 0.95 ? 'bad' : 'meh';
          const PTop = window.TOPVIEW[p.id];
          return (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderTop: i ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
              <div style={{ width: 36, height: 36, background: p.color + '33', borderRadius: 10, border: '2px solid #1A1208', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 100 100" width="30" height="30"><PTop stage={3}/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: '900 13px/1 Nunito' }}>{p.name}</div>
                <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 2 }}>
                  {tone === 'good' ? 'Loving it ✨' : tone === 'bad' ? 'Struggling a bit' : 'Steady'}
                </div>
              </div>
              <div style={{
                font: '900 12px/1 Nunito',
                color: tone === 'good' ? '#1F7855' : tone === 'bad' ? '#B23A2C' : '#7a6a52',
              }}>
                {m > 1 ? '+' : ''}{Math.round((m - 1) * 100)}%
              </div>
            </div>
          );
        })}
      </div>

      {/* History */}
      <div style={{ font: '900 14px/1 Nunito', marginBottom: 8 }}>Past weeks</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {history.map((h, i) => {
          const w = window.WEATHER[h.kind];
          return (
            <div key={i} style={{
              background: w.color, color: '#fff',
              border: '2px solid #1A1208', borderRadius: 10,
              padding: '6px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              minWidth: 56,
              boxShadow: '0 2px 0 #1A1208',
            }}>
              <div style={{ fontSize: 18 }}>{w.icon}</div>
              <div style={{ font: '900 9px/1 Nunito', letterSpacing: '0.04em' }}>W-{i + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5) HARVEST MODAL
═══════════════════════════════════════════════════════════ */

function HarvestModal({ plot, isEarly = false, onClose, onCash, onReplant }) {
  const plant = window.PLANT_BY_ID[plot.plantId];
  const finalCoins = isEarly ? plot.coins : Math.round(plot.value);
  const earned = isEarly ? 0 : Math.round(plot.value - plot.coins);
  const PTop = window.TOPVIEW[plot.plantId];

  return (
    <Modal onClose={onClose}>
      {!isEarly && <Confetti onDone={() => {}} durationMs={2500}/>}
      <div className="pop-in" style={{
        width: 320, background: '#fff',
        borderRadius: 24, padding: '24px 22px',
        textAlign: 'center', position: 'relative',
        border: '3px solid #1A1208',
        boxShadow: '0 6px 0 #1A1208',
      }}>
        <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          {isEarly ? 'Dug up' : 'Harvest!'}
        </div>
        <div style={{
          width: 120, height: 120, margin: '14px auto 8px',
          background: plant.color, borderRadius: 24,
          border: '3px solid #1A1208',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 0 #1A1208',
        }}>
          <svg viewBox="0 0 100 100" width="100" height="100"><PTop stage={4}/></svg>
        </div>
        <h2 style={{ font: '900 24px/1.1 Fraunces', margin: '8px 0 4px' }}>{plant.name} {isEarly ? 'pulled up' : 'is ripe!'}</h2>
        {!isEarly ? (
          <p style={{ font: '700 13px/1.4 Nunito', color: 'var(--ink-2)', margin: '0 0 12px' }}>
            You earned <b>+{earned}</b> bonus coins on top of your <b>{plot.coins}</b>.
          </p>
        ) : (
          <p style={{ font: '700 13px/1.4 Nunito', color: 'var(--ink-2)', margin: '0 0 12px' }}>
            You got your <b>{plot.coins}</b> back — no bonus this time.
          </p>
        )}
        <div style={{ background: '#FFF8EC', borderRadius: 14, padding: 12, marginBottom: 14, border: '2px solid #1A1208' }}>
          <div style={{ font: '900 26px/1 Nunito', color: '#1F7855', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
            <Coin size={22}/>+{finalCoins}
          </div>
          <div style={{ font: '700 10px/1 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>added to your wallet</div>
        </div>
        <button onClick={() => onReplant(plant)} className="btn full" style={{ background: '#1F7855', color: '#fff', border: '2px solid #1A1208', boxShadow: '0 3px 0 #1A1208', marginBottom: 8 }}>
          🌱  Plant again
        </button>
        <button onClick={onCash} className="btn ghost full" style={{ border: '2px solid #1A1208' }}>
          Just keep coins
        </button>
      </div>
    </Modal>
  );
}

Object.assign(window, {
  KidGardenV2, PlantPickerScreen, PlantDetailScreen, WeatherScreen, HarvestModal,
});
