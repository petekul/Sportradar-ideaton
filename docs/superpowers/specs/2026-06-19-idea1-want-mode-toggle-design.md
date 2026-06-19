# Idea 1: "I want" mode toggle (£ value ↔ odds) — Design

## Problem

In Idea 1's reverse-recommendation tool, the "I want" box only accepts a target £ payout. Target combined odds are then derived as `want / have`. Users who already know the odds multiplier they're after (e.g. "I want 10.5x odds") have no direct way to enter it — they have to back-calculate a £ figure first.

## Goal

Let the "I want" box toggle between two entry modes:
- **£ mode** (existing): user enters a target payout in £; target odds = `want / have`.
- **Odds mode** (new): user enters the target combined odds directly (e.g. `10.50`); that value is used as the target odds as-is.

## Markup (idea1.html)

The "I want" `rr-box` gains:
- A pill toggle group (`.rr-mode-toggle`) with two buttons: `£` and `Odds`, placed between the label and the input row.
- Two input wrappers, only one visible (`hidden` attribute) at a time:
  - `#rr-want` (existing): `£` prefix, label "Target value".
  - `#rr-want-odds` (new): `x` suffix, label "Target odds".
- The box's `<label>` text switches between "Target value" (£ mode) and "Target odds" (odds mode).
- The "I have" box is unchanged.

Default mode on page load: £ mode (matches current behavior).

## JS logic (idea1.js)

- Module-level state: `let wantMode = 'gbp'` (`'gbp' | 'odds'`).
- Toggle button click handler:
  - Sets `wantMode` to the clicked mode.
  - Toggles `hidden` on the two input wrappers accordingly.
  - Updates the box's label text ("Target value" / "Target odds").
  - Toggles an `active` class on the two pill buttons.
  - Resets the now-visible input to its default value: `100` for £ mode, `10.00` for odds mode. (Switching modes does not attempt to convert/preserve the prior value — it resets to a fixed default.)
- `handleGenerate()` branches on `wantMode`:
  - **£ mode**: unchanged. `targetOdds = want / have`. Validation: `have > 0`, `want > 0`, `want > have` (existing error copy).
  - **Odds mode**: `targetOdds` = the odds input's value directly. Validation: `have > 0` (stake still required for payout display), and odds value between `1.01` and `1000` inclusive. New error copy: "Enter target odds between 1.01 and 1000."
- Odds input attributes: `type="number" min="1.01" max="1000" step="0.01" value="10.00"`.

## CSS (idea1.css)

New `.rr-mode-toggle` rule block: small pill-style button group (two buttons side by side), inactive buttons muted/transparent, `.active` state styled with the existing accent color, consistent with `.rr-generate-btn`'s visual language. Positioned between the label and `.rr-money-input` row within `.rr-box`.

## Out of scope

- No persistence of mode choice across page reloads.
- No conversion of value when switching modes (always resets to default).
- No changes to the "I have" box or combo-generation logic beyond how `targetOdds` is sourced.
