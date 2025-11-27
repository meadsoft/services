import { EventEmitter, Injectable, signal } from '@angular/core';
import { Category } from 'src/models/Categories';

@Injectable({
    providedIn: 'root',
})
export class FilterService {
    activeCategories = signal<Category[]>([]);
}
