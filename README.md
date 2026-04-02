# The Misread Machine

An interactive thought-tool about expertise, trust, and how strong work gets misread online.

## Stack

- Plain HTML/CSS/JavaScript
- Static JSON content files
- GitHub Pages-friendly (`/docs`)

## Edit content without changing code

All editable content lives in `docs/content`:

- `sections.json`: Hero copy, premise, principles, closing CTA text.
- `examples.json`: Comparison examples, before/after rewrites, playground presets.
- `signals.json`: Trust signal labels and slider definitions.

## Local preview

Serve the repository root with any static server and open `/docs`.
For example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/docs/`.
