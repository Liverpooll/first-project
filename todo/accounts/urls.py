from django.urls import path
from accounts import views

from accounts.views import  (
    LoginView, SignupView
)


app_name = 'acocunts'

urlpatterns = [
    path('', LoginView.as_view(), name='login'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', views.logout, name='logout'),
    path('signup/', SignupView.as_view(), name='signup'),
]
