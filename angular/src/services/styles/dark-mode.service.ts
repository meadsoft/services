import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { DARK_MODE_CLASS } from '@haru/theme.config';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    isDarkMode = signal(false);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    initializeDarkMode() {
        if (isPlatformBrowser(this.platformId) == false) {
            console.log('Not running in browser. Aborting setting dark mode');
            return;
        }
        const prefersColorSchemeDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        this.toggleDarkMode(prefersColorSchemeDark);
    }

    toggleDarkMode(shouldBeDark?: boolean) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const element = document.querySelector('html')!;
        let isDarkMode = element.classList.contains(DARK_MODE_CLASS);
        if (shouldBeDark === undefined) {
            element.classList.toggle(DARK_MODE_CLASS);
        } else {
            if (shouldBeDark) {
                element.classList.add(DARK_MODE_CLASS);
            } else {
                element.classList.remove(DARK_MODE_CLASS);
            }
            isDarkMode = element.classList.contains(DARK_MODE_CLASS);
        }
        this.isDarkMode.set(isDarkMode);
    }
}
