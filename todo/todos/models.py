from tabnanny import verbose
from tkinter import CASCADE
from django.db import models
from accounts.models import User


class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='유저')
    todo = models.CharField(max_length=25, verbose_name='할일')
    is_completed = models.BooleanField(default=False, verbose_name='완료여부')
    deadline = models.DateTimeField(null=True, blank=True, verbose_name='기한')
    created = models.DateTimeField(auto_now_add=True, verbose_name='생성일')

    class Meta:
        verbose_name_plural = '할일'

    def __str__(self):
        return str(self.user.nickname) + str(self.todo)
