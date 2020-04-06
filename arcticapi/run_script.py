#!/usr/bin/env python3
import json

# initialize django
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'arcticapi.settings'
import django
django.setup()

# regular imports
from api.models import Category, Product


# main script
def main():
    with open('products.json') as json_file:
        data = json.load(json_file)
    products = data['products']

    for p in products:
        print(p['name'])

        # category
        cat, created = Category.objects.get_or_create(title=p['category'])

        # product
        if Product.objects.filter(name=['name']).count() == 0:
            product = Product()
            product.category = cat
            product.name = p['name']
            product.filename = p['filename']
            product.id = int(p['id'])
            product.description = p['description']
            product.price = p['price']
            product.save()


# bootstrap
if __name__ == '__main__':
    main()
