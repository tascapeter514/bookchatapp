import datetime
import logging

logger = logging.getLogger(__name__)

class TimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = datetime.datetime.now()
        print(f"[Middleware] Request received at: {start_time}")

        # Call the view (and later middleware)
        response = self.get_response(request)

        end_time = datetime.datetime.now()
        duration = end_time - start_time
        print(f"[Middleware] Response returned at: {end_time}")
        print(f"[Middleware] Total request duration: {duration}")

        return response
