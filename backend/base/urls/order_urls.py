from django.urls import path
from base.views import order_views as views



urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('export/', views.getOrdersAsExcel, name='export-orders'),
    path('<str:pk>/sendmail/', views.sendMail, name='send-mail'),

    path('<str:pk>/deliver/', views.updateOrderToServed, name='order-ready'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]