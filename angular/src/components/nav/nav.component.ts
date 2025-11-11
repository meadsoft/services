import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ColorSchemeService } from '@haru/services/styles/color-scheme.service';

@Component({
    selector: 'haru-nav',
    imports: [ButtonModule],
    templateUrl: './nav.component.html',
    styles: ``,
})
export class NavComponent {
    protected darkModeService = inject(ColorSchemeService);

    ngOnInit(): void {
        this.darkModeService.initializeTheme();
    }
}
