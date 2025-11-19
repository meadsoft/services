from typing import Callable, List
from thefuzz import fuzz
from haru_cms.models import MenuItem
from django.db.models import QuerySet
import os

FUZZ_RATIO_SCORE_THRESHOLD = 60
FUZZ_TOKEN_SORT_RATIO_SCORE_THRESHOLD = 80
FUZZ_TOKEN_SET_RATIO_SCORE_THRESHOLD = 80

class ImageUrlSeeder:
  """
  Custom seeder that takes in the path of a JSON file and seeds the database with the menu items in the JSON file.
  
  The JSON file should have a format similar to MenuItemRawJson
  """
  def seed(self, images_dir: str):
    print(f"Seeding image urls for all menu items in the database. image base url is", images_dir)
    return_str = []
    
    menu_items: QuerySet = MenuItem.objects.all()
    callback = self._on_image_seeded_callback()
    self.seed_images(images_dir, menu_items, callback)
    print("Seeding complete for image urls")
    return '\n'.join(return_str)
  
  def seed_images(self, images_dir: str, menu_items: QuerySet[MenuItem], on_menu_item_seeded: Callable[[MenuItem, bool], None]) -> List[str]:
    image_files = os.listdir(images_dir)
    for image_file in image_files:
      self.seed_image(image_file, menu_items, on_menu_item_seeded)
      
  def seed_image(self, image_name: str, menu_items: QuerySet[MenuItem], on_menu_item_seeded: Callable[[MenuItem, bool], None]):
    menu_item = self.find_matching_menu_item(image_name, menu_items)
    if menu_item is None:
      on_menu_item_seeded(menu_item, False)
      return

    menu_item.image = image_name
    menu_item.save()
    on_menu_item_seeded(menu_item, True)
    
  def find_matching_menu_item(self, image_name: str, menu_items: QuerySet[MenuItem]) -> MenuItem | None:
    for menu_item in menu_items:
      is_menu_item_image_bad = menu_item.image is None or menu_item.image == ""
      if is_menu_item_image_bad:
        continue
      
      if self.does_image_name_belong_to_menu_item(image_name, menu_item):
        return menu_item
      
    return None
    
  def does_image_name_belong_to_menu_item(self, image_name: str, menu_item: MenuItem):
    return fuzz.ratio(image_name, menu_item.name) > FUZZ_RATIO_SCORE_THRESHOLD \
      or fuzz.token_set_ratio(image_name, menu_item.name) > FUZZ_TOKEN_SET_RATIO_SCORE_THRESHOLD \
      or fuzz.token_sort_ratio(image_name, menu_item.name) > FUZZ_TOKEN_SORT_RATIO_SCORE_THRESHOLD
  
  def _on_image_seeded_callback(self, images_dir: str, return_str: List[str]) -> Callable[[MenuItem, bool], None]:
    def on_image_seeded(menu_item: MenuItem, is_seeded: bool):
      if is_seeded:
        return_str.append(f"Seeded image for {menu_item.name} with {images_dir}/{menu_item.image}")
    return on_image_seeded