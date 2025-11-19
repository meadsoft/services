import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    MatButtonToggleChange,
    MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { Category } from 'src/models/Categories';
import { FilterService } from 'src/services/filter.service';
import { ICategoryNode } from 'src/data/category-nodes';
import { CategoryGraphService } from 'src/services/category-graph.service';

@Component({
    selector: 'haru-filters',
    imports: [MatButtonToggleModule, MatChipsModule, CommonModule],
    templateUrl: './filters.component.html',
})
export class FiltersComponent {
    Category = Category;
    currentOptions: ICategoryNode[];

    constructor(
        protected filtersService: FilterService,
        protected categoryGraphService: CategoryGraphService,
    ) {
        this.currentOptions = [this.categoryGraphService.getRootNode()];
    }

    getStyle(categoryGroup: ICategoryNode) {
        return {
            'grid-template-columns': `repeat(${categoryGroup.childCategories.length}, minmax(0, 1fr))`,
        };
    }

    onToggleButtonClicked(event: MatButtonToggleChange) {
        var category = event.source.value as Category;
        var activeCategories = this.filtersService.activeCategories();
        var root = this.categoryGraphService.getRootNode();
        var depth = this.categoryGraphService.getDepthOfCategory(
            root,
            category,
        );
        if (depth === -1) {
            console.error(`Category ${category} not found in category graph`);
            return;
        }
        var isAlreadyActive = activeCategories.includes(category);
        activeCategories = activeCategories.slice(0, depth);
        if (isAlreadyActive == false) {
            activeCategories.push(category);
        }
        this.filtersService.activeCategories.set(activeCategories);
    }
}
