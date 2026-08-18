# Quick Deployment Checklist ✅

## Local Setup (5 min)
- [ ] Copy all upgraded config files to your project
- [ ] Run `npm install`
- [ ] Run `npm run build` (verify no errors)
- [ ] Run `npm run preview` (check site works)

## GitHub Push (2 min)
- [ ] `git add .`
- [ ] `git commit -m "upgrade: Vercel deployment configs"`
- [ ] `git push origin main`

## Vercel Setup (10 min)
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Create new project from GitHub repo
- [ ] Let Vercel auto-detect Vite config
- [ ] Add environment variables
- [ ] Click "Deploy"

## Domain Setup (2 min at registrar)
- [ ] Add CNAME: `www` → `cname.vercel-dns.com`
- [ ] (Optional) Add A record: `@` → `76.76.19.5`
- [ ] Wait 24-48 hours for DNS propagation

## Verify (5 min)
- [ ] Check `https://www.fluxentiq.com` loads
- [ ] Verify no console errors (F12)
- [ ] Test responsive design
- [ ] Check Vercel dashboard shows "Ready"

---

## Files You Need to Update in Your Project:

### Replace entire file:
- `package.json` ✅
- `vite.config.js` ✅
- `eslint.config.js` ✅
- `tsconfig.json` ✅

### Add new files:
- `vercel.json` ✅
- `tsconfig.node.json` ✅
- `.prettierrc` ✅
- `.env.example` ✅
- `DEPLOYMENT.md` ✅

### Keep as-is:
- `.gitignore` (unless base44-specific)
- `index.html` (your entry point)
- `src/` folder (your components)
- `README.md` (update if desired)

---

## Need Help?
1. Share build errors from `npm run build`
2. Check Vercel deployment logs
3. Verify DNS records with `nslookup www.fluxentiq.com`
