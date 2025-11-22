# Deploy TinyLink to Vercel via the Vercel Dashboard (Neon DB)

## Prerequisites
- Vercel account (any)
- Neon PostgreSQL database URL stored in `.env` as `DATABASE_URL`
- Your code pushed to a Git repository (GitHub, GitLab, Bitbucket, or any remote you can provide a URL for)
- `postinstall` script (`prisma generate`) already in `package.json`

## Step 1 – Ensure your repo is online
If you haven’t pushed yet:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```
The URL can be from GitHub, GitLab, Bitbucket, or any Git server you control.

## Step 2 – Create a new project on Vercel
1. Log in to the Vercel dashboard.
2. Click **New Project** → **Import Git Repository**.
3. Paste the repository URL you used in Step 1.
4. Vercel will detect a Next.js app automatically. Click **Import**.

## Step 3 – Add the Neon database URL
1. In the project settings, go to **Environment Variables**.
2. Click **Add New** and set:
   - **Key:** `DATABASE_URL`
   - **Value:** copy the full connection string from your Neon dashboard (the same you have in `.env`).
   - **Environment:** select **Production**, **Preview**, and **Development** (check all three).
3. Save.

## Step 4 – Deploy
After the environment variable is saved, Vercel will start a build automatically.
- The `postinstall` script runs `prisma generate` during the build.
- If the build succeeds, you’ll see a live URL (e.g., `https://tiny-link.vercel.app`).

## Step 5 – Initialise the database schema
Your Neon database is empty until the Prisma schema is applied.
1. In the Vercel dashboard, open **Settings → Environment Variables** and click **Download .env** (or use the **vercel env pull** command if you prefer CLI) to get the exact `DATABASE_URL`.
2. Run locally (or in a Vercel Serverless Function) to push the schema:
```bash
npx prisma db push --preview-feature
```
   - If you prefer the CLI, you can run:
```bash
vercel env pull .env.production
npx dotenv -e .env.production -- npx prisma db push
```

## Step 6 – Verify
Visit the Vercel URL, create a short link, and confirm the redirect works and the UI looks correct.

## Troubleshooting
- **Prisma client not generated** – ensure `postinstall` script exists in `package.json` and redeploy.
- **Database connection errors** – double‑check the `DATABASE_URL` value and that the Neon instance allows connections from Vercel.
- **Build fails** – inspect Vercel build logs for missing env vars or TypeScript errors.

## Resources
- Vercel Docs: https://vercel.com/docs
- Prisma + Vercel guide: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- Neon PostgreSQL: https://neon.tech/docs
