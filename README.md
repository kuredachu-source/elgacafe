# ELGA Cafe

A digital cafe ordering and management system for ELGA Cafe (Dire Dawa, Ethiopia) — customers order from their table via QR code and can chat with an Amharic-speaking AI hostess; staff get a live order queue, menu editor, analytics, and sentiment dashboard.

Built with [TanStack Start](https://tanstack.com/start) (React, file-based routing, SSR) + [Supabase](https://supabase.com) (database, auth, edge functions), styled with Tailwind CSS v4.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your Supabase project's values (Settings → API in your Supabase dashboard):

   ```bash
   cp .env.example .env
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:3000`.

## Deploying to Vercel

This project uses the [Nitro Vite plugin](https://nitro.build), which Vercel detects automatically — no build command or output directory needs to be set by hand.

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.example` under **Project Settings → Environment Variables**.
4. Deploy. Vercel will detect TanStack Start + Nitro and build/run it automatically, with your server routes (the menu API, order queue, etc.) running as Vercel Functions.

Every subsequent push to your main branch redeploys to production; pushes to other branches get their own preview URL.

### Notes

- The **QR Generator** (Staff → QR Generator) builds each table's QR code from whatever URL it's currently being viewed on (`window.location.origin`), so codes generated on your `*.vercel.app` URL or a custom domain will always point to the right place — regenerate them after your first deploy or whenever your domain changes.
- The AI hostess chat (`hana-chat`) is a **Supabase Edge Function**, deployed separately via the Supabase CLI (`supabase functions deploy hana-chat`) — it is not part of the Vercel build, and still calls Lovable's AI gateway (`LOVABLE_API_KEY`) under the hood. Swap that for your own AI provider if you no longer have access to it.
- `SUPABASE_SERVICE_ROLE_KEY` (used only by server-side admin operations) isn't currently set anywhere in this project's env files. Nothing in the app calls it yet, but add it in Supabase → Settings → API if you start using `supabaseAdmin`.
