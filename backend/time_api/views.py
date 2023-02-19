from django.http.response import HttpResponse
from django.shortcuts import render
from django.utils import timezone

# Create your views here.

def get_time(request):
    return HttpResponse(timezone.localtime().timestamp().__str__())