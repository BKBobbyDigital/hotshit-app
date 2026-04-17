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
  ],
  Beer: [
    { name: 'Spuyten Duyvil', addr: '359 Metropolitan Ave', rating: 4.6, buzz: ['Rare', 'Garden', 'Curated'], blurb: 'Beer nerd heaven. Big backyard. No IPAs on tap today.' },
    { name: 'Tørst', addr: '615 Manhattan Ave', rating: 4.5, buzz: ['Danish', 'Clean', 'Precise'], blurb: 'Nordic beer bar with a tight rotating list.' },
  ],
  Cocktails: [
    { name: 'Attaboy', addr: '134 Eldridge St', rating: 4.8, buzz: ['Speakeasy', "Dealer's", 'Classic'], blurb: 'Knock on the door. No menu. Tell them what you like.' },
    { name: 'Katana Kitten', addr: '531 Hudson St', rating: 4.7, buzz: ['Japanese', 'Inventive', 'Tight'], blurb: 'Japanese highballs and hi-fi snacks. Always buzzy.' },
  ],
  Coffee: [
    { name: 'Sey', addr: '18 Grattan St', rating: 4.8, buzz: ['Nerdy', 'Light roast', 'Quiet'], blurb: 'Ultra-light roasts. Cash-free. Bring a book.' },
    { name: 'Abraço', addr: '81 E 7th St', rating: 4.7, buzz: ['Cortado', 'Olive cake', 'Tiny'], blurb: 'Tiny counter. Best cortado in the EV. Get the olive cake.' },
  ],
  Karaoke: [
    { name: 'Sing Sing', addr: '9 St Marks Pl', rating: 4.4, buzz: ['Private', 'Loud', 'Cheap'], blurb: 'Private rooms, karaoke until 4am. BYO snacks.' },
    { name: 'Insa', addr: '328 Douglass St', rating: 4.6, buzz: ['Korean', 'BBQ', 'Late'], blurb: 'Korean BBQ + karaoke rooms downstairs. Dangerous combo.' },
  ],
  Pizza: [
    { name: "Paulie Gee's", addr: '110 Franklin St', rating: 4.9, buzz: ['Authentic', 'Classic', 'Cozy'], blurb: 'Greenpoint slice shop. Wine bar in the back. Order the Freddy Prince.' },
    { name: "Joe's", addr: '216 Bedford Ave', rating: 4.8, buzz: ['Legendary', 'Consistent', 'Quick'], blurb: 'Offshoot of the Greenwich original. Always a line. Always worth it.' },
  ],
  Sports: [
    { name: 'Banter', addr: '132 Havemeyer St', rating: 4.6, buzz: ['Soccer', 'Aussie', 'Meat pie'], blurb: 'Aussie-run, every match on. Get the meat pie.' },
    { name: 'The Graham', addr: '190 Graham Ave', rating: 4.4, buzz: ['Divey', 'Cheap', 'Pool'], blurb: 'Cheap pitchers, pool table, sports on the tv. No frills.' },
  ],
  Sushi: [
    { name: 'Sushi Noz', addr: '181 E 78th St', rating: 4.9, buzz: ['Splurge', 'Hinoki', 'Edomae'], blurb: 'Hinoki counter, edomae. Save up.' },
    { name: 'Jōji', addr: '1 Vanderbilt Ave', rating: 4.7, buzz: ['Hidden', 'Omakase', 'Tight'], blurb: 'Omakase hidden inside Grand Central. 8 seats.' },
  ],
  Tacos: [
    { name: 'Taqueria Ramirez', addr: '94 Franklin St', rating: 4.8, buzz: ['Lines', 'Worth it', 'Crispy'], blurb: 'Suadero tacos on a clown-car griddle. Cash only, cards on Venmo.' },
    { name: 'Tacombi', addr: '255 Smith St', rating: 4.6, buzz: ['Reliable', 'Chill', 'Margs'], blurb: 'Good fallback. Get the fish taco. Order two margs.' },
  ],
  Random: [
    { name: 'Lucky Luna', addr: '167 Nassau Ave', rating: 4.6, buzz: ['Taiwanese', 'Mexican', 'Wild'], blurb: 'Taiwanese-Mexican. Trust the process. Order the bao.' },
    { name: 'Peter Luger', addr: '178 Broadway', rating: 4.5, buzz: ['Steak', 'Rude', 'Iconic'], blurb: 'Cash or debit. Get the porterhouse for two. Charm: aggressive.' },
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
const state = {
  view: 'landing', // landing | permission | loading | categories | results | empty
  category: null,
  coords: null,
  results: [],
  selected: 0,
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

function keyEl({ n, label, onClick, primary, disabled, icon }) {
  return el('button', {
    class: 'key' + (primary ? ' primary' : '') + (icon ? ' icon' : ''),
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
      el('h1', { class: 'title-xl' }, el('span', {}, 'SHIT'), el('span', { style: 'color:var(--accent)' }, '.')),
      el('div', { class: 'divider' }),
      el('p', { class: 'lcd-copy', style: 'margin:0' },
        'a little machine that finds', el('br'),
        'the best shit nearby.', el('br'),
        'no menus. no stars. just go.',
      ),
      el('div', { class: 'spacer' }),
      el('div', { style: 'display:flex;justify-content:space-between;align-items:center;' },
        el('div', { style: 'font-size:56px;letter-spacing:4px;line-height:1' }, '🔥💩'),
        el('div', { class: 'mono', style: 'font-size:14px;font-weight:700;color:var(--accent);letter-spacing:0.08em' }, '◉ PRESS ▶ 02'),
      ),
    ),
    keys: () => [
      { n: 1, label: '◀', disabled: true },
      { n: 2, label: '▶ FIND', primary: true, onClick: requestLocation },
      { n: 3, label: '🎲', onClick: () => pickCategory('Random') },
      { n: 4, label: '?', onClick: showHelp },
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
      { n: 4, label: '?', onClick: showHelp },
    ],
  },

  loading: {
    mode: () => '🔥💩 · SCANNING',
    screen: () => {
      const bar = el('div', { class: 'bar' },
        ...Array.from({ length: 20 }).map(() => el('div', { class: 'bar-cell' })),
      );
      animateBar(bar);
      return el('div', { class: 'screen' },
        el('div', { class: 'prompt' }, '> sniff.exe · 0.6mi'),
        el('h1', { class: 'title-lg', style: 'margin-top:14px' },
          'FINDING', el('br'), 'SHIT', el('span', { style: 'color:var(--accent)' }, '...'),
        ),
        el('div', { style: 'margin-top:14px' },
          bar,
          el('div', { style: 'display:flex;justify-content:space-between;font-family:JetBrains Mono;font-size:10px;font-weight:700;margin-top:6px;' },
            el('span', { id: 'pct' }, '0%'),
            el('span', { style: 'color:var(--accent)' }, '● LIVE'),
          ),
        ),
        el('div', { class: 'waveform' },
          ...[8, 14, 22, 10, 28, 36, 18, 30, 14, 22, 8, 30, 40, 24, 14, 8, 18, 28].map((h, i) =>
            el('div', { class: 'wave-bar' + (i % 3 === 0 ? ' accent' : ''), style: `height:${h}px;animation-delay:${i * 60}ms` }),
          ),
        ),
        el('div', { class: 'spacer' }),
        el('div', { class: 'scrawl', style: 'text-align:center;font-size:22px;line-height:1.05' },
          'hang on —', el('br'), 'this is gonna be good.',
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
        el('h2', { class: 'title-md' }, 'PICK ONE.'),
        grid,
      );
    },
    keys: () => [
      { n: 1, label: '◀ BACK', onClick: () => go('landing') },
      { n: 2, label: '🎲 RNDM', primary: true, onClick: () => pickCategory('Random') },
      { n: 3, label: '↻', icon: true, onClick: () => go('categories') },
      { n: 4, label: '?', icon: true, onClick: showHelp },
    ],
  },

  results: {
    mode: () => `🔥💩 · ${categoryEmoji(state.category)} · ${state.results.length} HITS`,
    screen: () => {
      return el('div', { class: 'screen' },
        el('div', { style: 'display:flex;justify-content:space-between;align-items:baseline' },
          el('div', { class: 'prompt' }, `> ${String(state.results.length).padStart(2, '0')} RESULTS · 0.4mi`),
          el('div', { class: 'mono', style: 'font-size:10px;font-weight:700;color:var(--accent)' }, '● LOCKED'),
        ),
        el('h2', { class: 'title-md', style: 'margin-top:6px' }, "HERE'S THE 🔥💩."),
        el('div', { class: 'results' },
          ...state.results.map((r, i) => resultCard(r, i)),
        ),
      );
    },
    keys: () => [
      { n: 1, label: '◀ BACK', onClick: () => go('categories') },
      { n: 2, label: '↺ ROLL', primary: true, onClick: () => pickCategory(state.category) },
      { n: 3, label: '♥', onClick: () => {} },
      { n: 4, label: 'MAP', onClick: () => openMap(state.results[state.selected]) },
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

function resultCard(r, i) {
  const inverse = state.selected === i;
  return el('button', {
    class: 'card' + (inverse ? ' inverse' : ''),
    type: 'button',
    'aria-pressed': inverse ? 'true' : 'false',
    onClick: () => selectResult(i),
  },
    el('div', { class: 'card-tag' }, String(i + 1).padStart(2, '0')),
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

function selectResult(i) {
  state.selected = i;
  render();
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
  state.selected = 0;
  go('loading');
  const minWait = 1600 + Math.random() * 600;
  setTimeout(() => {
    if (state.view !== 'loading') return;
    const pool = MOCK_RESULTS[label] || MOCK_RESULTS.Random;
    state.results = pool.slice(0, 2);
    if (!state.results.length) go('empty');
    else go('results');
  }, minWait);
}

function openMap(r) {
  if (!r) return;
  const q = encodeURIComponent(`${r.name} ${r.addr}`);
  window.open(`https://maps.google.com/?q=${q}`, '_blank', 'noopener');
}

function showHelp() {
  alert('Hot Shit serves up the best stuff nearby. No menus. No stars. Just go.');
}

/* --- boot --- */
document.addEventListener('DOMContentLoaded', () => go('landing'));
