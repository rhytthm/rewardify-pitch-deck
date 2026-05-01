/* data.jsx — sample data + state context */

const SEED_TASKS = [
  { id: 't1', title: 'Make your bed', icon: '🛏', coins: 5, age: '4-8', cat: 'Daily', recurring: 'daily', status: 'done', completedAt: 'Today, 8:12 AM' },
  { id: 't2', title: 'Read for 30 minutes', icon: '📚', coins: 10, age: '6-14', cat: 'Learning', recurring: 'daily', status: 'pending' },
  { id: 't3', title: 'Empty the dishwasher', icon: '🍽', coins: 8, age: '8-14', cat: 'Daily', recurring: 'daily', status: 'pending' },
  { id: 't4', title: 'Practice piano 20 min', icon: '🎹', coins: 12, age: '6-14', cat: 'Learning', recurring: 'weekly', status: 'pending' },
  { id: 't5', title: 'Walk the dog', icon: '🐕', coins: 6, age: '8-14', cat: 'Pets', recurring: 'daily', status: 'review', verifyType: 'photo' },
  { id: 't6', title: 'Math homework', icon: '➗', coins: 10, age: '6-14', cat: 'School', recurring: 'daily', status: 'pending' },
  { id: 't7', title: 'Tidy up toys', icon: '🧸', coins: 5, age: '4-10', cat: 'Daily', recurring: 'daily', status: 'pending' },
  { id: 't8', title: 'Help with dinner prep', icon: '🥗', coins: 8, age: '8-14', cat: 'Family', recurring: 'weekly', status: 'pending' },
];

const SEED_REWARDS = [
  { id: 'r1', title: 'LEGO Friends Mini Set', vendor: 'Amazon', coins: 120, price: 12.99, hue: 32, emoji: '🧱', stock: 'in stock' },
  { id: 'r2', title: 'Crayola Color Markers', vendor: 'Walmart', coins: 60, price: 6.49, hue: 320, emoji: '🖍', stock: 'in stock' },
  { id: 'r3', title: 'Switch Game: Mario Kart', vendor: 'Amazon', coins: 600, price: 49.99, hue: 0, emoji: '🎮', stock: 'in stock' },
  { id: 'r4', title: 'Roblox Gift Card $10', vendor: 'Target', coins: 110, price: 10.00, hue: 200, emoji: '💳', stock: 'digital' },
  { id: 'r5', title: 'Scooter — Razor A5', vendor: 'Amazon', coins: 1200, price: 89.99, hue: 145, emoji: '🛴', stock: 'in stock' },
  { id: 'r6', title: 'Ice Cream Trip 🍦', vendor: 'Family treat', coins: 40, price: 0, hue: 280, emoji: '🍦', stock: 'experience' },
  { id: 'r7', title: 'Movie Night Pick', vendor: 'Family treat', coins: 30, price: 0, hue: 25, emoji: '🎬', stock: 'experience' },
  { id: 'r8', title: 'Pokemon TCG Booster', vendor: 'Target', coins: 80, price: 4.99, hue: 50, emoji: '🃏', stock: 'in stock' },
];

const SEED_BADGES = [
  { id: 'b1', name: '7-Day Streak', icon: '🔥', earned: true, date: 'Apr 28' },
  { id: 'b2', name: 'First Buy', icon: '🛍', earned: true, date: 'Apr 21' },
  { id: 'b3', name: 'Bookworm', icon: '📚', earned: true, date: 'Apr 18', desc: 'Read 5 days in a row' },
  { id: 'b4', name: 'Saver', icon: '🏦', earned: true, date: 'Apr 25', desc: 'Saved 100 coins' },
  { id: 'b5', name: '14-Day Streak', icon: '🔥', earned: false, progress: 0.5, desc: 'Complete tasks 14 days in a row' },
  { id: 'b6', name: 'Investor', icon: '🌱', earned: false, progress: 0.3, desc: 'Plant 50 coins in the Garden' },
  { id: 'b7', name: 'Helper', icon: '🤝', earned: false, progress: 0.6, desc: '10 family tasks' },
  { id: 'b8', name: 'Big Spender', icon: '💎', earned: false, progress: 0.1, desc: 'Buy a 500-coin reward' },
  { id: 'b9', name: 'Quiz Whiz', icon: '🧠', earned: false, progress: 0.2, desc: 'Ace 5 lessons' },
];

const SEED_QUESTS = [
  { id: 'q1', title: 'Daily warm-up', desc: 'Complete 3 tasks today', progress: 1, total: 3, reward: 15, icon: '⚡' },
  { id: 'q2', title: 'Weekly reader', desc: 'Read 5 days this week', progress: 3, total: 5, reward: 30, icon: '📖' },
  { id: 'q3', title: 'Garden grower', desc: 'Plant 20 coins in Garden', progress: 8, total: 20, reward: 25, icon: '🌱' },
];

const SEED_HISTORY = [
  { id: 'h1', kind: 'earn', label: 'Made bed', sub: 'Today, 8:12 AM', amount: 5 },
  { id: 'h2', kind: 'earn', label: 'Math homework', sub: 'Yesterday, 4:20 PM', amount: 10 },
  { id: 'h3', kind: 'spend', label: 'Pokemon TCG Booster', sub: 'Yesterday, 7:30 PM', amount: -80 },
  { id: 'h4', kind: 'plant', label: 'Planted in Garden', sub: 'Apr 28', amount: -20 },
  { id: 'h5', kind: 'earn', label: 'Read 30 min', sub: 'Apr 28, 8:00 PM', amount: 10 },
  { id: 'h6', kind: 'earn', label: 'Walk the dog', sub: 'Apr 27, 6:00 PM', amount: 6 },
  { id: 'h7', kind: 'bonus', label: 'Streak bonus 🔥', sub: 'Apr 27', amount: 10 },
];

const SEED_LESSONS = [
  { id: 'l1', title: 'What is money?', mins: 3, status: 'done', xp: 10, color: '#FFC93C' },
  { id: 'l2', title: 'Earn vs. Spend', mins: 4, status: 'done', xp: 12, color: '#FF7A6B' },
  { id: 'l3', title: 'The Saving Jar', mins: 5, status: 'current', xp: 15, color: '#58D6A8' },
  { id: 'l4', title: 'Wants vs. Needs', mins: 4, status: 'locked', xp: 12, color: '#57B5F5' },
  { id: 'l5', title: 'Compound Magic ✨', mins: 6, status: 'locked', xp: 20, color: '#9B7BFF' },
  { id: 'l6', title: 'SIP Superpower', mins: 5, status: 'locked', xp: 18, color: '#FF9DC4' },
];

const SEED_KIDS = [
  { id: 'k1', name: 'Maya', age: 9, avatar: '🦊', coins: 248, level: 4, xp: 0.62, streak: 7, color: '#FF7A6B' },
  { id: 'k2', name: 'Leo', age: 6, avatar: '🦁', coins: 92, level: 2, xp: 0.3, streak: 3, color: '#57B5F5' },
];

const SEED_ORDERS = [
  { id: 'o1', kid: 'Maya', item: 'LEGO Friends Mini Set', coins: 120, price: 12.99, vendor: 'Amazon', status: 'pending', when: '2 hr ago' },
  { id: 'o2', kid: 'Leo', item: 'Crayola Color Markers', coins: 60, price: 6.49, vendor: 'Walmart', status: 'pending', when: '5 hr ago' },
  { id: 'o3', kid: 'Maya', item: 'Pokemon TCG Booster', coins: 80, price: 4.99, vendor: 'Target', status: 'shipped', when: 'Yesterday' },
  { id: 'o4', kid: 'Leo', item: 'Ice Cream Trip 🍦', coins: 40, price: 0, vendor: 'Family treat', status: 'fulfilled', when: 'Apr 26' },
];

Object.assign(window, {
  SEED_TASKS, SEED_REWARDS, SEED_BADGES, SEED_QUESTS,
  SEED_HISTORY, SEED_LESSONS, SEED_KIDS, SEED_ORDERS,
});
