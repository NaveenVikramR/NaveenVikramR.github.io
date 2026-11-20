# Deploy plan

The site is static, so hosting is free on all of the options below. **Recommended: GitHub Pages with the user-site repo**, so the URL is `https://naveenvikramr.github.io` and every push to `main` redeploys.

## Option A: GitHub Pages (recommended)

1. Create a **public** repo named exactly `NaveenVikramR.github.io` (the user-site name gives you the root URL).
2. Push this folder:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/NaveenVikramR/NaveenVikramR.github.io.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) syntax-checks the JS, then publishes. Check the **Actions** tab; the site is live in about a minute.

## Option B: Vercel or Netlify (if you want PR previews)

- **Vercel**: Import the repo at vercel.com/new → Framework preset **Other** → no build command, output directory `.` → Deploy. Every PR gets a preview URL.
- **Netlify**: Add new site → Import from Git → build command empty, publish directory `.`.
- **Cloudflare Pages**: Create project → connect repo → framework **None**, build output `/`.

## Custom domain (optional, ~₹800–1,200 / year)

1. Buy a domain (e.g. `naveenvikram.dev`) from Cloudflare Registrar, Namecheap or Porkbun.
2. GitHub Pages: **Settings → Pages → Custom domain** → enter it. This adds a `CNAME` file to the repo.
3. At your DNS provider:
   - Apex (`naveenvikram.dev`): four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: `CNAME` → `naveenvikramr.github.io`
4. Once DNS resolves, tick **Enforce HTTPS**.

## Launch checklist

- [x] Email and LinkedIn added in `assets/data.js`
- [ ] Confirm the `status` line ("Open to roles & collaborations")
- [ ] Add the site URL to your GitHub profile (Edit profile → Website) and LinkedIn
- [ ] Pin your four featured repos on your GitHub profile so the two match
- [x] Social preview image (`assets/og.png`) and tags added
- [ ] Optional: privacy-friendly analytics (GoatCounter or Cloudflare Web Analytics, both free, no cookies)

## Keeping it fresh

New project → add one object to `projects` in `assets/data.js` → push. Commit dates update on their own from the GitHub API.
