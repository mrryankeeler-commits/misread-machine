# Story Psychology Machine

An interactive thought-tool for story psychology, curiosity gaps, and trust-building hooks.

## Stack

- Plain HTML/CSS/JavaScript
- Static JSON content files
- GitHub Pages-friendly (`/docs`)

## Edit content without changing code

All editable content lives in `docs/content`:

- `sections.json`: Hero copy, premise, principles, closing CTA text.
- `examples.json`: Storytelling examples (intent vs reaction, good vs weak hooks).
- `signals.json`: Slider labels and definitions for the interpretation playground.

## Local preview

Serve the repository root with any static server and open `/docs`.
For example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/docs/`.

## Cloudflare preview (no coding experience version)

If your code is on GitHub and you want a shareable preview URL from Cloudflare:

1. **Create a Cloudflare account** at https://dash.cloudflare.com/ (free plan is fine).
2. In Cloudflare, go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Choose **GitHub**, authorize Cloudflare, then select this repository.
4. Use these build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `docs`
5. Click **Save and Deploy**.
6. Cloudflare gives you a URL like `https://your-project.pages.dev`.
7. Any future push to GitHub auto-deploys a new preview.

### Optional: Preview before merging

If you open pull requests in GitHub, Cloudflare Pages can also create a preview link for each PR (if Preview deployments are enabled in project settings).
