const fs = require('fs');
const path = require('path');

// Size database entries - need to fetch actual IDs
const sizesData = [
    { "name": "10oz" },
    { "name": "16oz" },
    { "name": "20oz" },
    { "name": "7\"" },
    { "name": "9\"" }
];

// Menu items database entries
const menuItemsData = [{"id":"022a70c9-36e0-4b44-8756-a05a5df57b76","name":"Shrimp Guacamole Sandwich"},{"id":"0338da8d-aa65-4e20-90bc-309532842949","name":"Haru Signature Latte"},{"id":"05dbd3e5-8c5f-4a60-b01e-bf82dbc5da97","name":"Chocolate Form: Flowing Mint Latte"},{"id":"06b9dbd2-b50b-4c32-9de9-a411998a085c","name":"K - Corn Dog"},{"id":"0a6df8f9-82bd-4f39-b7af-69c110db47bb","name":"Sweet Potato Mousse Pizza"},{"id":"0b9b258a-6c2d-46ba-bc1e-4c4ebf1add1b","name":"Summer Red Sparkling"},{"id":"0d4226ab-fe60-4f30-a26a-821d65cbb3b0","name":"Winter Hot Chocolate"},{"id":"0dd557b9-475b-46bc-a0ae-8521a3a4d2c7","name":"Jujube Tea"},{"id":"0e8a9bfa-4bc6-4464-b93a-b56fff40b138","name":"Berry Lover Juice"},{"id":"0feb3f65-cd80-41c0-9700-567cb9886619","name":"Orange + Pineapple Juice"},{"id":"110b04e3-826a-4bed-a7f6-2823698d4667","name":"Chicken Guacamole Sandwich"},{"id":"1131c602-4e65-410f-8a5d-c22217c9c48b","name":"Grapefruit Juice"},{"id":"15a55a82-437d-462c-af8d-7c900403caf7","name":"Arisen Lychee Lemonade"},{"id":"18abcb4e-e812-4e77-8c44-3d5b20e44543","name":"Kiwi + Banana Juice"},{"id":"196ffd85-08e6-41d6-bf4c-de006ce05a62","name":"Hot Yuza Matcha Latte"},{"id":"19975d59-5559-417d-ac0f-fc5c0a2e65bd","name":"Spicy Tuna Sandwich"},{"id":"1a56e93d-402d-44f6-8975-1d83393288c1","name":"Green Tea Flavored Mochi Ice Cream"},{"id":"1a7eaa06-7329-49a8-9efb-39d5903e49b7","name":"Iced Blueberry Latte"},{"id":"1ab5d3df-d565-444f-8047-3aea551eb55b","name":"Sweet Demon Latte"},{"id":"238feddc-5198-4abc-a418-5f59c122bea4","name":"Honey Bread"},{"id":"242508eb-3e62-40f4-b331-e1c885a425fa","name":"Margherita Pizza"},{"id":"24ef87b1-8ae1-41b8-9b0a-3b1a49c321cf","name":"Iced Vanilla Latte"},{"id":"2b73149b-5044-4ea5-8983-2811bfdae715","name":"Caramel Latte"},{"id":"2b7cd190-3cf1-4166-88a9-f8b1e8a10b74","name":"Twilight Blueberry-ade"},{"id":"2f2ec885-1e93-42a7-b790-9b336105939a","name":"K - Garlic Bread"},{"id":"37196fad-bdae-4581-8e79-2620a21b31a0","name":"Strawberry Butterfly Spiral"},{"id":"37e452c9-3975-4cb7-ae4c-116030b4f1b3","name":"Mango Flameade"},{"id":"3eb58af4-69d9-4faa-b1e3-86a0a52baa02","name":"Iced Cafe Latte"},{"id":"46ce905e-64c1-4725-8d8b-636972b56f07","name":"Love Blossom Matcha Latte"},{"id":"486b196e-cfd4-4790-aafc-db21fe08dcb4","name":"Sausage In Garlic Bread"},{"id":"4a296fd0-2a13-47ea-8cb4-258da1dfd455","name":"Peach Iced Tea"},{"id":"4b9e78b6-194c-4f8d-ae9e-b67398ee71ed","name":"Hot Matcha Latte"},{"id":"520b5c2d-389c-49d7-9e89-794b3f8633a9","name":"Cloud Latte"},{"id":"53193357-2f09-4f4a-8d7f-ade9e278e798","name":"Iced Matcha Latte"},{"id":"5508281d-26bc-4877-a144-98fea6e649bb","name":"Iced Haru Signature Latte"},{"id":"5882a3c2-c21f-4049-8c2e-98a2aea0c647","name":"Pepperoni Pizza"},{"id":"5a57e02c-5aa4-4cfe-9cb3-f107a4de82f5","name":"Orange + Grapefruit Juice"},{"id":"606f707b-4ccc-422e-b8c5-ad58949c3111","name":"Watermelon + Pineapple Juice"},{"id":"60b85fca-57c8-44e7-9161-c5c58c9921b8","name":"Moe Moe Sweet Mint Beam"},{"id":"61362d9a-9219-4a9d-830e-eee38035d42f","name":"Aurora Lemonade"},{"id":"66ea79cc-beec-466b-9ec9-be864e7f913e","name":"Iced Sweet Milk Latte"},{"id":"670715d8-bf8d-469e-b6a2-880c7e48bb22","name":"Iced Cloud Latte"},{"id":"6ff1857e-a7e5-4894-be66-60358721a74b","name":"Iced Choco Strawberry Delight"},{"id":"7201f677-1300-40ac-8f79-f581cb7b37f3","name":"Potato Blanket Toast"},{"id":"7a07a3c8-3ec8-48af-9eb4-08670e57b0e6","name":"Yuza Tea"},{"id":"8115e078-e480-4cb8-91eb-c754c6a50de3","name":"Cheese Pizza"},{"id":"830b4841-0a3c-46cf-a749-8a4a486ac2c6","name":"Fall Pumpkin Spice Latte"},{"id":"83677dcc-67d2-4aab-9474-2d5b6f44553f","name":"Honey Butter Croissant"},{"id":"855735c7-da64-477b-88bf-e1d192a271a5","name":"Iced Strawberry Latte"},{"id":"8678dafb-982b-44cc-abbf-3af75ab12ec8","name":"Chocolate Muffin"},{"id":"8a143404-fc04-4f6d-8ef9-672acd95ee3f","name":"Fresh Fruit Cream Sandwich"},{"id":"8d9cf455-26f7-46bb-9c13-4cc081a10476","name":"Ginger Tea"},{"id":"8eaba893-764b-4044-bbb3-40ed2c3177db","name":"Iced Spring Latte"},{"id":"8efa4ea1-b7e6-4eca-9bfa-3d4073ea1966","name":"Strawberry + Kiwi Juice"},{"id":"8f6ecbc9-f04f-45e6-9093-51d44cabbc73","name":"Cafe Latte"},{"id":"8f994e99-ff77-4378-af68-840ddacae914","name":"Vanilla Latte"},{"id":"920f6f37-9f98-4c45-97e1-eaf2100ca76c","name":"Strawberry Mochi"},{"id":"9512682c-1f6e-4838-916e-427704d876cd","name":"Mango Juice"},{"id":"992b8cc1-5f0d-4f1b-8d19-20f754c02b6b","name":"Harmonic Grapeade"},{"id":"9ba06a0d-efb4-429e-8d4b-2e49546139fd","name":"Iced Caramel Latte"},{"id":"a498e733-88c2-44f7-9126-07a49460038b","name":"Iced Fall Pumpkin Spice Latte"},{"id":"a59e2dc2-75d4-425e-aadf-bdc04bc8050e","name":"Ham & Egg Sandwich"},{"id":"b0b9bada-40bb-4b9e-83d5-9de46f86839a","name":"Iced K - Coffee"},{"id":"b710bf52-e689-4bb3-9e22-f795c61f2a4c","name":"Orange Juice"},{"id":"ba7d7fac-04c2-42f6-8db1-d097a6a25555","name":"Green Tea"},{"id":"bc9007bd-459f-4d51-b61f-9885e4a37086","name":"Iced Choco Latte"},{"id":"bcf432e2-7bf9-47b9-a00b-77eef15e5699","name":"Watermelon Juice"},{"id":"c3763316-613d-4214-a1ff-c1ae15267286","name":"Blue Ocean Latte"},{"id":"c75bf990-f987-45d9-9a51-75013d66b35c","name":"Americano"},{"id":"c7c9eaa4-5c92-4175-a300-5c242118e26b","name":"Strawberry Flavored Mochi Ice Cream"},{"id":"cb80019f-0ca8-4954-b870-62d23ed421d2","name":"Lemonade Type: Explosive Razz"},{"id":"d0b554e9-05d0-402f-b6e8-ae3a20ae4a19","name":"Jeju Pizza"},{"id":"d14d849e-aafc-4a92-b3ff-143cb4e67c6d","name":"Blood Lemonade"},{"id":"d7ce70a8-945a-4def-8d6e-74c14a2399ca","name":"Cursed Turbo Razz Soda"},{"id":"d879ca25-35b9-4190-840d-3653e0b42034","name":"Berry Lemonade"},{"id":"db737cf6-0391-4ac0-8cd7-94821af5df35","name":"Peach Lemon Tea"},{"id":"df241274-a9c1-41d4-bed7-89835effa9b5","name":"Sweet Milk Latte"},{"id":"e6bc83ec-f9cc-49e3-a1ee-835687ddd8c9","name":"Strawberry + Banana Juice"},{"id":"e6f61278-5e3c-4607-9c1a-f5bff93a4101","name":"Iced Blue Ocean Latte"},{"id":"e80b567d-91d7-4de7-9a9e-85dccaf02f10","name":"Glazed Banana"},{"id":"f0dbfdcd-74e9-468d-8098-c991c816208f","name":"K - Coffee"},{"id":"f14f742b-fd2d-418b-8366-949b9dc2e71c","name":"Orange Expresso"},{"id":"f8357679-c322-4b0d-b463-7d616cc66695","name":"Iced Americano"},{"id":"fdeefc1d-9974-4064-8a27-8f63de6de630","name":"Chicken Sandwich"},{"id":"fe4464d5-80b5-4405-804d-af7440a6bf9d","name":"Expresso"}];

// Read the frontend menu-items.ts file
const menuItemsPath = path.join(__dirname, 'apps/frontend/src/data/menu-items.ts');
const menuItemsContent = fs.readFileSync(menuItemsPath, 'utf8');

// Parse size mappings from menu-items.ts
// Looking for patterns like: size: Size['20oz']
const sizeRegex = /name:\s*['"]([^'"]+)['"][^}]*size:\s*Size\[['"]([^'"]+)['"]\]/gs;
const menuItemSizeMap = {};

let match;
while ((match = sizeRegex.exec(menuItemsContent)) !== null) {
    const itemName = match[1];
    const sizeName = match[2];
    menuItemSizeMap[itemName] = sizeName;
}

console.log('Found size mappings for', Object.keys(menuItemSizeMap).length, 'items');

// We need to query the database for actual size IDs
// For now, I'll note which sizes we need
const uniqueSizes = [...new Set(Object.values(menuItemSizeMap))];
console.log('Unique sizes needed:', uniqueSizes);
console.log('\nPlease run this query to get size IDs:');
console.log('SELECT id, name FROM sizes WHERE name IN (' + uniqueSizes.map(s => `'${s}'`).join(', ') + ');');
console.log('\nThen update this script with the actual IDs.');

// Placeholder: You need to update these with actual size IDs from the database
const sizeIdMap = {
    '10oz': 'REPLACE_WITH_ACTUAL_10oz_ID',
    '16oz': 'REPLACE_WITH_ACTUAL_16oz_ID',
    '20oz': 'REPLACE_WITH_ACTUAL_20oz_ID',
    '7"': 'REPLACE_WITH_ACTUAL_7_INCH_ID',
    '9"': 'REPLACE_WITH_ACTUAL_9_INCH_ID'
};

// Generate menu-item-to-size mappings
const menuItemToSizes = [];

menuItemsData.forEach(menuItem => {
    const sizeName = menuItemSizeMap[menuItem.name];
    if (sizeName) {
        const sizeId = sizeIdMap[sizeName];
        if (sizeId && !sizeId.startsWith('REPLACE_WITH')) {
            menuItemToSizes.push({
                menuItemId: menuItem.id,
                sizeId: sizeId
            });
        } else {
            console.log(`Warning: No size ID mapping for size "${sizeName}" (menu item: ${menuItem.name})`);
        }
    } else {
        console.log(`Warning: No size found in menu-items.ts for: ${menuItem.name}`);
    }
});

// Write to file
const outputPath = path.join(__dirname, 'apps/restaurant-catalog-api/src/seeds/haru-cafe-menu-items-to-sizes.json');
fs.writeFileSync(outputPath, JSON.stringify(menuItemToSizes, null, 4));

console.log(`\nGenerated ${menuItemToSizes.length} menu-item-to-size mappings`);
console.log(`Output file: ${outputPath}`);
