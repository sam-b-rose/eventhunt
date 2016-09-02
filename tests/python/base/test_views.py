from django.core.urlresolvers import reverse
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from tests.python.accounts.test_models import UserFactory


@override_settings(CELERY_EAGER_PROPAGATES_EXCEPTIONS=True, CELERY_ALWAYS_EAGER=True, BROKER_BACKEND='memory')
class BaseTests(APITestCase):
    def setUp(self):
        pass

    def test_get_main_page(self):

        response = self.client.get(reverse('index'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
