# Sabin Baral — Research & Engineering Portfolio

Version 4 of the local experimental redesign of [sabinbaral.dev](https://sabinbaral.dev). The Version 3 hero, typography, publications, expertise, contact section, footer, and six-palette Theme Lab are preserved.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. No package installation or build step is required. The separate `react-app/` project is untouched.

Editorial Copper is the default palette for new visitors in both light and dark appearance. Existing saved palette choices are retained. Light / Dark / System controls and the other five experimental palettes remain available using the palette icon beside the sun/moon button. If your preview retains a previous palette, choose Editorial Copper in Theme Lab; changing the default does not erase preferences.

## Project hierarchy

Featured cards retain the large alternating layout:

1. High-Throughput Block Copolymer Thin-Film Fabrication and Characterization — text left, image right.
2. CMS Inner Tracker Upgrade: Bare Module Testing & Automation — image left, text right.
3. Real-World Problem Solving Through 3D Printing — text left, image right.

More Projects contains three compact cards: Autonomous Lab, VeriScript, and Organic Solar Cells. All six original detail dialogs, research information, project links, and applicable media remain available. Image expansion and Explore Project remain separate actions. The image area is a native button with an accessible name and a subtle expand icon; there are no nested interactive controls.

## 3D-printing gallery

The authoritative CSV was found at:

```text
/home/sabin/Downloads/portfolio-design-images-renamed/portfolio-design-images/image-index.csv
```

A byte-preserving copy is stored at `assets/projects/3d_printing/image-index.csv`. All 20 unique entries were found under their `portfolio_filename` names. There are no missing or duplicate entries. The gallery's titles, categories, filenames, and ordering are generated from that CSV into `assets/projects/3d_printing/gallery.json`.

| Category | Images |
| --- | ---: |
| Instrumentation & Automation | 8 |
| X-Ray Sample Holders | 3 |
| Robotic Liquid Handling | 3 |
| 3D-Printed Labware | 3 |
| Thin-Film Sample Handling | 2 |
| Robotics Prototypes | 1 |
| Total | 20 |

The featured image is `automated-four-point-probe-motorized-mount.jpg`, titled **Automated Four-Point Probe and Motorized Stage Mount**. It was selected after inspecting the candidate photographs because the printed fixture is prominent and shown installed on the actual instrument.

Explore Project opens the gallery inside the existing 3D-printing dialog. Filters show the exact category counts. The image viewer displays the original image, CSV title, category, and position within the selected category. It supports previous/next navigation, arrow keys, Escape, focus restoration, and an original-resolution link. Single-image categories omit inactive navigation controls.

Responsive WebP previews are generated at 360 and up to 720 pixels wide, with an additional 1200-pixel featured preview. The 41 generated previews total about 1.1 MB. Smaller originals are not upscaled. Images retain their aspect ratio, use `object-fit: contain`, explicit dimensions, and lazy loading. Gallery metadata is fetched when needed; full-resolution gallery images load only when requested. Supplied source files are not overwritten during optimization.

To regenerate metadata and previews after editing the CSV or supplying images:

```bash
python3 scripts/build-printing-gallery.py
```

The generator uses Python's standard library and the existing ImageMagick `identify` and `convert` commands. These tools are only needed to regenerate assets; the website has no new package or runtime dependency.

## Bug fixes and content accuracy

The Argonne PNG contains a two-pixel gray strip at its extreme left edge, separate from the wordmark. The image file is unchanged. A dedicated CSS rule sizes its box to the original aspect ratio and clips one rendered pixel from that outer edge; the legitimate branding remains intact. The other institution assets are unchanged.

The inherited description of sample capacity said 100 samples replacing 20 was a 500% increase. This was corrected to a **400% increase** while preserving the original sample counts.

The block-copolymer 40% metric remains **characterization-time reduction**, matching the explicit detailed text in the original repository. The new brief refers to throughput; confirm if fabrication throughput was intended instead. The 75% detector-testing efficiency increase and 15% solar-cell efficiency improvement are also preserved from the original cards, but their baseline and calculation still need clarification.

The two publication cards and ACS Spring 2027 conference information are unchanged. The SAXS-guided manuscript retains only the approved title, authors, Submission in progress status, and short summary. No full abstract, unpublished quantitative results, manuscript file, or manuscript link was introduced.

## Verification

The buildless HTML/CSS/JavaScript site needs no compilation step. JavaScript syntax, CSS parsing, HTML attributes/IDs, local paths, CSV/JSON parity, and the staged whitespace check pass. The supplied CSV retains its original CRLF line endings, so that check uses `git -c core.whitespace=cr-at-eol diff --cached --check`.

A local headless Chrome run passed **233 browser checks** with no JavaScript exceptions or failed local requests. It covered Copper light/dark at 320, 375, 768, 1280, 1440, and 1920 pixels; saved preferences and OS appearance changes; responsive project/gallery layouts; all six project dialogs and main image actions; all 20 gallery originals; category filtering and navigation; keyboard focus trapping/restoration; mobile navigation; Theme Lab; résumé, DOI, navigation, and social destinations; and reduced motion. Corrected gallery renders were visually reviewed at desktop, tablet, and narrow mobile sizes. Across all 12 palette/appearance combinations, 3,456 sampled text contrast checks produced no failures; the lowest sampled ratio was 4.60:1. This is targeted verification, not a formal accessibility certification.

The 20 supplied image binaries and updated résumé match their pre-edit backup. The CSV copy matches the supplied CSV byte for byte, the Argonne PNG is unchanged, and publication/conference content matches Version 3. No unpublished manuscript content was added.

Remote checks returned HTTP 200 for GitHub, Google Scholar, project repositories, and research-group links. LinkedIn returned 999; ACS (after DOI redirect), Thingiverse, and CMS returned 403. These four destinations remain unchanged because automated access was denied; their live page contents could not be verified in this run.

The contact form retains the existing Formspree endpoint. Validation and response feedback are tested with simulated responses; no test message is sent, so actual email delivery remains unverified. Existing public link destinations are retained; automated remote availability checks may be limited by access controls or anti-bot responses.

## Git safety and recoverable versions

All work remains on `experiment/portfolio-redesign`. Nothing was pushed, merged, published, or deployed. The production branch, `CNAME`, DNS, and deployment settings were not changed.

The working tree initially contained 20 supplied gallery images, 11 removed legacy filenames, and an updated résumé. Their pre-edit state was preserved in `/tmp/portfolio-v4-user-assets-2026-11-09`. With explicit approval, the gallery assets, intentional renames/replacements, and updated résumé are included in the Version 4 local checkpoint. Earlier filenames and source files remain recoverable in Version 3. The supplied images in Downloads are untouched.

| Version | Local checkpoint |
| --- | --- |
| Original | `main` and `portfolio-before-redesign-2026-11-08` at `8fe4462` |
| Version 1 | `portfolio-redesign-v1` at `dc8366b` |
| Version 2 | `portfolio-redesign-v2` at `4334e3b` |
| Version 3 | `portfolio-redesign-v3` at `c5de0cd` |
| Before Version 4 | `portfolio-redesign-v3-before-v4-2026-11-09` at `c5de0cd` |
| Version 4 | `portfolio-redesign-v4` and `experiment/portfolio-redesign` |

After preserving any future uncommitted edits:

```bash
# Return to the original website
git switch main

# Inspect a prior version without changing its checkpoint
git switch --detach portfolio-redesign-v3

# Return to Version 4
git switch experiment/portfolio-redesign
```

Do not discard uncommitted changes automatically. Publication requires explicit approval before merging or pushing.
