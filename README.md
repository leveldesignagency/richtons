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
2. In [Vercel](https://vercel.com/new), **Import** the repo. Vercel will detect **Next.js** — defaults work: **Install** `npm install`, **Build** `npm run build`, **Output** `.next`.
3. Under **Environment Variables**, add **`NEXT_PUBLIC_SITE_URL`** with your live URL (e.g. `https://richtons.co.uk`), matching the domain you assign in Vercel or your DNS.
4. Deploy. Preview deployments use the preview URL unless you override `NEXT_PUBLIC_SITE_URL` per environment in Vercel (Production vs Preview).

Production build must pass locally:

```bash
npm run build
```
