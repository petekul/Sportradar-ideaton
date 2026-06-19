# Reverse Recommendations: Outcome-Based Bet Builder Combo Generator (Soccer)

**Jira Label:** EPIC
**Status:** Draft
**Owner:** [PM name — TBD]
**Target Quarter:** TBD

---

## Business Impact Statement

Bettors who want a specific payout (e.g., turn £10 into £100) currently have to manually browse markets and trial-and-error their way to a matching set of odds — a slow, frustrating loop that causes drop-off before a bet builder slip is ever completed. By letting a bettor simply enter what they have and what they want, and instantly surfacing matching soccer bet builder combinations, this feature turns a passive "browse and hope" experience into a goal-directed, repeatable habit. The expected outcome is more frequent, more repeat engagement with the bet builder tool — bettors come back to it as a go-to way to find a bet, rather than using it once and abandoning it.

---

## Problem Statement

Bettors think in outcomes ("I want to turn £10 into £100"), not in odds multipliers. Today's bet builder UX requires the opposite: pick selections first, then check what odds and payout result. This forces manual trial-and-error and discourages bettors who don't already know which markets to combine. There is no existing entry point that starts from the bettor's desired result and works backward to suggest real combinations that achieve it.

---

## Goal

> As an **end bettor using the sportsbook app**,
> I need to **enter how much I have and how much I want to win, and instantly see real soccer bet builder combinations whose combined odds achieve that outcome**,
> so that **I can find a matching bet without manually researching odds, and keep coming back to the tool whenever I have a target outcome in mind**.

---

## Scope

### Sport

**Soccer only (v1).** All combo generation, markets, and matches are scoped to soccer/football fixtures. No other sport is supported in this epic.

### In Scope
- Landing UI with two side-by-side inputs: **"I have"** (stake, £) and **"I want"** (target return, £)
- A **"Generate combos"** button that computes the required combined odds (target ÷ stake) and triggers generation
- Combo-matching logic scoped to a **single soccer match** (same-game multi) that selects from that match's available markets (see "Supported Betting Markets" below) and **always returns the 5 closest combos**, ranked purely by how close their combined odds are to the required multiplier — never an empty result, even when nothing lines up exactly
- 5 result panels, each showing: selections included, combined odds, projected payout for the entered stake, and a clear indicator of how close the combo is to the exact target (e.g., "exact match" vs. "closest match — 9.6x vs. 10.0x target")
- Basic input validation (numeric only, minimum stake, "want" must exceed "have")
- Responsive layout for both the initial two-box view and the resulting 5-panel results view

### Out of Scope
- Other sports (basketball, tennis, etc.) — soccer only for v1
- Real-money bet placement / checkout flow — this epic covers discovery and suggestion only, not placing the bet
- Personalization based on betting history, favorite teams, or leagues (possible fast-follow)
- Multi-event / cross-match combo construction — scope is single-event ("same game") bet builder only
- Production-grade odds-feed and combinatorics engine integration — the prototype generates plausible selections and odds client-side rather than pulling from a live feed; real-engine integration is a future dependency, not built within this epic

---

## Supported Betting Markets (v1, Soccer)

Combos are built from selections within these markets only:

| Market | Example selection |
|---|---|
| Match Result (1X2) | Home / Draw / Away |
| Both Teams to Score (BTTS) | Yes / No |
| Total Goals Over/Under | Over 2.5 / Under 2.5 |
| Correct Score | 2-1 |
| Anytime Goalscorer | Player to score at any point |
| First Goalscorer | Player to score first |
| Half-Time/Full-Time Result | Draw/Home, Away/Away, etc. |
| Asian Handicap | Home -1, Away +1, etc. |
| Total Corners Over/Under | Over 9.5 corners |
| Clean Sheet (Yes/No) | Team to keep a clean sheet |

*(List is a v1 starting point — confirm with trading/markets team before build; can be trimmed or extended.)*

---

## Personas Affected

| Persona | How they're affected |
|---|---|
| End bettor | Gets a new, goal-first entry point into bet builder that removes manual trial-and-error and lowers the barrier to building a slip |
| Trading / risk team | Indirectly affected — once backed by real odds, suggested combos must stay within existing liability and payout-cap rules, even though this isn't a direct user of the feature |

---

## Success Metrics

- [ ] Baseline (pre-launch): average bet builder sessions per active user per week, measured before this feature ships
- [ ] Repeat usage rate: % of users who return to the Reverse Recommendations tool more than once within 7 days of first use
- [ ] % of bet builder sessions that originate from the Reverse Recommendations entry point vs. the traditional manual builder
- [ ] Average session time spent within the tool (entry → combo generated)

---

## Proposed Child Stories

> These are indicative — engineers and QA will write the full stories.

- [ ] Build "I have / I want" input UI with validation and required-odds calculation
- [ ] Build "Generate combos" trigger, including loading state and transition into results view
- [ ] Define the v1 supported soccer market list and confirm with trading/markets team
- [ ] Implement single-match combo-matching logic (soccer only) that ranks candidates by closeness to the target odds and always returns the 5 closest
- [ ] Build the 5-panel results UI showing selections, combined odds, projected payout, and an exact-vs-closest-match indicator per combo
- [ ] Instrument analytics events (tool opened, combo generated, repeat use within 7 days) to track engagement success metrics
- [ ] (Prototype-specific) Build the client-side synthetic data generator that produces plausible soccer match selections, markets, and odds for any "have"/"want" input

*(Add or remove as scope becomes clearer during refinement)*

---

## Dependencies & Risks

| Item | Type | Notes |
|---|---|---|
| Same-game bet builder / odds combinatorics engine (soccer) | Future Dependency | Needed for the production version to source real, valid selection combinations and combined odds; not required for the client-side prototype |
| Liability/risk limits on suggested combos | Risk | Once backed by real odds, the trading team needs assurance that suggested combos don't create unusual liability exposure |
| "Guaranteed outcome" misperception | Risk | Bettors may read suggested combos as a guaranteed win rather than an odds-based suggestion — needs clear disclaimer messaging and legal review |
| Market list completeness | Risk | The v1 market list is a starting point — missing or mismodeled markets could limit how close combos get to the target odds |

---

## PM Notes

This epic originates from the Sportradar Ideathon prototype (Idea 1). Key decisions locked in during refinement:

- Sport is restricted to **soccer only** for v1 — no other sports in scope.
- Combos are always returned (5 panels, no empty state), ranked strictly by closeness to the exact target odds.
- Scope is single-match "same-game multi" only — no cross-event combos in this version.
- Combos draw only from the **Supported Betting Markets** list above; confirm/expand this list with the trading team before build.
- The static GitHub Pages prototype generates selections, markets, and odds client-side (synthetic data) rather than calling a live odds feed. The dependency on a real combinatorics engine applies only to a future production build, not this prototype.

### Prototype Demo Data

The interactive prototype is fixed to 3 World Cup 2026 group-stage matches (soccer only), with synthetic odds:

| Match | Anytime Goalscorer selections |
|---|---|
| France v Norway (Fri 26 Jun) | Kylian Mbappé (France), Erling Haaland (Norway) |
| Argentina v Austria | Lionel Messi (Argentina), Marko Arnautović (Austria) |
| Spain v Saudi Arabia | Álvaro Morata (Spain), Salem Al-Dawsari (Saudi Arabia) |

Anytime Goalscorer selections use each team's marquee striker, to make the demo recognizable.

**Demo-specific product rule:** of the 5 combos returned, exactly **4 must include an Anytime Goalscorer leg** and 1 must not — this showcases the Anytime Goalscorer market without making it the only thing on screen. This is a demo presentation choice, not necessarily a production requirement; revisit during refinement on whether the production algorithm should bias toward any particular market mix or just optimize purely for closeness to target odds.
