from django.urls import path
from accounts import views


app_name = 'acocunts'

urlpatterns = [
    path('', views.login, name='login'),
    path('login', views.login, name='login'),
]
