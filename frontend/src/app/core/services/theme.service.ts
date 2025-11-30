import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'airbnb-clone-theme';
  private currentTheme: Theme = 'light';
  private isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    let initialTheme: Theme = 'light';

    if (this.isBrowser) {
      const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
      const prefersDark =
        typeof window !== 'undefined' &&
        !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;

      initialTheme = stored ?? (prefersDark ? 'dark' : 'light');
    }

    this.setTheme(initialTheme);
  }

  get theme(): Theme {
    return this.currentTheme;
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;

    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }

    this.applyThemeToDocument(theme);
  }

  toggleTheme() {
    const next: Theme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  private applyThemeToDocument(theme: Theme) {
    const html = this.document.documentElement;

    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  }
}
