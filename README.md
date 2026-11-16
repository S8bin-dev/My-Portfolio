# Sabin Baral — Research & Engineering Portfolio

Final responsive polish of the local experimental redesign of [sabinbaral.dev](https://sabinbaral.dev), built on Version 4. The Editorial Copper identity, approved main-page copy, project hierarchy, publications, expertise, and contact information are preserved, with two metric labels corrected against the supplied résumé.

## Latest updates — November 15, 2026

- Light mode is the default for new visitors; returning visitors retain their saved appearance choice.
- Three publication/manuscript cards and the ACS presentation share an equal-sized two-by-two grid, stacking on smaller screens.
- The Polymer Morphology manuscript includes the approved short summary, September 2026 record counts, and database link. The SAXS-guided manuscript summary and block-copolymer project workflow use the supplied updated text.
- Scientific Characterization includes SAXS, WAXS, NMR, IR, and DMA, grouped with related methods. The updated résumé is included.
- Current checks cover theme defaults and saved preferences, JavaScript syntax, CSS parsing, publication structure/content preservation, and local asset delivery. Browser visual inspection was unavailable for these follow-up edits; the browser counts below describe the earlier final-polish checkpoint.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. This is a buildless HTML/CSS/JavaScript site: no package installation or compilation is required. The unrelated `react-app/` project is untouched.

## Files changed

| File | Purpose |
| --- | --- |
| `index.html` | Landing wrapper and mobile reading order; remove Theme Lab; contact inside main; consistent modal headers; native image buttons; optimized detail previews; résumé-supported metric wording |
| `style.css` | Viewport-aware landing, responsive layouts, touch targets, one scrolling surface per modal, reusable detail styles, image-viewer readability |
| `theme.js` | Copper-only appearance toggle, light default, saved manual preference, legacy-storage migration |
| `themes.css` | Only Editorial Copper light/dark tokens; stronger dark card borders; remove unused palette configurations and aliases |
| `script.js` | Mobile navigation dismissal, explicit triggering-control focus restoration, fixed-body scroll lock, video pause on modal close |
| `README.md` | Current behavior, verification, content-review notes, preview, and recovery instructions |

No supplied image, video, résumé, CSV, generated gallery data, or image-generator file was modified in this polish pass. No dependency was added.

## Responsive landing and navigation

Above 920 CSS pixels, `.landing` groups the hero and research-philosophy strip in a two-row grid. Its minimum height is `calc(100svh - var(--header-height))`, with a `vh` fallback. The hero takes the remaining space and centers its contents; the philosophy strip stays at the bottom. Research starts below the first viewport. Intrinsic content height can exceed that minimum, so short screens scroll naturally instead of clipping. Height-aware padding reduces excess space on shorter desktop viewports. The existing 1240-pixel content limit keeps line lengths comfortable on large monitors.

At 920 pixels and below, the landing minimum height is removed. The hero reads as introduction/name, headline, complete description, proportional portrait, actions, and social cards. Phones scroll naturally. The portrait and spacing use fluid sizing; phone action buttons form a balanced grid and social cards retain their icon-and-label design.

The mobile hamburger opens a disclosure below the header. Links have at least 48-pixel height; the hamburger and theme toggle are 44 pixels. The disclosure has a dynamic-viewport height limit and can scroll on short landscape screens. It closes after selecting a section, outside interaction, theme-toggle use, keyboard focus leaving the header, Escape, or return to desktop width. Escape restores focus to the hamburger. Anchor scroll padding keeps section headings below the sticky navigation.

## Project cards and detail dialogs

Featured order remains Block Copolymer, CMS Tracker, and 3D Printing, with the existing alternating desktop layout. At 760 pixels and below, each image appears above its description. Scientific figures use `object-fit: contain`; tags and metadata wrap naturally.

More Projects remains Autonomous Lab, VeriScript, and Organic Solar Cells. The grid uses three columns above 1100 pixels, two columns down to 681 pixels, and one column on phones. Card heights follow their content. Publication cards, conference metadata, institution logos, expertise cards, and contact form adapt to narrower widths without hiding essential text. Publication authors and project body copy remain readable at approximately 16 pixels or more.

Each detail dialog has a sticky title/close header and a single vertically scrolling content panel. The outer overlay does not scroll, avoiding the old nested-scroll behavior. The content panel uses dynamic viewport height, narrow phone margins, and contained overscroll. Closing restores the invoking control and page scroll position. The fixed-body lock also handles the background when an image viewer opens over a project dialog. Videos pause when the project dialog closes.

Repeated inline styles were replaced with resource-grid, workflow-step, video-frame, section-heading, and media-caption classes. Existing gallery image actions are native buttons. Detail figures use existing optimized previews and open their original-resolution source on request. All four videos retain their original sources and use `preload="none"`.

## Gallery and image viewer

The authoritative CSV copy remains `assets/projects/3d_printing/image-index.csv`, originally supplied at:

```text
/home/sabin/Downloads/portfolio-design-images-renamed/portfolio-design-images/image-index.csv
```

All 20 images remain integrated, with no missing entries. Titles, categories, ordering, filenames, counts, and original-resolution references remain generated from the CSV in `gallery.json`.

| Category | Images |
| --- | ---: |
| Instrumentation & Automation | 8 |
| X-Ray Sample Holders | 3 |
| Robotic Liquid Handling | 3 |
| 3D-Printed Labware | 3 |
| Thin-Film Sample Handling | 2 |
| Robotics Prototypes | 1 |

Filters wrap on larger screens and scroll horizontally on phones. Each has a minimum 44-pixel height, and keyboard focus scrolls the selected control into view. The gallery uses three, two, or one columns as space allows. Portrait and landscape images retain their proportions.

The viewer supports Escape, previous/next and arrow keys within the filtered category, keyboard focus trapping/restoration, CSV captions, categories, and an original-resolution link. Touch controls and the original-image link remain visible in phone portrait and landscape. A darker viewer overlay reduces competing background text. Browser pinch zoom remains enabled.

Version 4's selected main photograph, `automated-four-point-probe-motorized-mount.jpg`, and 41 WebP previews totaling about 1.1 MB are preserved. Full originals load on request. To regenerate gallery data/previews, use `python3 scripts/build-printing-gallery.py` with the existing ImageMagick tools; regeneration was unnecessary for this pass.

## Copper-only appearance

Only Editorial Copper light and dark remain. Theme Lab, its header icon, the other five palettes, palette swatches, and palette-switching logic are removed.

First-time visitors start in light mode, regardless of their device's color scheme. The sun/moon button saves a manual light/dark selection under `portfolio-appearance`. A saved selection takes precedence on future visits. Existing Version 4 and older appearance choices migrate; an explicitly saved system preference continues to follow `prefers-color-scheme`. Obsolete `portfolio-theme-preferences`, `portfolio-theme`, and `darkMode` keys are removed. Saved palette names cannot affect the new site. Malformed or inaccessible storage does not disable appearance switching. Appearance is applied before styles load.

## Accessibility and compatibility

Contact is now inside the main landmark, and the keyboard skip link focuses that landmark. All six dialogs have consistent heading/close structure. Native image buttons, descriptive labels, visible focus rings, focus restoration, inert backgrounds, and reduced-motion support are retained or improved. Inputs use 16-pixel text to avoid small-input autozoom on phones. Important controls and inline-looking resource links have comfortable touch areas. No zoom-disabling viewport setting was added.

The implementation uses `svh` for the desktop minimum landing height, `dvh` for modal limits, safe-area padding, and `vh` fallbacks. WebKit documents [viewport-unit support](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/) and [inert support](https://webkit.org/blog/12669/new-webkit-features-in-safari-15-5/). These compatibility checks do not replace real Safari testing. This environment provides Chrome and Firefox; iPhone Safari, physical Android/Firefox devices, virtual-keyboard behavior, notches, and live address-bar transitions remain unverified on hardware.

## Verification

- **644 Chrome checks passed** with no JavaScript exceptions or failed local resource requests.
- **103 Firefox 156 checks passed** for responsive landing, all six dialogs, filters, nested image viewer, and mobile navigation.
- **19 targeted checks passed**, including actual playback of all four videos, pausing on modal close, keyboard skip navigation, compact scrollable filters, and mobile/landscape image-viewer actions.
- **2,541 sampled text-contrast checks** across the page/gallery and five other dialogs in both appearances had no failures; the lowest sampled ratio was **4.91:1**. Control, hover, and focus-token checks also passed. This is targeted QA, not a formal accessibility certification.
- JavaScript syntax, CSS parsing/custom-property references, HTML attributes/IDs/alt text, local assets, anchor targets, publication/privacy preservation, gallery data preservation, and `git diff --check` pass.

Chrome responsive checks ran in both themes at:

| Context | Viewport |
| --- | --- |
| Small mobile | 320 × 640 |
| iPhone-sized mobile | 375 × 667 |
| Modern smartphone | 390 × 844 |
| Large smartphone | 430 × 932 |
| Tablet portrait | 768 × 1024 |
| Tablet landscape | 1024 × 768 |
| Laptop | 1366 × 768 |
| External monitor | 1654 × 928 |
| Desktop | 1920 × 1080 |
| Large monitor | 2560 × 1440 |
| Phone landscape | 667 × 375 and 844 × 390 |
| Short desktop | 1280 × 500 |

The phone tests used Chrome touch emulation. Firefox supplied an independent desktop-engine check at narrow, tablet, monitor, and landscape sizes. Desktop reflow was also tested at CSS viewport dimensions corresponding to 100%, 125%, and 150% zoom on 1366 × 768 and 1654 × 928 displays; this is **zoom-equivalent layout testing**, not verification of native browser zoom controls. Desktop, mobile, tablet, dialog, and gallery screenshots were visually inspected.

The contact form retains the existing Formspree backend. Browser validation and accepted/rejected response handling pass simulated checks; no test message was sent. Actual email delivery remains unverified. Public link destinations are unchanged. Version 4's remote checks found LinkedIn (999), ACS, Thingiverse, and CMS (403) denied automated access; those destinations require normal-browser review. Other checked public destinations returned 200 in that run.

Local QA artifacts are in `/tmp/portfolio-final-qa`, `/tmp/portfolio-final-firefox`, and `/tmp/portfolio-final-media`; temporary directories are not durable Git checkpoints.

## Content review and remaining confirmation

The supplied, updated résumé states that fabricating and AFM-characterizing 1,000+ block-copolymer samples improved **throughput by 40%**. It separately states that the CMS testing GUI reduced **setup time by 75%**. These more direct source statements replace the inherited website's characterization-time and generic efficiency labels in the cards and relevant detail text. The résumé PDF itself was not edited.

The following inherited statements are flagged for review rather than silently rewritten:

- Autonomous Lab's full-loop integration remains described as ongoing; confirm that status before publication.
- The solar project's 15% efficiency-improvement baseline/calculation, and VeriScript's review-time/cost figures, are inherited project claims without further supporting measurements in this checkout.
- Some original 3D-printing application text uses absolute language about human error, repeatability, airflow, and sterility; confirm the scope of those claims. The résumé lists a RoboSoccer tournament win, but does not establish causation by a particular attachment.
- The résumé still says 500% storage-capacity increase; the website preserves Version 4's arithmetic correction: 100 samples replacing 20 is **400% more capacity**, or five times the original capacity. Confirm whether the résumé refers to the same fixture.

The ACS Nano citation and ACS Spring 2027 conference content are preserved. The submission-in-progress manuscripts use the approved short summaries, including the Polymer Morphology audit counts and database link; no full unpublished abstract or manuscript file was added. Confirm publication/conference statuses again when authorizing eventual publication.

## Git safety and recovery

This version is maintained on `experiment/portfolio-redesign`; approved GitHub pushes target the same branch. The Creative Lab experiment remains separate on `experiment/creative-lab`. `main`, `CNAME`, DNS, and deployment settings are unchanged, and website deployment requires separate authorization.

| Version | Recoverable local checkpoint |
| --- | --- |
| Original | `main` and `portfolio-before-redesign-2026-11-08` at `8fe4462` |
| Version 1 | `portfolio-redesign-v1` at `dc8366b` |
| Version 2 | `portfolio-redesign-v2` at `4334e3b` |
| Version 3 | `portfolio-redesign-v3` at `c5de0cd` |
| Version 4 | `portfolio-redesign-v4` at `572fca4` |
| Before final polish | `portfolio-redesign-v4-before-final-polish-2026-11-09` at `572fca4` |
| Final polish | `portfolio-final-polish-2026-11-09` and `experiment/portfolio-redesign` |

The working tree was clean before the original final-polish pass. No existing tag was overwritten. The approved Version 4 gallery assets, renames/replacements, and résumé remain in its checkpoint; earlier filenames remain recoverable in Version 3. Subsequent approved content, layout, appearance, and résumé updates are recorded on the same polished branch.

After preserving any future uncommitted work:

```bash
# Inspect Version 4 without changing its checkpoint
git switch --detach portfolio-redesign-v4

# Return to final polish
git switch experiment/portfolio-redesign

# Return to the original website
git switch main
```

Do not discard future uncommitted changes automatically. Publication still requires explicit approval.
