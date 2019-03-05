from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.



def index(request):
    return render(request, 'asrt_analytics/index.html')


def chart(request):
    return render(request, 'asrt_analytics/chart.html')


def map(request):
    return render(request, 'asrt_analytics/map.html')