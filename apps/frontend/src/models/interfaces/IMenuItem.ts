import { Size } from 'src/models/Size';
import { Category } from '../Categories';

export interface IMenuItem {
    name: string;
    imageUrl?: string;
    description?: string;
    price: number;
    categories?: Category[];
    isFavorite?: boolean;
    isActive?: boolean;
    size?: Size;
}
