# Portfolio: Naveen Vikram R

A personal portfolio site with no framework and no build step. It's plain HTML, CSS and JS, so it deploys anywhere static files can be served.

```
index.html          page shell (sections, header, command menu)
404.html            not-found page
assets/data.js      ← ALL content lives here: bio, projects, stack, links
assets/styles.css   design tokens (colors, type) + layout
assets/app.js       rendering + interactions
.github/workflows/deploy.yml   GitHub Pages deploy on push to main
```

## Edit content

Everything is in `assets/data.js`:

- `person.email`, `person.linkedin`, `person.resume`: fill these in. Contact buttons and the command-menu items appear automatically.
- `person.status`: the green status pill in the hero.
- `projects[]`: add a project object; `featured` picks the four large cards.
- Project `pushed` dates refresh live from the GitHub API in the visitor's browser (cached for 1 hour). If the API is unavailable, the baked-in dates are shown.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Features

- Expanded-width display type (Archivo) + minimal body sans (Geist), cobalt accent
- Light / dark theme (follows the OS, toggle persists)
- Animated hero name; about line set in `person.thesis` / `lede` / `shipped`
- Filterable, searchable project index with rows that open in place (deep-linkable: `/#p-handshake`)
- Command menu: `Ctrl/⌘ K` or `/`
- "Latest commit" from GitHub
- Writing section: baked posts + newest dev.to posts loaded live
- Respects `prefers-reduced-motion`; keyboard accessible; no trackers
