# Technical Documentation

## Overview

This portfolio is a dependency-free static website built with semantic HTML5 and CSS3. It includes an introduction, selected projects, external contact links, and a frontend-only contact form. JavaScript is not required for the current version.

## Run Locally

Clone the repository and open the project folder:

```bash
git clone <repository-url>
cd 202337790-SanaAmmar-assignment1
```

Open `index.html` directly in a browser, or run a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

No package installation or build command is needed. The page loads the Inter font from Google Fonts and uses system fallbacks when offline.

## Structure

```text
index.html       Page content and semantic structure
css/styles.css   Typography, layout, responsive styles, and form styling
js/script.js     Reserved for future client-side behavior
assets/          Website assets
docs/assets/     Project documentation
```

