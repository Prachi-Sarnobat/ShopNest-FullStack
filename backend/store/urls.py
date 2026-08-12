from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/',views.register),
    path('token/',TokenObtainPairView.as_view()),
    path('token/refresh',TokenRefreshView.as_view()),    
    path('products/', views.get_products),
    path('products/<int:product_id>/', views.get_product),
    path('category/', views.get_category),
    path('cart/', views.get_cart),
    path('cart/add/', views.add_to_cart),
    path('cart/remove/', views.remove_from_cart),
    path('cart/update/', views.update_cart_quantity),
    path('order/create/',views.create_order),
]