import { Injectable, signal } from '@angular/core';
import { CATEGORY_GRAPH, ICategoryNode } from 'src/data/category-nodes';
import { Category } from 'src/models/Categories';
import { FilterService } from './filter.service';

@Injectable({
    providedIn: 'root',
})
export class CategoryGraphService {
    categoryGraph = signal<ICategoryNode[]>(CATEGORY_GRAPH);

    constructor(protected filtersService: FilterService) {}

    getRootNode(): ICategoryNode {
        var node = this.categoryGraph().find((node) => node.category === null);
        if (node === undefined) {
            console.error(`Root node not found in category graph`);
            throw new Error(`Root node not found in category graph`);
        }
        return node;
    }

    getCategoryNodes(): ICategoryNode[] {
        var activeCategories = this.filtersService.activeCategories();
        var root = this.getRootNode();
        var nodes: ICategoryNode[] = [root];
        for (let i = 0; i < activeCategories.length; i++) {
            const category = activeCategories[i];
            var currentNode = this.categoryGraph().find(
                (node) => node.category === category,
            );
            if (currentNode === undefined) {
                return nodes;
            }
            nodes.push(currentNode);
        }
        return nodes;
    }

    findNodeWithCategory(category: Category) {
        return this.categoryGraph().find((node) => node.category === category);
    }

    getDepthOfCategory(
        root: ICategoryNode,
        target: Category,
        depth: number = -1,
    ): number {
        if (root.category === target) {
            return depth;
        }
        for (let i = 0; i < root.childCategories.length; i++) {
            const childCategory = root.childCategories[i];
            if (childCategory === target) {
                return depth + 1;
            }
            var nextNode = this.findNodeWithCategory(childCategory);
            if (nextNode === undefined) {
                continue;
            }
            var newDepth = this.getDepthOfCategory(nextNode, target, depth + 1);
            if (newDepth !== -1) {
                return newDepth;
            }
        }
        return -1;
    }

    isCategorySelected(category: Category) {
        return this.filtersService.activeCategories().includes(category);
    }
}
