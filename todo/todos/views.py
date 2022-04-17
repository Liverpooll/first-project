from re import template
from django.shortcuts import render
from todos.models import Todo
from django.views.generic import ListView


# def todos(request):
#     return render(request, 'todo.html')


class TodoListView(ListView):
    model = Todo
    context_object_name = 'todos'
    template_name = 'todolist.html'
