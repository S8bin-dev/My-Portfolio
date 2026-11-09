# Sabin Baral — Research & Engineering Portfolio

A local experimental redesign of [sabinbaral.dev](https://sabinbaral.dev), built with static HTML, CSS, and vanilla JavaScript. Version 2 refines the first redesign while preserving its alternating research card layout and original project details.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. No package installation or build step is required. `index.html`, `style.css`, `script.js`, and `assets/` form the static website. The separate `react-app/` project is untouched and is not needed for preview.

## Version 2 refinements

- A personal hero led by Sabin's name, a simple uncropped portrait, the original favicon branding, and recognizable social icons.
- All six projects use large alternating feature cards, with natural descriptions, documented outcomes, subtle technical tags, and consistent Explore Project actions.
- A compact research philosophy statement and ACS Nano highlight connect the hero to research.
- More readable publication information, a neutral conference record, and larger institution logos with their original proportions.
- Four expertise categories supported by the repository: scientific characterization, robotics and automation, engineering and design, and programming and data analysis. FTIR and Fusion 360 are not listed because the source does not substantiate them.
- A compact contact layout with labels, validation, pending state, inline failure feedback, and focused success feedback after an accepted response.

The six original project detail dialogs, figures, galleries, videos, repository links, publication DOI, résumé, and professional profile links remain available. The original project detail markup is unchanged from Version 1. Smaller WebP images serve the main page; original media remain in `assets/`.

## Verification

The static site has no build command. JavaScript, inline handlers, and CSS were parsed successfully. Local asset paths, gallery paths, IDs, anchors, and image alt attributes were checked.

Isolated headless Chrome passed 77 layout and interaction checks in light and dark themes at 375, 768, and 1440 pixels, plus four focused checks after the final tablet expertise refinement. Screenshots were visually inspected for the hero, projects, publications, institutional logos, expertise, and contact layouts. Checks covered horizontal overflow, alternating or stacked project layouts, navigation, dialog and gallery keyboard behavior, theme persistence, reduced motion, form validation, and simulated form success and failure. No JavaScript runtime errors or failed local asset requests were observed.

The form retains `https://formspree.io/f/xqarlrdl`. Its client behavior was tested with simulated responses; no real message was sent, so backend acceptance and email delivery remain unverified. No new service or dependency was added.

## Content requiring confirmation

- The repository listed an ACS Fall 2026 poster as upcoming in August 2026. The page now retains a neutral conference record without claiming that the poster was presented. Confirm participation and provide the final title, authors, and poster link if available.
- Project outcome numbers come from the original repository. The 40% reduction is described as **characterization time**, matching the detailed block copolymer project text.
- A current rectangular portrait, a photograph of Sabin with the autonomous setup, detector testing photos, and a confirmed conference poster image would strengthen future iterations. The current portrait and scientific figures retain their full composition.

## Recoverable Git versions

All work remains on `experiment/portfolio-redesign`. No changes were pushed, merged, or deployed; `main`, `CNAME`, and hosting configuration were not modified.

| Version | Local reference |
| --- | --- |
| Original website | `main` and `portfolio-before-redesign-2026-11-08` at `8fe4462` |
| First redesign | Annotated tag `portfolio-redesign-v1` at `dc8366b` |
| Second iteration | Annotated tag `portfolio-redesign-v2` and `experiment/portfolio-redesign` |

The checkpoints preserve the source files as well as the original assets. After preserving any future uncommitted edits, use:

```bash
# Return to the original website
git switch main

# Inspect Version 1 without modifying a branch
git switch --detach portfolio-redesign-v1

# Return to Version 2
git switch experiment/portfolio-redesign
```

Do not discard uncommitted changes automatically. Publication requires explicit approval before any merge or push. The existing `CNAME` points to `sabinbaral.dev`; no tracked GitHub Actions deployment workflow was changed.
