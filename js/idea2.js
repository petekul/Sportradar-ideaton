// Idea 2: Global Sweepstake Lottery — soccer-only prototype.
// All data below is synthetic/illustrative (client-side only, no real ticket
// sales, payment processing, or results feed), per docs/idea2-epic.md.

// The confirmed 48-team field for the 2026 FIFA World Cup (Canada/Mexico/USA),
// across all six confederations. Flags are literal Unicode flag-emoji
// characters (regional-indicator pairs; England/Scotland use the subdivision
// tag-sequence form, supported by Apple Color Emoji since iOS 11.1 / macOS
// High Sierra and rendered identically by every browser on macOS).
const TEAMS = [
  { name: 'Algeria', flag: '🇩🇿' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Cape Verde', flag: '🇨🇻' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Croatia', flag: '🇭🇷' },
  { name: 'Curaçao', flag: '🇨🇼' },
  { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'DR Congo', flag: '🇨🇩' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Haiti', flag: '🇭🇹' },
  { name: 'Iran', flag: '🇮🇷' },
  { name: 'Iraq', flag: '🇮🇶' },
  { name: 'Ivory Coast', flag: '🇨🇮' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Jordan', flag: '🇯🇴' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Paraguay', flag: '🇵🇾' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { name: 'Senegal', flag: '🇸🇳' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Tunisia', flag: '🇹🇳' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Uruguay', flag: '🇺🇾' },
  { name: 'Uzbekistan', flag: '🇺🇿' },
];

const TICKET_PRICE = 2; // £ per ticket
const OPERATOR_TAKE_RATE = 0.15; // 15% operator take before pari-mutuel split
const TIERS = [
  { id: 'champion', name: 'Champion', trigger: "Your team wins the World Cup Final", share: 0.60 },
  { id: 'wooden-spoon', name: 'Wooden Spoon', trigger: 'Your team finishes bottom of the 48-team field', share: 0.25 },
  { id: 'fastest-goal', name: 'Fastest Goal', trigger: "Your team scores the tournament's single fastest goal", share: 0.15 },
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
// split across the three prize tiers by each tier's share (Champion 60%,
// Wooden Spoon 25%, Fastest Goal 15%).
function computeTierPool(tier) {
  const grossRevenue = totalTickets * TICKET_PRICE;
  const afterTake = grossRevenue * (1 - OPERATOR_TAKE_RATE);
  return afterTake * tier.share;
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

  container.innerHTML = TIERS.map((tier) => {
    const pool = computeTierPool(tier);
    const ticketsPerTeam = totalTickets / TEAMS.length;
    const payoutPerTicket = ticketsPerTeam ? pool / ticketsPerTeam : 0;
    return `
      <div class="gsl-tier-card">
        <h3>${tier.name}</h3>
        <p class="gsl-tier-trigger">${tier.trigger}</p>
        <div class="gsl-tier-pool">${formatMoney(pool)}</div>
        <p class="gsl-tier-status">${formatMoney(payoutPerTicket)} per ticket if your team wins</p>
      </div>`;
  }).join('');
}

function renderYourTickets() {
  const list = document.getElementById('gsl-yours-list');
  const spentEl = document.getElementById('gsl-yours-spent');
  if (spentEl) spentEl.textContent = `${formatMoney(yourTickets.length * TICKET_PRICE)} spent`;
  if (!list) return;

  if (yourTickets.length === 0) {
    list.innerHTML = '<li class="gsl-empty">You haven\'t bought a ticket yet.</li>';
    return;
  }

  const counts = new Map();
  yourTickets.forEach((teamIdx) => counts.set(teamIdx, (counts.get(teamIdx) || 0) + 1));

  list.innerHTML = [...counts.entries()]
    .map(
      ([teamIdx, count]) => `
        <li class="gsl-chip">
          <span class="gsl-ball">${TEAMS[teamIdx].flag}</span>
          ${TEAMS[teamIdx].name}
          ${count > 1 ? `<span class="gsl-chip-count">×${count}</span>` : ''}
        </li>`
    )
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
      >${team.flag}</span>`
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

  const rows = TEAMS.map((team, idx) => ({ idx, name: team.name, flag: team.flag, count: distribution[idx] }));
  rows.sort((a, b) => b.count - a.count);
  const max = rows.length ? rows[0].count : 0;

  container.innerHTML = rows
    .map((row) => {
      const pct = totalTickets ? (row.count / totalTickets) * 100 : 0;
      const barPct = max ? (row.count / max) * 100 : 0;
      return `
        <div class="gsl-dist-row">
          <div class="gsl-dist-bar" style="width:${barPct.toFixed(2)}%"></div>
          <span class="gsl-dist-ball">${row.flag}</span>
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
