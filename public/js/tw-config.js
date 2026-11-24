/*
 * Loaded synchronously right after the Tailwind CDN script on every page.
 * 1. Applies the saved theme before first paint (no flash).
 * 2. Configures Tailwind with the Stitch design tokens, mapped to CSS variables
 *    (defined in /css/site.css) so every colour switches with the light/dark theme.
 */
(function applyTheme() {
  var t = null;
  try { t = localStorage.getItem('pf-theme'); } catch (e) { /* storage blocked */ }
  if (!t) t = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var root = document.documentElement;
  root.classList.toggle('dark', t === 'dark');
  root.classList.toggle('light', t !== 'dark');
  root.style.colorScheme = t;
})();

(function configureTailwind() {
  var names = [
    'primary', 'on-primary', 'primary-container', 'on-primary-container', 'primary-fixed', 'primary-fixed-dim',
    'on-primary-fixed', 'on-primary-fixed-variant', 'inverse-primary', 'surface-tint',
    'secondary', 'on-secondary', 'secondary-container', 'on-secondary-container', 'secondary-fixed',
    'secondary-fixed-dim', 'on-secondary-fixed', 'on-secondary-fixed-variant',
    'tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container', 'tertiary-fixed',
    'tertiary-fixed-dim', 'on-tertiary-fixed', 'on-tertiary-fixed-variant',
    'error', 'on-error', 'error-container', 'on-error-container',
    'background', 'on-background', 'surface', 'on-surface', 'surface-variant', 'on-surface-variant',
    'surface-dim', 'surface-bright', 'surface-container-lowest', 'surface-container-low', 'surface-container',
    'surface-container-high', 'surface-container-highest', 'inverse-surface', 'inverse-on-surface',
    'outline', 'outline-variant',
    'cmyk-cyan', 'cmyk-magenta', 'cmyk-yellow', 'cmyk-key', 'success', 'on-success', 'success-container', 'on-success-container',
  ];
  var colors = {};
  names.forEach(function (n) { colors[n] = 'rgb(var(--c-' + n + ') / <alpha-value>)'; });
  var serif = ['"Times New Roman"', 'Times', 'serif'];
  window.tailwind = window.tailwind || {};
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: colors,
        borderRadius: { DEFAULT: '0.125rem', lg: '0.25rem', xl: '0.5rem', full: '9999px' },
        spacing: {
          'space-xs': '0.25rem', 'space-sm': '0.5rem', 'space-md': '1rem', 'space-lg': '1.5rem', 'space-xl': '2.25rem',
          gutter: '1rem', 'gutter-lg': '1.5rem', margin: '1rem', 'margin-md': '1.5rem', 'margin-lg': '2.5rem',
        },
        fontFamily: {
          sans: serif, serif: serif,
          'display-lg': serif, 'headline-xl': serif, 'headline-xl-mobile': serif, 'headline-lg': serif,
          'headline-sm': serif, 'title-md': serif, 'body-lg': serif, 'body-md': serif, 'body-sm': serif,
          'label-lg': serif, 'label-md': serif, 'label-tech': serif,
        },
        fontSize: {
          'display-lg': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '700' }],
          'headline-xl': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
          'headline-xl-mobile': ['26px', { lineHeight: '32px', fontWeight: '700' }],
          'headline-lg': ['24px', { lineHeight: '32px', fontWeight: '700' }],
          'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '700' }],
          'title-md': ['18px', { lineHeight: '24px', fontWeight: '600' }],
          'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
          'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
          'body-sm': ['12px', { lineHeight: '18px', fontWeight: '400' }],
          'label-lg': ['13px', { lineHeight: '16px', letterSpacing: '0.04em', fontWeight: '700' }],
          'label-md': ['11px', { lineHeight: '14px', letterSpacing: '0.06em', fontWeight: '700' }],
          'label-tech': ['10px', { lineHeight: '12px', letterSpacing: '0.08em', fontWeight: '400' }],
        },
      },
    },
  };
})();
