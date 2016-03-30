from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.trigger, name='trigger'),
    url(r'^trigger_submit$', views.trigger_submit, name='trigger_submit'),
]
