from django.shortcuts import render, redirect

from django.views import View

from accounts.models import User

import logging

logging.basicConfig(level=logging.INFO)


def login(request):
    return render(request, 'login.html')


class LoginView(View):
    template_name = 'login.html'
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    def post(self, request, *args, **kwargs):
        return render(request, self.template_name)


def logout(request):
    pass


class SignupView(View):
    template_name = 'signup.html'
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    def post(self, request, *args, **kwargs):
        user = User.objects.create_user(
            request.POST.get('email'),
            request.POST.get('pw'),
        )
        user.nickname = request.POST.get('nickname')
        user.save()
        return redirect('todos:todolist')
