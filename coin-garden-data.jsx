/* coin-garden-data.jsx — plant catalog + helpers + seed garden state */

/* ───────────────────────────────────────────────────────────
   PLANT CATALOG — each plant maps to a financial product.
   Kid-facing labels are friendly; parent-facing labels are real.
─────────────────────────────────────────────────────────── */

const PLANTS = [
  {
    id: 'sprout',
    name: 'Sprout',
    realName: 'Savings',
    icon: '🌱',
    color: '#7FD89A',
    colorDark: '#3FA265',
    desc: 'Easy & quick. Small steady growth, dig up anytime.',
    realDesc: 'High-yield savings — withdraw anytime, low return.',
    minCost: 5,
    weeksToHarvest: 4,
    rate: 0.04,           // 4% / yr equivalent
    risk: 1,              // 1-5
    canDigEarly: true,
    rootStyle: 'fibrous',
    canopyStyle: 'sprout',
    weather: { sun: 1, rain: 1.1, storm: 0.9, drought: 0.7 },
  },
  {
    id: 'acorn',
    name: 'Acorn',
    realName: 'Term Deposit',
    icon: '🌰',
    color: '#B27845',
    colorDark: '#7D4D24',
    desc: 'Bury it & wait. Guaranteed bonus, no peeking!',
    realDesc: 'Fixed deposit — guaranteed return, locked term.',
    minCost: 10,
    weeksToHarvest: 8,
    rate: 0.07,
    risk: 1,
    canDigEarly: false,
    rootStyle: 'taproot',
    canopyStyle: 'acorn',
    weather: { sun: 1, rain: 1, storm: 1, drought: 1 },
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    realName: 'Index Fund',
    icon: '🌻',
    color: '#FFC93C',
    colorDark: '#D49000',
    desc: 'Loves the sun! Big growth in good weather, smaller in bad.',
    realDesc: 'Index fund — tracks the market. Growth follows market sun.',
    minCost: 15,
    weeksToHarvest: 12,
    rate: 0.10,
    risk: 3,
    canDigEarly: true,
    rootStyle: 'tap+lateral',
    canopyStyle: 'sunflower',
    weather: { sun: 1.5, rain: 1, storm: 0.7, drought: 0.6 },
  },
  {
    id: 'berry',
    name: 'Berry Bush',
    realName: 'Mutual Fund',
    icon: '🫐',
    color: '#9B7BFF',
    colorDark: '#5A3CC0',
    desc: 'Bushy & balanced. Picks lots of small berries every week.',
    realDesc: 'Mutual fund — diversified mix, balanced return.',
    minCost: 20,
    weeksToHarvest: 10,
    rate: 0.08,
    risk: 2,
    canDigEarly: true,
    rootStyle: 'shallow-wide',
    canopyStyle: 'berry',
    weather: { sun: 1.1, rain: 1.2, storm: 0.85, drought: 0.7 },
  },
  {
    id: 'oak',
    name: 'Mighty Oak',
    realName: 'Retirement Fund',
    icon: '🌳',
    color: '#3FA265',
    colorDark: '#1F5A37',
    desc: 'The slow giant. Grows huge over many seasons. For patient stashers.',
    realDesc: 'Long-term equity — compound for years, biggest reward.',
    minCost: 40,
    weeksToHarvest: 26,
    rate: 0.12,
    risk: 3,
    canDigEarly: false,
    rootStyle: 'deep-massive',
    canopyStyle: 'oak',
    weather: { sun: 1.1, rain: 1.1, storm: 0.95, drought: 0.85 },
  },
  {
    id: 'cactus',
    name: 'Cactus',
    realName: 'Gold / Defensive',
    icon: '🌵',
    color: '#5BBF7A',
    colorDark: '#2E7A45',
    desc: 'Tough & dry-loving. Barely cares about storms or droughts.',
    realDesc: 'Gold or defensive asset — stable in bad weather.',
    minCost: 25,
    weeksToHarvest: 14,
    rate: 0.06,
    risk: 1,
    canDigEarly: true,
    rootStyle: 'shallow-wide',
    canopyStyle: 'cactus',
    weather: { sun: 1.1, rain: 0.9, storm: 0.95, drought: 1.1 },
  },
  {
    id: 'bean',
    name: 'Magic Bean',
    realName: 'Crypto / High-risk',
    icon: '🫘',
    color: '#FF7A6B',
    colorDark: '#B23A2C',
    desc: 'Wild & unpredictable. Could shoot to the sky… or wilt overnight.',
    realDesc: 'High-risk asset — huge upside, can go to zero.',
    minCost: 30,
    weeksToHarvest: 6,
    rate: 0.20,           // headline rate, but high volatility
    risk: 5,
    canDigEarly: true,
    rootStyle: 'twisty',
    canopyStyle: 'bean',
    weather: { sun: 1.8, rain: 1.5, storm: 0.4, drought: 0.3 },
  },
];

const PLANT_BY_ID = Object.fromEntries(PLANTS.map(p => [p.id, p]));

/* ───────────────────────────────────────────────────────────
   WEATHER EVENTS — 4 kinds, kid-friendly explanations.
─────────────────────────────────────────────────────────── */

const WEATHER = {
  sun:     { id: 'sun',     icon: '☀️', label: 'Sunny week',     color: '#FFC93C', tone: 'good',
             desc: 'A sunny week — markets up! Most plants got an extra boost.' },
  rain:    { id: 'rain',    icon: '🌧️', label: 'Rainy week',     color: '#57B5F5', tone: 'good',
             desc: 'Steady rain — bushy & fruity plants love it. Gentle, healthy growth.' },
  storm:   { id: 'storm',   icon: '⛈️',  label: 'Stormy week',    color: '#7B68A8', tone: 'bad',
             desc: 'A storm hit the market. Risky plants wobbled; sturdy ones held on.' },
  drought: { id: 'drought', icon: '🏜️', label: 'Dry week',       color: '#D49000', tone: 'bad',
             desc: 'A dry spell. Cactus & Acorn shrugged it off; thirsty plants slowed.' },
};

const WEATHER_HISTORY = [
  { week: 'This week',    kind: 'sun' },
  { week: 'Last week',    kind: 'rain' },
  { week: '2 weeks ago',  kind: 'storm' },
  { week: '3 weeks ago',  kind: 'sun' },
  { week: '4 weeks ago',  kind: 'sun' },
  { week: '5 weeks ago',  kind: 'drought' },
  { week: '6 weeks ago',  kind: 'rain' },
  { week: '7 weeks ago',  kind: 'sun' },
];

/* ───────────────────────────────────────────────────────────
   SEED GARDEN — the kid's currently planted plots.
   plot ids 0..8 (3×3 grid). null = empty.
─────────────────────────────────────────────────────────── */

const SEED_GARDEN = [
  { id: 0, plantId: 'sprout',    coins: 10, weeksGrowing: 3, value: 10.5 },
  { id: 1, plantId: 'acorn',     coins: 20, weeksGrowing: 5, value: 21.4 },
  { id: 2, plantId: null },
  { id: 3, plantId: 'sunflower', coins: 15, weeksGrowing: 8, value: 17.8 },
  { id: 4, plantId: 'oak',       coins: 50, weeksGrowing: 12, value: 56.2 },
  { id: 5, plantId: 'berry',     coins: 25, weeksGrowing: 4, value: 26.6 },
  { id: 6, plantId: null },
  { id: 7, plantId: 'cactus',    coins: 25, weeksGrowing: 9, value: 26.4 },
  { id: 8, plantId: null },
];

/* helpers */
function gardenTotalPlanted(garden) {
  return garden.reduce((s, p) => s + (p.plantId ? p.coins : 0), 0);
}
function gardenTotalValue(garden) {
  return garden.reduce((s, p) => s + (p.plantId ? p.value : 0), 0);
}
function plantProgress(plot) {
  if (!plot.plantId) return 0;
  const p = PLANT_BY_ID[plot.plantId];
  return Math.min(1, plot.weeksGrowing / p.weeksToHarvest);
}
function plantStage(plot) {
  // 0 = seed, 1 = sprout, 2 = young, 3 = mature, 4 = ready
  const prog = plantProgress(plot);
  if (prog >= 1) return 4;
  if (prog >= 0.7) return 3;
  if (prog >= 0.4) return 2;
  if (prog >= 0.1) return 1;
  return 0;
}

Object.assign(window, {
  PLANTS, PLANT_BY_ID, WEATHER, WEATHER_HISTORY, SEED_GARDEN,
  gardenTotalPlanted, gardenTotalValue, plantProgress, plantStage,
});
