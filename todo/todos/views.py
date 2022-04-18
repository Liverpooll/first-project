from re import template
from django.http import JsonResponse
from django.shortcuts import render
from todos.models import Todo
from django.views.generic import ListView
import json
import logging

logging.basicConfig(level=logging.INFO)


class TodoListView(ListView):
    model = Todo
    context_object_name = 'todos'
    template_name = 'todolist.html'


def async_test(request):
    data = json.loads(request.body.decode('utf-8'))
    logging.info(data['test'])
    if data['test'] == 'true':
        return JsonResponse({'result':True})
    else:
        return JsonResponse({'result':False})
