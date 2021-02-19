from django.contrib import admin
from .models import Profile, Product, Category, Cart, CartProduct, Order

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Profile)
admin.site.register(Cart)
admin.site.register(CartProduct)
admin.site.register(Order)