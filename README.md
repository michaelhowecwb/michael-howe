# 🚀 Michael Howe | Full-Stack Developer Portfolio

Welcome to the source code of my digital portfolio. 
Live at: [michael-howe.vercel.app](https://michael-howe.vercel.app/)

This project is more than just a resume; it's a demonstration of my approach to modern web development. It was architected with a relentless focus on **performance, memory management, SEO, and premium UX**, aiming for a flawless 100/100 Lighthouse score. 

Available for new global projects and international opportunities. 🌎

---

## ✨ Key Features & Architecture

As a detail-oriented developer, I built this project to showcase best practices in modern front-end engineering:

* **⚡ True SPA Experience with Astro 5:** Utilizes Astro's `<ClientRouter />` (View Transitions) for instant, fluid page navigations without full page reloads.
* **🌍 Native i18n (Bilingual):** Fully localized in English (EN) and Portuguese (PT-BR) with smart URL routing, synchronized layout states, and dynamic SEO metadata.
* **🌓 Adaptive Theme Engine:** "Star Wars Edition" Light/Dark mode toggle with dynamic CSS variables, LocalStorage memory, and bulletproof DOM syncing during SPA transitions to prevent CSS flickering.
* **🛡️ Anti-Spam & Memory-Safe:** The contact form uses a hidden "Honey Pot" technique to trap bots without relying on intrusive CAPTCHAs. All global JavaScript event listeners are tightly managed to prevent memory leaks during page swaps.
* **📝 Keystatic CMS Integration:** Content is decoupled from the code. The `about` and `works` sections are fully manageable via Keystatic, leveraging Astro Content Collections for type-safe data fetching.
* **🔍 Technical SEO:** Built-in JSON-LD Schema markup, structured `robots.txt`, and dynamic `<meta>` tags to ensure perfect indexing by search engines.

---

## 🛠️ Tech Stack

* **Framework:** [Astro](https://astro.build/) (Static Site Generation + View Transitions)
* **UI/Components:** [React](https://reactjs.org/) (for complex interactive bits) & Astro Components
* **Language:** TypeScript (Strict Mode)
* **CMS:** [Keystatic](https://keystatic.com/)
* **Styling:** Modern Vanilla CSS (CSS Variables, Flexbox/Grid, `dvh` dynamic viewports, Glassmorphism)
* **Deployment:** Vercel

---

## 📂 Project Structure

A clean, modular architecture separating layout logic, components, and content:

```text
/
├── public/                # Static assets, fonts, icons, and robots.txt
├── src/
│   ├── assets/            # Global images and processed assets
│   ├── components/        # Reusable UI pieces (Navbar, Footer, WorkCard, ContactModal, ThemeToggle)
│   ├── content/           # Keystatic markdown/JSON data (Works, Expertise, About)
│   ├── layouts/           # MainLayout.astro (SEO wrapper, SPA routing, global scripts)
│   ├── pages/             # File-based routing (/index, /pt/index, /work/[id], etc.)
│   └── utils/             # Helper functions (i18n dictionary, etc.)
├── astro.config.mjs       # Astro configuration and integrations
├── keystatic.config.ts    # CMS schema definition
└── tsconfig.json          # Strict TypeScript configuration

💻 Running Locally
If you want to clone this project and run it locally, follow these steps:

Clone the repository:

Bash
git clone https://github.com/michaelhowecwb/portfolio-michael-howe.git
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
The site will be available at http://localhost:4321

Access the CMS (Keystatic):
Navigate to http://localhost:4321/keystatic to add or edit portfolio content.