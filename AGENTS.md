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

## Design direction (settled, don't relitigate)

The first submission died the moment DHH compared it to Claude's output:
a tasteful dark landing page with feature cards is what any agent produces.
The pivot is a **light, editorial "argument" page in the 37signals house
style**, based on a study of dhh.dk, basecamp.com, hey.com and
37signals.com:

- Paper-white canvas, near-black ink, one green accent, no gradients/glow.
- Body and headlines in the **system sans stack** (dhh.dk ships no webfont);
  JetBrains Mono only where the machine speaks — terminal windows, kickers,
  code, keybindings. The house system uses Graphik + Berkeley Mono the same
  way.
- Dark Tokyo Night terminal windows sit on the light page like product
  shots (the basecamp.com pattern: light page, dark screenshots).
- Structure = one long argument with conversational h2s ("Tell me if this
  sounds about right."), one claim per section, one artifact as proof.
  basecamp.com has zero card grids; so does our homepage now.
- Homepage claims, in order: hero + fastfetch artifact → pain ("Tell me if
  this sounds about right.") → "Opinionated means finished." (desktop
  screenshot) → "Twenty-two themes. One keystroke." (3 thumbnails) →
  "It's also an agentic OS." (terminal) → "Don't take our word for it."
  (Quattro video) → "The honest pitch." (two lists) → "Up and running in
  ten minutes." (steps + dd terminal + future "Try Omarchy" demo slot) →
  "A community that shows up." (inline links) → FAQ ("Questions? Good.").
- Depth lives on subpages: /themes (all 145), /videos (15), /manual,
  /news. The homepage makes six claims and proves each.

### Copy rules learned the hard way

Pieter rejected, as corny: "Linux, finished.", "It's not a distro. It's
DHH's computer.", "The year of the Linux desktop happened.", lightning
triads, cage/rental metaphors. Conviction = **plain words + hard
specifics** (Apple: "1,000 songs in your pocket"). No metaphors, no
meme references, no name-worship. He liked "Your computer should have
come this way." and the "Tell me if this sounds about right." move.
Less is more: he cut the plugin/community/video sections from the
homepage and rejected the interactive-terminal-as-site idea (high bounce)
but approved a future "Try Omarchy" live demo slot in the install section.

## Technical shape

- This repo is upstream omacom/omarchy-site **plus** a namespaced redesign:
  `assets/css/v2/` and `assets/js/site.js` + `assets/js/site/`. Upstream
  pages (manual, news, patrons, teams, ...) and upstream CSS/JS are
  untouched and must keep working. `bin/build-manual` / `bin/build-news`
  regenerate manual/ and news/ (need `gem install kramdown
  kramdown-parser-gfm`); built output is committed, so any static host
  works.
- Asset links carry cache-busting `?v=<commit>` — Hostinger's hCDN sets a
  7-day `max-age`, so bump the version string whenever v2 CSS/JS changes.
- Upstream facts are load-bearing, verified against omacom/omarchy and the
  plugin marketplace registry: 22 built-in themes, 145+ community themes,
  **foot** is the default terminal (not Ghostty), **Quickshell** is the
  shell (not Waybar), Hyprland 0.56.2, 898 pacman packages, agents
  pre-wired as lazy-loaded launchers (claude, codex, opencode, grok,
  copilot...), the omarchy skill lets agents fix the machine. Plugin
  competition winners: Radio Atlas, Omagotchi, AirPods.
- The dark terminal windows use their own variable set (`--rgb-panel-*`,
  bright Tokyo Night values) independent of the light page palette.
- `CNAME` is deliberately not in this repo (it claims omarchy.org).
- The favicon/opengraph images and all other upstream assets are shared
  from the synced upstream tree.

## Known open issue (fix first, next session)

The fastfetch terminal renders **without its dark background** — pale
panels on paper. Prime suspect: `rgb(var(--rgb-black) / 0.92)` where
`--rgb-black: 24, 26, 32` (the comma+slash hybrid) may be invalid after
the palette flip. An empirical test page is at /tmp/opencode/test.html
(screenshot it: three boxes — if all white, the syntax is the killer;
switch to space syntax `rgb(24 26 32 / 0.92)` or add a dedicated
`--color-terminal-bg`). The wte canvas logo also shows as a black box on
light until the terminal bg is dark again.

## House rules

- Commit early, push to sitelift/omarchy-site, keep `?v=` in sync. The
  entire assets/css layer was once wiped by an `rm -rf` before any commit
  existed — never again.
- Verify with `chromium --headless --screenshot` + console logs before
  claiming done; screenshots caught several bugs (IntersectionObserver
  rootMargin `em` units crash, giant unstyled brand SVG, broken CSS edit).
- Don't ship the zip while the redesign has open bugs; the live
  omarchy.sitelift.net currently serves the previous stable dark design.
