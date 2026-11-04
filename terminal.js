/**
 * ADITYA CHAVAN â€” UNIX TERMINAL EMULATOR & EASTER EGG ENGINE
 * Provides interactive CLI shell experience for recruiters and systems engineers.
 */

(function () {
  'use strict';

  const TERMINAL_BANNER = `
   ______   _____    ______  ______  __  __   ______  
  /\\  __ \\ /\\  __-. /\\__  _\\/\\__  _\\/\\ \\_\\ \\ /\\  __ \\ 
  \\ \\  __ \\\\ \\ \\/\\ \\\\/_/\\ \\/\\/_/\\ \\/\\ \\____ \\\\ \\  __ \\ 
   \\ \\_\\ \\_\\\\ \\____-   \\ \\_\\   \\ \\_\\ \\/\\_____\\\\ \\_\\ \\_\\
    \\/_/\\/_/ \\/____/    \\/_/    \\/_/  \\/_____/ \\/_/\\/_/
  
  ADITYA CHAVAN â€” SYSTEMS & BACKEND ARCHITECTURE
  Linux Internals Â· C/C++ Â· High-Concurrency Networking Â· Java/Spring Boot
  Type 'help' to inspect available system commands.
`;

  const COMMANDS = {
    help: {
      desc: 'Show available system commands',
      exec: () => `
SYSTEM CALLS & RECRUITER CLI UTILITIES:
  help               Display this operational manual
  whoami             Print engineer identity and design philosophy
  ls [path]          List projects, blog posts, and filesystem entries
  cat <file>         Print file contents (e.g. cat resume.txt, cat cvfs.c)
  blog               Explore engineering dispatches and essays
  open <target>      Open in browser (open resume.pdf, open blog, open github)
  skills             Display hardware-grade technical specifications
  experience         Print corporate B2B & systems career timeline
  contact            Output direct dispatch communication endpoints
  git log            Show recent systems & architecture commits
  top                Display running simulated kernel processes
  uname -a           Print operating system kernel architecture
  pwd                Print current working directory
  id                 Print current user identity and group privileges
  clear              Purge current terminal buffer
  gui                Toggle back to Apple hardware editorial view
  exit               Close terminal environment
`
    },

    whoami: {
      desc: 'Print engineer identity and positioning',
      exec: () => `
ENGINEER: Aditya Chavan
LOCATION: Pune, Maharashtra, India
ROLE:     Systems & Backend Software Engineer | Founder @ Iron & Logic
DOMAIN:   Linux Internals, C/C++, POSIX Sockets, Scalable Spring Boot Backends, B2B SaaS
QUOTE:    "Brute force the logic first. Optimize it later."
STATUS:   Available for backend engineering roles, systems architecture, and technical consulting.
`
    },

    pwd: {
      desc: 'Print current working directory',
      exec: () => '/home/aditya/portfolio'
    },

    id: {
      desc: 'Print user and group IDs',
      exec: () => 'uid=1000(aditya) gid=1000(aditya) groups=1000(aditya),998(wheel),992(docker),990(kvm)'
    },

    ls: {
      desc: 'List directory entries',
      exec: (args) => {
        const target = args[0] ? args[0].toLowerCase().replace(/\/$/, '') : '';
        if (target === 'projects' || target === 'projects/') {
          return `
drwxr-xr-x  4 aditya staff   128 Feb 2025  01_CVFS_VirtualFileSystem   (C++ / Linux Internals)
drwxr-xr-x  4 aditya staff   128 Feb 2026  02_ConcurrentFTPServer      (C / POSIX Sockets)
drwxr-xr-x  4 aditya staff   128 Jan 2025  03_EggRateBot_Automation    (Python / GitHub Actions)
drwxr-xr-x  4 aditya staff   128 Mar 2025  04_FaceRecogESP_Embedded    (C++ / ESP32-CAM / CV)
drwxr-xr-x  4 aditya staff   128 Jan 2025  05_EduTrack_Backend         (Java / Spring Boot / MongoDB)
drwxr-xr-x  4 aditya staff   128 Jul 2026  06_IronVault_Archiver       (Java / Binary Packing / XOR)
drwxr-xr-x  4 aditya staff   128 Dec 2024  07_maKneeTrack_CLI          (Java / JDBC / SQLite)
`;
        }
        if (target === 'blog' || target === 'blog/') {
          return `
-rw-r--r--  1 aditya staff  5056 Oct 2025  learned-open-source-the-hard-way.html
-rw-r--r--  1 aditya staff  5663 Jan 2025  automating-a-daily-task.html
  -rw-r--r--  1 aditya staff  4890 Nov 2026  simplicity-systems-discipline.html
-rw-r--r--  1 aditya staff  7200 Nov 2026  basti-drift-audio-lab.html
-rw-r--r--  1 aditya staff  1024 Forthcoming  simplicity-and-systems.txt
`;
        }
        return `
drwxr-xr-x  4 aditya staff   128 Nov 02 11:00  projects/
drwxr-xr-x  4 aditya staff   128 Nov 02 11:25  blog/
-rw-r--r--  1 aditya staff  2840 Nov 02 11:00  resume.txt
-rw-r--r--  1 aditya staff  7590 Oct 23 09:53  Resume.pdf
-rw-r--r--  1 aditya staff  1024 Feb 15  2025  cvfs.c
-rw-r--r--  1 aditya staff   890 Feb 20  2026  ftp_protocol.txt
-rw-r--r--  1 aditya staff   512 Nov 02 11:00  contact.sh
-rw-r--r--  1 aditya staff   940 Nov 02 11:00  specs.json
`;
      }
    },

    blog: {
      desc: 'List engineering essays and articles',
      exec: () => `
================================================================================
ENGINEERING DISPATCHES & FIELD NOTES (aditya8242.github.io/blog)
================================================================================
[01] I Learned Open Source the Hard Way
     Subtitle: By failing publicly
     Date:     October 2025 Â· 4 min read
     Tags:     Open Source Â· C/Doxygen Â· Maintainer Reality
     URI:      /blog/learned-open-source-the-hard-way.html

[02] Automating a Daily Task Instead of Repeating It
     Subtitle: Replacing fragile manual work with a simple system
     Date:     2025 Â· 4 min read
     Tags:     Defensive Programming Â· Python Â· GitHub Actions
     URI:      /blog/automating-a-daily-task.html

  [03] Simplicity, Systems, and Engineering Discipline
       Subtitle: Why the best software is hard to mess up
       Date:     2026 Â· 3 min read
       Tags:     Philosophy Â· Systems Architecture Â· Discipline
       URI:      /blog/simplicity-systems-discipline.html

  [04] Basti Drift: Engineering an In-Browser Vocal Studio & Beat Lab
       Subtitle: Zero dependencies, GPU-accelerated ambient lighting, and open DAW standards
       Date:     Nov 2026 · 4 min read
       Tags:     Audio Engineering · Web Audio API · Open Standards
       URI:      /blog/basti-drift-audio-lab.html

Type 'open blog' to launch the essays portal in your browser.
`
    },

    open: {
      desc: 'Open a document or link',
      exec: (args) => {
        if (!args[0]) return 'open: missing filename. Usage: open resume.pdf, open blog';
        const target = args[0].toLowerCase();
        if (target.includes('blog')) {
          window.location.href = 'blog/';
          return 'Navigating to /blog...';
        }
        if (target.includes('basti') || target.includes('studio') || target.includes('vocal')) {
          window.open('https://aditya8242.github.io/basti-drift-audio-lab/', '_blank');
          return 'Opening Basti Drift // Kaalya Raatri Vocal Studio in a new tab...';
        }
        if (target.includes('resume')) {
          window.open('Resume.pdf', '_blank');
          return 'Opening Resume.pdf in a new tab...';
        }
        if (target.includes('github')) {
          window.open('https://github.com/aditya8242', '_blank');
          return 'Navigating to github.com/aditya8242...';
        }
        if (target.includes('linkedin')) {
          window.open('https://linkedin.com/in/adityachavan24', '_blank');
          return 'Navigating to linkedin.com/in/adityachavan24...';
        }
        return `open: unable to open ${args[0]}`;
      }
    },

    cat: {
      desc: 'Concatenate and display files',
      exec: (args) => {
        if (!args[0]) return 'cat: missing operand. Usage: cat <filename>';
        const file = args[0].toLowerCase();

        if (file === 'resume.pdf') {
          window.open('Resume.pdf', '_blank');
          return '[Binary PDF Stream: Opening Resume.pdf in browser viewer...]';
        }

        if (file === 'resume.txt' || file === 'resume') {
          return `
================================================================================
                                ADITYA CHAVAN
                Pune, India Â· aditya.h.chavan@gmail.com Â· +91 86699 06901
     linkedin.com/in/adityachavan24 Â· github.com/aditya8242 Â· aditya8242.github.io
================================================================================

SUMMARY:
Computer Science undergraduate specializing in systems programming and backend
development. Built a complete in-memory Unix-like virtual file system in C++
featuring custom inode tables, file descriptor management, and seven core system
calls. Strong foundation in Linux internals, C/C++, Java/Spring Boot, and clean
layered architecture. Focused on correctness, simplicity, and production-ready code.

EDUCATION:
Bachelor of Science, Computer Science â€” 7.8 CGPA (2023 â€“ 2026)
Savitribai Phule Pune University, Pune, India

EXPERIENCE:
1. Brilliant Info Systems Pvt. Ltd. â€” Intern (Oct 2026 â€“ Present Â· Kothrud, Pune)
   â€¢ Capture customer requirements, support software demos and proposals, and
     maintain client records and market research.

2. Iron & Logic â€” Web Architect & Software Engineer (Aug 2026 â€“ Present Â· Pune, India)
   â€¢ Build web architecture and booking integrations for local Pune businesses;
     develop AI-integrated tooling for B2B lead generation.

TECHNICAL SKILLS:
Languages: C, C++, Java, Python, JavaScript
Systems:   Linux, UNIX internals, Bash/Shell scripting, OS concepts (processes, memory, file systems)
Backend:   Spring Boot, REST APIs, Layered Architecture (Controllerâ€“Serviceâ€“Repository)
Frontend:  React, Tailwind CSS
Databases: MySQL, PostgreSQL, MongoDB, SQLite, JDBC
Tools:     Git, Docker, GitHub Actions, Vercel, Cloudflare, Vim, IntelliJ IDEA, VS Code

TECHNICAL PROJECTS:
â€¢ Customized Virtual File System (CVFS) â€” Feb 2025 | C++ / Linux
  github.com/aditya8242/CustomizedVirtualFileSystem
  â€¢ Designed and implemented a fully in-memory Unix-like virtual file system from
    scratch, including custom inode tables, User File Descriptor Table (UFDT),
    and precise file offset tracking.
  â€¢ Built seven core system calls (creat, open, read, write, unlink, stat, ls)
    modeled on UNIX UFS internals, with permission handling, structured error codes,
    and a clean CLI interface.

â€¢ Concurrent FTP Server â€” Feb 2026 | C / Sockets / Linux
  github.com/aditya8242/ConcurrentFTPServer
  â€¢ Built a TCP file-transfer server using fork-per-connection architecture,
    allowing multiple clients to download files in parallel via isolated child processes.
  â€¢ Designed a custom line-based protocol (filename request -> size header -> raw
    byte stream) for reliable file transfer over raw sockets.

â€¢ IronVault â€” File Archiver with Encryption â€” Jul 2026 | Java / Swing
  github.com/aditya8242/IronVault
  â€¢ Built a file archiver that packs an entire directory into a single binary
    archive using a custom header format and repeating XOR encryption keyed to a
    user-supplied password.
  â€¢ Supports 18 file formats including documents, images, source code, and media.
    Ships with a Swing GUI â€” no external dependencies.

â€¢ EduTrack â€” Classroom & Student Management Portal â€” Jan 2025 | Java / Spring Boot / MongoDB / Docker
  github.com/aditya8242/EduTrack Â· Live: edutrack-3426.onrender.com
  â€¢ Developed a production-ready Spring Boot backend with RESTful CRUD APIs for
    courses and fee management, using MongoDB and clean Controllerâ€“Serviceâ€“Repository architecture.
  â€¢ Dockerized and deployed on Render with MongoDB Atlas â€” live at edutrack-3426.onrender.com

OPEN SOURCE:
â€¢ Contributed Doxygen-compatible documentation to ccgargantua/ini (C library).
  Iterated through maintainer review, verified IDE rendering, and confirmed
  clean Doxygen build output. PR #24 merged.

CERTIFICATIONS:
â€¢ PostgreSQL Developer â€” Infosys Springboard (2025)
â€¢ Basics of Python â€” Infosys Springboard (2025)
`;
        }

        if (file === 'cvfs.c') {
          return `
/*
 * Customized Virtual File System (CVFS) - Core System Call Table
 * Modeling UNIX UFS Inode & User File Descriptor Table (UFDT)
 */

typedef struct inode {
    char FileName[50];
    int InodeNumber;
    int FileSize;
    int FileActualSize;
    int FileType;           // Regular file or Directory
    char *Buffer;           // 1024-byte in-memory data block
    int LinkCount;
    int ReferenceCount;
    int Permission;         // 1: Read, 2: Write, 3: Read+Write
    struct inode *next;
} INODE, *PINODE;

typedef struct filetable {
    int readoffset;
    int writeoffset;
    int count;
    int mode;
    PINODE ptrinode;
} FILETABLE, *PFILETABLE;

typedef struct ufdt {
    PFILETABLE ptrfiletable;
} UFDT;

UFDT UFDTArr[50]; // User File Descriptor Table array

// 7 Supported Core System Calls:
// int CreateFile(char *name, int permission);
// int OpenFile(char *name, int mode);
// int ReadFile(int fd, char *arr, int isize);
// int WriteFile(int fd, char *arr, int isize);
// int CloseFileByName(char *name);
// int rm_File(char *name);
// int fstat_file(int fd);
`;
        }

        if (file === 'ftp_protocol.txt') {
          return `
================================================================================
CONCURRENT FTP SERVER WIRE PROTOCOL SPECIFICATION
================================================================================

CLIENT                                        SERVER (Master Listening on :2121)
  â”‚                                                      â”‚
  â”‚â”€â”€â”€ TCP Handshake (SYN) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚
  â”‚â—„â”€â”€ TCP Handshake (SYN-ACK) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”‚
  â”‚                                                      â”‚
  â”‚                                            [fork() child process]
  â”‚                                            [PID: 2841, Isolated Socket]
  â”‚                                                      â”‚
  â”‚â”€â”€â”€ "RETR dataset.tar.gz\\n" â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚
  â”‚                                                      â”‚
  â”‚â—„â”€â”€ "SIZE 4194304\\n" â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”‚ (File Size Header)
  â”‚â”€â”€â”€ "ACK\\n" â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚
  â”‚                                                      â”‚
  â”‚â—„â”€â”€ [Raw Byte Stream: 4.19MB Chunked @ 4KB Buffer] â”€â”€â”€â”‚
  â”‚                                                      â”‚
  â”‚â”€â”€â”€ "TRANSFER_COMPLETE\\n" â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚
  â”‚â—„â”€â”€ "226 Closing Data Connection\\n" â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”‚
`;
        }

        if (file === 'specs.json') {
          return `
{
  "engineer": "Aditya Chavan",
  "languages": ["C", "C++", "Java", "Python", "JavaScript", "Bash"],
  "systems": ["Linux Internals", "POSIX Sockets", "In-Memory Filesystems", "Concurrency", "Process Forking"],
  "backend": ["Spring Boot", "REST APIs", "Layered Architecture", "JDBC"],
  "databases": ["PostgreSQL", "MongoDB", "MySQL", "SQLite"],
  "infrastructure": ["Docker", "Git", "GitHub Actions CI/CD", "Vercel", "Cloudflare", "Vim"]
}
`;
        }

        if (file === 'contact.sh') {
          return `
#!/usr/bin/env bash
echo "Aditya Chavan Direct Dispatch:"
echo "Email:    aditya.h.chavan@gmail.com"
echo "Phone:    +91 86699 06901"
echo "GitHub:   https://github.com/aditya8242"
echo "LinkedIn: https://linkedin.com/in/adityachavan24"
echo "X:        https://x.com/ad1tya24"
`;
        }

        return `cat: ${args[0]}: No such file or directory. Try 'ls' to see files.`;
      }
    },

    top: {
      desc: 'Display running system processes',
      exec: () => `
top - 11:24:02 up 14 days,  3:18,  1 user,  load average: 0.12, 0.08, 0.04
Tasks: 4 total, 1 running, 3 sleeping, 0 stopped, 0 zombie
%Cpu(s):  1.2 us,  0.4 sy,  0.0 ni, 98.4 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :  32142.8 total,  24118.2 free,   4812.4 used,   3212.2 buff/cache

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 2841 aditya    20   0  142.8m  24.2m  12.1m S   0.0   0.1   0:00.12 cvfs_engine
 2852 aditya    20   0   98.4m  18.6m   9.4m S   0.0   0.1   0:00.08 ftp_daemon
 3104 aditya    20   0 1024.0m 340.2m  45.1m S   0.2   1.1   0:01.45 edutrack_api
 4012 aditya    20   0   48.2m  12.4m   8.2m R   0.0   0.0   0:00.02 bash
`
    },

    git: {
      desc: 'Version control actions',
      exec: (args) => {
        if (args.includes('log')) {
          return `
commit 7f2026a (HEAD -> main, origin/main)
Author: Aditya Chavan <aditya.h.chavan@gmail.com>
Date:   Mon Nov 2 11:00:00 2026 +0530

    feat(systems): optimize byte offset tracking in CVFS in-memory UFDT

commit 4a981c2
Author: Aditya Chavan <aditya.h.chavan@gmail.com>
Date:   Fri Feb 20 18:24:10 2026 +0530

    feat(ftp): fork-per-connection concurrency with isolated child process pipes

commit 21b589d
Author: Aditya Chavan <aditya.h.chavan@gmail.com>
Date:   Wed Jan 15 14:10:02 2025 +0530

    feat(edutrack): containerize Spring Boot service with Docker and MongoDB Atlas

commit 19d84e1
Author: Aditya Chavan <aditya.h.chavan@gmail.com>
Date:   Sun Oct 12 09:12:44 2025 +0530

    docs(upstream): ccgargantua/ini PR #24 merged - Doxygen compatibility
`;
        }
        return 'git: specify command (e.g. git log)';
      }
    },

    skills: {
      desc: 'Hardware-grade technical specification',
      exec: () => `
================================================================================
TECHNICAL SPECIFICATION SHEET
================================================================================
SYSTEMS & LANGUAGES:
  â€¢ C, C++, Java, Python, JavaScript, Bash / Shell
  â€¢ Linux / UNIX Internals, POSIX Sockets, Concurrency, File System Architecture

BACKEND & DATA:
  â€¢ Spring Boot, REST APIs, Controller-Service-Repository Pattern
  â€¢ PostgreSQL, MongoDB, MySQL, SQLite, JDBC

INFRASTRUCTURE & TOOLING:
  â€¢ Docker, Git, GitHub Actions CI/CD, Vercel, Cloudflare, Vim, Linux CLI

ACADEMICS & OPEN SOURCE:
  â€¢ Savitribai Phule Pune University â€” B.Sc. Computer Science (7.8 CGPA, 2023â€“2026)
  â€¢ Open Source Contributor: ccgargantua/ini (PR #24 Merged)
`
    },

    experience: {
      desc: 'Display professional engineering timeline',
      exec: () => `
================================================================================
EXPERIENCE & WORK
================================================================================

[01] Brilliant Info Systems Pvt. Ltd. â€” Intern
     Period:   Oct 2026 â€“ Present Â· Kothrud, Pune
     Scope:    Understanding customer requirements, communicating specifications
               to the technical team, supporting software product demonstrations
               and technical proposals, structuring client data, and supporting
               operations across the enterprise B2B sales cycle.

[02] Iron & Logic â€” Web Architect & Software Engineer
     Period:   Aug 2026 â€“ Present Â· Pune, India
     Scope:    Building high-performance web architecture, direct booking
               integrations, and AI-integrated internal B2B outreach tooling
               for businesses and venues in Pune.
`
    },

    contact: {
      desc: 'Output direct communication channels',
      exec: () => `
DIRECT DISPATCH ENDPOINTS:
  Email:    aditya.h.chavan@gmail.com (Click or type to email)
  Phone:    +91 86699 06901
  GitHub:   https://github.com/aditya8242
  LinkedIn: https://linkedin.com/in/adityachavan24
  Twitter:  https://x.com/ad1tya24
  Location: Pune, Maharashtra, India
`
    },

    uname: {
      desc: 'Print system information',
      exec: (args) => {
        if (args.includes('-a') || args.length === 0) {
          return 'Linux arch-pune 6.12.4-arch1-1-custom #1 SMP PREEMPT_DYNAMIC Aditya x86_64 GNU/Linux';
        }
        return 'Linux';
      }
    },

    date: {
      desc: 'Print system time',
      exec: () => new Date().toString()
    },

    echo: {
      desc: 'Display line of text',
      exec: (args) => args.join(' ')
    },

    sudo: {
      desc: 'Execute command with elevated privileges',
      exec: () => `aditya is not in the sudoers file. This incident will be reported to Linus Torvalds.`
    },

    matrix: {
      desc: 'Wake up, Neo...',
      exec: () => `01000001 01000100 01010100 01011001 01000001\nFollow the white rabbit into the kernel.`
    }
  };

  class TerminalEngine {
    constructor(containerEl, inputEl, outputEl, onGuiRequested, onCloseRequested) {
      this.container = containerEl;
      this.input = inputEl;
      this.output = outputEl;
      this.onGuiRequested = onGuiRequested;
      this.onCloseRequested = onCloseRequested;
      this.history = [];
      this.historyIndex = -1;

      this.init();
    }

    init() {
      this.print(TERMINAL_BANNER.trim());
      this.print(`System initialized at ${new Date().toLocaleTimeString()} IST. Ready.\n`);

      this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
      this.container.addEventListener('click', () => this.input.focus());
    }

    print(text, isError = false) {
      const line = document.createElement('div');
      line.className = 'term-line';
      if (isError) line.style.color = '#F87171';
      line.textContent = text;
      this.output.appendChild(line);
      this.container.scrollTop = this.container.scrollHeight;
    }

    clear() {
      this.output.innerHTML = '';
    }

    execute(cmdString) {
      const trimmed = cmdString.trim();
      if (!trimmed) return;

      // Log prompt command in output
      const cmdEcho = document.createElement('div');
      cmdEcho.className = 'term-line';
      cmdEcho.innerHTML = `<span style="color:var(--accent-green);font-weight:600;">aditya@arch-pune:~$</span> ${escapeHtml(trimmed)}`;
      this.output.appendChild(cmdEcho);

      // Save history
      this.history.push(trimmed);
      this.historyIndex = this.history.length;

      const parts = trimmed.split(/\s+/);
      const commandName = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (commandName === 'clear') {
        this.clear();
        return;
      }

      if (commandName === 'gui') {
        if (this.onGuiRequested) this.onGuiRequested();
        return;
      }

      if (commandName === 'exit') {
        if (this.onCloseRequested) this.onCloseRequested();
        return;
      }

      if (commandName === 'history') {
        const histText = this.history.map((h, i) => `  ${i + 1}  ${h}`).join('\n');
        this.print(histText);
        return;
      }

      if (Object.prototype.hasOwnProperty.call(COMMANDS, commandName)) {
        try {
          const result = COMMANDS[commandName].exec(args);
          if (result) this.print(result);
        } catch (err) {
          this.print(`Execution error: ${escapeHtml(err.message)}`, true);
        }
      } else {
        this.print(`bash: ${commandName}: command not found. Type 'help' to inspect available commands.`, true);
      }
    }

    handleKeyDown(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = this.input.value;
        this.input.value = '';
        this.execute(value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.history.length === 0) return;
        if (this.historyIndex > 0) {
          this.historyIndex--;
        }
        this.input.value = this.history[this.historyIndex] || '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.handleTabCompletion();
      }
    }

    handleTabCompletion() {
      const current = this.input.value.trim();
      if (!current) return;

      const words = current.split(/\s+/);
      if (words.length === 1) {
        // Autocomplete command
        const matches = Object.keys(COMMANDS).concat(['clear', 'gui', 'exit', 'history', 'open', 'top', 'git'])
          .filter(c => c.startsWith(words[0].toLowerCase()));
        if (matches.length === 1) {
          this.input.value = matches[0] + ' ';
        } else if (matches.length > 1) {
          this.print(`Possible completions:\n  ${matches.join('  ')}`);
        }
      } else if (words.length === 2 && (words[0] === 'cat' || words[0] === 'ls' || words[0] === 'open')) {
        const fileList = ['resume.txt', 'Resume.pdf', 'cvfs.c', 'ftp_protocol.txt', 'specs.json', 'contact.sh', 'projects/'];
        const matches = fileList.filter(f => f.toLowerCase().startsWith(words[1].toLowerCase()));
        if (matches.length === 1) {
          this.input.value = `${words[0]} ${matches[0]}`;
        } else if (matches.length > 1) {
          this.print(`Matching files:\n  ${matches.join('  ')}`);
        }
      }
    }
  }

  function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Export to window
  window.TerminalEngine = TerminalEngine;
  window.AVAILABLE_COMMANDS = COMMANDS;
})();
