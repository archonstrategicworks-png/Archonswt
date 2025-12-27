# Deployment Workflow: GitHub → Build → cPanel

This guide outlines two methods for deploying the Archon Strategic Works application to a cPanel hosting environment.

---

## Method 1: The "Easy" Manual Workflow (Recommended for Beginners)

This method requires no complex CI/CD configuration. You simply build on your computer and upload the result.

### 1. Build Locally
Run the build command on your local machine (VS Code / Terminal).
```bash
npm run build
```
*   This creates a `dist/` folder in your project root.
*   The folder contains `index.html` and an `assets/` folder with compiled JS/CSS.

### 2. Zip the Build
*   Go into the `dist/` folder.
*   Select **ALL** files (`index.html`, `assets`, etc.).
*   Right-click -> **Compress/Zip** (e.g., `archon-build.zip`).

### 3. Upload to cPanel
*   Log in to **cPanel** -> **File Manager**.
*   Navigate to `public_html` (or your subdomain folder).
*   **Delete** old files (except `.htaccess` if you have custom rules).
*   Click **Upload** and select `archon-build.zip`.
*   Right-click the uploaded zip -> **Extract**.
*   Delete the zip file after extraction.

### 4. Setup .htaccess (One-Time Setup)
Since this is a Single Page Application (SPA), you must ensure all routes redirect to `index.html` so refreshing pages like `/projects` works.
Create/Edit `.htaccess` in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Method 2: Automated GitHub Actions Workflow (Advanced)

This method automatically builds and deploys whenever you push to GitHub.

### 1. Get FTP Details from cPanel
*   **Host**: Your domain or IP (e.g., `ftp.archonstrategicworks.com`)
*   **User**: Your cPanel username or specific FTP account.
*   **Password**: FTP password.

### 2. Add Secrets to GitHub
*   Go to your GitHub Repo -> **Settings** -> **Secrets and variables** -> **Actions**.
*   Add New Repository Secrets:
    *   `FTP_SERVER`
    *   `FTP_USERNAME`
    *   `FTP_PASSWORD`

### 3. Create Workflow File
Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to cPanel

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: ⬇️ Checkout Code
        uses: actions/checkout@v3

      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: 📦 Install Dependencies
        run: npm install

      - name: 🚀 Build Project
        run: npm run build

      - name: 📂 Sync Files to cPanel via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/  # Change if deploying to subdomain
```

### 4. Push & Relax
Commit and push this file. GitHub will now build and upload your site automatically on every push to `main`.

---

## ⚠️ Important cPanel Requirements
1.  **Node.js Not Required**: Since we deploy the **static build** (`dist/`), your cPanel does **not** need Node.js installed. Apache/PHP handles the serving.
2.  **Permissions**: Ensure `public_html` permissions are `755` and files are `644`.
3.  **Database**: If using PHP backend scripts (not included in this React frontend-only build), ensure `config.php` points to `localhost` DB.
