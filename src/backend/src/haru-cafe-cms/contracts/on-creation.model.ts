import { DateTime } from 'luxon';

export interface IOnCreationData {
    createdDate: DateTime;
    updatedDate: DateTime;
    createdBy: string;
    updatedBy: string;
}
