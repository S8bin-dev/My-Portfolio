/* Runs before styles load so appearance and palette are correct on first paint. */
(() => {
  const storageKey = 'portfolio-theme-preferences';
  const names = {
    midnight: 'Midnight Research',
    copper: 'Editorial Copper',
    mineral: 'Mineral Green',
    violet: 'Quantum Violet',
    burgundy: 'Burgundy Volt',
    coral: 'Coral Signal'
  };
  const appearances = ['light', 'dark', 'system'];
  const system = matchMedia('(prefers-color-scheme: dark)');
  const preferences = { appearance: 'system', palettes: { light: 'copper', dark: 'copper' } };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && typeof saved === 'object') {
      if (appearances.includes(saved.appearance)) preferences.appearance = saved.appearance;
      for (const mode of ['light', 'dark']) {
        if (Object.hasOwn(names, saved.palettes?.[mode])) preferences.palettes[mode] = saved.palettes[mode];
      }
    } else {
      const legacy = localStorage.getItem('portfolio-theme');
      const oldMode = localStorage.getItem('darkMode');
      if (['light', 'dark'].includes(legacy)) preferences.appearance = legacy;
      else if (oldMode === 'enabled') preferences.appearance = 'dark';
      else if (oldMode === 'disabled') preferences.appearance = 'light';
    }
  } catch (_) { /* Storage may be unavailable; the controls still work. */ }

  const effectiveAppearance = () => preferences.appearance === 'system' ? (system.matches ? 'dark' : 'light') : preferences.appearance;
  function apply(persist = false) {
    const mode = effectiveAppearance();
    const palette = preferences.palettes[mode];
    document.documentElement.dataset.theme = mode;
    document.documentElement.dataset.palette = palette;
    if (persist) {
      try { localStorage.setItem(storageKey, JSON.stringify(preferences)); } catch (_) {}
    }
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(mode === 'dark'));
      toggle.setAttribute('aria-label', `Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`);
    }
    document.querySelectorAll('input[name="appearance"]').forEach(input => { input.checked = input.value === preferences.appearance; });
    document.querySelectorAll('input[name="palette"]').forEach(input => { input.checked = input.value === palette; });
    const legend = document.getElementById('paletteLegend');
    if (legend) legend.textContent = `Palette for ${mode} mode`;
    const status = document.getElementById('themeLabStatus');
    if (status) status.textContent = `${names[palette]} · ${mode === 'dark' ? 'Dark' : 'Light'}${preferences.appearance === 'system' ? ' (system)' : ''}`;
  }
  function setAppearance(appearance) {
    if (!appearances.includes(appearance)) return;
    preferences.appearance = appearance;
    apply(true);
  }
  function setPalette(palette, mode = effectiveAppearance()) {
    if (!Object.hasOwn(names, palette) || !['light', 'dark'].includes(mode)) return;
    preferences.palettes[mode] = palette;
    apply(true);
  }
  window.portfolioTheme = {
    setAppearance,
    setPalette,
    getState: () => ({ ...preferences, palettes: { ...preferences.palettes }, effectiveAppearance: effectiveAppearance() })
  };
  apply();
  system.addEventListener('change', () => { if (preferences.appearance === 'system') apply(); });

  document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('themeLab');
    const trigger = document.getElementById('themeLabToggle');
    function closeLab(restoreFocus = false) {
      if (panel.hidden) return;
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) trigger.focus();
    }
    trigger.addEventListener('click', () => {
      if (!panel.hidden) { closeLab(); return; }
      window.closeMenu?.();
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      panel.querySelector('input[name="appearance"]:checked').focus();
    });
    document.getElementById('themeLabClose').addEventListener('click', () => closeLab(true));
    document.getElementById('themeToggle').addEventListener('click', () => setAppearance(effectiveAppearance() === 'dark' ? 'light' : 'dark'));
    panel.querySelectorAll('input[name="appearance"]').forEach(input => input.addEventListener('change', () => setAppearance(input.value)));
    panel.querySelectorAll('input[name="palette"]').forEach(input => input.addEventListener('change', () => setPalette(input.value)));
    document.addEventListener('click', event => { if (!event.target.closest('.theme-controls')) closeLab(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); closeLab(true); }
    });
    apply();
  });
})();
