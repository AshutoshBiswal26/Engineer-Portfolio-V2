# Ashutosh Biswal — Engineer Portfolio

A personal portfolio site for Ashutosh Biswal, Software Engineer specializing in AI/ML, AWS, and cloud-native solutions. Built as a static site with a dark, technical "neural slate" aesthetic and interactive 3D visualizations.

## Live Sections

- **Hero** — Introduction with a typing animation cycling through roles (Software Engineer, AI/ML Developer, Cloud Architect, Problem Solver), a code-snippet visual, and a Three.js floating 3D node network background.
- **About** — Background summary and quick stats (major projects, AWS services, specialization, architecture style).
- **Tech Stack** — Skills grouped by category: Languages & Frameworks, AI/ML, AWS Services, Data & CMS.
- **Lab (Engineering Intelligence)** — An interactive sandbox with two tabs:
  - **Neural Network**: A live Three.js feedforward network visualization with node activation pulses, plus hyperparameter sliders (Learning Rate, Dropout, Epochs, Optimizer) and a "Run Inference" trigger.
  - **Transformer Architecture**: A Three.js self-attention visualization across token embeddings, with controls for Attention Heads, Embedding Dimension, Block Depth, and Activation Function.
- **Featured Projects**:
  - Legacy Healing — Healthcare Automation Platform (AWS serverless pipelines, Bedrock-powered call transcript analysis)
  - AI Project Estimation System using AWS Bedrock — Automated project effort/cost estimation via Bedrock Nova 2 Lite
  - Redmine AI Support Copilot — GenAI ticket triage, semantic RAG, and workflow automation
  - All My Sons — CNN-based damage claims image analysis
  - Edubot — AI learning assistant chatbot
- **Contact** — A contact form (submits via Formspree) alongside direct contact info and social links (GitHub, LinkedIn, Kaggle, X).
- **Resume** — A modal that previews the resume PDF inline and offers a direct download.

## Tech Stack

- HTML5, CSS3 (custom properties, no framework)
- Vanilla JavaScript (no build step required)
- [Three.js](https://threejs.org/) (r128, via CDN) for 3D visualizations
- [Font Awesome](https://fontawesome.com/) for icons
- Google Fonts: Inter (body) and Fira Code (monospace/technical accents)
- [Formspree](https://formspree.io/) for contact form submissions (free tier, no backend required)

## Project Structure

```
Engineer-portfolio/
├── index.html      # All page markup and sections
├── styles.css      # All styling, theming, and responsive layout
├── script.js       # Animations, Three.js scenes, form handling, interactivity
├── assets/         # Static assets (e.g. resume PDF)
└── README.md
```

## Running Locally

No build tools or dependencies required. Just open `index.html` directly in a browser, or serve it with any static file server:

```bash
# Option 1: open directly
start index.html   # Windows
open index.html     # macOS

# Option 2: serve locally (e.g. with Python)
python -m http.server 8000
```

## Setup Notes

- **Resume**: Resume PDF is stored at `assets/Ashutosh_Biswal_AI_Engineer.pdf` and served in the resume modal.
- **Contact form**: Replace `YOUR_FORM_ID` in `script.js` with your own [Formspree](https://formspree.io/) form ID to receive submissions.

## Deployment

This is a static site — it can be deployed as-is to GitHub Pages, Netlify, Vercel, or any static hosting provider with no build step.
