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

fake = Faker('he_IL')
fake2 = Faker()


@csrf_exempt
def index(request):
    date = datetime.date.today()
    context = {}
    posts = Post.objects.all()
    context['alerts'] = posts
    context['date'] = date
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
    address = fake.address()
    print(event_type, cust_num, case_stat, case_num)
    model = Post(event_type=event_type, cust_num=cust_num, case_stat=case_stat, case_num=case_num, address=address)
    model.save()
    return json.dumps("success!")


@csrf_exempt
def api_get(request):
    date = datetime.date.today()
    context = {}
    posts = Post.objects.all()
    data = serializers.serialize('json', posts)
    context['alerts'] = posts
    context['date'] = date
    return JsonResponse(data, safe=False)

