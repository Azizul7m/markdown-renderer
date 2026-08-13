# GitHub Actions - npm Publishing Setup Guide

This guide explains how to set up automatic npm publishing via GitHub Actions.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create npm Token

1. Go to https://www.npmjs.com/settings/tokens
2. Click "Generate New Token"
3. Select "Automation" (for CI/CD)
4. Copy the token (you'll only see it once!)

**Token Format**: Starts with `npm_` or similar

### Step 2: Add Token to GitHub Secrets

1. Go to your repository: https://github.com/Azizul7m/markdown-renderer
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

✅ Done! Your GitHub is now authenticated with npm.

---

## 📋 Publishing Methods

### Method 1: Automatic (Tag-based) ⭐ RECOMMENDED

When you push a tag, the workflow automatically publishes:

```bash
# Update version in package.json
npm version patch  # or minor/major
# Example: 0.2.0 → 0.2.1

# This creates a git tag v0.2.1
# Push tag to GitHub - workflow runs automatically
git push origin v0.2.1
```

**What happens:**
1. GitHub Actions workflow triggers
2. Builds the package
3. Publishes to npm
4. Creates a GitHub Release with notes
5. You get a success notification

### Method 2: Manual Trigger (Workflow Dispatch)

Manually trigger publishing from GitHub:

1. Go to your repo → **Actions** tab
2. Select "Publish to npm" workflow
3. Click **Run workflow** → Select branch
4. Done! Workflow publishes from current version in package.json

---

## 🔄 Publishing Workflow Details

The workflow does this automatically:

1. ✅ Checks out code
2. ✅ Sets up Node.js 18
3. ✅ Installs dependencies
4. ✅ Builds with TypeScript
5. ✅ Verifies build output
6. ✅ Gets version from tag or package.json
7. ✅ Publishes to npm registry
8. ✅ Creates GitHub Release with notes

---

## 📦 Step-by-Step: First Time Publishing

### Step 1: Get npm Token (if not done yet)

```bash
# Go to https://www.npmjs.com/settings/tokens
# Create "Automation" token
# Copy it (save securely!)
```

### Step 2: Add to GitHub Secrets

```
https://github.com/Azizul7m/markdown-renderer/settings/secrets/actions

Name: NPM_TOKEN
Value: npm_xxxxxxxxxxxxxxxxxxxxx (your token)
```

### Step 3: Update Version

```bash
cd packages/markdown-renderer

# Update package.json version
# Option A: Manual edit
# Change "version": "0.2.0" to "0.2.1"

# Option B: npm command
npm version patch
# This auto-commits and creates tag
```

### Step 4: Push to GitHub

```bash
# If you used npm version, it auto-tagged:
git push origin main
git push origin v0.2.1

# If you manually updated version:
git add package.json
git commit -m "chore: bump version to 0.2.1"
git tag v0.2.1
git push origin main --tags
```

### Step 5: Monitor Workflow

1. Go to GitHub repo → **Actions** tab
2. Watch "Publish to npm" workflow run
3. Check npm after ~2-3 minutes: https://www.npmjs.com/package/@azizul7m/markdown-renderer

---

## ✅ Verification Checklist

After publishing:

```bash
# Check npm registry
npm view @azizul7m/markdown-renderer

# Check version
npm view @azizul7m/markdown-renderer version

# Install fresh copy
mkdir test-dir && cd test-dir
npm init -y
npm install @azizul7m/markdown-renderer
```

---

## 🔐 Security Best Practices

1. ✅ Use "Automation" token type (not "Classic")
2. ✅ Set expiration (recommended 30-90 days)
3. ✅ Keep token secret - only in GitHub Secrets
4. ✅ Regenerate tokens periodically
5. ✅ Use separate token per CI/CD service

---

## 🆘 Troubleshooting

### "NPM_TOKEN not found" Error

**Problem**: Workflow can't publish

**Solution**:
1. Go to repo Settings → Secrets
2. Verify `NPM_TOKEN` exists
3. Check token is valid (test on npm.com)
4. Regenerate token if expired

### "No packages found" Error

**Problem**: Package not published

**Solution**:
1. Check workflow logs (Actions tab)
2. Verify package name in package.json
3. Confirm npm token has publish permissions
4. Check package not already published with different name

### "package already published" Error

**Problem**: Version already exists

**Solution**:
1. Increment version (0.2.0 → 0.2.1)
2. Commit, tag, and push
3. Workflow will publish new version

### Workflow Not Running

**Problem**: Tags pushed but workflow doesn't trigger

**Solution**:
1. Check Actions enabled in repo settings
2. Verify tag format: `v0.2.1` (must start with 'v')
3. Check workflow file syntax
4. See Actions tab for errors

---

## 📚 Workflow File Location

```
.github/workflows/publish.yml
```

Modify this file to:
- Change Node.js version
- Add pre-publish checks
- Customize release notes
- Add additional build steps

---

## 🎯 Next Publishes (Quick Guide)

### Every time you want to publish:

```bash
# 1. Update version
npm version patch  # 0.2.0 → 0.2.1
# (or manually edit package.json)

# 2. Push tag
git push origin --tags

# 3. Done! Workflow publishes automatically
```

That's it! GitHub Actions handles the rest. ✨

---

## 📊 Current Setup

- **Trigger**: On git tag push (v0.2.0, v0.2.1, etc.)
- **Alternative**: Manual trigger via workflow dispatch
- **Registry**: npm (registry.npmjs.org)
- **Access**: Public
- **Auth**: NPM_TOKEN secret
- **Notifications**: GitHub Release created automatically

---

## 🚀 First Time Workflow Run Expected to:

1. ✅ Trigger on tag v0.2.1
2. ✅ Checkout code
3. ✅ Setup Node 18
4. ✅ Install & build
5. ✅ Publish to npm
6. ✅ Create Release
7. ⏱️ Takes ~3-5 minutes total

---

**Everything is ready! Just add your npm token and you're good to go.** 🎉

Questions? See GitHub Actions logs for debug info.
