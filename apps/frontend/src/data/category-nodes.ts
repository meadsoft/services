import { Category } from 'src/models/Categories';

export interface ICategoryNode {
    category: Category | null;
    childCategories: Category[];
    multiple?: boolean;
}

export const CATEGORY_GRAPH: ICategoryNode[] = [
    {
        category: null,
        childCategories: [Category.Food, Category.Drink],
    },
    {
        category: Category.Food,
        childCategories: [
            Category.Sandwich,
            Category.MiniPizza,
            Category.Bakery,
            Category.Snack,
        ],
    },
    {
        category: Category.Specials,
        childCategories: [Category.Seasonal, Category.Anime],
    },
    {
        category: Category.Drink,
        childCategories: [Category.Hot, Category.Cold, Category.Specials],
    },
    {
        category: Category.Hot,
        childCategories: [Category.Coffee, Category.NonCoffee],
    },
    {
        category: Category.Cold,
        childCategories: [
            Category.Coffee,
            Category.NonCoffee,
            Category.Ade,
            Category.Juice,
        ],
    },
    {
        category: Category.Juice,
        childCategories: [Category.SingleFlavor, Category.MixedFlavor],
    },
];
