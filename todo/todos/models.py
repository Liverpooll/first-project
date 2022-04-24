from django.db import models
from accounts.models import User


class Todo(models.Model):
    class Cycle(models.IntegerChoices):
        없음 = 0
        월 = 1
        화 = 2
        수 = 3
        목 = 4
        금 = 5
        토 = 6
        일 = 7

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='유저', blank=True, null=True)
    todo = models.CharField(max_length=25, verbose_name='할일')
    repeat_cycle = models.IntegerField(choices=Cycle.choices, default=0, verbose_name='반복주기')
    is_completed = models.BooleanField(default=False, verbose_name='완료여부')
    deadline = models.DateTimeField(null=True, blank=True, verbose_name='기한')

    class Meta:
        verbose_name_plural = '할일'

    def __str__(self):
        return str(self.user) + str(self.todo)
