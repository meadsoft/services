import { IBaseModel } from './base.model.js';

export const MENU_ITEM_IS_FAVORITE_DEFAULT = false;
export const MENU_ITEM_IS_ACTIVE_DEFAULT = false;

export class MenuItem implements IBaseModel {
    constructor(
        public id: string,
        public name: string,
        public description: string | null,
        public imageUrl: string | null,
        public price: number | null,
        public isFavorite: boolean,
        public isActive: boolean,
        public createdDate: Date | null,
        public updatedDate: Date | null,
        public createdById: string,
        public updatedById: string
    ) {}
}
