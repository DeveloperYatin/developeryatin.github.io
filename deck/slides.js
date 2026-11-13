/**
 * Page-level glue for decks built on deck-stage.js + theme.css.
 *
 *  - Fills every `.foot .pg` with "NN / TT", so slides can be reordered freely.
 *  - Media: elements with data-src are loaded; a sibling .asset-needed card is
 *    shown if the file is missing. Videos restart when their slide becomes
 *    active and pause when it leaves. Add data-audio to a <video> to play it
 *    with sound (falls back to muted if the browser blocks autoplay).
 */
(() => {
  const pad2 = (n) => String(n).padStart(2, '0');

  const init = () => {
    const deck = document.querySelector('deck-stage');
    if (!deck) return;

    const slides = [...deck.children].filter((el) => el.tagName === 'SECTION');
    slides.forEach((s, i) => {
      const pg = s.querySelector('.foot .pg');
      if (pg) pg.textContent = `${pad2(i + 1)} / ${pad2(slides.length)}`;
    });

    document.querySelectorAll('[data-src]').forEach((el) => {
      const note = el.parentElement.querySelector('.asset-needed');
      el.addEventListener('error', () => note && note.classList.add('show'));
      el.addEventListener(el.tagName === 'VIDEO' ? 'loadeddata' : 'load',
        () => note && note.classList.remove('show'));
      el.src = el.dataset.src;
    });

    const play = (slide) => {
      if (!slide) return;
      slide.querySelectorAll('video').forEach((v) => {
        try { v.currentTime = 0; } catch (e) {}
        const attempt = v.play();
        if (!attempt) return;
        attempt.catch(() => {
          if (v.hasAttribute('data-audio')) { v.muted = true; v.play().catch(() => {}); }
        });
      });
    };
    const pause = (slide) => slide && slide.querySelectorAll('video').forEach((v) => v.pause());

    deck.addEventListener('slidechange', (e) => {
      pause(e.detail.previousSlide);
      play(e.detail.slide);
    });
    window.addEventListener('load', () => play(deck.querySelector('section[data-deck-active]')));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
