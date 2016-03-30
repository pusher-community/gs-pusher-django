from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^trigger$', views.trigger, name='trigger'),
    url(r'^trigger_submit$', views.trigger_submit, name='trigger_submit'),
    url(r'^private$', views.private, name='private'),
    url(r'^private_auth$', views.private_auth, name='private_auth'),
    url(r'^presence$', views.presence, name='presence'),
    url(r'^presence_auth$', views.presence_auth, name='presence_auth'),
]
