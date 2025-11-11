from rest_framework.routers import DefaultRouter
from .views import SeederViewSet

router = DefaultRouter()
router.register('seed', SeederViewSet, basename='seed')
urlpatterns = router.urls
