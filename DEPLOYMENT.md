# Fluxentiq AI - Vercel Deployment Guide

## Pre-Deployment Checklist

### 1. Update Your Local Files
Replace your project files with these upgraded configs:
- `package.json` - Updated dependencies and scripts
- `vite.config.js` - Optimized for production
- `vercel.json` - Vercel-specific settings
- `eslint.config.js` - Modern ESLint setup
- `tsconfig.json` + `tsconfig.node.json` - TypeScript config
- `.prettierrc` - Code formatting rules
- `.env.example` - Environment template

### 2. Test Locally
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production (test)
npm run build

# Preview production build
npm run preview

# Check for lint errors
npm run lint

# Fix lint issues
npm run lint:fix
```

**Verify:**
- ✅ No build errors
- ✅ `dist/` folder created
- ✅ App loads without console errors

### 3. Environment Variables Setup
Create `.env.local` in project root:
```
VITE_API_BASE_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

### 4. Push to GitHub
```bash
git add .
git commit -m "chore: upgrade for Vercel deployment"
git push origin main
```

---

## Vercel Deployment Steps

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Find `batodanial-sketch/Fluxentiq` and click "Import"

### Step 2: Configure Build Settings
Vercel should auto-detect these settings, but verify:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install --legacy-peer-deps`

### Step 3: Add Environment Variables (Vercel Dashboard)
In Project Settings → Environment Variables, add:
```
VITE_API_BASE_URL = https://api.fluxentiq.com
VITE_STRIPE_PUBLIC_KEY = pk_live_xxxx
```

### Step 4: Add Custom Domain
1. Go to Project Settings → Domains
2. Add `www.fluxentiq.com`
3. Add root domain `fluxentiq.com` (optional, for redirect)
4. Follow DNS configuration instructions

### Step 5: Configure DNS at Your Registrar
For `www.fluxentiq.com`:
```
Name:  www
Type:  CNAME
Value: cname.vercel-dns.com
TTL:   3600
```

For root domain `fluxentiq.com` (optional A record):
```
Name:  @
Type:  A
Value: 76.76.19.5
TTL:   3600
```

**Note:** DNS can take 24-48 hours to propagate.

### Step 6: Deploy
1. Click "Deploy" button in Vercel
2. Wait for build to complete (usually 2-5 minutes)
3. Check production URL: `https://www.fluxentiq.com`

---

## Post-Deployment Verification

### Check Site Health
- [ ] Site loads at `https://www.fluxentiq.com`
- [ ] No console errors
- [ ] Responsive design works (mobile/tablet)
- [ ] Forms submit correctly
- [ ] API calls work if using backend

### Monitor Performance
1. Vercel Dashboard → Analytics
2. Check:
   - Page load time
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)

### Enable Optional Features
- **Edge Caching:** Project Settings → Caching
- **Automatic Deployments:** GitHub → Push to main = Auto-deploy

---

## Rollback Plan
If issues occur:
1. Go to Vercel Dashboard → Deployments
2. Click "Rollback" on previous stable deployment
3. Fix locally and redeploy

---

## Key Improvements in This Setup

✅ **Removed base44 dependencies** - Standalone Vite app
✅ **Latest packages** - Updated to Feb 2025 versions
✅ **Code splitting** - Smaller bundle sizes (Radix UI, Three.js chunks)
✅ **SWC compiler** - Faster builds than Babel
✅ **TypeScript ready** - Proper tsconfig setup
✅ **ESLint + Prettier** - Professional code quality
✅ **Vercel optimized** - Best practices for serverless deployment
✅ **Environment management** - .env template included

---

## Troubleshooting

### Build Fails on Vercel
**Error:** "npm ERR! peer dep missing"
**Solution:** Already handled with `--legacy-peer-deps` flag

### Site 404 After Deployment
**Check:** 
1. Vercel dashboard shows green checkmark
2. DNS records propagated (use `nslookup www.fluxentiq.com`)
3. Clear browser cache

### Slow Build Time
**Optimize:**
```bash
npm run analyze  # See bundle size breakdown
```

### Environment Variables Not Working
1. Verify variable names start with `VITE_`
2. Redeploy after adding env vars to Vercel
3. Check Vercel Dashboard → Deployments → Logs

---

## Support
For Vercel issues: https://vercel.com/support
For Vite issues: https://vitejs.dev/guide/troubleshooting.html
