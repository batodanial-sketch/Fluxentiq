# Setup Guide for Windows (Your Environment)

## What You Just Did ✅
You hit an npm version error. **This is fixed now.**

## Steps to Deploy (Copy Paste These)

### Step 1: Clean Install on Windows
```powershell
# Open PowerShell in your D:\Fluxentiq App folder

# Clear npm cache
npm cache clean --force

# Remove old node_modules (if exists)
rm -r node_modules
rm package-lock.json
```

### Step 2: Copy Updated Files to Your Project
Download and copy these files to `D:\Fluxentiq App\`:
- `package.json` ← **NEW - Use this one!**
- `vite.config.js`
- `vercel.json`
- `eslint.config.js`
- `tsconfig.json`
- `tsconfig.node.json`
- `.prettierrc`
- `.env.example`

### Step 3: Install Dependencies (Windows PowerShell)
```powershell
cd D:\Fluxentiq App
npm install --legacy-peer-deps
```

**Expected output:**
```
added 621 packages in X seconds
```

### Step 4: Verify Build Works
```powershell
npm run build
```

**Expected:**
- ✅ `dist/` folder created
- ✅ No red error messages

### Step 5: Test Locally
```powershell
npm run dev
```
- Opens browser at `http://localhost:5173`
- Click around, verify works
- Press `Ctrl+C` to stop

### Step 6: Push to GitHub
```powershell
git add .
git commit -m "chore: upgrade configs for Vercel deployment"
git push origin main
```

### Step 7: Deploy to Vercel
1. Go to https://vercel.com/dashboard
2. If not connected, click "Import Project"
3. Select your GitHub repo
4. Click "Deploy"
5. Wait 2-5 minutes
6. Click domain link to see live site

### Step 8: Add Domain
1. Go to Project Settings → Domains
2. Add `www.fluxentiq.com`
3. Add CNAME at your domain registrar:
```
Name: www
Type: CNAME
Value: cname.vercel-dns.com
```

---

## If npm install Still Fails

**Error: `ETARGET` or version not found**

Solution:
```powershell
npm install --legacy-peer-deps --force
```

---

## If Build Fails

**Check these:**

1. Make sure you're in the right folder:
```powershell
cd D:\Fluxentiq App
```

2. Verify `index.html` exists in root folder

3. Check for errors:
```powershell
npm run lint
```

4. Clear cache and retry:
```powershell
npm cache clean --force
rm -r node_modules
npm install --legacy-peer-deps
npm run build
```

---

## Windows PowerShell Tips

| Command | What it does |
|---------|-------------|
| `cd D:\Fluxentiq App` | Change directory |
| `ls` or `dir` | List files |
| `npm install` | Install dependencies |
| `npm run build` | Build for production |
| `npm run dev` | Start dev server |
| `git status` | Check git status |
| `git push origin main` | Push to GitHub |

---

## Troubleshooting Commands

```powershell
# Check Node version (should be v18+)
node --version

# Check npm version (should be v9+)
npm --version

# Check what's in current folder
ls

# See build output
npm run build 2>&1 | head -50

# See all npm scripts available
npm run
```

---

## Next: Domain Setup

Once Vercel deployment shows "Ready":

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add this CNAME record:
```
Name: www
Type: CNAME
Value: cname.vercel-dns.com
TTL: 3600
```

4. Wait 24-48 hours (DNS propagation)
5. Test: `https://www.fluxentiq.com`

---

## Still Stuck?

Share the error message from:
1. `npm install` output
2. `npm run build` output
3. Vercel deployment logs

Copy the red error text and send it over.
