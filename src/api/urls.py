from django.conf.urls import url

from api import views as api_views

urlpatterns = [
    url(r'^categories/$', api_views.CategoryDataView.as_view(), name='category_data'),
    url(r'^subcategories/$', api_views.SubcategoryDataView.as_view(), name='subcategory_data'),
    url(r'^events/$', api_views.EventDataView.as_view(), name='event_data'),
]
