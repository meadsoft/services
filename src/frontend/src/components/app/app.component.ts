import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DebugService } from 'src/services/debug.service';
import { NavComponent } from '../nav/nav.component';

@Component({
    selector: 'haru-root',
    imports: [RouterOutlet, NavComponent],
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    constructor(private debugService: DebugService) {}

    ngOnInit(): void {
        this.debugService.loadDebuggingTools();
    }
}
