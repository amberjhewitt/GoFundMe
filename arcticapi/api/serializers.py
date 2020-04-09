from rest_framework import serializers

from api.models import Category, Product, Sale, Prediction


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [ 'id', 'title' ]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = [ 'id', 'name', 'description', 'category', 'filename', 'price' ]


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = [  'name', 'address1', 'address2', 'city', 'state', 'zipcode', 'total', 'items' ]


class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = [ "auto_fb_post_mode", "category_id", "goal", "title", "description", "location_city", "location_state", "location_zip", "is_charity", "DonationPerDay"]