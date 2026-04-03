# The Story Psychology Machine

An interactive thought-tool about storytelling psychology, curiosity gaps, and how stronger narrative openings build trust.

## Stack

- Plain HTML/CSS/JavaScript
- Static JSON content files
- GitHub Pages-friendly (`/docs`)

## Edit content without changing code

All editable content lives in `docs/content`:

- `sections.json`: Hero copy, premise, principles, and closing CTA text.
- `examples.json`: Weak-vs-strong hook examples, bad-vs-better rewrites, and playground presets.
- `signals.json`: Story signal labels and slider definitions.

## Local preview

Serve the repository root with any static server and open `/docs`.
For example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/docs/`.
