/**
 * BERSERK MANGA EDITION // 3D INTERACTIVE FLIPPING TOME
 * Powered by StPageFlip (Real-life 3D Page Turn Physics)
 * Inspired by Kentaro Miura's Berserk & Guts
 */

(function () {
  'use strict';

  let pageFlipInstance = null;
  let isTomeOpen = false;

  // Synthesize realistic audio (Paper flip rustle & Metallic sword resonance)
  function playAudioCue(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'page-flip') {
        // Realistic paper rustle / page turn swoosh (bandpass filtered white noise)
        const bufferSize = ctx.sampleRate * 0.18;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.18);
        filter.Q.setValueAtTime(2.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();
        noise.stop(ctx.currentTime + 0.18);
      } else if (type === 'sword-open') {
        // Deep Eclipse metallic bell & Dragonslayer blade ring
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(82, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(41, ctx.currentTime + 0.8);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1240, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.8);
        osc2.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Construct the 3D Manga Tome DOM structure
  function createMangaTomeDOM() {
    if (document.getElementById('berserk-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'berserk-modal';
    modal.innerHTML = `
      <!-- Top Tome Controls -->
      <header class="tome-topbar">
        <div class="tome-brand-title">
          <span class="tome-rune-icon">𒉭</span>
          <span>THE STRUGGLER'S TOME // BERSERK EDITION</span>
        </div>
        <div class="tome-actions">
          <button id="tome-jump-cover" class="tome-btn" title="Jump to Front Cover">Cover</button>
          <button id="tome-jump-systems" class="tome-btn" title="Jump to Systems Chapter">Systems</button>
          <button id="tome-jump-projects" class="tome-btn" title="Jump to Production Chapter">Production</button>
          <button id="tome-close-btn" class="tome-close-btn" title="Close Tome (Esc)">
            <span>&times;</span>
            <span>CLOSE (ESC)</span>
          </button>
        </div>
      </header>

      <!-- 3D Book Stage -->
      <main class="tome-stage">
        <div id="manga-book">
          
          <!-- PAGE 0: HARD FRONT COVER -->
          <div class="manga-page page-cover" data-density="hard">
            <div class="cover-front">
              <div class="cover-border-frame">
                <div class="cover-kanji">生 贄 の 書</div>
                <div>
                  <div class="cover-brand-rune-char">𒉭</div>
                  <h1 class="cover-title">ADITYA CHAVAN</h1>
                  <div class="cover-subtitle">THE STRUGGLER'S CODEBOOK</div>
                </div>
                <div class="cover-author">SYSTEMS &bull; BACKEND ARCHITECTURE</div>
                <div class="cover-hint">
                  <span>DRAG CORNER OR CLICK TO OPEN</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          </div>

          <!-- PAGE 1: THE ECLIPSE & THE PROPHECY (LEFT SPREAD) -->
          <div class="manga-page">
            <div class="page-inner">
              <div>
                <span class="chapter-badge">THE PROPHECY</span>
                <h2 class="chapter-title">THE ECLIPSE</h2>
                
                <div class="manga-panel" style="height: 180px;">
                  <img src="berserk_assets/eclipse.webp" alt="The Berserk Eclipse" class="manga-art-img" />
                  <span class="manga-sfx">ゴゴゴ...</span>
                </div>

                <div class="manga-quote-box">
                  &ldquo;In this world, is the destiny of mankind controlled by some transcendental entity or law? At least it is true that man has no control; even over his own will.&rdquo;
                  <span class="manga-quote-author">&mdash; Void // God Hand &bull; Kentaro Miura</span>
                </div>

                <p class="manga-body-text">
                  Branded on the hand with the <strong>Brand of Sacrifice</strong>. Wielding code like forged iron. We reject bloated enterprise frameworks and fragile abstractions.
                </p>
              </div>

              <div class="page-footer-num">
                <span>VOL. 1 &bull; THE ECLIPSE</span>
                <span>PAGE 01</span>
              </div>
            </div>
          </div>

          <!-- PAGE 2: CHAPTER I — THE BLACK SWORDSMAN (RIGHT SPREAD) -->
          <div class="manga-page">
            <div class="page-inner">
              <div>
                <span class="chapter-badge">CHAPTER I</span>
                <h2 class="chapter-title">THE BLACK SWORDSMAN</h2>

                <div class="manga-panel" style="height: 200px;">
                  <img src="berserk_assets/guts.webp" alt="Guts The Black Swordsman" class="manga-art-img" />
                  <span class="manga-sfx">ドン!</span>
                </div>

                <p class="manga-body-text">
                  <strong>ADITYA CHAVAN</strong> &mdash; Systems & Backend Software Engineer based in Pune, India.
                </p>

                <div class="manga-project-card">
                  <div class="manga-card-head">
                    <span class="manga-card-title">IRON PHILOSOPHY</span>
                    <span class="manga-card-tag">SYSTEMS</span>
                  </div>
                  <p class="manga-card-desc">
                    &ldquo;Brute force the logic first. Optimize it later.&rdquo; Engineering from the metal up using Linux internals, C/C++, POSIX networking, and scalable Java/Spring Boot backends.
                  </p>
                </div>

                <p class="manga-body-text" style="margin-top: 10px;">
                  <strong>Academics:</strong> Savitribai Phule Pune University &mdash; B.Sc. Computer Science (7.8 CGPA, 2023&ndash;2026).
                </p>
              </div>

              <div class="page-footer-num">
                <span>ADITYA CHAVAN</span>
                <span>PAGE 02</span>
              </div>
            </div>
          </div>

          <!-- PAGE 3: CHAPTER II — FORGED IN STEEL: CVFS (LEFT SPREAD) -->
          <div class="manga-page">
            <div class="page-inner">
              <div>
                <span class="chapter-badge">CHAPTER II</span>
                <h2 class="chapter-title">FORGED IN STEEL: CVFS</h2>

                <div class="manga-panel" style="height: 180px;">
                  <img src="berserk_assets/guts2.webp" alt="Guts Combat" class="manga-art-img" />
                  <span class="manga-sfx">ザッ!</span>
                </div>

                <div class="manga-project-card">
                  <div class="manga-card-head">
                    <span class="manga-card-title">Customized Virtual File System</span>
                    <span class="manga-card-tag">C++ / Linux</span>
                  </div>
                  <p class="manga-card-desc">
                    Fully in-memory Unix-like virtual filesystem designed from scratch. Features custom inode tables, User File Descriptor Table (UFDT), and file offset pointer management.
                  </p>
                  <p class="manga-card-desc" style="margin-top: 4px; font-family:'JetBrains Mono', monospace; font-size: 0.68rem; color:#FCA5A5;">
                    Syscalls: creat, open, read, write, unlink, stat, ls
                  </p>
                  <a href="https://github.com/aditya8242/CustomizedVirtualFileSystem" target="_blank" rel="noopener noreferrer" class="manga-link">
                    Inspect Repository &rarr;
                  </a>
                </div>
              </div>

              <div class="page-footer-num">
                <span>SYSTEMS ARCHITECTURE</span>
                <span>PAGE 03</span>
              </div>
            </div>
          </div>

          <!-- PAGE 4: CONCURRENT NETWORKING & ARCHIVERS (RIGHT SPREAD) -->
          <div class="manga-page">
            <div class="page-inner">
              <div>
                <span class="chapter-badge">CONCURRENCY & DATA</span>
                <h2 class="chapter-title">NETWORK PROTOCOLS</h2>

                <div class="manga-project-card" style="margin-top: 0;">
                  <div class="manga-card-head">
                    <span class="manga-card-title">Concurrent FTP Server</span>
                    <span class="manga-card-tag">C / Sockets</span>
                  </div>
                  <p class="manga-card-desc">
                    TCP file-transfer daemon built on raw POSIX sockets using fork-per-connection architecture. Multiple clients download simultaneously via isolated child processes.
                  </p>
                  <a href="https://github.com/aditya8242/ConcurrentFTPServer" target="_blank" rel="noopener noreferrer" class="manga-link">
                    View Protocol Spec &rarr;
                  </a>
                </div>

                <div class="manga-project-card" style="margin-top: 10px;">
                  <div class="manga-card-head">
                    <span class="manga-card-title">IronVault Archiver</span>
                    <span class="manga-card-tag">Java / Swing</span>
                  </div>
                  <p class="manga-card-desc">
                    Packs full directories into custom binary archives with repeating XOR encryption and 18 supported formats. Zero external libraries.
                  </p>
                </div>

                <div class="manga-project-card" style="margin-top: 10px;">
                  <div class="manga-card-head">
                    <span class="manga-card-title">EduTrack Platform</span>
                    <span class="manga-card-tag">Spring Boot</span>
                  </div>
                  <p class="manga-card-desc">
                    Enterprise student management backend with REST CRUD APIs, MongoDB Atlas, and Docker containerization deployed on Render.
                  </p>
                </div>
              </div>

              <div class="page-footer-num">
                <span>CONCURRENCY // DAEMONS</span>
                <span>PAGE 04</span>
              </div>
            </div>
          </div>

          <!-- PAGE 5: CHAPTER III — THE BAND OF THE HAWK (LEFT SPREAD) -->
          <div class="manga-page">
            <div class="page-inner">
              <div>
                <span class="chapter-badge">CHAPTER III</span>
                <h2 class="chapter-title">THE BAND OF THE HAWK</h2>

                <div class="manga-panel" style="height: 180px;">
                  <img src="berserk_assets/berserker_armor.webp" alt="Berserker Armor" class="manga-art-img" />
                  <span class="manga-sfx">ガッ!</span>
                </div>

                <div class="manga-project-card">
                  <div class="manga-card-head">
                    <span class="manga-card-title">Iron & Logic</span>
                    <span class="manga-card-tag">Founder</span>
                  </div>
                  <p class="manga-card-desc">
                    Boutique systems studio in Pune building sub-400ms web architecture and direct booking engines that bypass 25% aggregator cuts (Practo/Swiggy).
                  </p>
                  <div style="display:flex; gap:10px; margin-top:6px;">
                    <a href="https://ironandlogic.vercel.app/prototypes/clinic/" target="_blank" rel="noopener noreferrer" class="manga-link">Clinic Demo &rarr;</a>
                    <a href="https://ironandlogic.vercel.app/prototypes/cafe/" target="_blank" rel="noopener noreferrer" class="manga-link">Cafe Demo &rarr;</a>
                  </div>
                </div>

                <div class="manga-project-card" style="margin-top: 10px;">
                  <div class="manga-card-head">
                    <span class="manga-card-title">Brilliant Info Systems</span>
                    <span class="manga-card-tag">Intern</span>
                  </div>
                  <p class="manga-card-desc">
                    Enterprise supply chain software (WMS/IoT), B2B digital marketing automation in Zoho, and client technical requirements engineering.
                  </p>
                </div>
              </div>

              <div class="page-footer-num">
                <span>PRODUCTION VENTURES</span>
                <span>PAGE 05</span>
              </div>
            </div>
          </div>

          <!-- PAGE 6: CHAPTER IV — DISPATCHES FROM THE BATTLEFIELD (RIGHT SPREAD) -->
          <div class="manga-page">
            <div class="page-inner">
              <div>
                <span class="chapter-badge">CHAPTER IV</span>
                <h2 class="chapter-title">FIELD DISPATCHES</h2>

                <div class="manga-panel" style="height: 175px;">
                  <img src="berserk_assets/guts_moon_field.webp" alt="Guts in Moonlit Field" class="manga-art-img" />
                  <span class="manga-sfx">スッ...</span>
                </div>

                <p class="manga-body-text" style="font-weight: 700; color: #FFF; margin-bottom: 4px;">
                  Published Technical Essays:
                </p>

                <div class="manga-project-card">
                  <div class="manga-card-head">
                    <span class="manga-card-title">Why Modern Screen Time is Flawed</span>
                    <span class="manga-card-tag">Python/Kotlin</span>
                  </div>
                  <p class="manga-card-desc">
                    Solving siloed clock double-counting across Windows, Android, and TVs using sweep-line interval union math.
                  </p>
                </div>

                <div class="manga-project-card" style="margin-top: 8px;">
                  <div class="manga-card-head">
                    <span class="manga-card-title">I Learned Open Source the Hard Way</span>
                    <span class="manga-card-tag">PR #24 Merged</span>
                  </div>
                  <p class="manga-card-desc">
                    Contributing Doxygen documentation to ccgargantua/ini C library through strict maintainer reviews.
                  </p>
                </div>
              </div>

              <div class="page-footer-num">
                <span>ESSAYS & WRITINGS</span>
                <span>PAGE 06</span>
              </div>
            </div>
          </div>

          <!-- PAGE 7: CHAPTER V — SUMMON THE STRUGGLER (LEFT SPREAD) -->
          <div class="manga-page">
            <div class="page-inner">
              <div>
                <span class="chapter-badge">EPILOGUE</span>
                <h2 class="chapter-title">SUMMON THE STRUGGLER</h2>

                <div class="manga-quote-box">
                  &ldquo;Struggle, endure, contend. For that alone is the sword of one who defies death.&rdquo;
                  <span class="manga-quote-author">&mdash; Skull Knight to Guts // 烙印の者</span>
                </div>

                <p class="manga-body-text">
                  Direct dispatch endpoints for systems engineering roles, high-concurrency backends, and architecture consulting:
                </p>

                <div style="display:flex; flex-direction:column; gap:8px; margin-top:14px; font-family:'JetBrains Mono', monospace; font-size:0.75rem;">
                  <div style="padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:4px;">
                    <span style="color:#F87171;">EMAIL:</span> <a href="mailto:aditya.h.chavan@gmail.com" style="color:#FFF; text-decoration:none;">aditya.h.chavan@gmail.com</a>
                  </div>
                  <div style="padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:4px;">
                    <span style="color:#F87171;">PHONE:</span> <span style="color:#FFF;">+91 86699 06901</span>
                  </div>
                  <div style="padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:4px;">
                    <span style="color:#F87171;">GITHUB:</span> <a href="https://github.com/aditya8242" target="_blank" rel="noopener noreferrer" style="color:#FFF; text-decoration:none;">github.com/aditya8242</a>
                  </div>
                  <div style="padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:4px;">
                    <span style="color:#F87171;">CALENDAR:</span> <a href="https://cal.com/aditya-zlapkf" target="_blank" rel="noopener noreferrer" style="color:#EF4444; text-decoration:none; font-weight:700;">cal.com/aditya-zlapkf &rarr;</a>
                  </div>
                </div>
              </div>

              <div class="page-footer-num">
                <span>DIRECT DISPATCH</span>
                <span>PAGE 07</span>
              </div>
            </div>
          </div>

          <!-- PAGE 8: HARD BACK COVER (MEMORIAL TO KENTARO MIURA) -->
          <div class="manga-page page-cover" data-density="hard">
            <div class="cover-front">
              <div class="cover-border-frame">
                <div class="cover-kanji">完 &bull; THE END</div>
                
                <div class="miura-memorial-card">
                  <div class="back-brand-rune-char">𒉭</div>
                  <h3 class="miura-title">KENTARO MIURA</h3>
                  <div class="miura-dates">三浦 建太郎 &bull; 1966 &ndash; 2021</div>
                  <p class="miura-quote">
                    &ldquo;He lived. He fought. He created.&rdquo;
                  </p>
                  <div class="miura-seal">STRUGGLER'S COMMEMORATION</div>
                </div>

                <div class="cover-hint" style="cursor:pointer;" id="tome-flip-back-first">
                  <span>&larr; FLIP BACK TO FRONT</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <!-- Bottom Flip Controls Bar -->
      <footer class="tome-bottombar">
        <button id="tome-prev-arrow" class="tome-nav-arrow" title="Previous Page (Left Arrow)">&larr;</button>
        <div id="tome-page-info" class="tome-page-counter">COVER &bull; DRAG OR CLICK TO TURN</div>
        <button id="tome-next-arrow" class="tome-nav-arrow" title="Next Page (Right Arrow)">&rarr;</button>
      </footer>
    `;

    document.body.appendChild(modal);

    // Bind navigation buttons
    document.getElementById('tome-close-btn').addEventListener('click', closeTome);
    document.getElementById('tome-prev-arrow').addEventListener('click', () => {
      if (pageFlipInstance) pageFlipInstance.flipPrev();
    });
    document.getElementById('tome-next-arrow').addEventListener('click', () => {
      if (pageFlipInstance) pageFlipInstance.flipNext();
    });
    document.getElementById('tome-jump-cover').addEventListener('click', () => {
      if (pageFlipInstance) pageFlipInstance.flip(0);
    });
    document.getElementById('tome-jump-systems').addEventListener('click', () => {
      if (pageFlipInstance) pageFlipInstance.flip(2);
    });
    document.getElementById('tome-jump-projects').addEventListener('click', () => {
      if (pageFlipInstance) pageFlipInstance.flip(4);
    });
    document.getElementById('tome-flip-back-first').addEventListener('click', () => {
      if (pageFlipInstance) pageFlipInstance.flip(0);
    });

    // Close when clicking modal backdrop
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTome();
    });
  }

  // Initialize St.PageFlip Engine
  function initPageFlipEngine() {
    if (pageFlipInstance) return;

    if (!window.St || !window.St.PageFlip) {
      console.warn("St.PageFlip library not loaded yet.");
      return;
    }

    const bookEl = document.getElementById('manga-book');
    if (!bookEl) return;

    // Detect responsive dimensions
    const isMobile = window.innerWidth <= 768;
    const bookWidth = isMobile ? Math.min(window.innerWidth * 0.9, 440) : 480;
    const bookHeight = isMobile ? Math.min(window.innerHeight * 0.72, 640) : 680;

    pageFlipInstance = new window.St.PageFlip(bookEl, {
      width: bookWidth,
      height: bookHeight,
      size: 'stretch',
      minWidth: 320,
      maxWidth: 580,
      minHeight: 460,
      maxHeight: 780,
      maxShadowOpacity: 0.85,
      showCover: true,
      mobileScrollSupport: false,
      usePortrait: true,
      startPage: 0
    });

    const pages = bookEl.querySelectorAll('.manga-page');
    pageFlipInstance.loadFromHTML(pages);

    // Sound effect & page counter update on every flip
    pageFlipInstance.on('flip', (e) => {
      playAudioCue('page-flip');
      const counterEl = document.getElementById('tome-page-info');
      if (counterEl) {
        const pageIdx = e.data;
        if (pageIdx === 0) {
          counterEl.textContent = 'FRONT COVER';
        } else if (pageIdx >= pages.length - 1) {
          counterEl.textContent = 'BACK COVER • KENTARO MIURA MEMORIAL';
        } else {
          counterEl.textContent = `PAGES ${pageIdx} - ${Math.min(pageIdx + 1, pages.length - 1)} OF ${pages.length - 1}`;
        }
      }
    });
  }

  // Open Manga Tome
  function openTome() {
    createMangaTomeDOM();
    const modal = document.getElementById('berserk-modal');
    if (!modal) return;

    isTomeOpen = true;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playAudioCue('sword-open');

    // Ensure PageFlip is initialized after modal becomes visible
    setTimeout(() => {
      initPageFlipEngine();
    }, 50);
  }

  // Close Manga Tome
  function closeTome() {
    const modal = document.getElementById('berserk-modal');
    if (!modal) return;

    isTomeOpen = false;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Toggle Tome
  function toggleTome() {
    if (isTomeOpen) closeTome();
    else openTome();
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable)) {
      return;
    }

    // Do NOT intercept keys if the terminal modal is open or raw CLI mode is active
    const termModal = document.getElementById('terminal-modal');
    const isTermModalOpen = termModal && termModal.classList.contains('open');
    const isFullTermOpen = document.body.classList.contains('mode-terminal');
    if (isTermModalOpen || isFullTermOpen) {
      return;
    }

    if (e.key === 'b' || e.key === 'B') {
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleTome();
      }
    } else if (e.key === 'Escape' && isTomeOpen) {
      e.preventDefault();
      closeTome();
    } else if (isTomeOpen && (e.key === 'ArrowRight' || e.key === 'PageDown')) {
      e.preventDefault();
      if (pageFlipInstance) pageFlipInstance.flipNext();
    } else if (isTomeOpen && (e.key === 'ArrowLeft' || e.key === 'PageUp')) {
      e.preventDefault();
      if (pageFlipInstance) pageFlipInstance.flipPrev();
    }
  });

  // Attach to trigger buttons
  function initTrigger() {
    const triggers = document.querySelectorAll('#berserk-rune-btn, #hero-manga-trigger-btn, #mobile-manga-trigger-btn, .js-open-berserk');
    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openTome();
      });
    });
  }

  // Expose to window for TerminalEngine & global triggers
  window.openBerserkTome = openTome;
  window.closeBerserkTome = closeTome;
  window.toggleBerserkMode = openTome;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrigger);
  } else {
    initTrigger();
  }
})();
