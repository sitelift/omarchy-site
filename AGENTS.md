# AGENTS.md — context for anyone (human or agent) picking this up

## What this is

A redesign proposal for [omarchy.org](https://omarchy.org), DHH's Linux
distribution site. On Aug 30 2026 DHH tweeted that the homepage "has
outgrown itself" and asked for redesigns at design@omarchy.org —
"If it vibes, you're in." This repo is Pieter de Bruijn's submission.
The prize is a spot on the new Omarchy Design team.

- Live preview: https://omarchy.sitelift.net (Hostinger subdomain)
- Code: https://github.com/sitelift/omarchy-site (private fork of
  https://github.com/omacom/omarchy-site — the real site's source)
- Deploy: upload zip to Hostinger docroot, or `bin/deploy user@host`.
  Local dev: `ruby bin/serve 8931` (clean URLs, correct MIME).

## Correspondence status

1. Pieter emailed the first submission (dark homepage, preview + repo link).
2. DHH replied: "many agents think alike! This is almost exactly what I got
   from claude too when I just asked. Think we need something a bit more
   though." + asked whether Pieter dual boots.
3. Pieter answered (dual boot for Excel coursework → Omarchy's Windows VM let
   him go single boot) and asked what DHH has in mind.
4. **Awaiting DHH's reply.** When it lands, respond with shipped work, not
   promises. The homepage copy now leads with "Your computer should have
   come this way." per Pieter's direction.

## Design direction (active)

Pivot from the light editorial page: the homepage chrome is now the
**Omarchy menu as site navigation** — replacing omarchy.org's chip button
rows with a real Super+Space-style launcher (Learn / Community / Install /
About). Editorial copy and artifacts remain under the bar; the menu is the
nav. See `assets/js/site/menu.js` and `assets/css/v2/menu.css`.

Previous notes on the 37signals editorial study still inform copy tone
(plain words, hard specifics; no corn). Don't revive feature-card grids.

### Known open issue (partially addressed)

Terminal dark backgrounds now use `--color-terminal-bg: rgb(24 26 32 / 0.94)`
(space-separated). Re-verify with a headless screenshot after deploys.

## Technical shape

- This repo is upstream omacom/omarchy-site **plus** a namespaced redesign:
  `assets/css/v2/` and `assets/js/site.js` + `assets/js/site/`. Upstream
  pages (manual, news, patrons, teams, ...) and upstream CSS/JS are
  untouched and must keep working.
- Asset links carry cache-busting `?v=<token>` — bump whenever v2 CSS/JS changes.
- Upstream facts are load-bearing: 22 built-in themes, 145+ community themes,
  **foot** default terminal, **Quickshell** shell, Hyprland 0.56.2, 898 pacman
  packages. Menu tree for the site mirrors Learn / Community / Install / About
  from the real Omarchy menu, with chip destinations as leaves.
- Dark terminal + menu chrome use `--color-terminal-bg` and `--rgb-panel-*`.
- `CNAME` is deliberately not in this repo.

## House rules

- Commit early, push to sitelift/omarchy-site, keep `?v=` in sync. The
  entire assets/css layer was once wiped by an `rm -rf` before any commit
  existed — never again.
- Verify with `chromium --headless --screenshot` + console logs before
  claiming done; screenshots caught several bugs (IntersectionObserver
  rootMargin `em` units crash, giant unstyled brand SVG, broken CSS edit).
- Don't ship the zip while the redesign has open bugs; the live
  omarchy.sitelift.net currently serves the previous stable dark design.
