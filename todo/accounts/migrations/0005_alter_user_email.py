# Generated by Django 4.0.4 on 2022-04-24 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_user_is_active_user_is_admin_user_last_login_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(default='', max_length=30, unique=True, verbose_name='이메일'),
        ),
    ]