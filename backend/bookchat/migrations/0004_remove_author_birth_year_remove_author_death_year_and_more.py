# Generated by Django 4.2.16 on 2025-01-21 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookchat', '0003_alter_book_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='author',
            name='birth_year',
        ),
        migrations.RemoveField(
            model_name='author',
            name='death_year',
        ),
        migrations.AddField(
            model_name='author',
            name='birth_date',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='author',
            name='death_date',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
