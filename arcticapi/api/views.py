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
        

      url = "https://ussouthcentral.services.azureml.net/workspaces/2abd23f891284eb98f5356e46b5cb743/services/456a813cb0204680987f80927ad5352c/execute?api-version=2.0&details=true"

      payload = "{\r\n  \"Inputs\": {\r\n    \"input1\": {\r\n      \"ColumnNames\": [\r\n        \"goal\",\r\n        \"title\",\r\n        \"description\",\r\n        \"location_city\",\r\n        \"location_state\",\r\n        \"location_zip\",\r\n        \"is_charity\",\r\n        \"DonationPerDay\"\r\n      ],\r\n      \"Values\": [\r\n        [\r\n          \"" + str(body['goal']) + "\",\r\n          \"" + str(body['title']) + "\",\r\n          \"" + str(body['description']) + "\",\r\n          \"" + str(body['location_city']) + "\",\r\n          \"" + str(body['location_state']) + "\",\r\n          \"" + str(body['location_zip']) + "\",\r\n          \"" + str(body['is_charity']) + "\",\r\n          \"" + str(body['DonationPerDay']) + "\"\r\n        ],\r\n      ]\r\n    }\r\n  },\r\n  \"GlobalParameters\": {}\r\n}"

      
      
      headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AWaqgoZNED0o+NRjTXzz2MNXMmRTaQaUFfhbYDNuXlFgd8uoSHJjCUXSBkw24fSao2TL29MdUBYHdZ/MJuzZ1Q==',
        'Content-Type': 'application/json'
      }

      response = requests.request("POST", url, headers=headers, data = payload)


      print(body)
      print("///////////////", str(body['description']))
      print("++++++++", payload)

      return Response(response.text.encode('utf8'))
