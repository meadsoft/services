import { computed, Injectable, signal } from '@angular/core';
import { IMenuItem } from 'src/models/interfaces/IMenuItem';
import { MENU_ITEMS } from 'src/data/menu-items';
import { Category } from 'src/models/Categories';
import { FilterService } from './filter.service';
import { MenuItem } from 'src/models/MenuItem';

@Injectable({
    providedIn: 'root',
})
export class MenuItemsService {
    private menuItems = signal<MenuItem[]>(
        MENU_ITEMS.map((item) => new MenuItem(item)).sort(
            (menuItem1, menuItem2) =>
                menuItem1.name.localeCompare(menuItem2.name),
        ),
    );
    filteredMenuItems = computed<IMenuItem[]>(() => {
        var menuItems = this.menuItems();
        var activeCategories = this.filtersService.activeCategories();
        return menuItems
            .filter((item) => item.isActive !== false)
            .filter(
                (item) =>
                    item.categories !== undefined &&
                    item.categories.length > 0 &&
                    (activeCategories.length === 0 ||
                        activeCategories.every((category) =>
                            item.categories!.includes(category),
                        )),
            );
    });
    paginatedMenuItems = computed<IMenuItem[][]>(() => {
        var filteredMenuItems = this.filteredMenuItems();
        var pageSize = this.pageSize();
        var pages = [];
        for (var i = 0; i < filteredMenuItems.length; i += pageSize) {
            pages.push(filteredMenuItems.slice(i, i + pageSize));
        }
        return pages;
    });
    pageSize = signal<number>(9);

    constructor(private filtersService: FilterService) {}

    menuItemsByCategory(...categories: Category[]) {
        if (categories.length === 0) {
            return [];
        }
        return this.menuItems()
            .filter(
                (item) =>
                    item.categories !== undefined &&
                    item.categories.length > 0 &&
                    categories.every((category) =>
                        item.categories!.includes(category),
                    ),
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    }
}
