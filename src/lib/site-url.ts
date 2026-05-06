/** Canonical site origin ; set `NEXT_PUBLIC_SITE_URL` in production (no trailing slash). */
export function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/$/, "");
  return "https://richtons.co.uk";
}
