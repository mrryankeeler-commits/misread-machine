# Story Psychology Machine

An interactive thought-tool for story psychology, curiosity gaps, and trust-building hooks.

## Stack

- Plain HTML/CSS/JavaScript
- Static JSON content files
- GitHub Pages-friendly (`/docs`)

## Edit content without changing code

All editable content lives in `docs/content`:

- `sections.json`: Hero copy, premise, principles, closing CTA text.
- `examples.json`: Storytelling examples (cliffhangers, curiosity gaps, and hook rewrites).

## Local preview

Serve the repository root with any static server and open `/docs`.
For example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/docs/`.

## Cloudflare preview (beginner walkthrough, GitHub-only)

If you are editing in GitHub's web UI (no local coding setup), use this flow:

1. **Create a Cloudflare account** at https://dash.cloudflare.com/ (free is fine).
2. Open **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Pick **GitHub**, approve access, and select your repository.
4. In build settings, use:
   - **Framework preset:** `None`
   - **Build command:** leave blank
   - **Build output directory:** `docs`
5. Click **Save and Deploy**.
6. Wait for deployment to finish, then open your site at `https://<project-name>.pages.dev`.

### How to preview updates from GitHub

1. In GitHub, edit files (for this project, most copy is in `docs/content/*.json`).
2. Commit changes to a new branch.
3. Open a pull request.
4. In Cloudflare Pages, open your project → **Deployments**.
5. Click the newest **Preview** deployment tied to your branch/PR.
6. Share that preview URL for feedback before merging.

After merge to your production branch, Cloudflare automatically publishes the live version.
