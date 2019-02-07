from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('accounts/logout/', views.logout_form, name='logout'),
    path('api/push', views.api_push),
    path('api/get', views.api_get),
]
