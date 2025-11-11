import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DarkModeService } from '@haru/services/styles/dark-mode.service';

@Component({
    selector: 'haru-nav',
    imports: [ButtonModule],
    templateUrl: './nav.component.html',
    styles: ``,
})
export class NavComponent {
    constructor(protected darkModeService: DarkModeService) {}

    ngOnInit(): void {
        this.darkModeService.initializeDarkMode();
    }
}
