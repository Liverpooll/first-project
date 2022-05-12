from django.db import models
from common.models import TimeStampedModel


class Todo(TimeStampedModel):
    todo = models.CharField(max_length=25, verbose_name='할일')
    is_completed = models.BooleanField(default=False, verbose_name='완료여부')

    class Meta:
        verbose_name_plural = '할일'

    def __str__(self):
        return str(self.user) + str(self.todo)
