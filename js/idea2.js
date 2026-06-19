// Idea 2: Global Sweepstake Lottery — soccer-only prototype.
// All data below is synthetic/illustrative (client-side only, no real ticket
// sales, payment processing, or results feed), per docs/idea2-epic.md.

import 'flag-icons/css/flag-icons.min.css';

// The confirmed 48-team field for the 2026 FIFA World Cup (Canada/Mexico/USA),
// across all six confederations. `code` maps to a flag-icons CSS class
// (e.g. 'dz' -> .fi-dz) — rendered as an actual flag image rather than a
// Unicode flag emoji, since Windows fonts show those as plain country codes.
const TEAMS = [
  { name: 'Algeria', code: 'dz' },
  { name: 'Argentina', code: 'ar' },
  { name: 'Australia', code: 'au' },
  { name: 'Austria', code: 'at' },
  { name: 'Belgium', code: 'be' },
  { name: 'Bosnia and Herzegovina', code: 'ba' },
  { name: 'Brazil', code: 'br' },
  { name: 'Canada', code: 'ca' },
  { name: 'Cape Verde', code: 'cv' },
  { name: 'Colombia', code: 'co' },
  { name: 'Croatia', code: 'hr' },
  { name: 'Curaçao', code: 'cw' },
  { name: 'Czech Republic', code: 'cz' },
  { name: 'DR Congo', code: 'cd' },
  { name: 'Ecuador', code: 'ec' },
  { name: 'Egypt', code: 'eg' },
  { name: 'England', code: 'gb-eng' },
  { name: 'France', code: 'fr' },
  { name: 'Germany', code: 'de' },
  { name: 'Ghana', code: 'gh' },
  { name: 'Haiti', code: 'ht' },
  { name: 'Iran', code: 'ir' },
  { name: 'Iraq', code: 'iq' },
  { name: 'Ivory Coast', code: 'ci' },
  { name: 'Japan', code: 'jp' },
  { name: 'Jordan', code: 'jo' },
  { name: 'Mexico', code: 'mx' },
  { name: 'Morocco', code: 'ma' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'New Zealand', code: 'nz' },
  { name: 'Norway', code: 'no' },
  { name: 'Panama', code: 'pa' },
  { name: 'Paraguay', code: 'py' },
  { name: 'Portugal', code: 'pt' },
  { name: 'Qatar', code: 'qa' },
  { name: 'Saudi Arabia', code: 'sa' },
  { name: 'Scotland', code: 'gb-sct' },
  { name: 'Senegal', code: 'sn' },
  { name: 'South Africa', code: 'za' },
  { name: 'South Korea', code: 'kr' },
  { name: 'Spain', code: 'es' },
  { name: 'Sweden', code: 'se' },
  { name: 'Switzerland', code: 'ch' },
  { name: 'Tunisia', code: 'tn' },
  { name: 'Turkey', code: 'tr' },
  { name: 'United States', code: 'us' },
  { name: 'Uruguay', code: 'uy' },
  { name: 'Uzbekistan', code: 'uz' },
];

function flagSpan(code) {
  return `<span class="fi fi-${code} fis gsl-flag"></span>`;
}

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
    .map((teamIdx) => `<li class="gsl-chip"><span class="gsl-ball">${flagSpan(TEAMS[teamIdx].code)}</span>${TEAMS[teamIdx].name}</li>`)
    .join('');
}

function renderPool() {
  const container = document.getElementById('gsl-pool');
  if (!container) return;

  container.innerHTML = TEAMS.map(
    (team, idx) => `
      <span
        id="gsl-pool-ball-${idx}"
        class="gsl-pool-ball"
        title="${team.name}"
        style="animation-delay:${(idx * 0.07).toFixed(2)}s"
      >${flagSpan(team.code)}</span>`
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

  const rows = TEAMS.map((team, idx) => ({ idx, name: team.name, code: team.code, count: distribution[idx] }));
  rows.sort((a, b) => b.count - a.count);
  const max = rows.length ? rows[0].count : 0;

  container.innerHTML = rows
    .map((row) => {
      const pct = totalTickets ? (row.count / totalTickets) * 100 : 0;
      const barPct = max ? (row.count / max) * 100 : 0;
      return `
        <div class="gsl-dist-row">
          <div class="gsl-dist-bar" style="width:${barPct.toFixed(2)}%"></div>
          <span class="gsl-dist-ball">${flagSpan(row.code)}</span>
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
