export const CREATED_BY_DEFAULT = 'system';
export const UPDATED_BY_DEFAULT = CREATED_BY_DEFAULT;

export interface IOnCreationData {
    createdDate: Date | null;
    updatedDate: Date | null;
    createdById: string;
    updatedById: string;
}
