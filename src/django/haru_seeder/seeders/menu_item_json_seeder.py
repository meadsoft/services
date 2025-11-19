import json
from decimal import Decimal, getcontext
from haru_cms.models import MenuItemSize, MenuItemCategory, MenuItem
from haru_seeder.models import MenuItemRawJson


class MenuItemRawJsonSeeder:
  """
  Custom seeder that takes in the path of a JSON file and seeds the database with the menu items in the JSON file.
  
  The JSON file should have a format similar to MenuItemRawJson
  """
  def seed(self, filepath: str):
    with open(filepath, 'r') as file:
      print(f"Seeding menu items from {file.name}")
      json_str = file.read()
      menu_items = json.loads(json_str)
      for menu_item in menu_items:
        self._save_menu_item(self._deserialize_menu_item(menu_item))

      print("Seeding complete")
      return json_str

  def _deserialize_menu_item(self, menu_item: dict) -> MenuItemRawJson:
    raw = MenuItemRawJson()
    raw.name=menu_item.get('name')
    raw.description=menu_item.get('description')
    raw.image=menu_item.get('image')
    raw.price=0.0 if menu_item.get('price') is None else menu_item.get('price')
    raw.categories=[] if menu_item.get('categories') is None else menu_item.get('categories')
    raw.isFavorite=False if menu_item.get('isFavorite') is None else menu_item.get('isFavorite')
    raw.isActive=True if menu_item.get('isActive') is None else menu_item.get('isActive')
    raw.size=menu_item.get('size')
    return raw

  def _save_menu_item(self, menu_item_raw: MenuItemRawJson):
    already_exists = MenuItem.objects.filter(name=menu_item_raw.name).first()
    if already_exists:
      print(f"Menu item {menu_item_raw.name} already exists. Skipping...")
      return
    
    size = self._get_or_create_size(menu_item_raw.size)
    categories = []
    for category_name in menu_item_raw.categories:
      categories.append(self._get_or_create_category(category_name))
    
    priceContext = getcontext()
    priceContext.prec = 3
    menu_item = MenuItem.objects.create(
      name=menu_item_raw.name,
      description=menu_item_raw.description,
      price=Decimal(menu_item_raw.price),
      isFavorite=menu_item_raw.isFavorite,
      isActive=menu_item_raw.isActive,
      size=size,
    )
    for category in categories:
      menu_item.categories.add(category)
      
    menu_item.save()
    
  def _get_or_create_size(self, size: str) -> MenuItemSize:
    db_size = MenuItemSize.objects.filter(size=size).first()
    if db_size is None:
      db_size = MenuItemSize.objects.create(size=size)
      print(f"Created new size: {db_size.size}")
    return db_size

  def _get_or_create_category(self, category_name: str) -> MenuItemCategory:
    db_category = MenuItemCategory.objects.filter(name=category_name).first()
    if db_category is None:
      db_category = MenuItemCategory.objects.create(name=category_name)
      print(f"Created new category: {db_category.name}")
    return db_category