"""
WSGI config for eventhunt project.

"""
import os
from dotenv import load_dotenv, find_dotenv

from django.core.wsgi import get_wsgi_application

load_dotenv(find_dotenv())

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "eventhunt.settings.dev")

application = get_wsgi_application()
