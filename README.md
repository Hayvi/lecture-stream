# Lecture Stream

A **Vite + React + TypeScript** web app that streams classroom lecture recordings.  
It displays a list of chapters (CDs) and their lectures, lets the user play, pause, and seek within each MP3 file, and remembers playback progress in `localStorage`.

---

## Tech Stack
- **Vite** – fast dev server and build tool
- **React** with **TypeScript** – UI components
- **Tailwind CSS** & **shadcn‑ui** – modern, responsive styling
- **Cloudflare Pages** – static hosting (the `public/audio/` folder is served directly)

---

## Getting Started (Local Development)
```sh
# 1. Clone the repo
git clone <YOUR_GIT_URL>
cd lecture-stream

# 2. Install dependencies
npm i

# 3. Run the dev server
npm run dev
```
Open <http://localhost:5173> – the app hot‑reloads as you edit files.

---

## Adding New Lectures
1. **Create a folder** under `public/audio/` for the new chapter (e.g. `chapter4`).
2. **Upload your MP3 files** into that folder.
3. **Edit `src/data/lecturesData.ts`** – add a new `Chapter` object with the correct `audioSrc` paths.  The file already contains a helper comment showing the required shape.
4. **Commit & push** – Cloudflare Pages will automatically publish the new files.

> **Note:** The UI now **wraps** long lecture titles on mobile (the `<p>` element uses `whitespace‑normal break‑words`). This lets you keep the original, descriptive filenames without renaming them, while still being readable on small screens.

---

## Mobile‑Friendly Lecture List
- The list shows the **full filename** (minus the `.mp3` extension).
- Long titles automatically wrap onto multiple lines, so you can scroll vertically without truncation.
- If you later decide you want a more compact view (e.g., accordion, pagination, or virtualized list), the code is ready to be extended – see `src/components/ChapterCard.tsx` for the styling hook.

---

## Deploying to Cloudflare Pages
1. Push to the `main` branch.
2. In the Cloudflare dashboard, link the repo and enable automatic builds.
3. The build runs `npm run build` and publishes the `dist/` folder.

---

## License
MIT © 2025 Supa
