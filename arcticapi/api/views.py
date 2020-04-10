from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# from api.models import Category
# from api.serializers import CategorySerializer
# from api.models import Product
# from api.serializers import ProductSerializer
# from api.models import Sale

import json

import requests


class CreatePrediction(APIView):

    @csrf_exempt
    def post(data, request, format=None):

      body = json.loads(request.body)

      # category = body.category_id
      # title = str(body.title)
      # description = str(body.description)
      # city = str(body.location_city)
      # state = str(body.location_state)
      # aZip = str(body.location_zip)
        

      url = "https://ussouthcentral.services.azureml.net/workspaces/2abd23f891284eb98f5356e46b5cb743/services/5f8fb15e0fa54250a7a827a534139f52/execute?api-version=2.0&details=true"

      payload = "{\r\n  \"Inputs\": {\r\n    \"input1\": {\r\n      \"ColumnNames\": [\r\n        \"auto_fb_post_mode\",\r\n        \"category_id\",\r\n        \"goal\",\r\n        \"title\",\r\n        \"description\",\r\n        \"location_city\",\r\n        \"location_state\",\r\n        \"location_zip\",\r\n        \"is_charity\",\r\n        \"DonationPerDay\"\r\n      ],\r\n      \"Values\": [\r\n        [\r\n          \"1\",\r\n          \"" + str(body['category_id']) + "\",\r\n          \"" + str(body['goal']) + "\",\r\n          \"" + str(body['title']) + "\",\r\n          \"" + str(body['description']) + "\",\r\n          \"" + str(body['location_city']) + "\",\r\n          \"" + str(body['location_state']) + "\",\r\n          \"" + str(body['location_zip']) + "\",\r\n          \"1\",\r\n          \"121.13\"\r\n        ],\r\n      ]\r\n    }\r\n  },\r\n  \"GlobalParameters\": {}\r\n}"
      
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer MujZ7ab+kOueM44Y0hTbigu0tG7VGmNkHYts/YRXBBg1fNnCodWvy29uY8UWqxFB9/rNPCBMT5T/HWlOwHIZXg==',
        'Content-Type': 'application/json'
      }

      response = requests.request("POST", url, headers=headers, data = payload)

      print("asasdd", str(body['category_id']))
      print("++++++++", payload)

      return Response(response.text.encode('utf8'))
