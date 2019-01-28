from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from .models import Post
import datetime


def index(request):
    date = datetime.date.today()
    if request.method == 'POST':
        event_type = request.POST.get('event_type')
        cust_num = request.POST.get('cust_num')
        case_stat = request.POST.get('case_stat')
        case_num = request.POST.get('case_num')
        print(event_type, cust_num, case_stat, case_num)
        model = Post(event_type=event_type, cust_num=cust_num, case_stat=case_stat, case_num=case_num)
        model.save()
    context = {}
    posts = Post.objects.all()
    context['alerts'] = posts
    context['date'] = date
    print(context)
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
