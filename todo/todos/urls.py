from django.urls import path
from todos.views import TodoListView


app_name = 'todos'

urlpatterns = [
    path('todolist/', TodoListView.as_view(), name='todolist'),
]
