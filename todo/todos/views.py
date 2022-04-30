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
    template_name = 'todolist.html'

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data['todolist'] = Todo.objects.filter(is_completed=False)
        context_data['completed_list'] = Todo.objects.filter(is_completed=True)
        return context_data


def async_test(request):
    data = json.loads(request.body.decode('utf-8'))
    logging.info(data['test'])
    if data['test'] == 'true':
        return JsonResponse({'result':True})
    else:
        return JsonResponse({'result':False})


# django cbv view 를 연습하기 위해 비동기통신을 django view 를 활용해봄. 
class TodoCreateView(View):
    def post(self, request, *args, **kwargs):
        logging.info('Here is TodoCreateView')
        data = json.loads(request.body.decode('utf-8'))
        logging.info(data)
        try:
            todo = Todo.objects.create(
                todo = data['todo'],
                # deadline = request.POST['deadline'],
                # created = request.POST['created'],
            )
            logging.info('Create todo object')
            result = True
            id = todo.id
        except Exception as e:
            logging.info('error')
            logging.info(e)
            result = False
            id = None
        context = {
            'is_success': result,
            'id': id,
        }
        return JsonResponse(context, safe=False)


class TodoDeleteView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        logging.info(data)
        id = data['id']
        logging.info(f'__id: {id}')
        try:
            todo = Todo.objects.get(id=id)
            id = todo.id
            todo.delete()
            result = True
        except Exception as e:
            logging.info('error')
            logging.info(e)
            result = False
            id = None
        context = {
            'is_success': result,
            'id': id,
        }
        return JsonResponse(context)


class TodoEditView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        logging.info(data['todo'])
        try:
            todo = Todo.objects.get(id = data['id'])
            todo.todo = data['todo']
            todo.save()
            result = True
            id = todo.id
        except Exception as e:
            logging.info(e)
            result = False
            id = None
        context = {
            'is_success': result,
            'id': id,
        }
        return JsonResponse(context, safe=False)


class TodoDone(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        try:
            todo= Todo.objects.get(id = data['id'])
            todo.is_completed = True
            todo.save()
            result = True
            id = todo.id
        except Exception as e:
            logging.info(e)
            result = False
            id = None
        context = {
            'is_success': result,
            'id': id,
        }
        return JsonResponse(context, safe=False)
