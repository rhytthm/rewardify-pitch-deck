/* shared.jsx — common UI bits used across kid + parent */

function StatusBar({ dark = false, time = '9:41' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px 0', zIndex: 20, pointerEvents: 'none',
    }}>
      <span style={{ font: '600 16px/1 -apple-system, system-ui', color: c, letterSpacing: 0.2 }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 1 }}>
        <svg width="18" height="11" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c}/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c}/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c}/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <svg width="16" height="11" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c}/>
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c}/>
          <circle cx="8.5" cy="10.5" r="1.5" fill={c}/>
        </svg>
        <svg width="26" height="12" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c}/>
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator({ dark = false }) {
  return (
    <div style={{
      position: 'absolute', bottom: 8, left: 0, right: 0, zIndex: 60,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{
        width: 139, height: 5, borderRadius: 100,
        background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
      }} />
    </div>
  );
}

function DynamicIsland() {
  return (
    <div style={{
      position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
      width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
    }} />
  );
}

function PhoneFrame({ children, dark = false, role = 'kid' }) {
  return (
    <div style={{
      width: 402, height: 874, borderRadius: 48, overflow: 'hidden',
      position: 'relative',
      background: role === 'parent' ? '#F4F5F8' : '#FFF8EC',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12), 0 0 0 12px #1a1a1a',
      fontFamily: 'Nunito, -apple-system, system-ui',
    }}>
      <DynamicIsland />
      <StatusBar dark={dark} />
      {children}
      <HomeIndicator dark={dark} />
    </div>
  );
}

function TabBar({ tabs, current, onSelect }) {
  return (
    <div className="tabbar">
      {tabs.map((t) => (
        <button key={t.id} className={current === t.id ? 'on' : ''} onClick={() => onSelect(t.id)}>
          <span className="tab-icon">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function Toast({ children, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="toast">{children}</div>;
}

function Confetti({ onDone, durationMs = 2400 }) {
  const pieces = React.useMemo(() => {
    const colors = ['#FFC93C', '#FF7A6B', '#58D6A8', '#57B5F5', '#9B7BFF', '#FF9DC4'];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.8 + Math.random() * 1.4,
      color: colors[i % colors.length],
      rot: Math.random() * 360,
      size: 6 + Math.random() * 8,
    }));
  }, []);
  React.useEffect(() => {
    const t = setTimeout(onDone, durationMs);
    return () => clearTimeout(t);
  }, [onDone, durationMs]);
  return (
    <div className="confetti-host">
      {pieces.map((p) => (
        <div key={p.id} className="confetti-piece" style={{
          left: `${p.left}%`,
          top: -20,
          background: p.color,
          width: p.size,
          height: p.size * 1.4,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          transform: `rotate(${p.rot}deg)`,
        }}/>
      ))}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

Object.assign(window, { PhoneFrame, TabBar, Toast, Confetti, Modal, StatusBar, HomeIndicator });
