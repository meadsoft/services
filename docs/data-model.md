# Data Model

## Entity Relationship Diagram

```mermaid
erDiagram
    MenuItem {
        string name
        string imageUrl
        string description
        number price
        boolean isFavorite
        boolean isActive
    }
    
    Category {
        string value
    }
    
    Size {
        string value
    }
    
    MenuItem ||--o| Size : "has optional"
    MenuItem ||--o{ Category : "belongs to multiple"
    
    Category ||--|| CategoryValues : "defines"
    Size ||--|| SizeValues : "defines"
    
    CategoryValues {
        string Drink
        string Food
        string Juice
        string SingleFlavor
        string MixedFlavor
        string Sandwich
        string MiniPizza
        string Bakery
        string Snack
        string Coffee
        string NonCoffee
        string Decaf
        string Hot
        string Cold
        string Ade
        string Specials
        string Seasonal
        string Tea
        string Anime
    }
    
    SizeValues {
        string ten_oz
        string sixteen_oz
        string twenty_oz
        string seven_inch
        string nine_inch
    }
```

## Class Diagram

```mermaid
classDiagram
    class MenuItem {
        -name: string
        -imageUrl?: string
        -description?: string
        -price: number
        -categories?: Category[]
        -isFavorite?: boolean
        -isActive?: boolean
        -size?: Size
        +constructor(menuItem: IMenuItem)
        +hasDescription(): boolean
    }
    
    class IMenuItem {
        <<interface>>
        +name: string
        +imageUrl?: string
        +description?: string
        +price: number
        +categories?: Category[]
        +isFavorite?: boolean
        +isActive?: boolean
        +size?: Size
    }
    
    class Category {
        <<enumeration>>
        Drink
        Food
        Juice
        SingleFlavor
        MixedFlavor
        Sandwich
        MiniPizza
        Bakery
        Snack
        Coffee
        NonCoffee
        Decaf
        Hot
        Cold
        Ade
        Specials
        Seasonal
        Tea
        Anime
    }
    
    class Size {
        <<enumeration>>
        TEN_OZ
        SIXTEEN_OZ
        TWENTY_OZ
        SEVEN_INCH
        NINE_INCH
    }
    
    MenuItem ..|> IMenuItem : implements
    MenuItem "1" --o "0..*" Category : categories
    MenuItem "1" --o "0..1" Size : size
    IMenuItem "1" --o "0..*" Category : categories
    IMenuItem "1" --o "0..1" Size : size
```

## Data Model Description

### MenuItem

The core entity representing a menu item in the Haru Cafe system. Each menu item has:

- **Required fields**: name, price
- **Optional fields**: imageUrl, description, categories, isFavorite, isActive, size
- **Relationships**:
  - Can belong to multiple categories (many-to-many)
  - Can have one size (one-to-one, optional)

### Category

An enumeration defining the different types of menu item categories. Categories are used to classify and filter menu items. Notable characteristics:

- Multiple categories can be assigned to a single menu item
- Categories include broad types (Food, Drink) and specific subtypes (Coffee, NonCoffee, Hot, Cold)
- Some categories may be mutually exclusive (defined in `MutuallyExclusiveCategories`)

### Size

An enumeration defining available sizes for menu items:

- **Liquid measurements**: 10oz, 16oz, 20oz (for drinks)
- **Physical measurements**: 7", 9" (for food items like pizzas)
- Size is optional - not all menu items require size specification

