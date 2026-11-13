# developeryatin.github.io

Static GitHub Pages site: portfolio (`index.html`) plus standalone talk decks in the repo root. No build step — preview with `python3 -m http.server 8000`.

## New slide decks: use the deck design system in `deck/`

Every new deck is built on `deck/`. It was reverse-engineered from
akanshajain.dev/talks/on-device-ai. Do not use Tailwind, Font Awesome, Inter or a
hand-rolled slide scaler for new decks; the older decks (`flutter-ai-mvp.html`,
`gemini-cli.html`, `data_analyst_agent.html`, `ai-in-workflow.html`) predate this
system and are not the pattern to copy.

| File | Role |
|---|---|
| `deck/deck-stage.js` | `<deck-stage>` web component: 1920×1080 canvas scaled to fit, ←/→/Space/Home/End/1–9/R keys, tap zones on mobile, auto-hiding counter, print → one PDF page per slide, `slidechange` event. Vendored, don't edit. |
| `deck/theme.css` | Design tokens, type scale, components, entrance motion. |
| `deck/shapes.js` | Injects Material shapes: `#sh-<name>` symbols for decoration, `#clip-<name>` clip paths for cropping photos. Names: `cookie12`, `cookie9`, `cookie4`, `clover4`, `clover8`. |
| `deck/slides.js` | Auto page numbers in `.foot .pg`; loads `data-src` media, shows `.asset-needed` when missing, plays/pauses video per slide. |
| `deck/template.html` | One example of every slide type. Start new decks by copying it to the root as `<talk-name>.html`, then prefix the four asset links with `deck/` and the photo path with nothing (drop `../`). |

`sample/` holds the original reference deck for local study. It is gitignored and must never be committed or published.

## Design rules

**Direction:** Google Material 3 Expressive, dark. Google Sans Flex for all text (variable axes `wght`, `wdth`, `ROND`), Google Sans Code for code. Content slides use `--bg` (#0F1114). Section dividers are full-bleed brand-colour fields.

**Colour is semantic.** Blue, red, yellow and green each stand for one idea per deck (a benefit, a demo capability, a step) and keep that meaning on every slide. Never use them as random decoration. Each colour has four forms:
- `--blue`: dots, step badges, icon tiles, QR rings
- `--blue-hi`: text and icons on dark (`.c-blue`)
- `--blue-lo`: tonal card or chip fill (`.tonal-blue`)
- `--blue-field`: section-divider background

The same four forms exist for red, yellow and green. Neutrals: `--surface` / `-2` / `-3` for raised layers, `--ink` / `-2` / `-3` for text emphasis.

**Every content slide has the same spine:**
`.kicker` (small grey context) → `.h1` headline written as a sentence, with exactly one phrase coloured with `.c-*` → content → `.foot`. Keep body copy to one or two sentences per card.

**Type scale** (canvas px, author at full size): `.d1` 184, `.d2` 132, `.h1` 88, `.h2` 64, `.h3` 44, `.lead` 40, `.body` 30, `.small` 24. Big standalone numbers use `.stat` (330).

**Layout:** `.pad` is the content frame (92/110/110 padding, flex column). Use `.row`/`.stack`/`.grow` and `.grid-2` … `.grid-5`. Radii come from `--r-sm` … `--r-xl` and are large and soft (cards 48px).

**Components:** `.card` (`.tight`, `.outline`, `.tonal-*`), `.chip` (+ `.dot`, `.tonal-*`), `.icon-tile` (`.sm`), `.step-num`, `.split-card` with `.why` and `--accent`, `.list-row` + `.tick`, `.qr` with `--ring`, `.ring` around a word, `.g4` four-dot mark, `.g4-bar`, `.code` with `.file` and token spans `.k .s .n .t .f .cm`, plus `.hl` (look here) and `.hl-y` (gotcha), `.window`, `.mac.lg` demo frame inside `.demo-stage`, `.asset-needed` placeholders, `.flow-path` for dashed diagram arrows. Icons are inline 24×24 stroke SVGs (`stroke-width="2"`, round caps), not an icon font.

**Section dividers:** `<section class="field blue|red|yellow|green">`, with a `.num` pill (01, 02…), a `.d1` title over two short lines, a `.lead`, and two shapes: one huge at 10% opacity with `.spin`, one solid small one with `.p`. Yellow fields use dark ink (#202124), the others white. Leave out the event logo on field slides.

**Motion:** add `.r` (rise) or `.p` (pop) to elements and stagger them with `.d1s` … `.d6s` (80ms steps), in reading order: kicker, then headline `.d1s`, then content `.d2s`+. Animations replay each time a slide is shown. `.spin` is a 60-second rotation, used only on large background shapes. Reduced-motion and print already turn all of this off; keep it that way.

**Slides are `<section data-label="…">`** inside `<deck-stage width="1920" height="1080">`. Put speaker notes in `<script type="application/json" id="speaker-notes">` as one string per slide, with stage directions in (brackets).

**Deck arc** (from the reference): title → hook (the status quo) → its cost → one-sentence question → section → evidence (big stat, who needs it) → section → how it works → demos → code → what broke → get started → resources (QR) → the one sentence → thank you.

## After building a deck
- Link it from `index.html` and add it to `README.md`.
- Check it in a browser at 1920×1080. Nothing may overflow the canvas, because slides use `overflow: hidden` and clipped text won't show any error.
