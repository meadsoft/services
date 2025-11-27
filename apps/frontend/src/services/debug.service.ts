import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MENU_ITEMS } from 'src/data/menu-items';

@Injectable({ providedIn: 'root' })
export class DebugService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    loadDebuggingTools() {
        if (isPlatformBrowser(this.platformId) == false) {
            console.log(
                'Not running in browser, aborting loading debugging tools',
            );
            return;
        }
        Object.assign(document, {
            logMenuItemsWithNoImage: this.logMenuItemsWithNoImage.bind(this),
        });
    }

    logMenuItemsWithNoImage() {
        var menuItemsWithNoImage = MENU_ITEMS.filter(
            (item) => item.imageUrl === undefined && item.isActive !== false,
        );
        var formattedMenuItems = menuItemsWithNoImage
            .sort((m1, m2) => m1.name.localeCompare(m2.name))
            .map((item) => item.name);
        console.log('Menu items with no image:', formattedMenuItems.join('\n'));
    }
}
