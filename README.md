# neilofneils-astro

Parallel Astro rebuild of neilofneils.com, preservation-first and posts-only.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy

This site is deployed to Cloudflare Pages via direct upload, not GitHub integration.

```bash
./scripts/deploy-production.sh
```

If the Pages project does not exist yet, create it first:

```bash
wrangler pages project create neilofneils
```
