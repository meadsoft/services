import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { FiltersComponent } from 'src/components/filters/filters.component';
import { FooterComponent } from 'src/components/footer/footer.component';
import { MenuItemComponent } from 'src/components/menu-item/menu-item.component';
import { Category } from 'src/models/Categories';
import { MenuItemsService } from 'src/services/menu.service';
import { LegacyCarouselComponent } from '../carousel-legacy/carousel.component';
import { FilterService } from 'src/services/filter.service';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'haru-landing-page',
    imports: [
        MenuItemComponent,
        FooterComponent,
        FiltersComponent,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        CommonModule,
        LegacyCarouselComponent,
        ButtonModule,
        HeaderComponent,
    ],
    templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
    Category = Category;

    createEmptyArray(length: number) {
        return new Array(length);
    }

    constructor(
        protected menuItemsService: MenuItemsService,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        protected filterService: FilterService,
    ) {
        iconRegistry.addSvgIcon(
            'instagram',
            sanitizer.bypassSecurityTrustResourceUrl('svgs/instagram.svg'),
        );
        iconRegistry.addSvgIcon(
            'uber-eats',
            sanitizer.bypassSecurityTrustResourceUrl('svgs/uber-eats.svg'),
        );
    }
}
