from re import template
from django.http import JsonResponse
from django.shortcuts import render
from todos.models import Todo
from django.views.generic import ListView
from django.views import View

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


# django cbv view 를 연습하기 위해 create는 django view 를 활용해봄. 
class Create(View):
    def post(self, request, *args, **kwargs):
        try:
            Todo.objects.create(
                todo = request.POST['todo'],
                # deadline = request.POST['deadline'],
                # created = request.POST['created'],
            )
            result = True
        except:
            result = False
        context = {
            'is_success': result
        }
        return JsonResponse(context)
