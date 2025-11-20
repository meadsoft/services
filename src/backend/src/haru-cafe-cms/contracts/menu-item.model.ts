import { IOnCreationData } from './on-creation.model';

export class MenuItem implements IOnCreationData {
    constructor(
        public id: string,
        public name: string,
        public description: string | undefined,
        public imageUrl: string | undefined,
        public price: number | undefined,
        public isFavorite: boolean,
        public isActive: boolean,
        public createdDate: string,
        public updatedDate: string,
        public createdBy: string,
        public updatedBy: string,
    ) {}
}
