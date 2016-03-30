from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from pusher import Pusher
from random import randint


pusher = Pusher(
    app_id='193389',
    key='de1d3dce971cfb99cd6c',
    secret='dc42bd47030e07387297'
)

def index(request):
    return render(request, 'pusherdemo/index.html')

def trigger(request):
    return render(request, 'pusherdemo/trigger.html')

def trigger_submit(request):
    message = request.POST['message']

    event_data = { 'message': message }

    pusher.trigger('my-channel', 'my-event', event_data)
    return HttpResponse(status=200)

def private(request):
    return render(request, 'pusherdemo/private.html')

def private_auth(request):
    auth = pusher.authenticate(
        channel = request.POST['channel_name'],
        socket_id = request.POST['socket_id']
    )
    return JsonResponse(auth)

def presence(request):
    return render(request, 'pusherdemo/presence.html')

def presence_auth(request):
    auth = pusher.authenticate(
        channel = request.POST['channel_name'],
        socket_id = request.POST['socket_id'],
        custom_data = {
            'user_info': {
                'name': 'Donna Demo'
            },
            'user_id': randint(0, 1000)
        }
    )
    return JsonResponse(auth)



