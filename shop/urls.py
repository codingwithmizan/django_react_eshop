from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('categories', CategoryViewset, basename='CategoryViewset')

urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductView.as_view(), name='products'),
    path('products/<int:id>/', ProductView.as_view(), name='products'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('register/', RegisterView.as_view(), name='register'),


]