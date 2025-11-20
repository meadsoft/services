import { DateTime } from 'luxon';
import { IOnCreationData } from './on-creation.model';

export interface IBaseModel extends IOnCreationData {
    id: string;
    createdBy: string;
    createdDate: DateTime;
    updatedBy: string;
    updatedDate: DateTime;
}
