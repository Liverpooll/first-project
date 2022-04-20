from django.urls import path
from todos.views import TodoListView, Create
from todos import views

app_name = 'todos'

urlpatterns = [
    path('todolist/', TodoListView.as_view(), name='todolist'),
    path('create/', Create.as_view(), name='create'),
    path('async-test/', views.async_test, name='async-test'),
]
