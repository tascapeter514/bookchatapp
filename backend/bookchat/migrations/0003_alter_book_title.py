# Generated by Django 4.2.16 on 2025-01-21 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookchat', '0002_rename_languages_author_links_author_bio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='title',
            field=models.CharField(max_length=250),
        ),
    ]
