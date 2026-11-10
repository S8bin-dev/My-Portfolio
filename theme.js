/* Apply Editorial Copper's appearance before CSS loads to avoid a wrong-theme flash. */
(() => {
  const storageKey = 'portfolio-appearance';
  const system = matchMedia('(prefers-color-scheme: dark)');
  const valid = value => ['light', 'dark', 'system'].includes(value);
  let appearance = 'system';
  try {
    const current = localStorage.getItem(storageKey);
    if (valid(current)) appearance = current;
    else {
      let previous;
      try { previous = JSON.parse(localStorage.getItem('portfolio-theme-preferences')); } catch (_) {}
      const legacy = localStorage.getItem('portfolio-theme');
      const oldMode = localStorage.getItem('darkMode');
      if (valid(previous?.appearance)) appearance = previous.appearance;
      else if (valid(legacy)) appearance = legacy;
      else if (oldMode === 'enabled') appearance = 'dark';
      else if (oldMode === 'disabled') appearance = 'light';
    }
    // Retain only the appearance preference, removing retired palette metadata.
    if (appearance === 'system') localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, appearance);
    for (const key of ['portfolio-theme-preferences', 'portfolio-theme', 'darkMode']) localStorage.removeItem(key);
  } catch (_) { /* Private browsing/storage restrictions must not disable the toggle. */ }

  const effectiveAppearance = () => appearance === 'system' ? (system.matches ? 'dark' : 'light') : appearance;
  function apply() {
    const mode = effectiveAppearance();
    document.documentElement.dataset.theme = mode;
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(mode === 'dark'));
      toggle.setAttribute('aria-label', `Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`);
    }
  }
  function setAppearance(value) {
    if (!valid(value)) return;
    appearance = value;
    try {
      if (value === 'system') localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, value);
    } catch (_) {}
    apply();
  }
  window.portfolioTheme = { setAppearance, getState: () => ({ appearance, effectiveAppearance: effectiveAppearance() }) };
  apply();
  system.addEventListener('change', () => { if (appearance === 'system') apply(); });
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('themeToggle').addEventListener('click', () => setAppearance(effectiveAppearance() === 'dark' ? 'light' : 'dark'));
    apply();
  });
})();
