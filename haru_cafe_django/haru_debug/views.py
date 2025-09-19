from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action
from rest_framework.serializers import Serializer

class DebugViewSet(viewsets.ViewSet):
  permission_classes = [permissions.AllowAny]
  serializer_class = Serializer
  
  @action(detail=False)
  def ping(_: Request, _1) -> Response:
    return Response('pong')
  
  
class AuthDebugViewSet(viewsets.ViewSet):
  permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
  serializer_class = Serializer
  
  @action(detail=False)
  def ping(_: Request, _1) -> Response:
    return Response('pong but with auth')
