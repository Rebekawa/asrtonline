from django.shortcuts import render
from django.http import HttpResponse
from asrt_app.models import Post
import json
from datetime import timezone
# Create your views here.


def cleanDuplicateCases(cases ,event_type):
    minutes_span = 6
    for i in range(0,len(cases)-1):
        if cases[i].event_type == event_type and cases[i+1].event_type == event_type:
            if json.loads(cases[i].coordinates) == json.loads(cases[i+1].coordinates):
                focusCaseTimeSecs = cases[i].date.replace(tzinfo=timezone.utc).timestamp()
                neighborCaseTimeSecs = cases[i+1].date.replace(tzinfo=timezone.utc).timestamp()
                timeRangeTop = focusCaseTimeSecs + (minutes_span/2 * 60 * 60)
                timeRangeBottom = focusCaseTimeSecs - (minutes_span/2 * 60 * 60)
                if neighborCaseTimeSecs < timeRangeTop and neighborCaseTimeSecs > timeRangeBottom:
                    cases[i].delete()
    return cases


def index(request):
    cases = Post.objects.all()
    cleanDuplicateCases(cases, "baby_cry")
    all_open_cases = Post.objects.filter(case_stat="open")
    all_close_cases = Post.objects.filter(case_stat="close")
    cases_2019 = Post.objects.filter(date__year=2018)
    context = {
        "all_cases": cases,
        "all_cases_count": len(cases),
        "open_cases": all_open_cases,
        "all_open_cases_count": len(all_open_cases),
        "close_cases": all_close_cases,
        "all_closed_cases_count": len(all_close_cases),
    }
    return render(request, 'asrt_analytics/index.html', context)


def chart(request):
    return render(request, 'asrt_analytics/chart.html')


def map(request):
    return render(request, 'asrt_analytics/map.html')