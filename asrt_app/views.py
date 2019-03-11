import json
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from .models import Post, Alert
from django.views.decorators.csrf import csrf_exempt
import datetime
from django.contrib.auth import logout
from faker import Faker
from django.forms.models import model_to_dict
from django.core import serializers
from random import randint
from threading import Timer
import time

fake = Faker()
fake2 = Faker()

locationsArr = [
    {
        "address": "Times Square, Manhattan, NY, USA",
        "coordinates": [-73.985130, 40.758896]
    },
    {
        "address": "1 Mission Way, Tenafly, NJ 07670",
        "coordinates": [-73.961130, 40.909080]
    },
    {
        "address": "1251 Ave of the Americas, New York City, NY 10020",
        "coordinates": [-73.981640, 40.760080]
    },
    {
        "address": "555 Universal Hollywood Dr, Universal City, CA 91608, USA",
        "coordinates": [-118.358398, 34.137039]
    },
    {
        "address": "The Eiffel Tower, Paris, France",
        "coordinates": [2.294694, 48.858093]
    },
    {
        "address": "Oudezijds Achterburgwal 60h, 1012 DP Amsterdam, Holland",
        "coordinates": [4.898950, 52.373680]
    },
    {
        "address": "Leipziger Pl. 9, 10117 Berlin, Germany",
        "coordinates": [13.379220, 52.508880]
    },
    {
        "address": "6 place brugmann 1050, brussels, Belgium",
        "coordinates": [4.354370, 50.817840]
    },
    {
        "address": "41 Rue Des Frères Lion 31000 Toulouse France",
        "coordinates": [1.453150, 43.600190]
    },
    {
        "address": "Shocken 18, Tel Aviv, Israel",
        "coordinates": [34.772060, 32.052850]
    },
    {
        "address": "Habanim 13, Ramat Gan, Israel",
        "coordinates": [34.820910, 32.075730]
    },
    {
        "address": "Matalon 1, Tel Aviv, Israel",
        "coordinates": [34.768280, 32.058670]
    },
    {
        "address": "Y L Peretz 23, Tel Aviv, Israel",
        "coordinates": [34.775340, 32.059550]
    },
    {
        "address": "Hatsoarim 7, Petah Tikva, Israel",
        "coordinates": [34.869720, 32.089280]
    },
    {
        "address": "Ben Gurion Airport, Israel",
        "coordinates": [34.870610, 32.000060]
    },
    {
        "address": "Eli Cohen 1, Tel Aviv, Israel",
        "coordinates": [34.791910, 32.121980]
    },
    {
        "address": "Sokolov 5, Herzliya, Israel",
        "coordinates": [34.839080, 32.166820]
    },
    {
        "address": "Sura 10, Ramat Gan, Israel",
        "coordinates": [34.834820, 32.068790]
    },
    {
        "address": "Rue Renier Chalon 42, Brussels, Belgium",
        "coordinates": [4.360010, 50.818300]
    },
    {
        "address": "Rue De L'instruction 121, Brussels, Belgium",
        "coordinates": [4.330730, 50.836770]
    },

]


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
    location = locationsArr[randint(0, len(locationsArr)-1)]
    address = location['address']
    coordinates = json.dumps(location['coordinates'])
    model = Post(event_type=event_type, cust_num=cust_num, case_stat=case_stat, case_num=case_num,date=datetime.date.today(), address=address, coordinates=coordinates)
    model.save()
    return json.dumps("success!")


@csrf_exempt
def api_get(request):
    posts = Post.objects.all()
    data = serializers.serialize('json', posts)
    return JsonResponse(data, safe=False)

@csrf_exempt
def api_get_alerts(request):
    alerts = Alert.objects.all()
    data = serializers.serialize('json', alerts)
    return JsonResponse(data, safe=False)


@csrf_exempt
def api_update(request, case_num):
    post = Post.objects.get(case_num=case_num)
    post.case_description = request.POST.get('case_description')
    post.save()
    return HttpResponseRedirect('/')

@csrf_exempt
def api_change_event_status(request, case_num, case_stat):
    if case_stat == "open":
        new_case_status = "close"
    else: 
        new_case_status = "open"
    post = Post.objects.get(case_num=case_num)
    post.case_stat = new_case_status
    post.save()
    return HttpResponseRedirect('/')


def saveAlert(request):
    data_received = json.loads(request.POST.get("data"))
    alert_type_ = data_received["alert_type"]
    location = data_received["location"]
    new_alert = Alert(alert_type=alert_type_, location=location)
    new_alert.save()

    response_data = {}
    try:
        response_data["result"] = "saving an alert was a success"
        response_data["message"] = "hooray!"
    except:
        response_data["result"] = "total faliure on save"
        response_data["message"] = "redo!"
    return HttpResponse(json.dumps(response_data), content_type="application/json")


@csrf_exempt
def api_push_demo(request):
    eventsForDemo = [
        {
            "event_type": "glass_break",
            "cust_num": fake2.ipv4(),
            "address": "1 Mission Way, Tenafly NJ 07670 USA",
            "coordinates": [-73.961128, 40.909081],
        },
        {
            "event_type": "dog_barking",
            "cust_num": fake2.ipv4(),
            "address": "1 Mission Way, Tenafly NJ 07670 USA",
            "coordinates": [-73.961128, 40.909081],
        },
        {
            "event_type": "baby_cry",
            "cust_num": fake2.ipv4(),
            "address": "1 Mission Way, Tenafly NJ 07670 USA",
            "coordinates": [-73.961128, 40.909081],
        },
        {
            "event_type": "dog_barking",
            "cust_num": fake2.ipv4(),
            "address": "1 Mission Way, Tenafly NJ 07670 USA",
            "coordinates": [-73.961128, 40.909081],
        },
        {
            "event_type": "baby_cry",
            "cust_num": fake2.ipv4(),
            "address": "1 Mission Way, Tenafly NJ 07670 USA",
            "coordinates": [-73.961128, 40.909081],
        },
        {
            "event_type": "glass_break",
            "cust_num": fake2.ipv4(),
            "address": "1 Mission Way, Tenafly NJ 07670 USA",
            "coordinates": [-73.961128, 40.909081],
        },
        {
            "event_type": "dog_barking",
            "cust_num": fake2.ipv4(),
            "address": "1 Mission Way, Tenafly NJ 07670 USA",
            "coordinates": [-73.961128, 40.909081],
        },

    ]
    save_demo_events = Timer(3.0, saveDemoEvents, eventsForDemo)
    save_demo_events.start()
    return json.dumps("success!")


def saveDemoEvents(*event_list):
    for event in event_list:
        model = Post(event_type=event["event_type"], cust_num=event["cust_num"], case_stat="open", address=event["address"], coordinates=event["coordinates"])
        model.save()
        time.sleep(8.0)


