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
2. In [Vercel](https://vercel.com/new), **Import** the repo. Set **Framework Preset** to **Next.js**.

   **Two different fields — easy to mix up:**

   | Field | What to enter |
   |-------|----------------|
   | **Build Command** | `npm run build` ← this runs `next build` via your `package.json` |
   | **Output Directory** | **Nothing.** Leave the field **blank**. |

   **`next build` belongs only in the build step** (inside `npm run build`). **Never** paste `next build` into **Output Directory** — that field is for static folders like `out`, not commands.
3. Under **Environment Variables**, add **`NEXT_PUBLIC_SITE_URL`** with your live URL (e.g. `https://richtons.co.uk`), matching the domain you assign in Vercel or your DNS.
4. Deploy. Preview deployments use the preview URL unless you override `NEXT_PUBLIC_SITE_URL` per environment in Vercel (Production vs Preview).

Production build must pass locally:

```bash
npm run build
```

### Vercel: “output directory … next build was not found”

That happens when **Output Directory** is set to **`next build`** (or anything other than blank). Open **Project → Settings → General → Build & Development Settings**, clear **Output Directory**, save, and redeploy. **Build Command** should be `npm run build`; **Output Directory** must stay empty for Next.js.
