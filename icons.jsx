/* icons.jsx — line icons used across the app */

const I = (path, viewBox = '0 0 24 24') => ({ size = 22, color = 'currentColor', fill = 'none', strokeWidth = 2 } = {}) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const Ic = {
  home: I(<><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/></>),
  tasks: I(<><rect x="4" y="5" width="16" height="16" rx="3"/><path d="M9 12l2 2 4-4"/><path d="M9 4v3M15 4v3"/></>),
  shop: I(<><path d="M3 7h18l-1.5 12a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2L3 7Z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></>),
  learn: I(<><path d="M4 7l8-4 8 4-8 4-8-4Z"/><path d="M4 7v6c0 2 4 4 8 4s8-2 8-4V7"/><path d="M20 7v6"/></>),
  me: I(<><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>),
  invest: I(<><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></>),

  // parent
  parentHome: I(<><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 3-5.5 6-5.5s6 2.5 6 5.5"/><path d="M14 19c0-2 2-3.5 4-3.5s3 1 3 3"/></>),
  add: I(<><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></>),
  orders: I(<><path d="M3 5h18l-1 14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L3 5Z"/><path d="M8 9v0M16 9v0"/></>),
  settings: I(<><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.1-1.2L14 3.5h-4l-.5 2.2a7 7 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1c.6.5 1.3.9 2.1 1.2L10 20.5h4l.5-2.2a7 7 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z"/></>),

  // misc
  fire: I(<><path d="M12 22a7 7 0 0 0 7-7c0-3-2-5-3-8-1 2-3 3-3 5-1-1-2-3-2-5-2 2-6 5-6 9a7 7 0 0 0 7 6Z"/></>, '0 0 24 24'),
  trophy: I(<><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 4H4v2a4 4 0 0 0 4 4M16 4h4v2a4 4 0 0 1-4 4"/><path d="M9 19h6M12 13v6"/></>),
  bolt: I(<><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z"/></>),
  star: I(<><path d="M12 3l2.6 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.6 1-6L3.4 9.4l6-.9L12 3Z"/></>),
  check: I(<><path d="M5 13l4 4L19 7"/></>),
  x: I(<><path d="M6 6l12 12M6 18L18 6"/></>),
  chevR: I(<><path d="M9 5l7 7-7 7"/></>),
  chevL: I(<><path d="M15 5l-7 7 7 7"/></>),
  chevD: I(<><path d="M5 9l7 7 7-7"/></>),
  bell: I(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"/><path d="M10 21a2 2 0 0 0 4 0"/></>),
  search: I(<><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></>),
  filter: I(<><path d="M3 5h18M6 12h12M10 19h4"/></>),
  camera: I(<><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="4"/><path d="M8 6l1.5-3h5L16 6"/></>),
  clock: I(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  cal: I(<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>),
  heart: I(<><path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z"/></>),
  plus: I(<><path d="M12 5v14M5 12h14"/></>),
  send: I(<><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7Z"/></>),
  link: I(<><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></>),
  pkg: I(<><path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></>),
  truck: I(<><rect x="2" y="7" width="13" height="10" rx="1"/><path d="M15 10h4l3 4v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>),
  gift: I(<><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12"/><path d="M12 9c-2-3-6-3-6 0s4 0 6 0c2 0 6 3 6 0s-4-3-6 0Z"/></>),
  sprout: I(<><path d="M12 22V11"/><path d="M12 11c-3 0-6-2-6-5 3 0 6 1 6 5Z"/><path d="M12 11c3 0 6-3 6-7-3 0-6 2-6 7Z"/></>),
  book: I(<><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5Z"/><path d="M4 19a2 2 0 0 1 2-2h12"/></>),
  play: I(<path d="M7 5v14l11-7L7 5Z"/>),
  lock: I(<><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>),
  share: I(<><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></>),
  swap: I(<><path d="M4 8h13l-3-3M20 16H7l3 3"/></>),
  switch: I(<><circle cx="9" cy="9" r="3"/><circle cx="15" cy="15" r="3"/><path d="M3 9h3M12 9h6M3 15h9M18 15h3"/></>),
};

Object.assign(window, { Ic });
