# Sabin Baral — Research & Engineering Portfolio

Version 3 of the local experimental redesign of [sabinbaral.dev](https://sabinbaral.dev). It preserves Version 2's personal hero, six alternating project cards, four expertise categories, institutional logos, contact layout, and original project detail content.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. No installation or build step is required. The static site uses `index.html`, `style.css`, `themes.css`, `theme.js`, `script.js`, and `assets/`. The separate `react-app/` project remains untouched.

## Theme Lab

Click the palette icon beside the light/dark button in the header. Choose **Light**, **Dark**, or **System**, then select a palette:

1. Midnight Research
2. Editorial Copper
3. Mineral Green
4. Quantum Violet
5. Burgundy Volt
6. Coral Signal

All six have light and dark variants. The selector edits the palette for the currently active appearance. For example, choose Light + Mineral Green, then Dark + Quantum Violet; each is remembered independently. System follows the operating system and uses the corresponding saved palette. The existing sun/moon button remains a quick appearance toggle.

Native radio controls support arrow keys; Escape closes the panel and returns focus. Preferences are stored locally under `portfolio-theme-preferences`. `theme.js` initializes the saved appearance and palette before styles load, including migration from the earlier theme preference. Palette colors and semantic supporting colors live in `themes.css`; components consume those tokens.

## Research updates

- Two prominent publication cards appear side by side on desktop and stack on smaller screens.
- The new SAXS-guided active learning manuscript displays only its approved title, author list, **Submission in progress** status, and approved short summary. Sabin Baral is emphasized in the author list. There is no abstract, manuscript file, invented journal, DOI, submission date, or unpublished download/link in the entry or its source.
- ACS Spring 2027 replaces the old Fall 2026 conference record. The formal submitted title, New Orleans location, March 21–25 dates, POLY division, and poster type are shown with **Abstract submitted** status. Acceptance or presentation is not claimed.
- The original ACS Nano citation, authors, and DOI link remain intact.
- The original institution logos retain their proportions in more compact containers.

## Social links and images

Each social profile is one anchor containing its icon and a label directly below it. Hero and contact groups use evenly sized items with the existing verified URLs.

The Autonomous Lab card now uses the existing spectrometer and measurement setup photograph, distinguishing it from the block-copolymer robot and wafer-handling figure. Its new WebP preview is approximately 113 KB; the original remains untouched. A dedicated GIWAXS/GISAXS or AFM morphology figure would further strengthen the block-copolymer presentation if supplied later.

Every main project image opens its original full-resolution asset in the existing lightweight viewer. Images retain their full composition, with keyboard dismissal and focus restoration. Existing project dialogs, galleries, videos, résumé, and repository links remain available. Only legacy inline color declarations were updated to shared tokens; detailed project text and media were preserved.

## Verification

The static site has no build command. Both JavaScript files, inline handlers, and both CSS files parse successfully. Asset references, gallery paths, image labels, IDs, anchors, manuscript fields, and conference status were checked.

Isolated headless Chrome passed **512 checks** across all twelve palette/appearance combinations and widths of 320, 375, 768, 1280, 1440, and 1920 pixels. Coverage includes the Theme Lab, native radio keyboard controls, independent preference persistence, operating system changes, navigation, project stacking, image enlargement, nested galleries, dialog focus, contact validation, simulated form responses, and reduced motion. No horizontal overflow, JavaScript runtime errors, or failed local asset requests were observed. Twelve additional checks verified the image-caption focus indicator across all variants.

The contrast audit checked 2,328 visible text samples across the twelve combinations, including form feedback and Theme Lab controls, plus project dialog colors. No failures remained after adjusting five legacy labels in Coral Signal light mode. The lowest main-page text ratio measured was 4.6:1. Form boundaries, hover surfaces, and focus tokens also met the tested thresholds. This is targeted automated and visual verification, not a complete accessibility certification.

Representative desktop and mobile screenshots were captured and inspected, with palette contact sheets used to compare all twelve combinations. The two publication cards, compact facility logos, new instrumentation photo, and small-screen Theme Lab were reviewed.

The form retains `https://formspree.io/f/xqarlrdl`. Success and failure behavior use simulated responses during testing; no real message was sent, so actual email delivery remains unverified. No package dependency or backend was added.

## Content requiring clarification

The project metrics were checked against the original repository. The 40% reduction remains **characterization time**, as explicitly stated in the detailed source. The 75% testing efficiency increase and 15% solar-cell efficiency improvement are preserved from the original project cards, but their baseline and calculation are not documented. Confirm those definitions before publication. The manuscript and conference statuses should only be advanced after a confirmed submission or acceptance.

## Recoverable Git versions

All changes remain on `experiment/portfolio-redesign`. Nothing was pushed, merged, or deployed. `main`, `CNAME`, DNS, and hosting settings were not changed.

| Version | Local checkpoint |
| --- | --- |
| Original | `main` and `portfolio-before-redesign-2026-11-08` at `8fe4462` |
| First redesign | Annotated `portfolio-redesign-v1` at `dc8366b` |
| Second redesign | Annotated `portfolio-redesign-v2` at `4334e3b` |
| Version 2 before this work | Annotated `portfolio-redesign-v2-before-v3-2026-11-08` at `4334e3b` |
| Third iteration | Annotated `portfolio-redesign-v3` and `experiment/portfolio-redesign` |

After preserving any future uncommitted edits, use:

```bash
# Return to the original website
git switch main

# Inspect an earlier redesign without modifying its checkpoint
git switch --detach portfolio-redesign-v1
git switch --detach portfolio-redesign-v2

# Return to the Version 3 experiment
git switch experiment/portfolio-redesign
```

Do not discard uncommitted changes automatically. Publication requires explicit approval before a merge or push.
