from typing import List

class MenuItemRawJson:
  name: str
  image: str | None = None
  description: str | None = None
  price: float = 0.00
  categories: List[str] = []
  isFavorite: bool = False
  isActive: bool = True
  size: str | None = None
