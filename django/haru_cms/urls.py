from rest_framework.routers import DefaultRouter
from haru_cms.api.MenuItem import MenuItemViewSet
from haru_cms.api.MenuItemCategory import MenuItemCategoryViewSet
from haru_cms.api.MenuItemSize import MenuItemSizeViewSet

router = DefaultRouter()
router.register('cms/menu-items', MenuItemViewSet)
router.register('cms/menu-item-categories', MenuItemCategoryViewSet)
router.register('cms/menu-item-sizes', MenuItemSizeViewSet)
urlpatterns = router.urls
