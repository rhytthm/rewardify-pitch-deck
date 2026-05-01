const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "sleek",
  "view": "kid",
  "showOnboarding": false,
  "currency": "Coins"
}/*EDITMODE-END*/;

const { useState, useEffect, useRef } = React;

function App({ deepLink: deepLinkProp } = {}) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Deep-link via ?screen=kid.home, kid.tasks, kid.shop, kid.learn, kid.me, kid.wallet, kid.garden, kid.achievements,
  // parent.overview, parent.tasks, parent.shop, parent.orders, parent.settings, parent.addTask, parent.addReward, onboarding
  const params = new URLSearchParams(location.search);
  const deepLink = deepLinkProp || params.get('screen') || '';
  const deep = deepLink.split('.');
  const printMode = params.get('print') === '1' || !!deepLinkProp;

  // App state
  const [view, setView] = useState(deep[0] === 'parent' ? 'parent' : (deep[0] === 'kid' ? 'kid' : (t.view || 'kid')));
  const [kidTab, setKidTab] = useState(deep[0] === 'kid' && ['home','tasks','shop','learn','me'].includes(deep[1]) ? deep[1] : 'home');
  const [parentTab, setParentTab] = useState(deep[0] === 'parent' && ['overview','tasks','shop','orders','settings'].includes(deep[1]) ? deep[1] : 'overview');
  const [parentScreen, setParentScreen] = useState(deep[0] === 'parent' && (deep[1] === 'addTask' || deep[1] === 'addReward') ? deep[1] : null);
  const [meScreen, setMeScreen] = useState(deep[0] === 'kid' && ['achievements','wallet','garden'].includes(deep[1]) ? deep[1] : null);
  const [showOnboarding, setShowOnboarding] = useState(deep[0] === 'onboarding' ? true : (t.showOnboarding ?? false));

  // Coin Garden state
  const [garden, setGarden] = useState(SEED_GARDEN);
  const [gardenScreen, setGardenScreen] = useState(
    deep[0] === 'kid' && deep[1] === 'garden' && ['picker','weather','detail'].includes(deep[2]) ? deep[2] : null
  );
  const [activePlot, setActivePlot] = useState(
    deep[0] === 'kid' && deep[1] === 'garden' && deep[2] === 'detail' ? 0 : null
  );
  const [plantingPlotId, setPlantingPlotId] = useState(null);
  const [harvestPlot, setHarvestPlot] = useState(null);
  const [harvestEarly, setHarvestEarly] = useState(false);
  const currentWeather = window.WEATHER.sun;

  // Parent garden screen
  const [parentGarden, setParentGarden] = useState(deep[0] === 'parent' && deep[1] === 'garden');

  // Domain state
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [rewards, setRewards] = useState(SEED_REWARDS);
  const [orders, setOrders] = useState(SEED_ORDERS);
  const [history, setHistory] = useState(SEED_HISTORY);
  const [kid, setKid] = useState(SEED_KIDS[0]);
  const [coins, setCoins] = useState(SEED_KIDS[0].coins);

  // Effects
  const [toast, setToast] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [coinFlys, setCoinFlys] = useState([]);
  const [unlockBadge, setUnlockBadge] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const balanceRef = useRef(null);

  React.useEffect(() => { document.documentElement.dataset.density = t.density; }, [t.density]);
  React.useEffect(() => {
    // Only apply print-mode when this is a top-level instance (URL ?print=1).
    // When mounted as a child via deepLinkProp inside a multi-phone PDF doc,
    // the document is shared with the parent layout — we must NOT pollute it.
    if (params.get('print') === '1' && !deepLinkProp) document.documentElement.classList.add('print-mode');
  }, []);

  const flyCoins = (origin, count = 1, target = null) => {
    if (!origin) return;
    const rect = origin.getBoundingClientRect();
    const stage = document.querySelector('.stage').getBoundingClientRect();
    const tgt = target || balanceRef.current;
    const tRect = tgt ? tgt.getBoundingClientRect() : { left: stage.left + 200, top: stage.top + 80 };
    const flys = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x0: rect.left - stage.left + rect.width / 2 - 14,
      y0: rect.top - stage.top + rect.height / 2 - 14,
      x1: tRect.left - stage.left - (rect.left - stage.left) + (i * 6 - count * 3),
      y1: tRect.top - stage.top - (rect.top - stage.top) - 60,
      delay: i * 60,
    }));
    setCoinFlys(prev => [...prev, ...flys]);
    setTimeout(() => setCoinFlys(prev => prev.filter(f => !flys.find(n => n.id === f.id))), 1100);
  };

  const onCompleteTask = (task, btnEl) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'done', completedAt: 'Just now' } : t));
    setHistory(prev => [{ id: 'h' + Date.now(), kind: 'earn', label: task.title, sub: 'Just now', amount: task.coins }, ...prev]);
    setCoins(c => c + task.coins);
    setKid(k => ({ ...k, coins: k.coins + task.coins, xp: Math.min(1, k.xp + 0.05) }));
    flyCoins(btnEl, Math.min(task.coins, 6));
    setTimeout(() => setToast({ msg: `+${task.coins} coins! Great job!`, icon: '🎉' }), 600);
    if (history.filter(h => h.amount > 0).length + 1 === 5) {
      setTimeout(() => setUnlockBadge({ name: 'Task Master', icon: '🎯', desc: 'Completed 5 tasks!' }), 1200);
    }
  };

  const onBuy = (product, btnEl) => {
    if (kid.coins < product.coins) return;
    setKid(k => ({ ...k, coins: k.coins - product.coins }));
    setCoins(c => c - product.coins);
    setHistory(prev => [{ id: 'h' + Date.now(), kind: 'spend', label: product.title, sub: 'Just now', amount: -product.coins }, ...prev]);
    setOrders(prev => [{ id: 'o' + Date.now(), kid: kid.name, item: product.title, coins: product.coins, price: product.price, vendor: product.vendor, status: 'pending', when: 'Just now' }, ...prev]);
    setConfetti(true);
    setTimeout(() => setToast({ msg: `Order placed! Parents notified.`, icon: '📦' }), 400);
  };

  const onPlant = () => {
    setGardenScreen('picker');
    setPlantingPlotId(null);
  };

  // Coin Garden handlers
  const onPlantInPlot = (plotId) => {
    setPlantingPlotId(plotId);
    setGardenScreen('picker');
  };
  const onOpenPlot = (plot) => {
    setActivePlot(plot.id);
    setGardenScreen('detail');
  };
  const onPickPlant = (plant, amount) => {
    if (kid.coins < amount) {
      setToast({ msg: `Need ${amount - kid.coins} more coins`, icon: '🪙' });
      return;
    }
    setKid(k => ({ ...k, coins: k.coins - amount }));
    setHistory(prev => [{ id: 'h' + Date.now(), kind: 'plant', label: `Planted ${plant.name}`, sub: 'Just now', amount: -amount }, ...prev]);
    setGarden(prev => {
      const targetId = plantingPlotId !== null
        ? plantingPlotId
        : (prev.find(p => !p.plantId) || {}).id;
      if (targetId === undefined) {
        setToast({ msg: 'Garden is full!', icon: '🌱' });
        return prev;
      }
      return prev.map(p => p.id === targetId ? { id: targetId, plantId: plant.id, coins: amount, weeksGrowing: 0, value: amount } : p);
    });
    setGardenScreen(null);
    setPlantingPlotId(null);
    setToast({ msg: `${plant.name} planted! 🌱`, icon: '🌱' });
  };
  const onHarvest = (plot, isEarly = false) => {
    setHarvestPlot(plot);
    setHarvestEarly(isEarly);
  };
  const onCloseHarvest = (replant) => {
    if (harvestPlot) {
      const finalCoins = harvestEarly ? harvestPlot.coins : Math.round(harvestPlot.value);
      setKid(k => ({ ...k, coins: k.coins + finalCoins }));
      setHistory(prev => [{ id: 'h' + Date.now(), kind: 'earn', label: `Harvested ${PLANT_BY_ID[harvestPlot.plantId].name}`, sub: 'Just now', amount: finalCoins }, ...prev]);
      setGarden(prev => prev.map(p => p.id === harvestPlot.id ? { id: p.id, plantId: null } : p));
    }
    const wasReady = harvestPlot && !harvestEarly;
    const lastPlot = harvestPlot;
    setHarvestPlot(null);
    setHarvestEarly(false);
    setGardenScreen(null);
    setActivePlot(null);
    if (replant && lastPlot) {
      setPlantingPlotId(lastPlot.id);
      setGardenScreen('picker');
    } else if (wasReady) {
      setToast({ msg: 'Coins added to wallet 🎉', icon: '🎉' });
    }
  };

  const onAddTask = (data) => {
    setTasks(prev => [{ id: 't' + Date.now(), title: data.title, icon: '✨', coins: data.coins, age: data.age, cat: 'Family', recurring: data.recurring, status: 'pending', verifyType: data.verify }, ...prev]);
    setParentScreen(null);
    setToast({ msg: `Task "${data.title}" added`, icon: '✓' });
  };

  const onAddReward = (data) => {
    setRewards(prev => [{ id: 'r' + Date.now(), title: data.title, vendor: data.vendor, coins: data.coins, price: data.price, hue: data.hue, emoji: data.emoji, stock: 'in stock' }, ...prev]);
    setParentScreen(null);
    setToast({ msg: `Added to family shop`, icon: '🎁' });
  };

  const onFulfill = (order) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'shipped' } : o));
    setToast({ msg: 'Order placed with vendor', icon: '🚚' });
  };

  const onSwitchView = (next) => {
    setView(next);
    setTweak('view', next);
  };

  // Render kid view content
  const KID_TABS = [
    { id: 'home', label: 'Home', icon: <Ic.home size={20}/> },
    { id: 'tasks', label: 'Missions', icon: <Ic.tasks size={20}/> },
    { id: 'shop', label: 'Shop', icon: <Ic.shop size={20}/> },
    { id: 'learn', label: 'Learn', icon: <Ic.learn size={20}/> },
    { id: 'me', label: 'Me', icon: <Ic.me size={20}/> },
  ];
  const PARENT_TABS = [
    { id: 'overview', label: 'Family', icon: <Ic.parentHome size={20}/> },
    { id: 'tasks', label: 'Tasks', icon: <Ic.tasks size={20}/> },
    { id: 'shop', label: 'Shop', icon: <Ic.shop size={20}/> },
    { id: 'orders', label: 'Orders', icon: <Ic.orders size={20}/> },
    { id: 'settings', label: 'Settings', icon: <Ic.settings size={20}/> },
  ];

  const renderKid = () => {
    if (meScreen === 'wallet') return <KidWallet kid={kid} history={history} onPlant={() => { setMeScreen('garden'); }}/>;
    if (meScreen === 'achievements') return <KidAchievements kid={kid} badges={SEED_BADGES}/>;
    if (meScreen === 'garden') {
      // sub-screens of the garden
      if (gardenScreen === 'picker') {
        return <PlantPickerScreen
          kidCoins={kid.coins}
          onClose={() => { setGardenScreen(null); setPlantingPlotId(null); }}
          onPlant={onPickPlant}
        />;
      }
      if (gardenScreen === 'detail' && activePlot !== null) {
        const plot = garden.find(p => p.id === activePlot);
        if (plot && plot.plantId) {
          return <PlantDetailScreen
            plot={plot}
            onClose={() => { setGardenScreen(null); setActivePlot(null); }}
            onHarvest={onHarvest}
          />;
        }
      }
      if (gardenScreen === 'weather') {
        return <WeatherScreen onClose={() => setGardenScreen(null)} weather={currentWeather}/>;
      }
      return <KidGardenV2
        kid={{ ...kid, coins }}
        garden={garden}
        weather={currentWeather}
        onPlantEmpty={onPlantInPlot}
        onOpenPlot={onOpenPlot}
        onOpenWeather={() => setGardenScreen('weather')}
        onPlantNew={onPlant}
      />;
    }
    switch (kidTab) {
      case 'home':
        return <KidHome kid={{ ...kid, coins }} tasks={tasks} quests={SEED_QUESTS} onCompleteTask={onCompleteTask} fly={flyCoins}/>;
      case 'tasks':
        return <KidTasks tasks={tasks} onCompleteTask={onCompleteTask} fly={flyCoins}/>;
      case 'shop':
        return <KidShop rewards={rewards} kid={{ ...kid, coins }} onBuy={onBuy}/>;
      case 'learn':
        return <KidLearn lessons={SEED_LESSONS} onOpenLesson={setActiveLesson}/>;
      case 'me':
        return <KidMe kid={{ ...kid, coins }} onOpen={setMeScreen}/>;
      default: return null;
    }
  };

  const renderParent = () => {
    if (parentScreen === 'addTask') return <AddTaskScreen onClose={() => setParentScreen(null)} onSave={onAddTask}/>;
    if (parentScreen === 'addReward') return <AddRewardScreen onClose={() => setParentScreen(null)} onSave={onAddReward}/>;
    if (parentScreen === 'garden' || parentGarden) {
      return <ParentGardenSummary
        kids={SEED_KIDS}
        garden={garden}
        onBack={() => { setParentScreen(null); setParentGarden(false); }}
      />;
    }
    switch (parentTab) {
      case 'overview':
        return <ParentDashboard kids={SEED_KIDS} orders={orders} tasks={tasks} garden={garden} onAddTask={() => setParentScreen('addTask')} onAddReward={() => setParentScreen('addReward')} onSwitchKid={() => setParentScreen('garden')} onOpenGarden={() => setParentScreen('garden')}/>;
      case 'tasks':
        return <ParentTasksList tasks={tasks} onAdd={() => setParentScreen('addTask')}/>;
      case 'shop':
        return <ParentShopList rewards={rewards} onAdd={() => setParentScreen('addReward')}/>;
      case 'orders':
        return <ParentOrders orders={orders} onFulfill={onFulfill}/>;
      case 'settings':
        return <ParentSettings/>;
      default: return null;
    }
  };

  return (
    <div className="stage">
      {/* View switcher */}
      <div className="view-switch">
        <button className={view === 'kid' ? 'on' : ''} onClick={() => onSwitchView('kid')}>
          <span style={{ fontSize: 14 }}>🦊</span> Kid
        </button>
        <button className={view === 'parent' ? 'on' : ''} onClick={() => onSwitchView('parent')}>
          <span style={{ fontSize: 14 }}>👤</span> Parent
        </button>
      </div>

      <div className="frames">
        <PhoneFrame role={view}>
          {showOnboarding ? (
            <Onboarding onDone={() => { setShowOnboarding(false); setTweak('showOnboarding', false); }}/>
          ) : (
            <div className={`screen ${view === 'parent' ? 'parent' : ''}`}>
              <div className="scroll" ref={view === 'kid' ? balanceRef : null}>
                {view === 'kid' ? renderKid() : renderParent()}
              </div>
              <TabBar
                tabs={view === 'kid' ? KID_TABS : PARENT_TABS}
                current={view === 'kid' ? kidTab : parentTab}
                onSelect={(id) => {
                  if (view === 'kid') { setKidTab(id); setMeScreen(null); }
                  else { setParentTab(id); setParentScreen(null); }
                }}
              />
              {toast && <Toast key={toast.msg} onDone={() => setToast(null)}><span>{toast.icon}</span> {toast.msg}</Toast>}
              {confetti && <Confetti onDone={() => setConfetti(false)}/>}
              {coinFlys.map(f => (
                <div key={f.id} className="coin-fly" style={{ '--x0': f.x0 + 'px', '--y0': f.y0 + 'px', '--x1': f.x1 + 'px', '--y1': f.y1 + 'px', left: 0, top: 0, animationDelay: f.delay + 'ms' }}>$</div>
              ))}
              {unlockBadge && <BadgeUnlock badge={unlockBadge} onClose={() => setUnlockBadge(null)}/>}
              {activeLesson && <LessonModal lesson={activeLesson} onClose={() => setActiveLesson(null)} onComplete={() => { setKid(k => ({ ...k, coins: k.coins + activeLesson.xp })); setCoins(c => c + activeLesson.xp); setActiveLesson(null); setToast({ msg: `+${activeLesson.xp} coins · Lesson done!`, icon: '🎓' }); }}/>}
              {harvestPlot && <HarvestModal plot={harvestPlot} isEarly={harvestEarly} onClose={() => onCloseHarvest(false)} onCash={() => onCloseHarvest(false)} onReplant={() => onCloseHarvest(true)}/>}
            </div>
          )}
        </PhoneFrame>
      </div>

      <TweaksPanel>
        <TweakSection label="Layout"/>
        <TweakRadio label="Density" value={t.density} options={['sleek','regular','chunky']} onChange={(v) => setTweak('density', v)}/>
        <TweakSection label="Demo"/>
        <TweakButton label="Replay onboarding" onClick={() => setShowOnboarding(true)}/>
        <TweakButton label="Trigger badge unlock" secondary onClick={() => setUnlockBadge({ name: '7-Day Streak!', icon: '🔥', desc: 'You completed tasks 7 days in a row!' })}/>
        <TweakButton label="Reset state" secondary onClick={() => { setKid(SEED_KIDS[0]); setCoins(SEED_KIDS[0].coins); setTasks(SEED_TASKS); setOrders(SEED_ORDERS); setHistory(SEED_HISTORY); }}/>
        <TweakSection label="View"/>
        <TweakRadio label="Active" value={view} options={['kid','parent']} onChange={onSwitchView}/>
        <TweakSection label="Coin Garden"/>
        <TweakButton label="Open Maya's Garden (kid)" onClick={() => { onSwitchView('kid'); setKidTab('me'); setMeScreen('garden'); setGardenScreen(null); }}/>
        <TweakButton label="Open Garden Summary (parent)" onClick={() => { onSwitchView('parent'); setParentScreen('garden'); }}/>
        <TweakButton label="Trigger weather event" secondary onClick={() => { onSwitchView('kid'); setKidTab('me'); setMeScreen('garden'); setGardenScreen('weather'); }}/>
      </TweaksPanel>
    </div>
  );
}

/* Kid "Me" tab — links to sub-screens */
function KidMe({ kid, onOpen }) {
  return (
    <div className="tab-fade" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '12px 0 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: kid.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 3px 0 rgba(0,0,0,0.1)' }}>{kid.avatar}</div>
        <div>
          <div style={{ font: '900 22px/1 Nunito' }}>{kid.name}</div>
          <div style={{ font: '700 12px/1.2 Nunito', color: 'var(--ink-3)', marginTop: 4 }}>Level {kid.level} · {Math.round(kid.xp * 100)} XP</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6, font: '900 13px/1 Nunito' }}>
            <Coin size={16}/>{kid.coins} <span className="chip coral" style={{ height: 20, fontSize: 10, padding: '0 8px', marginLeft: 4 }}>🔥 {kid.streak}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={() => onOpen('wallet')} className="row" style={{ cursor: 'pointer', textAlign: 'left', font: 'inherit', border: '0.5px solid var(--line)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FFE08A, #FFC93C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6E4A00' }}><Coin size={20}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ font: '800 14px/1.2 Nunito' }}>Wallet</div>
            <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>Coins, history & investing</div>
          </div>
          <Ic.chevR size={16} color="var(--ink-3)"/>
        </button>
        <button onClick={() => onOpen('garden')} className="row" style={{ cursor: 'pointer', textAlign: 'left', font: 'inherit', border: '0.5px solid var(--line)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(88,214,168,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌱</div>
          <div style={{ flex: 1 }}>
            <div style={{ font: '800 14px/1.2 Nunito' }}>Coin Garden</div>
            <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>Watch your coins grow</div>
          </div>
          <Ic.chevR size={16} color="var(--ink-3)"/>
        </button>
        <button onClick={() => onOpen('achievements')} className="row" style={{ cursor: 'pointer', textAlign: 'left', font: 'inherit', border: '0.5px solid var(--line)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,201,60,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.trophy size={20} color="#7A5500"/></div>
          <div style={{ flex: 1 }}>
            <div style={{ font: '800 14px/1.2 Nunito' }}>Trophies</div>
            <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>Badges & streaks</div>
          </div>
          <Ic.chevR size={16} color="var(--ink-3)"/>
        </button>
        <button className="row" style={{ cursor: 'pointer', textAlign: 'left', font: 'inherit', border: '0.5px solid var(--line)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(155,123,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic.settings size={20} color="#5A3CC0"/></div>
          <div style={{ flex: 1 }}>
            <div style={{ font: '800 14px/1.2 Nunito' }}>Settings</div>
            <div style={{ font: '700 11px/1 Nunito', color: 'var(--ink-3)', marginTop: 3 }}>Avatar, notifications</div>
          </div>
          <Ic.chevR size={16} color="var(--ink-3)"/>
        </button>
      </div>

      <div style={{ marginTop: 24, padding: 18, borderRadius: 22, background: 'linear-gradient(135deg, #FFD9D2, #FFB14D)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Pip size={64} mood="wink"/>
        <div>
          <div style={{ font: '900 14px/1.1 Nunito', color: '#3D1F00' }}>Pip says hi!</div>
          <div style={{ font: '700 12px/1.3 Nunito', color: 'rgba(61,31,0,0.75)', marginTop: 4 }}>You're doing amazing. Keep your streak alive! 🔥</div>
        </div>
      </div>
    </div>
  );
}

/* Parent tasks list */
function ParentTasksList({ tasks, onAdd }) {
  return (
    <div className="tab-fade screen parent" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ font: '900 28px/1.1 Nunito', margin: 0 }}>Tasks</h1>
        <button onClick={onAdd} className="btn coral sm"><Ic.plus size={14}/> Add</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map(t => (
          <div key={t.id} className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{t.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ font: '800 14px/1.2 Nunito' }}>{t.title}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4, font: '700 11px/1 Nunito', color: 'var(--ink-2)' }}>
                <span>{t.cat}</span><span>·</span><span>{t.recurring}</span><span>·</span><span>Age {t.age}</span>
              </div>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '900 14px/1 Nunito' }}><Coin size={15}/>{t.coins}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Parent shop list */
function ParentShopList({ rewards, onAdd }) {
  return (
    <div className="tab-fade screen parent" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ font: '900 28px/1.1 Nunito', margin: 0 }}>Family shop</h1>
        <button onClick={onAdd} className="btn coral sm"><Ic.plus size={14}/> Add</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {rewards.map(r => (
          <div key={r.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="product-img" style={{ background: `linear-gradient(135deg, hsl(${r.hue} 80% 90%), hsl(${r.hue} 60% 80%))`, aspectRatio: '1/0.7', fontSize: 44, borderRadius: 0 }}>{r.emoji}</div>
            <div style={{ padding: 10 }}>
              <div style={{ font: '700 10px/1 Nunito', color: 'var(--ink-3)', marginBottom: 3 }}>{r.vendor}</div>
              <div style={{ font: '800 12px/1.2 Nunito', minHeight: 30 }}>{r.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '900 13px/1 Nunito' }}><Coin size={14}/>{r.coins}</span>
                <span style={{ font: '700 10px/1 Nunito', color: 'var(--ink-3)' }}>${r.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentSettings() {
  const rows = [
    { sec: 'Coins → Real Money', items: [
      { label: 'Coin value', detail: '$0.10 / coin' },
      { label: 'Weekly allowance', detail: '50 coins' },
      { label: 'Withdraw to bank', detail: 'Off' },
    ]},
    { sec: 'Garden / Investing', items: [
      { label: 'Compound rate', detail: '8% APR' },
      { label: 'Auto-SIP', detail: '5 coins / week' },
      { label: 'Lock period', detail: '30 days' },
    ]},
    { sec: 'Permissions', items: [
      { label: 'Daily spend limit', detail: '50 coins' },
      { label: 'Approval required', detail: 'Over 100 coins' },
      { label: 'Photo verify tasks', detail: 'Optional' },
    ]},
  ];
  return (
    <div className="tab-fade screen parent" style={{ padding: '0 16px 110px' }}>
      <div style={{ padding: '6px 0 16px' }}>
        <h1 style={{ font: '900 28px/1.1 Nunito', margin: 0 }}>Settings</h1>
      </div>
      {rows.map(group => (
        <div key={group.sec} style={{ marginBottom: 16 }}>
          <div className="h-eyebrow">{group.sec}</div>
          <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: '0.5px solid var(--line)' }}>
            {group.items.map((it, i) => (
              <div key={it.label} style={{ display: 'flex', alignItems: 'center', padding: '14px 14px', borderTop: i === 0 ? 'none' : '0.5px solid var(--line)' }}>
                <span style={{ flex: 1, font: '700 13px/1.2 Nunito' }}>{it.label}</span>
                <span style={{ font: '700 12px/1 Nunito', color: 'var(--ink-3)', marginRight: 6 }}>{it.detail}</span>
                <Ic.chevR size={14} color="var(--ink-3)"/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { KidMe, ParentTasksList, ParentShopList, ParentSettings });


// Expose for cross-file use
window.RewardifyApp = App;
