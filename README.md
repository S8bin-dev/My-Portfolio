# Sabin Baral — Research & Engineering Portfolio

An experimental redesign of [sabinbaral.dev](https://sabinbaral.dev), built with static HTML, CSS, and vanilla JavaScript. It presents polymer research, laboratory automation, instrumentation, publications, skills, and contact information.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. No package installation or build step is required. `index.html`, `style.css`, `script.js`, and `assets/` are the deployed static site; `react-app/` is a separate, untouched project and is not needed for this preview.

The contact form retains its Formspree endpoint. A real submission requires network access and sends the entered message to that service; no test message was submitted during this redesign.

## Design and interactions

- Light and dark themes use system preference on first visit, honor the previous site's stored theme preference, and remember a manual choice in local storage.
- Six project summaries open the original detailed project content, including galleries, videos, and repository links.
- Main page images use smaller WebP derivatives in `assets/optimized/`; original scientific images remain in `assets/projects/` for project details and full fidelity.
- The contact form retains its existing Formspree endpoint and reports success or an inline error.
- Responsive navigation, keyboard focus, dialog focus handling, reduced motion support, and semantic headings are included.

## Content requiring review

The original page listed an ACS Fall 2026 poster as **upcoming** in August 2026. The redesign labels its status for verification because that date has passed. Confirm whether it was presented and provide the final poster title, authors, and link if available.

The page keeps the project dates, figures, and publication citation documented in the original repository. Please review those details before any publication of this branch.

Recommended media additions: a current high resolution portrait with a rectangular composition; a candid laboratory photograph showing Sabin with the autonomous setup; a close view of the polymer thin film workflow; a detector testing photograph; and a poster thumbnail or conference photograph if the presentation was completed. The current scientific figures stay uncropped in the project cards.

## Git safety

The original site is preserved on `main` at commit `8fe4462b12b1385113144ba86b693232d6edd58e` and in the local tag `portfolio-before-redesign-2026-11-08`. Redesign work is on `experiment/portfolio-redesign` only. No branch was pushed or deployed.

After committing any future local edits to the experiment branch, return to the original site with:

```bash
git switch main
```

Return to the experiment with:

```bash
git switch experiment/portfolio-redesign
```

If there are uncommitted changes, commit or otherwise preserve them before switching; do not discard them automatically. Publication requires explicit approval, followed by review, merge to the deployment branch, and push to the configured remote. The repository has a `CNAME` for `sabinbaral.dev` and no tracked GitHub Actions deployment workflow.
