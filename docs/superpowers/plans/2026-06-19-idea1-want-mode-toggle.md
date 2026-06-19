# Idea 1: "I want" Mode Toggle (£ ↔ Odds) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the "I want" box on Idea 1 toggle between a £ target-value input and a direct target-odds input.

**Architecture:** Two input wrappers inside the existing `rr-box`, toggled via a pill button group; module-level `wantMode` state in `idea1.js` drives visibility, label text, and which branch `handleGenerate()` uses to derive `targetOdds`.

**Tech Stack:** Plain HTML/CSS/JS, Vite dev server. No test runner is configured in this project (`package.json` has no test script) — verification is manual via the dev server, per the existing convention in this codebase.

---

## File Structure

- Modify: `idea1.html:40-46` — replace the single "I want" input with toggle buttons + two input wrappers
- Modify: `css/idea1.css` — add styles for the new toggle pills and odds suffix
- Modify: `js/idea1.js:300-341` — add mode state/handler, branch `handleGenerate()` on mode

---

### Task 1: Markup for the mode toggle and second input

**Files:**
- Modify: `idea1.html:40-46`

- [ ] **Step 1: Replace the "I want" box markup**

Replace this block:

```html
          <div class="rr-box">
            <label for="rr-want">I want</label>
            <div class="rr-money-input">
              <span class="rr-currency">£</span>
              <input type="number" id="rr-want" min="1" step="1" value="100" inputmode="numeric">
            </div>
          </div>
```

with:

```html
          <div class="rr-box">
            <label id="rr-want-label" for="rr-want">Target value</label>
            <div class="rr-mode-toggle">
              <button type="button" class="rr-mode-btn active" data-mode="gbp">£</button>
              <button type="button" class="rr-mode-btn" data-mode="odds">Odds</button>
            </div>
            <div class="rr-money-input" id="rr-want-gbp-wrap">
              <span class="rr-currency">£</span>
              <input type="number" id="rr-want" min="1" step="1" value="100" inputmode="numeric">
            </div>
            <div class="rr-money-input" id="rr-want-odds-wrap" hidden>
              <input type="number" id="rr-want-odds" min="1.01" max="1000" step="0.01" value="10.00" inputmode="decimal">
              <span class="rr-odds-suffix">x</span>
            </div>
          </div>
```

- [ ] **Step 2: Verify markup is well-formed**

Run: `node -e "require('node:fs').readFileSync('idea1.html','utf8')"` (just confirms the file is readable; this is a sanity check, not a parser).

Then visually scan the file to confirm there's exactly one `<label id="rr-want-label">`, one `#rr-want-gbp-wrap`, and one `#rr-want-odds-wrap`, and that `#rr-want-odds-wrap` has the `hidden` attribute.

- [ ] **Step 3: Commit**

```bash
git add idea1.html
git commit -m "feat(idea1): add markup for £/odds mode toggle on target box"
```

---

### Task 2: Styles for the toggle pills and odds suffix

**Files:**
- Modify: `css/idea1.css`

- [ ] **Step 1: Add the toggle and suffix styles**

Insert after the `.rr-box label { ... }` rule (currently `idea1.css:22-27`):

```css
.rr-mode-toggle {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.rr-mode-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.rr-mode-btn:hover {
  opacity: 0.85;
}

.rr-mode-btn.active {
  background: var(--accent);
  color: #04231f;
  border-color: var(--accent);
}

.rr-odds-suffix {
  color: var(--accent-2);
  font-weight: 700;
  font-size: 1.25rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/idea1.css
git commit -m "feat(idea1): style £/odds mode toggle pills"
```

---

### Task 3: JS mode state, toggle handler, and generate-logic branch

**Files:**
- Modify: `js/idea1.js:300-341`

- [ ] **Step 1: Replace `handleGenerate()` and the `DOMContentLoaded` listener**

Replace this block (currently lines 300-341):

```js
function handleGenerate() {
  const haveInput = document.getElementById('rr-have');
  const wantInput = document.getElementById('rr-want');
  const errorEl = document.getElementById('rr-error');
  const targetEl = document.getElementById('rr-target');
  const resultsEl = document.getElementById('rr-results');

  const have = Number(haveInput.value);
  const want = Number(wantInput.value);

  errorEl.hidden = true;
  targetEl.hidden = true;
  resultsEl.hidden = true;

  if (!have || !want || have <= 0 || want <= 0) {
    errorEl.textContent = 'Enter a stake and target amount greater than £0.';
    errorEl.hidden = false;
    return;
  }

  if (want <= have) {
    errorEl.textContent = '"I want" must be greater than "I have".';
    errorEl.hidden = false;
    return;
  }

  const targetOdds = want / have;
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
});
```

with:

```js
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
  oddsBtn.classList.toggle('active', mode === 'odds');

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
```

- [ ] **Step 2: Commit**

```bash
git add js/idea1.js
git commit -m "feat(idea1): branch target-odds calculation on £/odds mode"
```

---

### Task 4: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Vite prints a local URL (e.g. `http://localhost:5173/`).

- [ ] **Step 2: Verify default (£) mode**

Open `http://localhost:5173/idea1.html` in a browser. Confirm:
- Label reads "Target value", `£` pill is active, input shows `100`.
- Clicking "Generate combos" with defaults (`I have` = 10, `Target value` = 100) shows "You need combined odds of 10.00x — ...".

- [ ] **Step 3: Verify odds mode toggle and reset-to-default**

Click the "Odds" pill. Confirm:
- Label changes to "Target odds", the £ input row hides, the odds input row shows with value `10.00` and an `x` suffix.
- Click back to "£": label reverts to "Target value", value resets to `100` (not whatever was there before).

- [ ] **Step 4: Verify odds-mode generate + validation**

In odds mode, set `I have` = 10, `Target odds` = 15. Click "Generate combos". Confirm the message reads "You need combined odds of 15.00x — ...".

Set `Target odds` = 0.5 and click "Generate combos". Confirm the error "Enter target odds between 1.01 and 1000." appears and no results render.

Set `I have` = 0 (odds mode still active). Confirm the error "Enter a stake greater than £0." appears.

- [ ] **Step 5: Verify £-mode validation still works**

Switch back to £ mode. Set `I have` = 50, `Target value` = 10 (less than have). Click "Generate combos". Confirm the error `"Target value" must be greater than "I have".` appears.

- [ ] **Step 6: Stop the dev server**

Stop the background `npm run dev` process once verification is complete.

---

## Self-Review Notes

- Spec coverage: pill toggle (Task 1/2), label text "Target value"/"Target odds" (Task 1/3), reset-to-default on switch (Task 3), odds validation 1.01–1000 (Task 3), £ mode unchanged behavior (Task 3) — all covered.
- No placeholders: every step has literal code or literal manual-check instructions.
- Type/name consistency checked: `wantMode`, `setWantMode`, `WANT_DEFAULTS`, element IDs (`rr-want-gbp-wrap`, `rr-want-odds-wrap`, `rr-want-odds`, `rr-want-label`) are consistent between Task 1 (HTML) and Task 3 (JS).
