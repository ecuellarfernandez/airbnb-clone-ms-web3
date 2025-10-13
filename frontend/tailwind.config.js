/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand-primary)',
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        on: {
          brand: 'var(--neutral-0)',
          bg: 'var(--text)',
          surface: 'var(--text-2)',
          'surface-2': 'var(--text-3)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        h1: 'var(--fs-h1)',
        h2: 'var(--fs-h2)',
        h3: 'var(--fs-h3)',
        body: 'var(--fs-body)',
        label: 'var(--fs-label)',
      },
      lineHeight: {
        tight: 'var(--lh-tight)',
        normal: 'var(--lh-normal)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      fontWeight: {
        normal: 'var(--fw-normal)',
        medium: 'var(--fw-medium)',
        bold: 'var(--fw-bold)',
        extraBold: 'var(--fw-extra-bold)',
      },
    },
  },
  plugins: [],
};
