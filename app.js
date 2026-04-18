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
    { name: 'Hamburger America', addr: '51 MacDougal St', rating: 4.7, hoursText: 'OPEN UNTIL 10PM', buzz: ['Smash', 'Oklahoma', 'Onion'], blurb: 'Oklahoma onion burgers done right. Tiny dining room, big payoff.' },
    { name: '7th Street Burger', addr: '91 7th St', rating: 4.5, hoursText: 'OPEN UNTIL 2AM', buzz: ['Cheap', 'Stoner', 'Late'], blurb: 'Double-stack smash. Open late. Eat in the park.' },
    { name: 'Corner Bistro', addr: '331 W 4th St', rating: 4.4, hoursText: 'OPEN UNTIL 4AM', buzz: ['Dive', 'Cheap', 'Iconic'], blurb: 'West Village dive. Bistro burger and a McSorley\'s. Cash only.' },
  ],
  Beer: [
    { name: 'Spuyten Duyvil', addr: '359 Metropolitan Ave', rating: 4.6, hoursText: 'OPEN UNTIL 12AM', buzz: ['Rare', 'Garden', 'Curated'], blurb: 'Beer nerd heaven. Big backyard. No IPAs on tap today.' },
    { name: 'Tørst', addr: '615 Manhattan Ave', rating: 4.5, hoursText: 'OPEN UNTIL 11PM', buzz: ['Danish', 'Clean', 'Precise'], blurb: 'Nordic beer bar with a tight rotating list.' },
    { name: 'Threes Brewing', addr: '333 Douglass St', rating: 4.5, hoursText: 'OPEN UNTIL 11PM', buzz: ['Local', 'Backyard', 'Fresh'], blurb: 'Gowanus brewery with a backyard. Always pouring something fresh.' },
  ],
  Cocktails: [
    { name: 'Attaboy', addr: '134 Eldridge St', rating: 4.8, hoursText: 'OPEN UNTIL 4AM', buzz: ['Speakeasy', "Dealer's", 'Classic'], blurb: 'Knock on the door. No menu. Tell them what you like.' },
    { name: 'Katana Kitten', addr: '531 Hudson St', rating: 4.7, hoursText: 'OPEN UNTIL 2AM', buzz: ['Japanese', 'Inventive', 'Tight'], blurb: 'Japanese highballs and hi-fi snacks. Always buzzy.' },
    { name: 'Death & Co', addr: '433 E 6th St', rating: 4.7, hoursText: 'OPEN UNTIL 2AM', buzz: ['Iconic', 'Inventive', 'Bartender'], blurb: 'East Village classic. Sit at the bar, ask for whatever you\'re feeling.' },
  ],
  Coffee: [
    { name: 'Sey', addr: '18 Grattan St', rating: 4.8, hoursText: 'OPEN UNTIL 5PM', buzz: ['Nerdy', 'Light roast', 'Quiet'], blurb: 'Ultra-light roasts. Cash-free. Bring a book.' },
    { name: 'Abraço', addr: '81 E 7th St', rating: 4.7, hoursText: 'OPEN UNTIL 7PM', buzz: ['Cortado', 'Olive cake', 'Tiny'], blurb: 'Tiny counter. Best cortado in the EV. Get the olive cake.' },
    { name: 'Devoción', addr: '69 Grand St', rating: 4.6, hoursText: 'OPEN UNTIL 7PM', buzz: ['Colombian', 'Bright', 'Greenery'], blurb: 'Williamsburg flagship. Single-origin Colombian in a plant-filled atrium.' },
  ],
  Karaoke: [
    { name: 'Sing Sing', addr: '9 St Marks Pl', rating: 4.4, hoursText: 'OPEN UNTIL 4AM', buzz: ['Private', 'Loud', 'Cheap'], blurb: 'Private rooms, karaoke until 4am. BYO snacks.' },
    { name: 'Insa', addr: '328 Douglass St', rating: 4.6, hoursText: 'OPEN UNTIL 2AM', buzz: ['Korean', 'BBQ', 'Late'], blurb: 'Korean BBQ + karaoke rooms downstairs. Dangerous combo.' },
    { name: 'Gagopa', addr: '28 W 32nd St', rating: 4.5, hoursText: 'OPEN UNTIL 4AM', buzz: ['K-Town', 'Late', 'Cheap'], blurb: 'K-Town basement with private rooms. Snacks, sojus, screaming.' },
  ],
  Pizza: [
    { name: "Paulie Gee's", addr: '110 Franklin St', rating: 4.9, hoursText: 'OPEN UNTIL 11PM', buzz: ['Authentic', 'Classic', 'Cozy'], blurb: 'Greenpoint slice shop. Wine bar in the back. Order the Freddy Prince.' },
    { name: "Joe's", addr: '216 Bedford Ave', rating: 4.8, hoursText: 'OPEN UNTIL 4AM', buzz: ['Legendary', 'Consistent', 'Quick'], blurb: 'Offshoot of the Greenwich original. Always a line. Always worth it.' },
    { name: 'Lucali', addr: '575 Henry St', rating: 4.9, hoursText: 'OPEN UNTIL 10PM', buzz: ['Cult', 'BYOB', 'Wait'], blurb: 'Carroll Gardens institution. BYOB. The wait is the experience.' },
  ],
  Sports: [
    { name: 'Banter', addr: '132 Havemeyer St', rating: 4.6, hoursText: 'OPEN UNTIL 2AM', buzz: ['Soccer', 'Aussie', 'Meat pie'], blurb: 'Aussie-run, every match on. Get the meat pie.' },
    { name: 'The Graham', addr: '190 Graham Ave', rating: 4.4, hoursText: 'OPEN UNTIL 4AM', buzz: ['Divey', 'Cheap', 'Pool'], blurb: 'Cheap pitchers, pool table, sports on the tv. No frills.' },
    { name: 'Standings', addr: '43 E 7th St', rating: 4.5, hoursText: 'OPEN UNTIL 1AM', buzz: ['Soccer', 'Tiny', 'Loud'], blurb: 'Tiny soccer bar. Every kit on the wall. Get there early for big matches.' },
  ],
  Sushi: [
    { name: 'Sushi Noz', addr: '181 E 78th St', rating: 4.9, hoursText: 'OPEN UNTIL 10PM', buzz: ['Splurge', 'Hinoki', 'Edomae'], blurb: 'Hinoki counter, edomae. Save up.' },
    { name: 'Jōji', addr: '1 Vanderbilt Ave', rating: 4.7, hoursText: 'OPEN UNTIL 11PM', buzz: ['Hidden', 'Omakase', 'Tight'], blurb: 'Omakase hidden inside Grand Central. 8 seats.' },
    { name: 'Sushi Yasuda', addr: '204 E 43rd St', rating: 4.7, hoursText: 'OPEN UNTIL 10PM', buzz: ['Edomae', 'Counter', 'Refined'], blurb: 'Midtown counter omakase. No tipping. Trust the chef.' },
  ],
  Tacos: [
    { name: 'Taqueria Ramirez', addr: '94 Franklin St', rating: 4.8, hoursText: 'OPEN UNTIL 11PM', buzz: ['Lines', 'Worth it', 'Crispy'], blurb: 'Suadero tacos on a clown-car griddle. Cash only, cards on Venmo.' },
    { name: 'Tacombi', addr: '255 Smith St', rating: 4.6, hoursText: 'OPEN UNTIL 11PM', buzz: ['Reliable', 'Chill', 'Margs'], blurb: 'Good fallback. Get the fish taco. Order two margs.' },
    { name: 'Los Tacos No. 1', addr: '75 9th Ave', rating: 4.7, hoursText: 'OPEN UNTIL 11PM', buzz: ['Adobada', 'Quick', 'Lines'], blurb: 'Chelsea Market staple. Adobada with everything. Eat standing up.' },
  ],
  Random: [
    { name: 'Lucky Luna', addr: '167 Nassau Ave', rating: 4.6, hoursText: 'OPEN UNTIL 11PM', buzz: ['Taiwanese', 'Mexican', 'Wild'], blurb: 'Taiwanese-Mexican. Trust the process. Order the bao.' },
    { name: 'Peter Luger', addr: '178 Broadway', rating: 4.5, hoursText: 'OPEN UNTIL 9:45PM', buzz: ['Steak', 'Rude', 'Iconic'], blurb: 'Cash or debit. Get the porterhouse for two. Charm: aggressive.' },
    { name: 'Russ & Daughters Cafe', addr: '127 Orchard St', rating: 4.7, hoursText: 'OPEN UNTIL 10PM', buzz: ['Appetizing', 'Caviar', 'Bagels'], blurb: 'Sit-down version of the legendary appetizing shop. Get the LES platter.' },
  ],
};

// Single gateway for "is this place open right now". Today: every mock is
// flagged open. When we wire Google Places, swap this to filter on
// place.current_opening_hours.open_now and also keep places opening within
// the next ~10 min (mark them with `openingSoon: true` for a UI badge).
function filterOpenNow(places) {
  return places;
}

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
const PICKS_BUDGET = 3; // alternate picks allowed per category beyond the first
const MAX_RADIUS_TIER = 3;
const USE_LIVE_API = !/\bmock=1\b/.test(window.location.search);
const state = {
  view: 'landing', // landing | categories | loading | result | empty | location
  category: null,
  coords: null,
  pool: [],            // remaining places we haven't shown yet for this category
  shown: [],           // places we've already served (so we don't repeat)
  pick: null,          // current single result on screen
  picksLeft: PICKS_BUDGET,
  radiusTier: 0,       // 0 = city default, 1 = 2x, 2 = 4x, 3 = 8x
  committed: false,    // user has tapped the card to claim it
  usingMocks: false,   // true when the live API failed and we fell back
  locationStatus: 'unknown', // unknown | granted | prompt | denied | unsupported
  locationReturnTo: null,    // where to return when leaving the location view
  decoding: false,     // true while the new pick's name is decoding into view
  decodeText: '',      // current decode-in-progress display string
};

/* --- routing --- */
function go(view, patch = {}) {
  Object.assign(state, patch, { view });
  fxForView(view);
  // View Transitions API wraps the DOM swap in a smooth cross-fade + slide
  // (CSS owns the actual animation via ::view-transition-old/new). Gracefully
  // falls back to instant render on browsers without support (Firefox).
  if (document.startViewTransition && !state.decoding) {
    document.startViewTransition(() => render());
  } else {
    render();
  }
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

function keyEl({ label, onClick, primary, disabled, icon, xl }) {
  const handler = (e) => {
    if (primary) fx.primary(); else fx.click();
    if (onClick) onClick(e);
  };
  return el('button', {
    class: 'key' + (primary ? ' primary' : '') + (icon ? ' icon' : '') + (xl ? ' xl' : ''),
    type: 'button',
    disabled: !!disabled,
    onClick: handler,
  }, label);
}

const BOOT_LINES = [
  'booted.',
  'warming up.',
  'sniffing the block.',
  'ready when you are.',
  'jukebox loaded.',
  'sensors hot.',
  'calibrated.',
];
// One boot line per page load — feels like the device just turned on.
const BOOT_LINE = BOOT_LINES[Math.floor(Math.random() * BOOT_LINES.length)];

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/* --- views --- */
const views = {
  landing: {
    mode: () => '🔥💩 · HOT · READY',
    screen: () => el('div', { class: 'screen landing-screen' },
      el('div', { class: 'prompt' }, `> ${BOOT_LINE} · ${nowTime()}`),
      el('div', { class: 'landing-hero' },
        el('div', { class: 'landing-logo', 'aria-hidden': 'true' }, '🔥💩'),
        el('h1', { class: 'title-xl landing-title' }, 'HOT'),
        el('h1', { class: 'title-xl landing-title' }, 'SHIT'),
      ),
      el('div', { class: 'divider landing-divider' }),
      el('p', { class: 'lcd-copy landing-tagline', style: 'margin:0' },
        'the best shit nearby.', el('br'),
        'served hot.', el('br'),
        'no menus. no debate. just go.',
      ),
      el('div', { class: 'spacer' }),
      el('div', { class: 'landing-ready' },
        el('span', { class: 'text-blink' }, '●'),
        el('span', {}, ' READY'),
      ),
    ),
    keys: () => [
      { n: 1, label: 'FIND 🔥💩', primary: true, xl: true, onClick: () => go('categories') },
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
      { label: '◀ CANCEL', onClick: resetCategory },
    ],
  },

  categories: {
    mode: () => '🔥💩 · PICK',
    screen: () => {
      const grid = el('div', { class: 'cat-grid' },
        ...CATEGORIES.map((c) =>
          el('button', {
            class: 'cat',
            type: 'button',
            onClick: () => { fx.primary(); pickCategory(c.label); },
          },
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
    mode: () => `🔥💩 · ${categoryEmoji(state.category)} · ${state.committed ? 'LOCKED IN' : 'PICK'}`,
    screen: () => {
      const r = state.pick;
      const c = state.committed;
      const distText = formatDistance(r?.distanceMi);
      const walkM = walkMinutes(r?.distanceMi);
      const distRight = [distText, walkM ? `~${walkM} MIN WALK` : null].filter(Boolean).join(' · ');
      return el('div', { class: 'screen' },
        el('div', { style: 'display:flex;justify-content:space-between;align-items:baseline' },
          el('div', { class: 'prompt' }, c ? `> LOCKED IN · ${categoryEmoji(state.category)}` : `> CONSIDER · ${categoryEmoji(state.category)}`),
          el('div', { class: 'mono', style: `font-size:11px;font-weight:700;letter-spacing:0.08em;color:${c ? 'var(--accent)' : 'var(--muted)'}` }, c ? '● LOCKED' : '○ TAP TO LOCK'),
        ),
        el('h2', { class: 'title-md', style: 'margin-top:6px' }, c ? 'GO HERE.' : "HERE'S THE 🔥💩"),
        el('div', { class: 'results' }, resultCard(r, c)),
        el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-top:14px;gap:10px;flex-wrap:wrap' },
          el('div', { class: 'mono', style: 'font-size:11px;font-weight:700;letter-spacing:0.08em;opacity:0.75' }, `↺ ${state.picksLeft} MORE LEFT`),
          distRight ? el('div', { class: 'mono', style: 'font-size:11px;font-weight:700;letter-spacing:0.08em;opacity:0.75' }, distRight) : null,
        ),
      );
    },
    keys: () => [
      { n: 1, label: '◀ BACK', onClick: () => resetCategory() },
      { label: state.picksLeft > 0 ? '↺ ANOTHER' : 'NO MORE', disabled: state.picksLeft === 0 || state.decoding, onClick: nextPick },
    ],
  },

  location: {
    mode: () => '🔥💩 · LOCATION OFF',
    screen: () => {
      const denied = state.locationStatus === 'denied';
      const unsupported = state.locationStatus === 'unsupported';
      return el('div', { class: 'screen' },
        el('div', { class: 'prompt' }, '> ', el('span', { class: 'accent' },
          unsupported ? 'NOT SUPPORTED' : denied ? 'PERMISSION DENIED' : 'WAITING ON YOU')),
        el('h1', { class: 'title-xl', style: 'margin-top:14px' }, 'YOU'),
        el('h1', { class: 'title-xl' }, 'SAID', el('span', { style: 'color:var(--accent)' }, ' NO.')),
        el('div', { class: 'divider' }),
        el('p', { class: 'lcd-copy', style: 'margin:0' },
          unsupported
            ? 'this browser doesn\'t share location.'
            : denied
              ? 'we\'re showing sample picks until you flip it back on.'
              : 'we need your location to find shit nearby.',
        ),
        el('p', { class: 'lcd-copy', style: 'margin-top:14px;font-size:clamp(12px,3.6cqi,15px);opacity:0.85' },
          denied
            ? 'tap the lock icon in your browser → location → allow.'
            : 'tap ASK AGAIN to retry.',
        ),
        el('div', { class: 'spacer' }),
        el('div', { class: 'mono', style: 'text-align:center;font-size:clamp(11px,3cqi,13px);letter-spacing:0.18em;opacity:0.7' },
          `STATUS · ${(state.locationStatus || 'unknown').toUpperCase()}`),
      );
    },
    keys: () => [
      { label: '◀ BACK', onClick: () => go(state.locationReturnTo || 'landing') },
      { label: 'ASK AGAIN', primary: true, onClick: askLocationAgain },
    ],
  },

  empty: {
    mode: () => '🔥💩 · NO SIGNAL',
    screen: () => {
      const canWiden = state.radiusTier < MAX_RADIUS_TIER;
      return el('div', { class: 'screen' },
        el('div', { class: 'prompt' }, '> ', el('span', { class: 'accent' }, 'ERR: NO 🔥💩 FOUND')),
        el('h1', { class: 'title-xl', style: 'margin-top:14px' }, '0.'),
        el('p', { class: 'lede', style: 'margin:8px 0 0' },
          'we looked. we scowled.', el('br'),
          canWiden ? 'widen the search?' : 'this block really sucks.', el('br'),
          canWiden ? null : 'try a different vibe.',
        ),
        el('div', { class: 'spacer' }),
        el('div', { class: 'empty' },
          el('div', { class: 'glyph' }, '🗿'),
          el('div', { class: 'scrawl' },
            canWiden ? 'nothing within range.' : 'sorry, this block sucks.',
          ),
        ),
      );
    },
    keys: () => [
      { n: 1, label: '◀ BACK', onClick: resetCategory },
      {
        n: 2,
        label: state.radiusTier < MAX_RADIUS_TIER ? 'WIDEN +' : 'MAX REACHED',
        primary: true,
        disabled: state.radiusTier >= MAX_RADIUS_TIER,
        onClick: widenRadius,
      },
    ],
  },
};

function resultCard(r, committed) {
  if (!r) return el('div');
  const showLocWarning = state.usingMocks
    && (state.locationStatus === 'denied' || state.locationStatus === 'unsupported');
  const decoding = state.decoding;
  const displayName = decoding ? state.decodeText : r.name.toUpperCase();
  const body = [
    el('div', { class: 'card-tag' }, committed ? 'YOUR PICK' : decoding ? 'RESOLVING' : 'SUGGESTION'),
    el('div', { class: 'card-head' },
      el('div', { class: 'card-name' }, displayName),
      el('div', { class: 'card-rating' }, `★${r.rating.toFixed(1)}`),
    ),
    el('div', { class: 'card-addr' }, '◉ ' + r.addr.toUpperCase()),
    (() => {
      const live = formatCloses(r.periods);
      const text = live || r.hoursText;
      if (!text) return null;
      return el('div', { class: 'card-hours' },
        el('span', { class: 'card-hours-dot' }, '●'),
        ' ' + text,
      );
    })(),
    showLocWarning && el('button', {
      type: 'button',
      class: 'card-locwarn',
      onClick: (e) => { e.stopPropagation(); showLocationOverlay(); },
    }, '● SAMPLE PICK · LOCATION OFF · TAP TO FIX'),
    r.blurb ? el('p', { class: 'card-blurb' }, r.blurb) : null,
    r.buzz && r.buzz.length ? el('div', { class: 'card-buzz' },
      ...r.buzz.map((b) => el('span', { class: 'buzz' }, b)),
    ) : null,
    committed && el('div', { class: 'stamp stamp-card' }, 'LOCKED IN'),
    committed && el('div', { class: 'card-actions' },
      el('button', {
        type: 'button',
        class: 'card-action',
        onClick: (e) => { e.stopPropagation(); fx.click(); sharePick(r); },
      }, '↗ SHARE'),
      el('button', {
        type: 'button',
        class: 'card-action primary',
        onClick: (e) => { e.stopPropagation(); fx.primary(); openMap(r); },
      }, '📍 OPEN MAP'),
    ),
  ];

  return el('div', {
    class: 'card hero'
      + (committed ? ' committed' : '')
      + (decoding ? ' decoding' : ''),
    role: 'button',
    tabindex: decoding ? '-1' : '0',
    'aria-pressed': committed ? 'true' : 'false',
    'aria-busy': decoding ? 'true' : 'false',
    'aria-label': committed ? `Tap to unlock ${r.name}` : `Tap to lock in ${r.name}`,
    onClick: decoding ? undefined : toggleCommit,
    onKeydown: decoding ? undefined : (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCommit();
      }
    },
  }, ...body);
}

function toggleCommit() {
  state.committed = !state.committed;
  if (state.committed) fx.commit(); else fx.click();
  render();
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
  if (!state.pool.length) return null;
  // First pick: random from top 5 of the score-ordered pool, so the answer
  // feels confident but isn't deterministic. Subsequent picks (rerolls) draw
  // the next-best remaining in sorted order — real alternatives, not noise.
  const isFirst = state.shown.length === 0;
  const idx = isFirst ? Math.floor(Math.random() * Math.min(5, state.pool.length)) : 0;
  const [next] = state.pool.splice(idx, 1);
  state.shown.push(next);
  return next;
}

function resetCategory() {
  state.category = null;
  state.pool = [];
  state.shown = [];
  state.pick = null;
  state.picksLeft = PICKS_BUDGET;
  state.radiusTier = 0;
  state.committed = false;
  state.usingMocks = false;
  state.decoding = false;
  state.decodeText = '';
  go('categories');
}

// Decode a target string left-to-right over ~450ms. Letters/digits flicker
// through noise glyphs; spaces and punctuation pass through. Patches the
// .card-name text node directly between full renders to avoid View
// Transition jank on every frame.
function startDecode(target) {
  return new Promise((resolve) => {
    const NOISE = '▓▒░@#%&*+=?!/\\|<>{}[]';
    const upper = (target || '').toUpperCase();
    const chars = upper.split('');
    const isReplaceable = (c) => /[A-Z0-9]/.test(c);
    const stepsTotal = 9;
    const stepMs = 50;
    state.decoding = true;
    state.decodeText = chars.map((c) => isReplaceable(c)
      ? NOISE[Math.floor(Math.random() * NOISE.length)] : c).join('');
    render(); // single full render to apply .decoding class + initial text
    const nameEl = document.querySelector('.card .card-name');
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      if (step >= stepsTotal) {
        clearInterval(id);
        state.decoding = false;
        state.decodeText = upper;
        render(); // single full render to clear .decoding class + finalize
        resolve();
        return;
      }
      const resolved = Math.floor((step / stepsTotal) * chars.length);
      state.decodeText = chars.map((c, i) => {
        if (i < resolved) return c;
        if (!isReplaceable(c)) return c;
        return NOISE[Math.floor(Math.random() * NOISE.length)];
      }).join('');
      // Patch the visible name text only — avoid full re-render so the
      // View Transition system isn't triggered on every decode tick.
      if (nameEl) nameEl.textContent = state.decodeText;
    }, stepMs);
  });
}

async function nextPick() {
  if (state.picksLeft <= 0 || state.decoding) return;
  state.picksLeft -= 1;
  state.committed = false;
  const next = drawFromPool();
  if (!next) {
    go('empty');
    return;
  }
  // Stay on the result view — the card decodes in place into the new pick.
  state.pick = next;
  await startDecode(next.name);
  fx.result();
  if (USE_LIVE_API && !state.usingMocks) ensureBlurb(next);
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
async function refreshLocationStatus() {
  if (!navigator.geolocation) {
    state.locationStatus = 'unsupported';
    return state.locationStatus;
  }
  if (!navigator.permissions) return state.locationStatus;
  try {
    const r = await navigator.permissions.query({ name: 'geolocation' });
    state.locationStatus = r.state; // 'granted' | 'denied' | 'prompt'
  } catch {
    /* ignore — leave whatever we last knew */
  }
  return state.locationStatus;
}

function ensureLocation() {
  // Resolves to coords (or null if denied/unavailable). Updates locationStatus
  // as a side effect so the badge / inline warning can reflect reality.
  if (state.coords) return Promise.resolve(state.coords);
  if (!navigator.geolocation) {
    state.locationStatus = 'unsupported';
    updateLocBadge();
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        state.locationStatus = 'granted';
        updateLocBadge();
        resolve(state.coords);
      },
      (err) => {
        // err.code 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
        if (err && err.code === 1) state.locationStatus = 'denied';
        else if (state.locationStatus === 'unknown') state.locationStatus = 'prompt';
        updateLocBadge();
        resolve(null);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
    );
  });
}

function updateLocBadge() {
  const badge = document.getElementById('locBadge');
  if (!badge) return;
  const off = state.locationStatus === 'denied' || state.locationStatus === 'unsupported';
  badge.hidden = !off;
}

async function askLocationAgain() {
  // Force a fresh attempt — clear cached coords so ensureLocation actually
  // calls getCurrentPosition again. Browser handles whether to show the
  // system dialog (yes if 'prompt', no if 'denied' — silent fail then).
  state.coords = null;
  await refreshLocationStatus();
  const coords = await ensureLocation();
  if (coords) {
    // Granted! return to where they came from.
    go(state.locationReturnTo || 'landing');
  } else {
    // Still off — re-render the location view so the status text updates.
    render();
  }
}

function showLocationOverlay() {
  fx.click();
  state.locationReturnTo = state.view;
  go('location');
}

async function fetchPool(lat, lon, category, radiusTier) {
  try {
    const resp = await fetch('/api/find', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon, category, radiusTier }),
    });
    if (!resp.ok) return { pool: [], error: resp.status };
    const data = await resp.json();
    return data;
  } catch (e) {
    return { pool: [], error: e.message };
  }
}

async function ensureBlurb(pick) {
  if (!pick || !pick.place_id || pick.blurb || pick._blurbLoading) return;
  pick._blurbLoading = true;
  try {
    const resp = await fetch('/api/blurb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        place_id: pick.place_id,
        name: pick.name,
        typeHint: pick.typeHint,
        addr: pick.addr,
        rating: pick.rating,
        reviewCount: pick.reviewCount,
      }),
    });
    if (!resp.ok) return;
    const data = await resp.json();
    if (data && data.blurb) pick.blurb = data.blurb;
    if (data && Array.isArray(data.buzzwords)) pick.buzz = data.buzzwords;
    if (data && data.periods !== undefined) pick.periods = data.periods;
    if (data && data.priceLevel !== undefined) pick.priceLevel = data.priceLevel;
    if (state.view === 'result' && state.pick === pick) render();
  } catch {
    /* fail silently — UI already has sensible defaults */
  } finally {
    delete pick._blurbLoading;
  }
}

/* --- live time / distance helpers --- */
// Walking pace ~3 mph = 20 min per mile. Always at least 1 minute.
function walkMinutes(distanceMi) {
  if (typeof distanceMi !== 'number' || !isFinite(distanceMi)) return null;
  return Math.max(1, Math.round(distanceMi * 20));
}
// Compute minutes until close given Google Place Details periods array.
// Returns null if not currently open or periods are missing.
// Handles the common bar/club case where close.day !== open.day (midnight wrap).
function closesInMinutes(periods, now = new Date()) {
  if (!Array.isArray(periods) || !periods.length) return null;
  const day = now.getDay(); // 0=Sun
  const min = now.getHours() * 60 + now.getMinutes();
  const dayMin = 24 * 60;
  for (const p of periods) {
    if (!p?.open || !p?.close) continue;
    const openMin = p.open.hour * 60 + (p.open.minute || 0);
    const closeMin = p.close.hour * 60 + (p.close.minute || 0);
    if (p.open.day === day) {
      if (p.close.day === day && min >= openMin && min < closeMin) {
        return closeMin - min;
      }
      if (p.close.day !== day && min >= openMin) {
        return (dayMin - min) + closeMin;
      }
    } else if (p.close.day === day && p.open.day !== day && min < closeMin) {
      return closeMin - min;
    }
  }
  return null;
}
function formatCloses(periods) {
  const mins = closesInMinutes(periods);
  if (mins === null) return null;
  if (mins <= 0) return 'CLOSING NOW';
  if (mins < 60) return `CLOSES IN ${mins} MIN`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (rem === 0) return `CLOSES IN ${hrs}H`;
  return `CLOSES IN ${hrs}H ${rem}M`;
}
// Format a sub-mile distance: '0.4mi' / '0.42mi' / '1.2mi'.
function formatDistance(distanceMi) {
  if (typeof distanceMi !== 'number' || !isFinite(distanceMi)) return null;
  if (distanceMi < 0.1) return '<0.1mi';
  if (distanceMi < 1) return `${distanceMi.toFixed(1).replace(/\.0$/, '')}mi`;
  return `${distanceMi.toFixed(1)}mi`;
}

async function pickCategory(label, opts = {}) {
  const radiusTier = Number.isFinite(opts.radiusTier) ? opts.radiusTier : 0;
  state.category = label;
  state.picksLeft = PICKS_BUDGET;
  state.shown = [];
  state.pool = [];
  state.pick = null;
  state.committed = false;
  state.radiusTier = radiusTier;
  state.usingMocks = false;
  state.decoding = false;
  state.decodeText = '';
  go('loading');

  const minWait = 1600 + Math.random() * 600;
  const loaderPromise = new Promise((r) => setTimeout(r, minWait));

  let pool = [];
  if (USE_LIVE_API) {
    const coords = await ensureLocation();
    if (coords) {
      const data = await fetchPool(coords.lat, coords.lon, label, radiusTier);
      pool = Array.isArray(data.pool) ? data.pool : [];
    }
  } else {
    await ensureLocation();
  }

  // Fallback to mocks if the live API gave us nothing (denied permission,
  // rate limited, offline, empty result). Mocks are already NYC-flavored so
  // they keep the demo alive anywhere in the world.
  if (!pool.length) {
    const key = label === 'random'
      ? Object.keys(MOCK_RESULTS)[Math.floor(Math.random() * Object.keys(MOCK_RESULTS).length)]
      : Object.keys(MOCK_RESULTS).find((k) => k.toLowerCase() === label.toLowerCase());
    pool = shuffle(filterOpenNow(MOCK_RESULTS[key] || MOCK_RESULTS.Random));
    state.usingMocks = true;
  }

  state.pool = pool;

  await loaderPromise;
  if (state.view !== 'loading') return;

  const next = drawFromPool();
  if (!next) {
    go('empty');
    return;
  }
  state.pick = next;
  go('result');
  if (USE_LIVE_API && !state.usingMocks) ensureBlurb(next);
}

function widenRadius() {
  if (state.radiusTier >= MAX_RADIUS_TIER) return;
  const nextTier = state.radiusTier + 1;
  pickCategory(state.category || 'random', { radiusTier: nextTier });
}

function openMap(r) {
  if (!r) return;
  const q = encodeURIComponent(`${r.name} ${r.addr}`);
  window.open(`https://maps.google.com/?q=${q}`, '_blank', 'noopener');
}

async function sharePick(r) {
  if (!r) return;
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${r.name} ${r.addr}`)}`;
  const text = `🔥💩 going to ${r.name} — ${r.addr}\n${mapsUrl}`;
  const payload = { title: 'Hot Shit', text, url: mapsUrl };
  try {
    if (navigator.share && (!navigator.canShare || navigator.canShare(payload))) {
      await navigator.share(payload);
      return;
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return;
  }
  try {
    await navigator.clipboard.writeText(text);
    flashShareToast('COPIED.');
  } catch {
    window.prompt('Copy and share:', text);
  }
}

function flashShareToast(msg) {
  const existing = document.getElementById('shareToast');
  if (existing) existing.remove();
  const t = el('div', { id: 'shareToast', class: 'share-toast' }, msg);
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('on'));
  setTimeout(() => {
    t.classList.remove('on');
    setTimeout(() => t.remove(), 280);
  }, 1400);
}

/* --- sound + haptics --- */
let muted = localStorage.getItem('hotshit.muted') === '1';
let _ctx = null;
function audioCtx() {
  if (_ctx) return _ctx;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  _ctx = new Ctor();
  return _ctx;
}
function tone(freq, dur, type = 'square', vol = 0.06, when = 0) {
  if (muted) return;
  const ctx = audioCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const t = ctx.currentTime + when;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}
function vibe(pattern) {
  if (muted) return;
  if (navigator.vibrate) navigator.vibrate(pattern);
}
const fx = {
  click()   { tone(880, 0.04, 'square', 0.05); vibe(12); },
  primary() { tone(440, 0.06, 'square', 0.07); vibe(20); },
  result()  { tone(660, 0.07); tone(880, 0.07, 'square', 0.06, 0.07); tone(1320, 0.1, 'square', 0.06, 0.14); vibe([18, 30, 24]); },
  empty()   { tone(220, 0.12, 'square', 0.07); tone(165, 0.18, 'square', 0.07, 0.13); vibe([30, 60, 30]); },
  commit()  { tone(523, 0.06, 'square', 0.07); tone(659, 0.06, 'square', 0.07, 0.06); tone(784, 0.12, 'square', 0.07, 0.12); vibe([18, 24, 36]); },
  reroll()  { tone(330, 0.05); tone(440, 0.05, 'square', 0.05, 0.05); vibe(14); },
};
function fxForView(view) {
  if (view === 'result') fx.result();
  else if (view === 'empty') fx.empty();
}
function setMuted(next) {
  muted = next;
  localStorage.setItem('hotshit.muted', muted ? '1' : '0');
  const btn = document.getElementById('muteToggle');
  if (btn) {
    btn.textContent = muted ? '🔇' : '🔊';
    btn.setAttribute('aria-label', muted ? 'Sound muted (click to unmute)' : 'Sound on (click to mute)');
  }
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

/* --- deep links --- */
// Match /pizza, /tacos, /random, etc. (also #/pizza for fallback hosts).
function categoryFromUrl() {
  const raw = (window.location.pathname.replace(/^\//, '') || window.location.hash.replace(/^#\/?/, '')).trim().toLowerCase();
  if (!raw) return null;
  const slug = raw.split(/[\/?#]/)[0];
  const match = CATEGORIES.find((c) => c.label.toLowerCase() === slug);
  return match ? match.label : null;
}

/* --- boot --- */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(themePref);
  setMuted(muted);
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', () => { fx.click(); cycleTheme(); });
  const muteBtn = document.getElementById('muteToggle');
  if (muteBtn) muteBtn.addEventListener('click', () => { setMuted(!muted); if (!muted) fx.click(); });
  const locBtn = document.getElementById('locBadge');
  if (locBtn) locBtn.addEventListener('click', showLocationOverlay);

  // Wire up the Permissions API change event so the app auto-recovers when
  // the user re-enables location in browser settings — no refresh needed.
  refreshLocationStatus().then(() => {
    updateLocBadge();
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((perm) => {
        perm.addEventListener('change', () => {
          state.locationStatus = perm.state;
          if (perm.state === 'granted') state.coords = null; // re-fetch next call
          updateLocBadge();
          render();
        });
      }).catch(() => {});
    }
  });

  const deepLinkCat = categoryFromUrl();
  if (deepLinkCat) {
    pickCategory(deepLinkCat);
  } else {
    go('landing');
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
    // Auto-reload once when a new SW takes control so users always see the
    // latest deploy without a manual refresh.
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });
  }
});
