

from django.http import JsonResponse
from rest_framework.response import Response

def custom_404_view(request, exception):

    data = {
        "error" : "The requested resource was not found."
    }

    return JsonResponse(data, status=404)