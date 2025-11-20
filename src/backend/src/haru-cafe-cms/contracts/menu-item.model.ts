import { DateTime } from 'luxon';
import { IBaseModel } from './base.model';

export class MenuItem implements IBaseModel {
    constructor(
        public id: string,
        public name: string,
        public description: string | undefined,
        public imageUrl: string | undefined,
        public price: number | undefined,
        public isFavorite: boolean,
        public isActive: boolean,
        public createdDate: DateTime,
        public updatedDate: DateTime,
        public createdBy: string,
        public updatedBy: string,
    ) {}
}
