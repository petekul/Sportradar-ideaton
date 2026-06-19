# Global Sweepstake Lottery: Pari-Mutuel World Cup Team Draw (Soccer)

**Jira Label:** EPIC
**Status:** Draft
**Owner:** [PM name — TBD]
**Target Quarter:** TBD

---

## Business Impact Statement

Match-level betting only captures fans who already follow a specific fixture or understand odds — it does nothing for the much larger casual audience who just want to feel personally involved in the World Cup as a whole. A paid, instant-draw sweepstake lets any customer in an operator's base buy a ticket for a fixed stake and instantly "own" one of the 48 competing nations, turning the entire tournament into one shared, easy-to-understand event that runs for the full ~32 days. Because every prize tier is funded pari-mutuel (directly from ticket sales), pool size — and the resulting engagement/press value — scales with participation at no incremental prize liability to the operator, and World Cup timing maximizes the addressable audience for a single global launch.

---

## Problem Statement

Operators' World Cup product today is built around match-by-match betting markets, which requires a customer to already understand odds and commit to a specific fixture to engage. Casual fans — who make up a large share of total World Cup attention — have no low-friction way to feel personally invested in the tournament as a whole, and an operator has no single, base-wide event capable of rallying its entire customer list for the full duration of the tournament.

---

## Goal

> As an **operator launching a World Cup promotion**,
> I need **a paid, instant-draw, pari-mutuel team sweepstake that any customer across my base can enter**,
> so that **I get one shared, tournament-long engagement event without taking on fixed per-match prize liability**.

> As an **end customer (bettor)**,
> I need **a simple, low-knowledge way to buy in and instantly be assigned one of the 48 competing teams**,
> so that **I have something to follow and a real chance to win across the whole tournament, regardless of betting expertise**.

---

## Scope

### Sport & Event

**Soccer / FIFA World Cup only (v1).** The draw pool is exactly the 48 teams competing in the tournament. No other sport or event is in scope.

### In Scope
- Ticket purchase flow: customer pays a fixed stake and is **instantly** assigned exactly **1 of the 48 World Cup teams**, drawn at random — there is no team selection by the user
- Support for **multiple ticket purchases per user**; each ticket is an independent random draw. **No scarcity constraint** — duplicate team assignments are allowed, both across different users and for the same user buying multiple tickets
- Three **pari-mutuel** prize tiers, each resolved against real tournament outcomes rather than the draw mechanic itself (see "Prize Tiers" table below)
- Pool mechanics: each tier's prize pool = total stakes contributed to that tier, minus the operator's take/rake, split **pro-rata** among every ticket holder whose assigned team matches that tier's real-world outcome
- v1 launch limited to a **small, pre-validated set of jurisdictions/operators** where this paid, chance-based mechanic is already confirmed legally permissible (see Dependencies & Risks)
- Result resolution tied to real World Cup milestones (group-stage completion for Wooden Spoon, full-tournament completion for Champion and Fastest Goal)
- A live view showing the customer's ticket(s)/assigned team(s), current status of all three prize tiers, and pool size growth over the tournament

### Out of Scope
- A free / no-purchase-necessary entry path — flagged as a likely fast-follow for jurisdictions that don't license a paid, chance-based draw as a lottery (see Risks), but not built in this epic
- Any user choice of which team they're assigned — assignment is always random
- Any link to traditional match betting markets, odds, or in-play wagering — this is a standalone draw product, not a bet builder or combo feature
- Other sports or tournaments — soccer/World Cup only for v1
- A recurring or season-long version outside the World Cup window (e.g. a domestic league equivalent) — a future consideration, not part of this epic

---

## Prize Tiers (v1)

| Prize Tier | Real-World Trigger | Resolves |
|---|---|---|
| Champion | Ticket's assigned team wins the World Cup Final | After the Final |
| Wooden Spoon | Ticket's assigned team finishes bottom of the entire 48-team field — eliminated in the group stage, determined by standard tiebreakers (points → goal difference → goals scored → head-to-head) | After the group stage concludes |
| Fastest Goal | Ticket's assigned team scored the single fastest goal (by match clock) of the whole tournament | After the tournament ends (a faster goal could occur on the final matchday) |

*(All three tiers are funded and paid out pari-mutuel — see Scope.)*

---

## Personas Affected

| Persona | How they're affected |
|---|---|
| Operator (B2B customer) | Configures stake price and operator take, launches/promotes the sweepstake to their base, and carries the regulatory/licensing responsibility for offering it |
| End customer (bettor) | Buys ticket(s), is randomly assigned a team, follows all three live prize tiers across the tournament, and may win a pro-rata share of any tier's pool |
| Trading/risk & compliance team | Must confirm, market by market, whether a paid, chance-based, no-skill draw is legally permissible (vs. requiring separate lottery licensing or being prohibited outright) before launch in that jurisdiction |

---

## Success Metrics

- [ ] Total ticket stake volume (handle) generated across the tournament, benchmarked against comparable World Cup promotional products
- [ ] Total tickets sold, and average tickets per participating customer (proxy for repeat buy-in)
- [ ] Pool size at each of the three resolution points, as a measure of total participation captured
- [ ] % of an operator's active base that buys at least one ticket — validates the "pool across the whole base" thesis directly

---

## Proposed Child Stories

> These are indicative — engineers and QA will write the full stories.

- [ ] Build ticket purchase flow with fixed-stake selection and instant random team assignment (1-of-48, no scarcity, duplicates allowed)
- [ ] Build the pari-mutuel pool calculation engine for the three prize tiers, including configurable operator take/rake
- [ ] Integrate a real-world results feed for World Cup standings/tiebreakers to resolve Wooden Spoon (post-group-stage) and Champion (post-Final)
- [ ] Integrate a real-world goal-timing/event feed to resolve Fastest Goal (post-tournament, across all matches)
- [ ] Build payout/settlement logic that splits each tier's pool pro-rata among all matching ticket holders
- [ ] Build the "my tickets" / live pool tracker UI showing assigned teams, live pool size per tier, and resolution status
- [ ] Define and document the v1 jurisdiction allow-list with legal/compliance before any market goes live
- [ ] (Prototype-specific) Build a client-side synthetic version: the fixed 48-team pool, mock ticket purchases, simulated pool growth, and a mock resolution for demo purposes

*(Add or remove as scope becomes clearer during refinement)*

---

## Dependencies & Risks

| Item | Type | Notes |
|---|---|---|
| Legal classification of a paid, chance-based draw (lottery vs. sweepstakes) | Risk — Primary | Stake-based entry + chance + prize is, in most jurisdictions, the legal definition of a lottery, which typically requires licensing distinct from standard sports betting. This is the single biggest open question in this epic and must be resolved per-market before launch; jurisdictions that won't license this as a lottery will likely need the free/no-purchase-necessary (AMOE) path called out in Out of Scope. |
| Real-world results feed (standings, tiebreakers, goal timing) | Dependency | Needed to resolve all three prize tiers; the Wooden Spoon tiebreaker logic in particular must exactly match official tournament rules to avoid disputes. |
| Pari-mutuel take/rake calibration | Risk | The operator's take must cover costs without leaving the pool unattractively small — needs trading/finance sign-off per market. |
| Perception of unfairness from duplicate assignment | Risk | Because many customers can be assigned the same team, a popular team winning a tier could split that pool very thinly across a large number of winners — messaging needs to set this expectation up front. |
| v1 jurisdiction allow-list scope creep | Risk | Starting narrow is the agreed approach, but commercial pressure to add jurisdictions quickly post-launch could outpace legal clearance. |

---

## PM Notes

This epic originates from the Sportradar Ideathon prototype (Idea 2). Key decisions locked in during refinement:

- Entry is **paid/stake-based**, not free-to-enter. In most jurisdictions this makes the product a lottery by legal definition, not a sweepstakes exemption — the "Global Sweepstake Lottery" name reflects its lineage from classic informal sweepstakes (e.g. office pools where participants draw a team name from a hat), but the real-money version should be scoped and discussed internally as a lottery-class product.
- v1 deliberately limits launch to jurisdictions already validated as legally permissible; broader jurisdiction coverage and/or a free-entry (AMOE) path are likely fast-follows, not v1 scope.
- Team assignment is always random and instant on ticket purchase — no user-driven team selection, and no scarcity limit. Duplicate team assignment across many users is expected and by design, since pool size (not team scarcity) is what funds the prizes.
- All three prize tiers (Champion, Wooden Spoon, Fastest Goal) are funded purely pari-mutuel, which is also why pool/handle growth was chosen as the primary success metric over operator-adoption or acquisition metrics.
- Soccer/World Cup only for v1, consistent with Idea 1.

Would you like me to adjust the scope, add more child stories, or sharpen the impact statement?
