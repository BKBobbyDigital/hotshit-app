/* Hot Shit — pocket-operator mobile app */

const CATEGORIES = [
  { emoji: '🍔', label: 'Burgers' },
  { emoji: '🍺', label: 'Beer' },
  { emoji: '🍹', label: 'Cocktails' },
  { emoji: '☕', label: 'Coffee' },
  { emoji: '🎤', label: 'Karaoke' },
  { emoji: '🍕', label: 'Pizza' },
  { emoji: '⚾', label: 'Sports' },
  { emoji: '🍣', label: 'Sushi' },
  { emoji: '🌮', label: 'Tacos' },
  { emoji: '🙈', label: 'Random' },
];

const MOCK_RESULTS = {
  Burgers: [
    { name: 'Hamburger America', addr: '51 MacDougal St', rating: 4.7, buzz: ['Smash', 'Oklahoma', 'Onion'], blurb: 'Oklahoma onion burgers done right. Tiny dining room, big payoff.' },
    { name: '7th Street Burger', addr: '91 7th St', rating: 4.5, buzz: ['Cheap', 'Stoner', 'Late'], blurb: 'Double-stack smash. Open late. Eat in the park.' },
    { name: 'Corner Bistro', addr: '331 W 4th St', rating: 4.4, buzz: ['Dive', 'Cheap', 'Iconic'], blurb: 'West Village dive. Bistro burger and a McSorley\'s. Cash only.' },
  ],
  Beer: [
    { name: 'Spuyten Duyvil', addr: '359 Metropolitan Ave', rating: 4.6, buzz: ['Rare', 'Garden', 'Curated'], blurb: 'Beer nerd heaven. Big backyard. No IPAs on tap today.' },
    { name: 'Tørst', addr: '615 Manhattan Ave', rating: 4.5, buzz: ['Danish', 'Clean', 'Precise'], blurb: 'Nordic beer bar with a tight rotating list.' },
    { name: 'Threes Brewing', addr: '333 Douglass St', rating: 4.5, buzz: ['Local', 'Backyard', 'Fresh'], blurb: 'Gowanus brewery with a backyard. Always pouring something fresh.' },
  ],
  Cocktails: [
    { name: 'Attaboy', addr: '134 Eldridge St', rating: 4.8, buzz: ['Speakeasy', "Dealer's", 'Classic'], blurb: 'Knock on the door. No menu. Tell them what you like.' },
    { name: 'Katana Kitten', addr: '531 Hudson St', rating: 4.7, buzz: ['Japanese', 'Inventive', 'Tight'], blurb: 'Japanese highballs and hi-fi snacks. Always buzzy.' },
    { name: 'Death & Co', addr: '433 E 6th St', rating: 4.7, buzz: ['Iconic', 'Inventive', 'Bartender'], blurb: 'East Village classic. Sit at the bar, ask for whatever you\'re feeling.' },
  ],
  Coffee: [
    { name: 'Sey', addr: '18 Grattan St', rating: 4.8, buzz: ['Nerdy', 'Light roast', 'Quiet'], blurb: 'Ultra-light roasts. Cash-free. Bring a book.' },
    { name: 'Abraço', addr: '81 E 7th St', rating: 4.7, buzz: ['Cortado', 'Olive cake', 'Tiny'], blurb: 'Tiny counter. Best cortado in the EV. Get the olive cake.' },
    { name: 'Devoción', addr: '69 Grand St', rating: 4.6, buzz: ['Colombian', 'Bright', 'Greenery'], blurb: 'Williamsburg flagship. Single-origin Colombian in a plant-filled atrium.' },
  ],
  Karaoke: [
    { name: 'Sing Sing', addr: '9 St Marks Pl', rating: 4.4, buzz: ['Private', 'Loud', 'Cheap'], blurb: 'Private rooms, karaoke until 4am. BYO snacks.' },
    { name: 'Insa', addr: '328 Douglass St', rating: 4.6, buzz: ['Korean', 'BBQ', 'Late'], blurb: 'Korean BBQ + karaoke rooms downstairs. Dangerous combo.' },
    { name: 'Gagopa', addr: '28 W 32nd St', rating: 4.5, buzz: ['K-Town', 'Late', 'Cheap'], blurb: 'K-Town basement with private rooms. Snacks, sojus, screaming.' },
  ],
  Pizza: [
    { name: "Paulie Gee's", addr: '110 Franklin St', rating: 4.9, buzz: ['Authentic', 'Classic', 'Cozy'], blurb: 'Greenpoint slice shop. Wine bar in the back. Order the Freddy Prince.' },
    { name: "Joe's", addr: '216 Bedford Ave', rating: 4.8, buzz: ['Legendary', 'Consistent', 'Quick'], blurb: 'Offshoot of the Greenwich original. Always a line. Always worth it.' },
    { name: 'Lucali', addr: '575 Henry St', rating: 4.9, buzz: ['Cult', 'BYOB', 'Wait'], blurb: 'Carroll Gardens institution. BYOB. The wait is the experience.' },
  ],
  Sports: [
    { name: 'Banter', addr: '132 Havemeyer St', rating: 4.6, buzz: ['Soccer', 'Aussie', 'Meat pie'], blurb: 'Aussie-run, every match on. Get the meat pie.' },
    { name: 'The Graham', addr: '190 Graham Ave', rating: 4.4, buzz: ['Divey', 'Cheap', 'Pool'], blurb: 'Cheap pitchers, pool table, sports on the tv. No frills.' },
    { name: 'Standings', addr: '43 E 7th St', rating: 4.5, buzz: ['Soccer', 'Tiny', 'Loud'], blurb: 'Tiny soccer bar. Every kit on the wall. Get there early for big matches.' },
  ],
  Sushi: [
    { name: 'Sushi Noz', addr: '181 E 78th St', rating: 4.9, buzz: ['Splurge', 'Hinoki', 'Edomae'], blurb: 'Hinoki counter, edomae. Save up.' },
    { name: 'Jōji', addr: '1 Vanderbilt Ave', rating: 4.7, buzz: ['Hidden', 'Omakase', 'Tight'], blurb: 'Omakase hidden inside Grand Central. 8 seats.' },
    { name: 'Sushi Yasuda', addr: '204 E 43rd St', rating: 4.7, buzz: ['Edomae', 'Counter', 'Refined'], blurb: 'Midtown counter omakase. No tipping. Trust the chef.' },
  ],
  Tacos: [
    { name: 'Taqueria Ramirez', addr: '94 Franklin St', rating: 4.8, buzz: ['Lines', 'Worth it', 'Crispy'], blurb: 'Suadero tacos on a clown-car griddle. Cash only, cards on Venmo.' },
    { name: 'Tacombi', addr: '255 Smith St', rating: 4.6, buzz: ['Reliable', 'Chill', 'Margs'], blurb: 'Good fallback. Get the fish taco. Order two margs.' },
    { name: 'Los Tacos No. 1', addr: '75 9th Ave', rating: 4.7, buzz: ['Adobada', 'Quick', 'Lines'], blurb: 'Chelsea Market staple. Adobada with everything. Eat standing up.' },
  ],
  Random: [
    { name: 'Lucky Luna', addr: '167 Nassau Ave', rating: 4.6, buzz: ['Taiwanese', 'Mexican', 'Wild'], blurb: 'Taiwanese-Mexican. Trust the process. Order the bao.' },
    { name: 'Peter Luger', addr: '178 Broadway', rating: 4.5, buzz: ['Steak', 'Rude', 'Iconic'], blurb: 'Cash or debit. Get the porterhouse for two. Charm: aggressive.' },
    { name: 'Russ & Daughters Cafe', addr: '127 Orchard St', rating: 4.7, buzz: ['Appetizing', 'Caviar', 'Bagels'], blurb: 'Sit-down version of the legendary appetizing shop. Get the LES platter.' },
  ],
};

/* --- tiny DOM helpers --- */
const $ = (sel) => document.querySelector(sel);
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === false || v == null) continue;
    else if (v === true) node.setAttribute(k, '');
    else node.setAttribute(k, v);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
};

/* --- state --- */
const REROLL_BUDGET = 3; // rerolls allowed per category before kicking back
const state = {
  view: 'landing', // landing | permission | loading | categories | result | empty
  category: null,
  coords: null,
  pool: [],          // remaining places we haven't shown yet for this category
  shown: [],         // places we've already served (so we don't repeat)
  pick: null,        // current single result on screen
  rerollsLeft: REROLL_BUDGET,
};

/* --- routing --- */
function go(view, patch = {}) {
  Object.assign(state, patch, { view });
  render();
}

/* --- render --- */
function render() {
  const screen = $('#screen');
  const hardware = $('#hardware');
  const mode = $('#mode');

  screen.innerHTML = '';
  hardware.innerHTML = '';

  const view = views[state.view] || views.landing;
  mode.textContent = view.mode();
  screen.append(view.screen());
  for (const k of view.keys()) hardware.append(keyEl(k));
}

function keyEl({ n, label, onClick, primary, disabled, icon, xl }) {
  return el('button', {
    class: 'key' + (primary ? ' primary' : '') + (icon ? ' icon' : '') + (xl ? ' xl' : ''),
    type: 'button',
    disabled: !!disabled,
    onClick,
  },
    el('span', { class: 'num' }, String(n).padStart(2, '0')),
    label,
  );
}

/* --- views --- */
const views = {
  landing: {
    mode: () => '🔥💩 · HOT · READY',
    screen: () => el('div', { class: 'screen' },
      el('div', { class: 'prompt' }, '> booted.'),
      el('h1', { class: 'title-xl', style: 'margin-top:18px' }, 'HOT'),
      el('h1', { class: 'title-xl' }, 'SHIT'),
      el('div', { class: 'divider' }),
      el('p', { class: 'lcd-copy', style: 'margin:0' },
        'a little machine that finds', el('br'),
        'the best shit nearby.', el('br'),
        'no menus. no stars. just go.',
      ),
      el('div', { class: 'spacer' }),
      el('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:8px' },
        el('div', { style: 'font-size:64px;letter-spacing:6px;line-height:1' }, '🔥💩'),
        el('div', { class: 'mono text-blink', style: 'font-size:13px;font-weight:700;color:var(--accent);letter-spacing:0.18em' }, '● READY'),
      ),
    ),
    keys: () => [
      { n: 1, label: 'FIND 🔥💩', primary: true, xl: true, onClick: requestLocation },
    ],
  },

  permission: {
    mode: () => '🔥💩 · REQ LOC',
    screen: () => el('div', { class: 'screen' },
      el('div', { class: 'prompt' }, '> ', el('span', { class: 'accent' }, 'GEOLOCATION REQ')),
      el('h1', { class: 'title-lg', style: 'margin-top:14px' }, 'WHERE'),
      el('h1', { class: 'title-lg' }, 'U AT'),
      el('h1', { class: 'title-lg', style: 'color:var(--accent)' }, '?'),
      el('div', { class: 'hr' }),
      el('p', { class: 'lede', style: 'margin:0' },
        'we ask the phone,', el('br'),
        'the phone asks you.', el('br'),
        'coordinates evaporate', el('br'),
        'in 8 seconds.',
      ),
      el('div', { class: 'spacer' }),
      el('div', { class: 'mono', style: 'font-size:11px;opacity:0.7' }, '◉ . . . waiting'),
    ),
    keys: () => [
      { n: 1, label: 'NOPE', onClick: () => skipLocation() },
      { n: 2, label: 'ALLOW', primary: true, onClick: requestLocation },
      { n: 3, label: 'ZIP', disabled: true },
    ],
  },

  loading: {
    mode: () => '🔥💩 · SCANNING',
    screen: () => {
      const bar = el('div', { class: 'bar' },
        ...Array.from({ length: 20 }).map(() => el('div', { class: 'bar-cell' })),
      );
      animateBar(bar);
      return el('div', { class: 'screen', style: 'flex:1;display:flex;flex-direction:column' },
        el('div', { class: 'prompt' }, '> sniff.exe · 0.6mi'),
        el('div', { style: 'flex:1;display:flex;flex-direction:column;justify-content:center;gap:22px;padding:8px 0' },
          el('h1', { class: 'title-xl', style: 'text-align:center' },
            'FINDING', el('br'), 'SHIT', el('span', { style: 'color:var(--accent)' }, '...'),
          ),
          el('div', {},
            bar,
            el('div', { style: 'display:flex;justify-content:space-between;font-family:JetBrains Mono;font-size:13px;font-weight:700;margin-top:8px;letter-spacing:0.05em' },
              el('span', { id: 'pct' }, '0%'),
              el('span', { style: 'color:var(--accent)' }, '● LIVE'),
            ),
          ),
          el('div', { class: 'waveform' },
            ...[10, 18, 28, 14, 36, 48, 22, 40, 18, 28, 10, 40, 54, 32, 18, 10, 22, 36].map((h, i) =>
              el('div', { class: 'wave-bar' + (i % 3 === 0 ? ' accent' : ''), style: `height:${h}px;animation-delay:${i * 60}ms` }),
            ),
          ),
          el('div', { class: 'lcd-copy', style: 'text-align:center' },
            'hang on —', el('br'), 'this is gonna be good.',
          ),
        ),
      );
    },
    keys: () => [
      { n: 1, label: 'STOP', onClick: () => go('landing') },
      { n: 2, label: '···', primary: true, disabled: true },
      { n: 3, label: 'WIDEN', disabled: true },
      { n: 4, label: 'SKIP', disabled: true },
    ],
  },

  categories: {
    mode: () => '🔥💩 · PICK · 01–10',
    screen: () => {
      const grid = el('div', { class: 'cat-grid' },
        ...CATEGORIES.map((c, i) =>
          el('button', {
            class: 'cat',
            type: 'button',
            onClick: () => pickCategory(c.label),
          },
            el('span', { class: 'cat-num' }, String(i + 1).padStart(2, '0')),
            el('span', { class: 'cat-emoji' }, c.emoji),
            el('span', { class: 'cat-label' }, c.label.toUpperCase()),
          ),
        ),
      );
      return el('div', { class: 'screen', style: 'display:flex;flex-direction:column;gap:8px;flex:1;min-height:0' },
        el('div', { class: 'prompt' }, '> what kind of 🔥💩 ?'),
        el('h2', { class: 'title-md' }, 'PICK ONE'),
        grid,
      );
    },
    keys: () => [
      { n: 1, label: '◀ BACK', onClick: () => go('landing') },
      { n: 2, label: '🎲 RNDM', primary: true, onClick: () => pickCategory('Random') },
      { n: 3, label: '↻', icon: true, onClick: () => go('categories') },
    ],
  },

  result: {
    mode: () => `🔥💩 · ${categoryEmoji(state.category)} · GO HERE`,
    screen: () => {
      const r = state.pick;
      return el('div', { class: 'screen' },
        el('div', { style: 'display:flex;justify-content:space-between;align-items:baseline' },
          el('div', { class: 'prompt' }, `> PICKED · ${categoryEmoji(state.category)}`),
          el('div', { class: 'mono', style: 'font-size:11px;font-weight:700;color:var(--accent);letter-spacing:0.08em' }, '● LOCKED'),
        ),
        el('h2', { class: 'title-md', style: 'margin-top:6px' }, "GO HERE."),
        el('div', { class: 'results' }, resultCard(r)),
        el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-top:14px' },
          el('div', { class: 'mono', style: 'font-size:11px;font-weight:700;letter-spacing:0.08em;opacity:0.75' }, `↺ ${state.rerollsLeft} REROLL${state.rerollsLeft === 1 ? '' : 'S'} LEFT`),
          el('div', { class: 'mono', style: 'font-size:11px;font-weight:700;letter-spacing:0.08em;opacity:0.75' }, '0.4mi · ~8 MIN'),
        ),
      );
    },
    keys: () => [
      { n: 1, label: '◀ BACK', onClick: () => resetCategory() },
      { n: 2, label: state.rerollsLeft > 0 ? `↺ REROLL` : 'NO REROLLS', disabled: state.rerollsLeft === 0, onClick: rerollPick },
      { n: 3, label: 'GO ▶', primary: true, onClick: () => openMap(state.pick) },
    ],
  },


  empty: {
    mode: () => '🔥💩 · NO SIGNAL',
    screen: () => el('div', { class: 'screen' },
      el('div', { class: 'prompt' }, '> ', el('span', { class: 'accent' }, 'ERR: NO 🔥💩 FOUND')),
      el('h1', { class: 'title-xl', style: 'margin-top:14px' }, '0.'),
      el('p', { class: 'lede', style: 'margin:8px 0 0' },
        'we looked. we scowled.', el('br'),
        'nothing worth eating', el('br'),
        'within a mile.',
      ),
      el('div', { class: 'spacer' }),
      el('div', { class: 'empty' },
        el('div', { class: 'glyph' }, '🗿'),
        el('div', { class: 'scrawl' }, 'sorry, this block sucks.'),
      ),
    ),
    keys: () => [
      { n: 1, label: 'RESET', onClick: () => go('landing') },
      { n: 2, label: 'WIDEN +', primary: true, onClick: () => pickCategory(state.category || 'Random') },
      { n: 3, label: 'ZIP', disabled: true },
      { n: 4, label: 'WALK', disabled: true },
    ],
  },
};

function resultCard(r) {
  if (!r) return el('div');
  return el('article', { class: 'card inverse hero' },
    el('div', { class: 'card-tag' }, 'PICKED'),
    el('div', { class: 'card-head' },
      el('div', { class: 'card-name' }, r.name.toUpperCase()),
      el('div', { class: 'card-rating' }, `★${r.rating.toFixed(1)}`),
    ),
    el('div', { class: 'card-addr' }, '◉ ' + r.addr.toUpperCase()),
    el('p', { class: 'card-blurb' }, r.blurb),
    el('div', { class: 'card-buzz' },
      ...r.buzz.map((b) => el('span', { class: 'buzz' }, b)),
    ),
  );
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawFromPool() {
  if (!state.pool.length && state.shown.length) {
    // refill: we exhausted the pool but still have rerolls — recycle
    state.pool = shuffle(state.shown);
    state.shown = [];
  }
  const next = state.pool.shift();
  if (next) state.shown.push(next);
  return next || null;
}

function resetCategory() {
  state.category = null;
  state.pool = [];
  state.shown = [];
  state.pick = null;
  state.rerollsLeft = REROLL_BUDGET;
  go('categories');
}

function rerollPick() {
  if (state.rerollsLeft <= 0) return;
  state.rerollsLeft -= 1;
  go('loading');
  setTimeout(() => {
    if (state.view !== 'loading') return;
    const next = drawFromPool();
    if (!next) {
      go('empty');
      return;
    }
    state.pick = next;
    if (state.rerollsLeft === 0) {
      // last roll — show the result, but next reroll is gated
    }
    go('result');
  }, 900 + Math.random() * 400);
}

function categoryEmoji(label) {
  const c = CATEGORIES.find((c) => c.label === label);
  return c ? c.emoji : '🔥💩';
}

/* --- bar animation --- */
function animateBar(bar) {
  const cells = bar.children;
  let i = 0;
  const tick = () => {
    if (state.view !== 'loading') return;
    if (i < cells.length) {
      cells[i].classList.add('on');
      const pctEl = $('#pct');
      if (pctEl) pctEl.textContent = `${Math.round(((i + 1) / cells.length) * 100)}%`;
      i++;
      setTimeout(tick, 70);
    }
  };
  setTimeout(tick, 100);
}

/* --- actions --- */
function requestLocation() {
  if (!navigator.geolocation) { skipLocation(); return; }
  go('permission');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      state.coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      go('categories');
    },
    () => {
      skipLocation();
    },
    { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
  );
}

function skipLocation() {
  state.coords = null;
  go('categories');
}

function pickCategory(label) {
  state.category = label;
  state.rerollsLeft = REROLL_BUDGET;
  state.shown = [];
  state.pool = shuffle(MOCK_RESULTS[label] || MOCK_RESULTS.Random);
  state.pick = null;
  go('loading');
  const minWait = 1600 + Math.random() * 600;
  setTimeout(() => {
    if (state.view !== 'loading') return;
    const next = drawFromPool();
    if (!next) {
      go('empty');
      return;
    }
    state.pick = next;
    go('result');
  }, minWait);
}

function openMap(r) {
  if (!r) return;
  const q = encodeURIComponent(`${r.name} ${r.addr}`);
  window.open(`https://maps.google.com/?q=${q}`, '_blank', 'noopener');
}

/* --- theme --- */
const THEME_ORDER = ['auto', 'light', 'dark'];
const THEME_GLYPH = { auto: '◐', light: '○', dark: '●' };
const darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
let themePref = localStorage.getItem('hotshit.theme') || 'auto';

function effectiveTheme(pref) {
  return pref === 'auto' ? (darkMQ.matches ? 'dark' : 'light') : pref;
}

function applyTheme(pref) {
  document.documentElement.setAttribute('data-theme', effectiveTheme(pref));
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.firstChild.textContent = THEME_GLYPH[pref];
    const label = document.getElementById('themeLabel');
    if (label) label.textContent = pref.toUpperCase();
    btn.setAttribute('aria-label', `Theme: ${pref}. Click to cycle.`);
  }
}

function cycleTheme() {
  themePref = THEME_ORDER[(THEME_ORDER.indexOf(themePref) + 1) % THEME_ORDER.length];
  localStorage.setItem('hotshit.theme', themePref);
  applyTheme(themePref);
}

darkMQ.addEventListener('change', () => {
  if (themePref === 'auto') applyTheme('auto');
});

/* --- boot --- */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(themePref);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', cycleTheme);
  go('landing');
});
