# i4tow Album

**Turn any photo folder into a beautiful, shareable gallery in seconds.**

[Live Demo](https://rathnasorg.github.io/i4tow/a/i4tow-album) | [View All Albums](https://rathnasorg.github.io/i4tow/p/rathnasorg)

---

## What is i4tow?

i4tow (pronounced "I for two") is the easiest way to share your photos online. No complicated setup, no monthly fees, no ads - just your beautiful photos in a gallery anyone can view.

Perfect for:
- Wedding photographers sharing albums with clients
- Event photographers delivering photos
- Anyone who wants a simple way to share photo collections

---

## Features

### Gallery View
Browse all your photos in a clean, responsive grid that looks great on phones, tablets, and computers.

### Slideshow Mode
Watch your photos play automatically - perfect for displaying at events or sharing on a big screen. Includes shuffle mode for variety.

### Slideshow All
Play a slideshow across ALL your albums at once - great for showcasing your entire portfolio.

### View All Your Albums
See every album you've created in one place at:
```
https://rathnasorg.github.io/i4tow/p/YOUR_GITHUB_USERNAME
```

### Easy Sharing
Share any album instantly with a direct link or generate a QR code your clients can scan with their phones.

---

## Quick Start

### Step 1: Get Your GitHub Account Ready

You'll need a free GitHub account and a personal access token.

**Your GitHub Username:**
- This is the name you chose when signing up for GitHub
- You can find it by going to [github.com](https://github.com) and looking at the top-right corner after logging in
- It's also in your profile URL: `github.com/YOUR_USERNAME`

**Your GitHub Token:**
- This is like a password that lets the tool create albums for you
- [Follow this guide to create one](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token)
- When creating the token, give it permission to create repositories ("repo" access)
- Keep this token safe and don't share it with anyone

### Step 2: Install the i4tow Tool

Open Terminal (Mac) or Command Prompt (Windows) and paste this command:

```bash
npm install -g @rathnasorg/i4tow --registry=https://npm.pkg.github.com
```

> **Note:** You'll need [Node.js](https://nodejs.org) installed first. Download the "LTS" version if you don't have it.

### Step 3: Create Your Album

Navigate to your photos folder and run:

```bash
i4tow /path/to/your/photos --token YOUR_GITHUB_TOKEN --username YOUR_GITHUB_USERNAME
```

**Example:**
```bash
i4tow "/Users/john/Photos/Smith Wedding 2024" --token ghp_xxxx --username johnphoto
```

That's it! Your album will be live at:
```
https://rathnasorg.github.io/i4tow/a/i4tow-SmithWedding2024
```

---

## Upload Multiple Albums at Once

Have a folder with multiple event folders inside? Use batch mode:

```bash
i4tow /Photos/2024 --batch --token YOUR_TOKEN --username YOUR_USERNAME
```

This creates a separate album for each subfolder that contains photos.

**Example folder structure:**
```
/Photos/2024/
  ├── Johnson Wedding/     → becomes i4tow-JohnsonWedding
  ├── Smith Anniversary/   → becomes i4tow-SmithAnniversary
  └── Corporate Event/     → becomes i4tow-CorporateEvent
```

---

## All Options

```bash
i4tow <folder> [options]

Options:
  --token, -t     Your GitHub token (required)
  --username, -u  Your GitHub username (required)
  --dry-run, -d   Preview what will happen without actually creating albums
  --batch, -b     Create albums for each subfolder
  --single, -s    Treat entire folder as one album (even if it has subfolders)
```

---

## Supported Photo Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- HEIC (.heic) - iPhone photos
- WebP (.webp)
- GIF (.gif)

---

## Advanced: Manual Setup

If you prefer not to use the command line tool, you can also:

1. Fork this repository on GitHub
2. Add your photos to the `public/photos/raw2/` folder
3. Push your changes
4. Your album goes live automatically

---

## Need Help?

- Having trouble? Email **i4tow@rathnas.com**
- Want to run i4tow on your own domain? We can help with that too!

---

Made with 🐐 photographers in 🧠 & ❤️.
