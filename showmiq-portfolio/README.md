# Showmiq Islam Utshow — Portfolio Site

A static site built from your MSJ4299 Portfolio Report, designed to read
like a press dossier: a sticky nav, a "press pass" hero, and your 14
projects as filterable case-file cards you can click into for the full
description and self-reflection.

## Files

- `index.html` — page structure and content
- `styles.css` — all styling (design tokens at the top of the file)
- `projects-data.js` — your 14 projects as structured data (edit this to change project content)
- `script.js` — filtering, modal, mobile nav, scroll-reveal behavior
- `pdfs/project-01.pdf` … `pdfs/project-14.pdf` — each project's original pages, split out of your full Portfolio Report so visitors can open just that one project instead of the whole 163-page PDF. Every card and modal links to its matching file via `View original PDF`.

No build step, no dependencies — it's plain HTML/CSS/JS, so it works as-is on GitHub Pages.

## Publish it on GitHub Pages

1. **Create a repository** on GitHub (e.g. `showmiq-portfolio`). Make it public.
2. **Upload the site** — `index.html`, `styles.css`, `projects-data.js`, `script.js`, `README.md`, and the whole `pdfs/` folder — to the root of the repo. Either drag-and-drop everything in the GitHub web UI ("Add file → Upload files", which supports folders) or via git:
   ```bash
   git init
   git add index.html styles.css projects-data.js script.js README.md pdfs
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
   Note: the `pdfs/` folder is around 15 MB total, well under GitHub's limits, but it does make the repo noticeably heavier — that's expected.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. GitHub will publish the site at:
   `https://<your-username>.github.io/<repo-name>/`
   (takes a minute or two the first time).

## Making changes later

- **Edit project text** → open `projects-data.js`, each project is a plain object (title, description, justification, tags, etc).
- **Edit colors/fonts** → open `styles.css`, the `:root` block at the top holds every color and font variable.
- **Point your own domain (showmiq.me) at it** → add a `CNAME` file containing just your domain, and set the A/CNAME records with your domain registrar per GitHub's custom domain docs.

## Notes

- Content (project descriptions, objectives, self-reflection quote, contact info) was pulled from your submitted Portfolio Report PDF. Double-check the contact details in `index.html` (email/phone in the Contact section) before publishing, since a public site will show them to anyone.
- Consider swapping the phone number for something you're comfortable listing publicly, or removing it, before you push this live.
