# Kollekta Landing

Astro + Sanity CMS marketing site for **Kollekta** (B2B Media Suite).

## Apps

| Folder | Role |
|--------|------|
| `studio/` | Sanity Studio |
| `web/` | Astro frontend (Vercel) |

Sanity project ID: `eyi8ruc3` · Studio host: `kollekta.sanity.studio`

## Pages

- `/` — Marketing landing
- `/terms` — Content page (Όροι & Απόρρητο)
- `404` — Branded not-found

## Local development

```bash
# Terminal 1
cd studio && npm install && npm run dev

# Terminal 2
cd web && npm install && npm run dev
```

## CMS setup

```bash
cd studio
npx sanity schema deploy --yes
npm run seed
npm run deploy   # optional hosted studio
```

Create a write token for the interest form:

```bash
npx sanity tokens add "web-write" --role=editor --yes -p eyi8ruc3
```

Paste into `web/.env` as `SANITY_WRITE_TOKEN`.
