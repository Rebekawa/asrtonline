import json
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from .models import Post
from django.views.decorators.csrf import csrf_exempt
import datetime
from django.contrib.auth import logout
from faker import Faker
from django.forms.models import model_to_dict
from django.core import serializers
from random import randint

fake = Faker()
fake2 = Faker()


@csrf_exempt
def index(request):
    context = {}
    posts = Post.objects.order_by('-date')
    context['alerts'] = posts
    return render(request, 'asrt_app/index.html', context)


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('index')

    else:
        form = UserCreationForm()
    context = {'form': form}

    return render(request, 'registration/register.html', context)


def logout_form(request):
    logout(request)
    return redirect('index')



@csrf_exempt
def api_push(request):
    event_type = request.META.get("HTTP_TAG")
    cust_num = fake2.ipv4()
    case_stat = "open"
    case_num = request.POST.get('case_num')
    locationsArr = [
    {
        "address":"Times Square, Manhattan, NY, USA",
        "coordinates":[-73.985130, 40.758896]
    },
    {
        "address":"1 Mission Way, Tenafly, NJ 07670",
        "coordinates":[-73.961130, 40.909080]
    },
    {
        "address":"1251 Ave of the Americas, New York City, NY 10020",
        "coordinates":[-73.981640, 40.760080]
    },
    {
        "address": "555 Universal Hollywood Dr, Universal City, CA 91608, USA",
        "coordinates":[-118.358398, 34.137039]
    },
    {
        "address":"The Eiffel Tower, Paris, France",
        "coordinates":[2.294694, 48.858093]
    },
    {
        "address": "Oudezijds Achterburgwal 60h, 1012 DP Amsterdam, Holland",
        "coordinates":[4.898950, 52.373680]
    },
    {
        "address": "Leipziger Pl. 9, 10117 Berlin, Germany",
        "coordinates":[13.379220, 52.508880]
    },
    {
        "address":"6 place brugmann 1050, brussels, Belgium",
        "coordinates":[4.354370, 50.817840]
    },
    {
        "address": "41 Rue Des Frères Lion 31000 Toulouse France",
        "coordinates":[1.453150, 43.600190]
    },
    ]
    location = locationsArr[randint(0, len(locationsArr))]
    print(location)
    address = location.address
    coordinates = json.dumps(location.coordinates)
    print(event_type, cust_num, case_stat, case_num)
    model = Post(event_type=event_type, cust_num=cust_num, case_stat=case_stat, case_num=case_num,date=datetime.date.today(), address=address, coordinates=coordinates)
    model.save()
    return json.dumps("success!")


@csrf_exempt
def api_get(request):
    posts = Post.objects.all()
    data = serializers.serialize('json', posts)
    return JsonResponse(data, safe=False)

