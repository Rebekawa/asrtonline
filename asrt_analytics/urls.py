from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='analytics-index'),
    path('charts', views.chart, name='charts'),
    path('map', views.map, name='map'),
]