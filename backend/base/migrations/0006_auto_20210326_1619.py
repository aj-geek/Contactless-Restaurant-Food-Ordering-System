# Generated by Django 3.1.7 on 2021-03-26 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_deliveryaddress_ordermode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder-image.png', null=True, upload_to=''),
        ),
    ]