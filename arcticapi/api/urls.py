from api import views
from django.urls import path


urlpatterns = [
    path('prediction/', views.CreatePrediction.as_view()),
]
