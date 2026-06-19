// Idea 1: Reverse Recommendations — soccer-only prototype.
// All data below is synthetic/illustrative (client-side only, no real odds feed),
// per docs/idea1-epic.md. Anytime Goalscorer uses each team's marquee striker.

const MATCHES = [
  {
    id: 'fra-nor',
    label: 'France v Norway',
    meta: 'World Cup 2026 — Group Stage — Fri 26 Jun',
    markets: {
      'Match Result': [
        { label: 'France to Win', odds: 1.65 },
        { label: 'Draw', odds: 3.80 },
        { label: 'Norway to Win', odds: 5.50 },
      ],
      'Both Teams to Score': [
        { label: 'BTTS — Yes', odds: 1.55 },
        { label: 'BTTS — No', odds: 2.40 },
      ],
      'Total Goals Over/Under 2.5': [
        { label: 'Over 2.5 Goals', odds: 1.80 },
        { label: 'Under 2.5 Goals', odds: 2.00 },
      ],
      'Correct Score': [
        { label: 'Correct Score 2-1 (France)', odds: 9.00 },
        { label: 'Correct Score 1-0 (France)', odds: 7.50 },
        { label: 'Correct Score 1-1', odds: 11.00 },
      ],
      'Anytime Goalscorer': [
        { label: 'Kylian Mbappé to Score Anytime', odds: 1.65, isGoalscorer: true },
        { label: 'Erling Haaland to Score Anytime', odds: 1.75, isGoalscorer: true },
      ],
      'First Goalscorer': [
        { label: 'Kylian Mbappé First Goalscorer', odds: 3.25 },
        { label: 'Erling Haaland First Goalscorer', odds: 3.50 },
      ],
      'Half-Time/Full-Time': [
        { label: 'France/France', odds: 2.10 },
        { label: 'Draw/France', odds: 4.50 },
      ],
      'Asian Handicap': [
        { label: 'France -1', odds: 2.00 },
        { label: 'Norway +1', odds: 1.80 },
      ],
      'Total Corners Over/Under 9.5': [
        { label: 'Over 9.5 Corners', odds: 1.90 },
        { label: 'Under 9.5 Corners', odds: 1.90 },
      ],
      'Clean Sheet': [
        { label: 'France — Clean Sheet Yes', odds: 2.50 },
        { label: 'Norway — Clean Sheet Yes', odds: 4.75 },
      ],
    },
  },
  {
    id: 'arg-aut',
    label: 'Argentina v Austria',
    meta: 'World Cup 2026 — Group Stage',
    markets: {
      'Match Result': [
        { label: 'Argentina to Win', odds: 1.50 },
        { label: 'Draw', odds: 4.00 },
        { label: 'Austria to Win', odds: 6.50 },
      ],
      'Both Teams to Score': [
        { label: 'BTTS — Yes', odds: 1.70 },
        { label: 'BTTS — No', odds: 2.10 },
      ],
      'Total Goals Over/Under 2.5': [
        { label: 'Over 2.5 Goals', odds: 1.95 },
        { label: 'Under 2.5 Goals', odds: 1.85 },
      ],
      'Correct Score': [
        { label: 'Correct Score 2-0 (Argentina)', odds: 7.50 },
        { label: 'Correct Score 1-0 (Argentina)', odds: 6.50 },
        { label: 'Correct Score 2-1 (Argentina)', odds: 9.00 },
      ],
      'Anytime Goalscorer': [
        { label: 'Lionel Messi to Score Anytime', odds: 1.60, isGoalscorer: true },
        { label: 'Marko Arnautović to Score Anytime', odds: 2.20, isGoalscorer: true },
      ],
      'First Goalscorer': [
        { label: 'Lionel Messi First Goalscorer', odds: 3.00 },
        { label: 'Marko Arnautović First Goalscorer', odds: 4.50 },
      ],
      'Half-Time/Full-Time': [
        { label: 'Argentina/Argentina', odds: 1.95 },
        { label: 'Draw/Argentina', odds: 4.20 },
      ],
      'Asian Handicap': [
        { label: 'Argentina -1.5', odds: 2.10 },
        { label: 'Austria +1.5', odds: 1.70 },
      ],
      'Total Corners Over/Under 9.5': [
        { label: 'Over 9.5 Corners', odds: 1.85 },
        { label: 'Under 9.5 Corners', odds: 1.95 },
      ],
      'Clean Sheet': [
        { label: 'Argentina — Clean Sheet Yes', odds: 2.20 },
        { label: 'Austria — Clean Sheet Yes', odds: 5.50 },
      ],
    },
  },
  {
    id: 'esp-ksa',
    label: 'Spain v Saudi Arabia',
    meta: 'World Cup 2026 — Group Stage',
    markets: {
      'Match Result': [
        { label: 'Spain to Win', odds: 1.30 },
        { label: 'Draw', odds: 5.50 },
        { label: 'Saudi Arabia to Win', odds: 9.00 },
      ],
      'Both Teams to Score': [
        { label: 'BTTS — Yes', odds: 1.95 },
        { label: 'BTTS — No', odds: 1.80 },
      ],
      'Total Goals Over/Under 2.5': [
        { label: 'Over 2.5 Goals', odds: 1.70 },
        { label: 'Under 2.5 Goals', odds: 2.10 },
      ],
      'Correct Score': [
        { label: 'Correct Score 3-0 (Spain)', odds: 8.00 },
        { label: 'Correct Score 2-0 (Spain)', odds: 6.00 },
        { label: 'Correct Score 2-1 (Spain)', odds: 8.50 },
      ],
      'Anytime Goalscorer': [
        { label: 'Álvaro Morata to Score Anytime', odds: 1.85, isGoalscorer: true },
        { label: 'Salem Al-Dawsari to Score Anytime', odds: 3.50, isGoalscorer: true },
      ],
      'First Goalscorer': [
        { label: 'Álvaro Morata First Goalscorer', odds: 3.75 },
        { label: 'Salem Al-Dawsari First Goalscorer', odds: 7.00 },
      ],
      'Half-Time/Full-Time': [
        { label: 'Spain/Spain', odds: 1.70 },
        { label: 'Draw/Spain', odds: 3.80 },
      ],
      'Asian Handicap': [
        { label: 'Spain -2', odds: 2.00 },
        { label: 'Saudi Arabia +2', odds: 1.80 },
      ],
      'Total Corners Over/Under 10.5': [
        { label: 'Over 10.5 Corners', odds: 1.90 },
        { label: 'Under 10.5 Corners', odds: 1.90 },
      ],
      'Clean Sheet': [
        { label: 'Spain — Clean Sheet Yes', odds: 1.75 },
        { label: 'Saudi Arabia — Clean Sheet Yes', odds: 7.50 },
      ],
    },
  },
];

const GOALSCORER_SLOTS = 4; // exactly this many of the 5 results must include an Anytime Goalscorer leg
const TOTAL_RESULTS = 5;
const CANDIDATES_PER_MATCH = 400;
const MIN_LEGS = 2;
const MAX_LEGS = 4;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build one random same-game combo for a given match.
function buildCandidate(match) {
  const marketNames = shuffle(Object.keys(match.markets));
  const legCount = randomInt(MIN_LEGS, MAX_LEGS);
  const chosenMarkets = marketNames.slice(0, legCount);

  const legs = chosenMarkets.map((marketName) => {
    const option = pickRandom(match.markets[marketName]);
    return {
      market: marketName,
      label: option.label,
      odds: option.odds,
      isGoalscorer: Boolean(option.isGoalscorer),
    };
  });

  const combinedOdds = legs.reduce((acc, leg) => acc * leg.odds, 1);

  return {
    matchId: match.id,
    matchLabel: match.label,
    matchMeta: match.meta,
    legs,
    combinedOdds,
    hasGoalscorer: legs.some((leg) => leg.isGoalscorer),
    key: `${match.id}:${legs.map((l) => l.label).sort().join('|')}`,
  };
}

function generateCandidatePool() {
  const seen = new Set();
  const pool = [];

  MATCHES.forEach((match) => {
    for (let i = 0; i < CANDIDATES_PER_MATCH; i++) {
      const candidate = buildCandidate(match);
      if (!seen.has(candidate.key)) {
        seen.add(candidate.key);
        pool.push(candidate);
      }
    }
  });

  return pool;
}

function distanceTo(target, combinedOdds) {
  return Math.abs(combinedOdds - target) / target;
}

// Always returns TOTAL_RESULTS combos, with exactly GOALSCORER_SLOTS of them
// including an Anytime Goalscorer leg, ranked by closeness to the target odds.
function pickCombos(targetOdds) {
  const pool = generateCandidatePool();

  const withScorer = pool
    .filter((c) => c.hasGoalscorer)
    .sort((a, b) => distanceTo(targetOdds, a.combinedOdds) - distanceTo(targetOdds, b.combinedOdds));

  const withoutScorer = pool
    .filter((c) => !c.hasGoalscorer)
    .sort((a, b) => distanceTo(targetOdds, a.combinedOdds) - distanceTo(targetOdds, b.combinedOdds));

  const chosenScorer = withScorer.slice(0, GOALSCORER_SLOTS);
  const chosenNonScorer = withoutScorer.slice(0, TOTAL_RESULTS - GOALSCORER_SLOTS);

  const results = [...chosenScorer, ...chosenNonScorer].sort(
    (a, b) => distanceTo(targetOdds, a.combinedOdds) - distanceTo(targetOdds, b.combinedOdds)
  );

  return results;
}

function formatMoney(value) {
  return `£${value.toFixed(2)}`;
}

function formatOdds(value) {
  return `${value.toFixed(2)}x`;
}

function renderResults(combos, targetOdds, stake) {
  const container = document.getElementById('rr-results');
  container.innerHTML = '';

  combos.forEach((combo) => {
    const card = document.createElement('article');
    card.className = 'rr-panel';

    const legsHtml = combo.legs
      .map(
        (leg) => `
          <li class="rr-leg${leg.isGoalscorer ? ' rr-leg-goalscorer' : ''}">
            <span class="rr-leg-market">${leg.market}</span>
            <span class="rr-leg-selection">${leg.label}</span>
            <span class="rr-leg-odds">${leg.odds.toFixed(2)}</span>
          </li>`
      )
      .join('');

    card.innerHTML = `
      <header class="rr-panel-header">
        <h3>${combo.matchLabel}</h3>
        <span class="rr-panel-meta">${combo.matchMeta}</span>
      </header>
      <ul class="rr-legs">${legsHtml}</ul>
      <footer class="rr-panel-footer">
        <span class="rr-combined-odds">${formatOdds(combo.combinedOdds)}</span>
        <span class="rr-payout">${formatMoney(stake * combo.combinedOdds)} payout</span>
      </footer>
      <button class="rr-place-bet-btn" type="button">Place bet</button>
    `;

    container.appendChild(card);
  });
}

const WANT_DEFAULTS = { gbp: '100', odds: '10.00' };

let wantMode = 'gbp';

function setWantMode(mode) {
  wantMode = mode;

  const gbpWrap = document.getElementById('rr-want-gbp-wrap');
  const oddsWrap = document.getElementById('rr-want-odds-wrap');
  const label = document.getElementById('rr-want-label');
  const gbpBtn = document.querySelector('.rr-mode-btn[data-mode="gbp"]');
  const oddsBtn = document.querySelector('.rr-mode-btn[data-mode="odds"]');

  gbpWrap.hidden = mode !== 'gbp';
  oddsWrap.hidden = mode !== 'odds';
  label.textContent = mode === 'gbp' ? 'Target value' : 'Target odds';
  gbpBtn.classList.toggle('active', mode === 'gbp');
  gbpBtn.setAttribute('aria-pressed', mode === 'gbp');
  oddsBtn.classList.toggle('active', mode === 'odds');
  oddsBtn.setAttribute('aria-pressed', mode === 'odds');

  if (mode === 'gbp') {
    document.getElementById('rr-want').value = WANT_DEFAULTS.gbp;
  } else {
    document.getElementById('rr-want-odds').value = WANT_DEFAULTS.odds;
  }
}

function handleGenerate() {
  const haveInput = document.getElementById('rr-have');
  const wantInput = document.getElementById('rr-want');
  const wantOddsInput = document.getElementById('rr-want-odds');
  const errorEl = document.getElementById('rr-error');
  const targetEl = document.getElementById('rr-target');
  const resultsEl = document.getElementById('rr-results');

  const have = Number(haveInput.value);

  errorEl.hidden = true;
  targetEl.hidden = true;
  resultsEl.hidden = true;

  let targetOdds;

  if (wantMode === 'gbp') {
    const want = Number(wantInput.value);

    if (!have || !want || have <= 0 || want <= 0) {
      errorEl.textContent = 'Enter a stake and target amount greater than £0.';
      errorEl.hidden = false;
      return;
    }

    if (want <= have) {
      errorEl.textContent = '"Target value" must be greater than "I have".';
      errorEl.hidden = false;
      return;
    }

    targetOdds = want / have;
  } else {
    const oddsValue = Number(wantOddsInput.value);

    if (!have || have <= 0) {
      errorEl.textContent = 'Enter a stake greater than £0.';
      errorEl.hidden = false;
      return;
    }

    if (!oddsValue || oddsValue < 1.01 || oddsValue > 1000) {
      errorEl.textContent = 'Enter target odds between 1.01 and 1000.';
      errorEl.hidden = false;
      return;
    }

    targetOdds = oddsValue;
  }

  const combos = pickCombos(targetOdds);

  targetEl.textContent = `You need combined odds of ${formatOdds(targetOdds)} — here are the 5 closest soccer bet builder combos.`;
  targetEl.hidden = false;

  renderResults(combos, targetOdds, have);
  resultsEl.hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('rr-generate');
  if (button) {
    button.addEventListener('click', handleGenerate);
  }

  document.querySelectorAll('.rr-mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => setWantMode(btn.dataset.mode));
  });
});
