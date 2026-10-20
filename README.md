# maharajlmr.github.io

Source for [maharajlmr.github.io](https://maharajlmr.github.io) — a portfolio of ROS 2, control
and simulation work.

Next.js static export, TypeScript, Tailwind, Framer Motion. Every page is built from
`content/site.json` and `content/projects.json`; no copy or number lives in a component, and the
build fails if a content file drifts from the types in `src/lib/types.ts` or points at a media file
that is not there.

## Add or change a project

1. Edit `content/projects.json`. A featured project needs a slug, tagline (ten words at most),
   category, problem, constraints, approach decisions with their reasons, architecture stages,
   results with the baseline each is measured against, failures, role, environment, status, stack,
   media and links.
2. Put the media in `public/media/<slug>/` with the exact width and height in the content file.
   `../tools/make_media.py` converts images to WebP and trims and re-encodes clips.
3. `npm run build`. The build fails loudly on anything the content file gets wrong.
4. Push to `main`. The Pages workflow builds and deploys.

## Local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```
