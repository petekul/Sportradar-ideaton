// Idea 2: Global Sweepstake Lottery — soccer-only prototype.
// All data below is synthetic/illustrative (client-side only, no real ticket
// sales, payment processing, or results feed), per docs/idea2-epic.md.

const TEAMS = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Cameroon',
  'Canada', 'Chile', 'Colombia', 'Costa Rica', 'Croatia', 'Denmark',
  'Ecuador', 'Egypt', 'England', 'France', 'Germany', 'Ghana',
  'Iran', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Mexico',
  'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Panama',
  'Paraguay', 'Peru', 'Poland', 'Portugal', 'Qatar', 'Saudi Arabia',
  'Scotland', 'Senegal', 'Serbia', 'South Korea', 'Spain', 'Sweden',
  'Switzerland', 'Tunisia', 'Ukraine', 'United States', 'Uruguay', 'Wales',
];

// ISO 3166-1 alpha-2 codes, in the same order as TEAMS. England/Scotland/Wales
// have no ISO code, so they use a special "gb-xxx" marker handled by flagFor().
const TEAM_CODES = [
  'ar', 'au', 'at', 'be', 'br', 'cm',
  'ca', 'cl', 'co', 'cr', 'hr', 'dk',
  'ec', 'eg', 'gb-eng', 'fr', 'de', 'gh',
  'ir', 'it', 'ci', 'jm', 'jp', 'mx',
  'ma', 'nl', 'nz', 'ng', 'no', 'pa',
  'py', 'pe', 'pl', 'pt', 'qa', 'sa',
  'gb-sct', 'sn', 'rs', 'kr', 'es', 'se',
  'ch', 'tn', 'ua', 'us', 'uy', 'gb-wls',
];

// Builds a flag emoji from an ISO alpha-2 code via regional indicator symbols.
function flagEmoji(code) {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(c.codePointAt(0) + 127397))
    .join('');
}

// Builds a subdivision flag (England/Scotland/Wales) from a Unicode tag
// sequence: black flag + tagged ASCII letters + cancel tag.
function tagFlag(code) {
  const TAG_BASE = 0xe0000;
  const tag = code
    .toLowerCase()
    .split('')
    .map((c) => String.fromCodePoint(TAG_BASE + c.codePointAt(0)))
    .join('');
  return '\u{1F3F4}' + tag + '\u{E007F}';
}

function flagFor(code) {
  if (code.startsWith('gb-')) {
    return tagFlag('gb' + code.slice(3));
  }
  return flagEmoji(code);
}

const TEAM_FLAGS = TEAM_CODES.map(flagFor);

const TICKET_PRICE = 2; // £ per ticket
const OPERATOR_TAKE_RATE = 0.15; // 15% operator take before pari-mutuel split
const TIERS = [
  { id: 'champion', name: 'Champion', trigger: "Your team wins the World Cup Final" },
  { id: 'wooden-spoon', name: 'Wooden Spoon', trigger: 'Your team finishes bottom of the 48-team field' },
  { id: 'fastest-goal', name: 'Fastest Goal', trigger: "Your team scores the tournament's single fastest goal" },
];
const INITIAL_TICKETS = 1_000_000;

let totalTickets = 0;
const distribution = new Array(TEAMS.length).fill(0);
const yourTickets = []; // array of team indices the demo user has personally drawn

function randomTeamIndex() {
  return Math.floor(Math.random() * TEAMS.length);
}

// Simulate n independent random draws, as if n tickets had already been sold.
function seedDistribution(n) {
  for (let i = 0; i < n; i++) {
    distribution[randomTeamIndex()]++;
  }
  totalTickets += n;
}

function formatNumber(n) {
  return n.toLocaleString('en-GB');
}

function formatMoney(n) {
  return `£${Math.round(n).toLocaleString('en-GB')}`;
}

// Pari-mutuel pool per tier: total stake revenue, minus operator take,
// split evenly across the three prize tiers.
function computeTierPool() {
  const grossRevenue = totalTickets * TICKET_PRICE;
  const afterTake = grossRevenue * (1 - OPERATOR_TAKE_RATE);
  return afterTake / TIERS.length;
}

function animateTicker(toValue, duration = 1400) {
  const el = document.getElementById('gsl-ticker-value');
  if (!el) return;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const current = Math.floor(eased * toValue);
    el.textContent = formatNumber(current);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = formatNumber(toValue);
    }
  }

  requestAnimationFrame(step);
}

function renderTicker() {
  const el = document.getElementById('gsl-ticker-value');
  if (el) el.textContent = formatNumber(totalTickets);
}

function renderTiers() {
  const container = document.getElementById('gsl-tiers');
  if (!container) return;
  const pool = computeTierPool();

  container.innerHTML = TIERS.map(
    (tier) => `
      <div class="gsl-tier-card">
        <h3>${tier.name}</h3>
        <p class="gsl-tier-trigger">${tier.trigger}</p>
        <div class="gsl-tier-pool">${formatMoney(pool)}</div>
        <p class="gsl-tier-status">Unresolved — pool growing</p>
      </div>`
  ).join('');
}

function renderYourTickets() {
  const list = document.getElementById('gsl-yours-list');
  if (!list) return;

  if (yourTickets.length === 0) {
    list.innerHTML = '<li class="gsl-empty">You haven\'t bought a ticket yet.</li>';
    return;
  }

  list.innerHTML = yourTickets
    .map((teamIdx) => `<li class="gsl-chip"><span class="gsl-ball">${TEAM_FLAGS[teamIdx]}</span>${TEAMS[teamIdx]}</li>`)
    .join('');
}

function renderPool() {
  const container = document.getElementById('gsl-pool');
  if (!container) return;

  container.innerHTML = TEAMS.map(
    (name, idx) => `
      <span
        id="gsl-pool-ball-${idx}"
        class="gsl-pool-ball"
        title="${name}"
        style="animation-delay:${(idx * 0.07).toFixed(2)}s"
      >${TEAM_FLAGS[idx]}</span>`
  ).join('');
}

// Briefly highlights the drawn team's ball in the pool to simulate the draw.
function flashPoolBall(idx) {
  const ball = document.getElementById(`gsl-pool-ball-${idx}`);
  if (!ball) return;
  ball.classList.add('gsl-pool-ball-drawn');
  setTimeout(() => ball.classList.remove('gsl-pool-ball-drawn'), 900);
}

function renderDistribution() {
  const container = document.getElementById('gsl-dist-list');
  if (!container) return;

  const rows = TEAMS.map((name, idx) => ({ idx, name, count: distribution[idx] }));
  rows.sort((a, b) => b.count - a.count);
  const max = rows.length ? rows[0].count : 0;

  container.innerHTML = rows
    .map((row) => {
      const pct = totalTickets ? (row.count / totalTickets) * 100 : 0;
      const barPct = max ? (row.count / max) * 100 : 0;
      return `
        <div class="gsl-dist-row">
          <div class="gsl-dist-bar" style="width:${barPct.toFixed(2)}%"></div>
          <span class="gsl-dist-ball">${TEAM_FLAGS[row.idx]}</span>
          <span class="gsl-dist-name">${row.name}</span>
          <span class="gsl-dist-count">${formatNumber(row.count)}</span>
          <span class="gsl-dist-pct">${pct.toFixed(2)}%</span>
        </div>`;
    })
    .join('');
}

function handleBuyTicket() {
  const idx = randomTeamIndex();
  distribution[idx]++;
  totalTickets++;
  yourTickets.push(idx);

  renderTicker();
  renderTiers();
  renderYourTickets();
  renderDistribution();
  flashPoolBall(idx);

  const el = document.getElementById('gsl-ticker-value');
  if (el) {
    el.classList.add('gsl-tick-flash');
    setTimeout(() => el.classList.remove('gsl-tick-flash'), 300);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  seedDistribution(INITIAL_TICKETS);
  renderPool();
  renderTiers();
  renderYourTickets();
  renderDistribution();
  animateTicker(totalTickets);

  const buyBtn = document.getElementById('gsl-buy');
  if (buyBtn) {
    buyBtn.addEventListener('click', handleBuyTicket);
  }
});
