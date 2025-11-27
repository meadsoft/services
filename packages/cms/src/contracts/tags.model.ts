import { IBaseModel } from './base.model.js';

export class Tag implements IBaseModel {
    constructor(
        public id: string,
        public name: string,
        public createdDate: Date | null,
        public updatedDate: Date | null,
        public createdById: string,
        public updatedById: string
    ) {}
}
