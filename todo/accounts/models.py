from tabnanny import verbose
from django.db import models


class User(models.Model):
    email = models.CharField(max_length=30, default='', unique=True, verbose_name='이메일')
    password = models.CharField(max_length=12, verbose_name='비밀번호')
    nickname = models.CharField(max_length=8, verbose_name='닉네임')

    class Meta:
        verbose_name_plural = '유저'
    
    def __str__(self):
        return self.nickname
