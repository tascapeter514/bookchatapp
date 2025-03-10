# Generated by Django 4.2.16 on 2025-02-11 19:07

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bookchat', '0014_bookclub_isprivate_alter_bookclub_bookshelves_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookclub',
            name='members',
            field=models.ManyToManyField(related_name='bookclubs', to=settings.AUTH_USER_MODEL),
        ),
    ]
