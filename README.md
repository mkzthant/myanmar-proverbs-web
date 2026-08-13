# မြန်မာစာလုံးပေါင်းသတ်ပုံကျမ်း | Myanmar Spelling Dictionary

A modern, fast, and installable web application for the Myanmar Language Commission's **Spelling Dictionary (2003)**.

🌐 **Live Site:** [mm-spelling.mnote.pp.ua](https://mm-spelling.mnote.pp.ua/)

---

## ✨ Features

- 📖 **11,643 word entries** from the 2003 Myanmar Spelling Dictionary
- 🔍 **Fuzzy Search** — finds words even with slight spelling mistakes
- 🗂️ **Alphabet Filter** — browse by Myanmar consonant (က–အ)
- 📋 **Copy to Clipboard** — one-tap copy on desktop and mobile
- 🌙 **Dark / Light Mode** — toggle with preference saved locally
- 📲 **PWA / Installable** — install as an app on phone or desktop
- ⚡ **Offline Support** — dictionary data cached for offline use

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (Static Export) |
| Language | TypeScript |
| Font | [Padauk](https://fonts.google.com/specimen/Padauk) (Myanmar) |
| Search | [Fuse.js](https://fusejs.io/) (Fuzzy Search) |
| Hosting | [GitHub Pages](https://pages.github.com/) |
| Domain/DNS | [Cloudflare](https://cloudflare.com/) |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/mkzthant/myanmar-spelling-web.git
cd myanmar-spelling-web

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
myanmar-spelling-web/
├── public/
│   ├── spelling_data.json   # Dictionary data (11,643 entries)
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service Worker
│   └── icon.svg            # App icon
├── src/app/
│   ├── page.tsx            # Main application page
│   ├── layout.tsx          # Root layout with SEO metadata
│   └── globals.css         # Global styles & theme variables
└── .github/workflows/
    └── nextjs.yml          # GitHub Actions deployment
```

---

## 📜 Data Attribution

> **Dictionary data** is sourced from the **Myanmar Language Commission (မြန်မာစာအဖွဲ့)**'s  
> *မြန်မာစာလုံးပေါင်းသတ်ပုံကျမ်း* (Myanmar Spelling Dictionary), published in **2003**.  
> All rights to the dictionary content are reserved by the Myanmar Language Commission.  
> This project uses the data for educational and reference purposes only.

---

## 📄 License

The **source code** of this project is licensed under the [MIT License](LICENSE).

The **dictionary data** (`public/spelling_data.json`) is the intellectual property of the  
Myanmar Language Commission and is **not covered** by this MIT License.
