from django.urls import path
from todos.views import (
    TodoListView,
    TodoCreateView,
    TodoDeleteView,
)
from todos import views

app_name = 'todos'

urlpatterns = [
    path('todolist/', TodoListView.as_view(), name='todolist'),
    path('create/', TodoCreateView.as_view(), name='create'),
    path('delete/', TodoDeleteView.as_view(), name='delete'),
    path('async-test/', views.async_test, name='async-test'),
]
