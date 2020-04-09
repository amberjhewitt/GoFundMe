


import requests

url = "https://ussouthcentral.services.azureml.net/workspaces/2abd23f891284eb98f5356e46b5cb743/services/5f8fb15e0fa54250a7a827a534139f52/execute?api-version=2.0&details=true"

payload = "{\r\n  \"Inputs\": {\r\n    \"input1\": {\r\n      \"ColumnNames\": [\r\n        \"auto_fb_post_mode\",\r\n        \"category_id\",\r\n        \"goal\",\r\n        \"title\",\r\n        \"description\",\r\n        \"location_city\",\r\n        \"location_state\",\r\n        \"location_zip\",\r\n        \"is_charity\",\r\n        \"DonationPerDay\"\r\n      ],\r\n      \"Values\": [\r\n        [\r\n          \"1\",\r\n          \"3\",\r\n          \"1000\",\r\n          \"Dan is sad\",\r\n          \"Hi everyone! I have been given this amazing opportunity to go to Africa! I would be working with children in orphanages and in their homes. The organization that I am going through is IVHQ volunteering. The things that I need to pay for is for my airfare, which is where the majority of the money will be going. Also, I need to pay for the trip itself. This will cover all of my meals, airport transportation, my housing, and my 24/7 service with the oraginization. I will be leaving on December 17th for one week. Any amount that you give will be greatly appreciated! Thank you so much!\",\r\n          \"Palm Springs\",\r\n          \"CA\",\r\n          \"92234\",\r\n          \"1\",\r\n          \"94\"\r\n        ],\r\n      ]\r\n    }\r\n  },\r\n  \"GlobalParameters\": {}\r\n}"
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer MujZ7ab+kOueM44Y0hTbigu0tG7VGmNkHYts/YRXBBg1fNnCodWvy29uY8UWqxFB9/rNPCBMT5T/HWlOwHIZXg==',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data = payload)


print(response.text.encode('utf8'))
