from django.urls import path
from base.views import product_views as views



urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('<str:category>/', views.getCatProducts, name="category-products"),
    path('product/top/', views.getTopProducts, name="top-products"),
    path('product/<str:pk>', views.getProduct, name="product"),

    path('product/<str:pk>/reviews/', views.createProductReview, name="product-review"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]