from rest_framework.routers import DefaultRouter
from haru_debug.views import AuthDebugViewSet, DebugViewSet

router = DefaultRouter()
router.register('debug', DebugViewSet, basename='debug')
router.register('debug/auth', AuthDebugViewSet, basename='debug/auth')
urlpatterns = router.urls