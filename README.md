Richtons Environmental Services marketing site — Next.js App Router.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy [.env.example](./.env.example) to `.env.local` if you need to override defaults.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin for metadata/sitemap (no trailing slash). Defaults to `https://richtons.co.uk`. |

## Deploy on Vercel

Repository: [github.com/leveldesignagency/richtons](https://github.com/leveldesignagency/richtons).

1. Push this branch to GitHub (`main` or your chosen production branch).
2. In [Vercel](https://vercel.com/new), **Import** the repo. Set **Framework Preset** to **Next.js**. Defaults: **Install Command** `npm install`, **Build Command** `npm run build`. Leave **Output Directory empty** — do not type `.next`, `dist`, or `next build`; Vercel wires Next.js output automatically.
3. Under **Environment Variables**, add **`NEXT_PUBLIC_SITE_URL`** with your live URL (e.g. `https://richtons.co.uk`), matching the domain you assign in Vercel or your DNS.
4. Deploy. Preview deployments use the preview URL unless you override `NEXT_PUBLIC_SITE_URL` per environment in Vercel (Production vs Preview).

Production build must pass locally:

```bash
npm run build
```

### Vercel: “output directory … next build was not found”

That happens when **Output Directory** is set to **`next build`** (or anything other than blank). Open **Project → Settings → General → Build & Development Settings**, clear **Output Directory**, save, and redeploy. **Build Command** should be `npm run build`; **Output Directory** must stay empty for Next.js.
