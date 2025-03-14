# Generated by Django 4.2.16 on 2025-03-12 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookchat', '0027_bookclub_cover_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitation',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('declined', 'Declined')], default='pending', max_length=100),
        ),
    ]
