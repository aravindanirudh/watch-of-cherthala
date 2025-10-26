# Watch of Cherthala - KSRTC Bus Timings for Cherthala
- A small static website that provides KSRTC bus timetables and stand contact numbers for Cherthala. The site is a lightweight, mobile-friendly/responsive HTML/CSS/JavaScript project intended to be hosted as a static site (deployed to Firebase in the original project)
- Website created under the initiative of Holy Family HSS, Muttom and NSS SFU 12
- One of my first major projects for public usage
- For live demo, check https://watchofcthla.web.app

---

## Table of contents
- [Project overview](#project-overview)  
- [Features](#features)  
- [File structure](#file-structure)  
- [How it works / Implementation details](#how-it-works--implementation-details)  
  - [Timetable HTML and search/highlight](#timetable-html-and-searchhighlight)  
  - [Stand numbers list (cards) and search](#stand-numbers-list-cards-and-search)  
  - [Styling and responsive behavior](#styling-and-responsive-behavior)  
- [Run locally / Development](#run-locally--development)  
- [Contributing](#contributing)  
- [Deployment](#deployment)  
- [Attribution & Data sources](#attribution--data-sources)  
- [Contact](#contact)

---

## Project overview
This project displays KSRTC bus timetables and a searchable list of stand phone numbers for Cherthala. It is implemented as a static site with:
- Markup in [index.html](index.html)  
- Styling in [styles.css](styles.css)  
- Client logic in [script.js](script.js)  
- Stand data in [assets/ksrtc-numbers.json](assets/ksrtc-numbers.json)

The site emphasizes a simple UI and two search experiences:
- A table search that highlights matching text in timetable tables using the [`searchHighlight`](script.js) and [`clearHighlights`](script.js) functions
- A dynamic card-based stand phone search powered by DOM templating and a JSON fetch

---

## Features
- Static timetable cards with individual schedules for many routes (built directly in [index.html](index.html))
- Table "highlight" search - typed text will highlight matches in all `<td>` cells (`searchHighlight` and `clearHighlights` in [script.js](script.js))
- Stand numbers rendered from JSON with a template; live filtering of cards while typing (DOM template + `fetch('assets/ksrtc-numbers.json')` in [script.js](script.js))
- Mobile-first responsive CSS using grid/media queries ([styles.css](styles.css))
- All assets are in the directory `assets/` (icons and images)

---

## File structure
- [index.html](index.html) - main markup, timetable cards and UI scaffolding
- [styles.css](styles.css) - global styles, layout rules and responsive behavior 
- [script.js](script.js) - client-side JS handling: stand-number rendering and both search features. See symbols:
  - [`searchHighlight`](script.js) - highlights matching text in timetable table cells
  - [`clearHighlights`](script.js) - clears previous highlights
  - [`standCardTemplate`](script.js), [`standCardContainer`](script.js), [`searchStandInput`](script.js) - DOM handles for stand-cards rendering and filtering
- assets/
  - `bus-favicon.avif`, `bus-kerala.avif`, `nss-logo.avif`, `VytillaHubMain.avif` - images used by the site
  - [assets/ksrtc-numbers.json](assets/ksrtc-numbers.json) - JSON source for stand numbers

---

## How it works / Implementation details
### Timetable HTML and search/highlight
- Timetables are authored directly as HTML tables inside [index.html](index.html). Each card uses the `.ksrtc-card` structure with an inner `<table>` of trips
- The table search input has `id="text-to-search"` and calls the global function [`searchHighlight`](script.js) on `input`:
  - [`searchHighlight`](script.js) reads the input, normalizes to lower case, finds matching `<td>` content and wraps matches with `<mark class="highlight">...</mark>`
  - Before highlighting it calls [`clearHighlights`](script.js) to restore original text content for each cell
- Notes and caveats:
  - Do not use table `rowspan` in the timetable tables - the index.html contains a warning because rowspan may cause row/column alignment issues and may break the cell-based search logic
  - The highlight logic runs a RegExp replace using the raw typed string; it does not currently escape special RegExp characters. If you expect search terms containing regex metacharacters (e.g. `*`, `+`, `?`, `(`, `)`), filter/escape them before building the RegExp

Files: [index.html](index.html), [`searchHighlight`](script.js), [`clearHighlights`](script.js)

### Stand numbers list (cards) and search
- The stand numbers feature uses a template in [index.html](index.html):
  - Template element: `<template data-stand-template>` which contains the markup for each stand card
  - Container: element with `data-stand-cards-container`
- On load, [script.js](script.js) fetches [assets/ksrtc-numbers.json](assets/ksrtc-numbers.json):
  - It maps each JSON entry to a cloned template node and appends to the container
  - The variables in [script.js](script.js) are: [`standCardTemplate`](script.js), [`standCardContainer`](script.js), [`searchStandInput`](script.js)
- Filtering:
  - The `stand-search` input listens to `input` events and toggles `.hide` on each stand card depending on whether the typed query is present in either `area` or `phn` fields (case-insensitive)
- Data source: [assets/ksrtc-numbers.json](assets/ksrtc-numbers.json)

Files: [index.html](index.html), [script.js](script.js), [assets/ksrtc-numbers.json](assets/ksrtc-numbers.json)

### Styling and responsive behavior
- [styles.css](styles.css) contains:
  - Banner and navbar styles, fonts imported from Google Fonts
  - `.ksrtc-card`, `.ksrtc-time-wrapper` grid layout for timetable cards
  - `.stand-cards` grid for stand number cards and `.standInfo` card styles
  - `.table-search` input and `.highlight` mark styling for search highlighting
  - Media queries for phone/tablet widths to adjust layout and typography

File: [styles.css](styles.css)

---

## Run locally / Development
This is a static site - to preview locally, you can:
1. Open [index.html](index.html) directly in the browser (works for most features except some browsers may block `fetch()` for local files)
2. Recommended: serve a local static server to avoid CORS/file access issues
Example using Python 3:
```sh
python -m http.server 8000
# then open http://localhost:8000/index.html
```
Or use VS Code Live Server extension (right-click `index.html` → "Open with Live Server")
Files referenced: [index.html](index.html), [script.js](script.js), [styles.css](styles.css)

---

## Attribution & Data sources
- Timetable and stand-number data were provided by KSRTC Cherthala officials (see notes inside [index.html](index.html) for more attributions)
- Google Fonts imported in [styles.css](styles.css)
- Images used from `assets/` folder (icons and background art) - obtained from Google

---

## Contributing
- Open an issue describing the change or improvement
- For small fixes, submit a PR that:
  - Lints CSS and JS where applicable
  - Adds or updates the README if new behavior is introduced
- Keep the site static and as simple as possible (no backend required) unless introducing a warranted server-side feature

---

## Contact
Project author: [Aravind A Kamath](https://github.com/aravindanirudh)
