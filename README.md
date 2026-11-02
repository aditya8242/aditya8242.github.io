# Aditya Chavan — Systems & Backend Architecture Portfolio

> Ultra-minimalist personal portfolio website engineered for high performance, zero runtime overhead, and seamless static deployment on **GitHub Pages** ([aditya8242.github.io](https://aditya8242.github.io)).

---

## 1. Design Philosophy & Aesthetic

- **Design Language**: Channeled Apple hardware spec pages, Linear, and Dieter Rams. Obsessive typography, generous negative space, razor-sharp 1px hairlines, and high-contrast monochrome (`#0A0A0A` obsidian background, `#FAFAFA` primary text, `#888888` secondary text, and `#10B981` pulsing emerald status indicator).
- **Typography**: Geometric sans-serif (`Inter` / SF Pro Display with tight `-0.035em` tracking for headlines) paired with industrial monospace (`JetBrains Mono` / Geist Mono) for metadata, system calls, memory diagrams, and terminal commands.
- **Motion & Tactility**:
  - Smooth staggered physics-based entrance fade-ups on initial load.
  - Specular mouse spotlight gradient tracking on specification cards.
  - Interactive **GUI / Raw Terminal** view switcher in top navigation bar.
  - Interactive Easter Egg: Pressing `/` or clicking `[~]$` opens a sleek UNIX command shell modal.
  - One-click copy-to-clipboard toast notification on email dispatch.
- **Zero Clutter**: No stock photos, no generic tech icons, no skill progress bars, and no floating third-party chat widgets. Every pixel earns its place.

---

## 2. Page Architecture & Content Structure

- **Section 01: Hero (Above the Fold)**
  - Live status indicator: `Pune, IN · Systems & Backend Engineering`
  - Headline: *Aditya Chavan — Engineered from the metal up.*
  - Sub-headline: Software Engineer specializing in Linux internals, C/C++, and scalable Java/Spring Boot backends—paired with frontline B2B software architecture.
  - Philosophy Callout: `"Brute force the logic first. Optimize it later."`
  - High-contrast direct action buttons (Architecture, GitHub, LinkedIn, Resume.pdf).

- **Section 02: Selected Engineering (Bento / Technical Spec Grid)**
  - **01 / Customized Virtual File System (CVFS)**: C++ · Linux Internals (Feb 2025). In-memory UNIX UFS-modeled file system with custom inode tables, User File Descriptor Tables (UFDT), 7 core system calls (`creat`, `open`, `read`, `write`, `unlink`, `stat`, `ls`), and architectural memory layout schematic.
  - **02 / Concurrent FTP Server**: C · POSIX Sockets · Linux (Feb 2026). High-concurrency TCP file transfer server utilizing fork-per-connection architecture with custom line-based wire protocol over raw sockets.
  - **03 / EduTrack — Enterprise Management Backend**: Java · Spring Boot · MongoDB · Docker (Jan 2025). Production RESTful API backend with Controller–Service–Repository layered architecture containerized with Docker and deployed on Render with MongoDB Atlas.
  - **04 / IronVault — Binary File Archiver & Encryptor**: Java · Swing · Cryptography (Jul 2026). Zero-dependency directory packer serializing 18+ file formats into a single binary archive using custom headers and repeating XOR encryption.

- **Section 03: Experience & B2B Execution (Timeline)**
  - **Brilliant Info Systems Pvt. Ltd.** — Technical Sales Intern (Nov 2026 – Present · Pune, India)
  - **Iron & Logic** — Founder & Web Architect (Aug 2026 – Present · Pune, India)

- **Section 04: Technical Specification Sheet**
  - Apple-style multi-column monospace hardware spec table covering Systems & Languages, Backend & Data, Infrastructure & Tooling, and Open Source & Education (including `ccgargantua/ini` PR #24 merged contributor and B.Sc. Computer Science 7.8 CGPA from Savitribai Phule Pune University).

- **Section 05: Engineering Dispatches & Writings (`/blog`)**
  - Features published engineering essays with tags, reading times, and direct routes:
    - *I Learned Open Source the Hard Way* (By failing publicly)
    - *Automating a Daily Task Instead of Repeating It* (Replacing fragile manual work with a simple system)
  - Dedicated call-to-action button to explore the full blog portal at [`aditya8242.github.io/blog`](https://aditya8242.github.io/blog).

- **Section 06: Footer / Direct Dispatch**
  - Minimalist call to action: *"Available for backend engineering roles, systems architecture, and technical consulting."*
  - Direct transmission links: Email (`aditya.h.chavan@gmail.com` with instant copy-to-clipboard), GitHub, LinkedIn, X (Twitter), and Phone (`+91 86699 06901`).

---

## 3. Interactive CLI Easter Egg

Visitors and recruiters can inspect the codebase and portfolio using an interactive UNIX terminal:
- Press `/` or click `[~]$` anywhere to trigger the modal shell.
- Click **RAW CLI** in the header to switch the entire page to full-screen workstation mode.

### Supported Commands:
- `help` — Show available commands
- `whoami` — Engineer positioning & philosophy
- `ls` / `ls projects/` — List virtual filesystem entries
- `cat resume.txt` — View full Harvard-format plaintext resume
- `open resume.pdf` — View official PDF resume
- `cat cvfs.c` — Inspect C++ in-memory inode & UFDT dispatch table
- `cat ftp_protocol.txt` — Display raw socket protocol sequence
- `skills` — Hardware-grade specification sheet
- `experience` — Professional B2B & systems career timeline
- `contact` — Direct dispatch endpoints
- `git log` — Git commit history
- `top` — Simulated kernel process table
- `uname -a` — Kernel architecture
- `clear` — Clear terminal buffer
- `gui` — Return to Apple-style editorial GUI view

---

## 4. GitHub Pages Deployment (`aditya8242.github.io`)

Because this project is built with zero build dependencies (vanilla semantic HTML5, pure CSS3 variables, and vanilla JavaScript), it deploys instantly to GitHub Pages with zero configuration.

### Deployment Steps:

1. Open your terminal in this directory:
   ```bash
   cd "C:\Users\Aditya\.gemini\antigravity\scratch\aditya8242.github.io"
   ```

2. Initialize Git (if not already done) and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for aditya8242.github.io portfolio"
   ```

3. Link to your GitHub repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/aditya8242/aditya8242.github.io.git
   git push -u origin main
   ```

4. Verify on GitHub:
   - Navigate to `https://github.com/aditya8242/aditya8242.github.io`
   - Go to **Settings** → **Pages**
   - Confirm **Source** is set to `Deploy from a branch` and branch is `main` / `root`
   - Your website will be live at: **https://aditya8242.github.io/**
