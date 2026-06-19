// Idea 2: Global Sweepstake Lottery — soccer-only prototype.
// All data below is synthetic/illustrative (client-side only, no real ticket
// sales, payment processing, or results feed), per docs/idea2-epic.md.

// Square (1x1) flag SVGs from the flag-icons package, imported individually
// (rather than its full CSS, which would bundle all ~200 countries) so Vite
// only ships the 48 flags this prototype actually needs.
import flagDz from 'flag-icons/flags/1x1/dz.svg';
import flagAr from 'flag-icons/flags/1x1/ar.svg';
import flagAu from 'flag-icons/flags/1x1/au.svg';
import flagAt from 'flag-icons/flags/1x1/at.svg';
import flagBe from 'flag-icons/flags/1x1/be.svg';
import flagBa from 'flag-icons/flags/1x1/ba.svg';
import flagBr from 'flag-icons/flags/1x1/br.svg';
import flagCa from 'flag-icons/flags/1x1/ca.svg';
import flagCv from 'flag-icons/flags/1x1/cv.svg';
import flagCo from 'flag-icons/flags/1x1/co.svg';
import flagHr from 'flag-icons/flags/1x1/hr.svg';
import flagCw from 'flag-icons/flags/1x1/cw.svg';
import flagCz from 'flag-icons/flags/1x1/cz.svg';
import flagCd from 'flag-icons/flags/1x1/cd.svg';
import flagEc from 'flag-icons/flags/1x1/ec.svg';
import flagEg from 'flag-icons/flags/1x1/eg.svg';
import flagGbEng from 'flag-icons/flags/1x1/gb-eng.svg';
import flagFr from 'flag-icons/flags/1x1/fr.svg';
import flagDe from 'flag-icons/flags/1x1/de.svg';
import flagGh from 'flag-icons/flags/1x1/gh.svg';
import flagHt from 'flag-icons/flags/1x1/ht.svg';
import flagIr from 'flag-icons/flags/1x1/ir.svg';
import flagIq from 'flag-icons/flags/1x1/iq.svg';
import flagCi from 'flag-icons/flags/1x1/ci.svg';
import flagJp from 'flag-icons/flags/1x1/jp.svg';
import flagJo from 'flag-icons/flags/1x1/jo.svg';
import flagMx from 'flag-icons/flags/1x1/mx.svg';
import flagMa from 'flag-icons/flags/1x1/ma.svg';
import flagNl from 'flag-icons/flags/1x1/nl.svg';
import flagNz from 'flag-icons/flags/1x1/nz.svg';
import flagNo from 'flag-icons/flags/1x1/no.svg';
import flagPa from 'flag-icons/flags/1x1/pa.svg';
import flagPy from 'flag-icons/flags/1x1/py.svg';
import flagPt from 'flag-icons/flags/1x1/pt.svg';
import flagQa from 'flag-icons/flags/1x1/qa.svg';
import flagSa from 'flag-icons/flags/1x1/sa.svg';
import flagGbSct from 'flag-icons/flags/1x1/gb-sct.svg';
import flagSn from 'flag-icons/flags/1x1/sn.svg';
import flagZa from 'flag-icons/flags/1x1/za.svg';
import flagKr from 'flag-icons/flags/1x1/kr.svg';
import flagEs from 'flag-icons/flags/1x1/es.svg';
import flagSe from 'flag-icons/flags/1x1/se.svg';
import flagCh from 'flag-icons/flags/1x1/ch.svg';
import flagTn from 'flag-icons/flags/1x1/tn.svg';
import flagTr from 'flag-icons/flags/1x1/tr.svg';
import flagUs from 'flag-icons/flags/1x1/us.svg';
import flagUy from 'flag-icons/flags/1x1/uy.svg';
import flagUz from 'flag-icons/flags/1x1/uz.svg';

// The confirmed 48-team field for the 2026 FIFA World Cup (Canada/Mexico/USA),
// across all six confederations. `flag` is an actual flag image, not a
// Unicode flag emoji, since Windows fonts render those as plain country codes.
const TEAMS = [
  { name: 'Algeria', flag: flagDz },
  { name: 'Argentina', flag: flagAr },
  { name: 'Australia', flag: flagAu },
  { name: 'Austria', flag: flagAt },
  { name: 'Belgium', flag: flagBe },
  { name: 'Bosnia and Herzegovina', flag: flagBa },
  { name: 'Brazil', flag: flagBr },
  { name: 'Canada', flag: flagCa },
  { name: 'Cape Verde', flag: flagCv },
  { name: 'Colombia', flag: flagCo },
  { name: 'Croatia', flag: flagHr },
  { name: 'Curaçao', flag: flagCw },
  { name: 'Czech Republic', flag: flagCz },
  { name: 'DR Congo', flag: flagCd },
  { name: 'Ecuador', flag: flagEc },
  { name: 'Egypt', flag: flagEg },
  { name: 'England', flag: flagGbEng },
  { name: 'France', flag: flagFr },
  { name: 'Germany', flag: flagDe },
  { name: 'Ghana', flag: flagGh },
  { name: 'Haiti', flag: flagHt },
  { name: 'Iran', flag: flagIr },
  { name: 'Iraq', flag: flagIq },
  { name: 'Ivory Coast', flag: flagCi },
  { name: 'Japan', flag: flagJp },
  { name: 'Jordan', flag: flagJo },
  { name: 'Mexico', flag: flagMx },
  { name: 'Morocco', flag: flagMa },
  { name: 'Netherlands', flag: flagNl },
  { name: 'New Zealand', flag: flagNz },
  { name: 'Norway', flag: flagNo },
  { name: 'Panama', flag: flagPa },
  { name: 'Paraguay', flag: flagPy },
  { name: 'Portugal', flag: flagPt },
  { name: 'Qatar', flag: flagQa },
  { name: 'Saudi Arabia', flag: flagSa },
  { name: 'Scotland', flag: flagGbSct },
  { name: 'Senegal', flag: flagSn },
  { name: 'South Africa', flag: flagZa },
  { name: 'South Korea', flag: flagKr },
  { name: 'Spain', flag: flagEs },
  { name: 'Sweden', flag: flagSe },
  { name: 'Switzerland', flag: flagCh },
  { name: 'Tunisia', flag: flagTn },
  { name: 'Turkey', flag: flagTr },
  { name: 'United States', flag: flagUs },
  { name: 'Uruguay', flag: flagUy },
  { name: 'Uzbekistan', flag: flagUz },
];

function flagSpan(url) {
  return `<span class="gsl-flag" style="background-image:url('${url}')"></span>`;
}

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
          <span class="gsl-ball">${flagSpan(TEAMS[teamIdx].flag)}</span>
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
      >${flagSpan(team.flag)}</span>`
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
          <span class="gsl-dist-ball">${flagSpan(row.flag)}</span>
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
