/**
 * BERSERK MANGA EDITION // THE TOME OF THE BRANDED
 * Interactive Kentaro Miura / Guts Dark Fantasy Experience
 * Aditya Chavan Portfolio Easter Egg
 */

(function () {
  'use strict';

  // The 5 Manga Chapters mapped to Portfolio Sections
  const CHAPTERS = [
    { id: 'hero', name: 'PROLOGUE // THE BRANDED SWORDSMAN', num: 'I' },
    { id: 'systems', name: 'CH. 1 // IN-MEMORY UNIX INTERNALS', num: 'II' },
    { id: 'timeline', name: 'CH. 2 // BATTLE LOG & BAND OF THE HAWK', num: 'III' },
    { id: 'dispatch', name: 'CH. 3 // DISPATCHES FROM THE ECLIPSE', num: 'IV' }
  ];

  let currentChapterIndex = 0;
  let isBerserkMode = false;

  // Synthesize epic metallic sword slash sound using Web Audio API (Zero external audio files needed!)
  function playSwordSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Deep Eclipse Drone
      const droneOsc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneOsc.type = 'sawtooth';
      droneOsc.frequency.setValueAtTime(65, ctx.currentTime);
      droneOsc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.9);
      droneGain.gain.setValueAtTime(0.18, ctx.currentTime);
      droneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
      droneOsc.connect(droneGain);
      droneGain.connect(ctx.destination);
      droneOsc.start();
      droneOsc.stop(ctx.currentTime + 0.9);

      // Metallic Blade Ring (The Dragonslayer)
      const bladeOsc = ctx.createOscillator();
      const bladeGain = ctx.createGain();
      bladeOsc.type = 'sine';
      bladeOsc.frequency.setValueAtTime(1480, ctx.currentTime);
      bladeOsc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.6);
      bladeGain.gain.setValueAtTime(0.22, ctx.currentTime);
      bladeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      bladeOsc.connect(bladeGain);
      bladeGain.connect(ctx.destination);
      bladeOsc.start();
      bladeOsc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Inject Shockwave Overlay into DOM
  function createShockwaveElement() {
    if (document.getElementById('berserk-shockwave')) return;

    const overlay = document.createElement('div');
    overlay.id = 'berserk-shockwave';
    overlay.innerHTML = `
      <svg viewBox="0 0 100 140" class="shockwave-symbol">
        <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="50" y1="8" x2="50" y2="132" stroke-width="6" />
          <path d="M 28 26 C 24 10, 44 8, 50 24 C 56 8, 76 10, 72 26" stroke-width="5.5" />
          <path d="M 50 36 L 24 54 L 50 78" stroke-width="5.5" />
          <path d="M 50 36 L 76 54 L 50 78" stroke-width="5.5" />
          <line x1="28" y1="54" x2="72" y2="54" stroke-width="5" />
          <line x1="36" y1="44" x2="64" y2="64" stroke-width="4" />
          <line x1="64" y1="44" x2="36" y2="64" stroke-width="4" />
          <path d="M 50 78 L 22 108" stroke-width="5.5" />
          <path d="M 50 78 L 78 108" stroke-width="5.5" />
        </g>
      </svg>
      <div class="shockwave-text">生贄の烙印 &bull; THE ECLIPSE AWAKENS</div>
    `;
    document.body.appendChild(overlay);
  }

  // Inject Top Book HUD & Talisman
  function createHudElements() {
    if (document.getElementById('berserk-hud')) return;

    // Top Interactive Chapter HUD
    const hud = document.createElement('aside');
    hud.id = 'berserk-hud';
    hud.setAttribute('role', 'region');
    hud.setAttribute('aria-label', 'Berserk Manga Navigation');
    hud.innerHTML = `
      <div class="berserk-hud-title">
        <svg viewBox="0 0 100 140" class="mini-brand">
          <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="50" y1="8" x2="50" y2="132" stroke-width="6" />
            <path d="M 28 26 C 24 10, 44 8, 50 24 C 56 8, 76 10, 72 26" stroke-width="5.5" />
            <path d="M 50 36 L 24 54 L 50 78" stroke-width="5.5" />
            <path d="M 50 36 L 76 54 L 50 78" stroke-width="5.5" />
            <line x1="28" y1="54" x2="72" y2="54" stroke-width="5" />
            <path d="M 50 78 L 22 108" stroke-width="5.5" />
            <path d="M 50 78 L 78 108" stroke-width="5.5" />
          </g>
        </svg>
        <span>MANGA TOME</span>
      </div>

      <nav class="berserk-chapter-nav">
        <button id="berserk-prev-btn" class="berserk-nav-btn" title="Previous Chapter (Left Arrow)">&larr; PREV</button>
        <div id="berserk-chapter-name" class="berserk-chapter-pill">PROLOGUE // THE BRANDED SWORDSMAN</div>
        <button id="berserk-next-btn" class="berserk-nav-btn" title="Next Chapter (Right Arrow)">NEXT &rarr;</button>
      </nav>

      <button id="berserk-exit-btn" class="berserk-exit-btn" title="Exit Manga Mode (Esc)">
        <span>&times;</span>
        <span>EXIT (ESC)</span>
      </button>
    `;
    document.body.appendChild(hud);

    // Bottom Floating Talisman with Guts Quote
    const talisman = document.createElement('aside');
    talisman.id = 'berserk-talisman';
    talisman.setAttribute('role', 'complementary');
    talisman.setAttribute('title', 'The Brand of Sacrifice — Click to turn chapter');
    talisman.innerHTML = `
      <svg viewBox="0 0 100 140">
        <g stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="50" y1="8" x2="50" y2="132" stroke-width="6" />
          <path d="M 28 26 C 24 10, 44 8, 50 24 C 56 8, 76 10, 72 26" stroke-width="5.5" />
          <path d="M 50 36 L 24 54 L 50 78" stroke-width="5.5" />
          <path d="M 50 36 L 76 54 L 50 78" stroke-width="5.5" />
          <line x1="28" y1="54" x2="72" y2="54" stroke-width="5" />
          <path d="M 50 78 L 22 108" stroke-width="5.5" />
          <path d="M 50 78 L 78 108" stroke-width="5.5" />
        </g>
      </svg>
      <div class="berserk-quote-popup">
        &ldquo;Struggle, endure, contend. For that alone is the sword of one who defies death.&rdquo;
        <span class="berserk-quote-author">&mdash; Skull Knight to Guts // 烙印の者</span>
      </div>
    `;
    document.body.appendChild(talisman);

    // Event Listeners for HUD
    document.getElementById('berserk-exit-btn').addEventListener('click', () => toggleBerserkMode(false));
    document.getElementById('berserk-prev-btn').addEventListener('click', () => navigateChapter(-1));
    document.getElementById('berserk-next-btn').addEventListener('click', () => navigateChapter(1));
    talisman.addEventListener('click', () => navigateChapter(1));
  }

  // Update Chapter indicator
  function updateChapterUI() {
    const pill = document.getElementById('berserk-chapter-name');
    if (!pill) return;
    const ch = CHAPTERS[currentChapterIndex];
    pill.textContent = ch.name;
  }

  // Scroll smoothly to selected Chapter
  function navigateChapter(direction) {
    currentChapterIndex += direction;
    if (currentChapterIndex < 0) currentChapterIndex = CHAPTERS.length - 1;
    if (currentChapterIndex >= CHAPTERS.length) currentChapterIndex = 0;

    updateChapterUI();
    playSwordSound();

    const targetId = CHAPTERS[currentChapterIndex].id;
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Toggle Berserk Mode
  function toggleBerserkMode(forceState) {
    const nextState = typeof forceState === 'boolean' ? forceState : !isBerserkMode;
    isBerserkMode = nextState;

    createShockwaveElement();
    createHudElements();

    if (isBerserkMode) {
      // Trigger dramatic shockwave & sound
      playSwordSound();
      const shockwave = document.getElementById('berserk-shockwave');
      if (shockwave) {
        shockwave.classList.add('active');
        setTimeout(() => shockwave.classList.remove('active'), 950);
      }

      document.body.classList.add('berserk-mode');
      localStorage.setItem('berserk_easter_egg', 'true');
      updateChapterUI();
    } else {
      document.body.classList.remove('berserk-mode');
      localStorage.removeItem('berserk_easter_egg');
    }
  }

  // Bind Trigger Button in Navbar
  function initTriggerButton() {
    const btn = document.getElementById('berserk-rune-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleBerserkMode();
      });
    }

    // Global Key Listener: Press 'B' to awaken, 'Esc' to exit
    document.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable)) {
        return;
      }

      if ((e.key === 'b' || e.key === 'B') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleBerserkMode();
      } else if (e.key === 'Escape' && isBerserkMode) {
        toggleBerserkMode(false);
      } else if (isBerserkMode && e.key === 'ArrowRight') {
        e.preventDefault();
        navigateChapter(1);
      } else if (isBerserkMode && e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateChapter(-1);
      }
    });

    // Check saved state
    if (localStorage.getItem('berserk_easter_egg') === 'true') {
      toggleBerserkMode(true);
    }
  }

  // Expose to window for TerminalEngine integration
  window.toggleBerserkMode = toggleBerserkMode;

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTriggerButton);
  } else {
    initTriggerButton();
  }
})();
