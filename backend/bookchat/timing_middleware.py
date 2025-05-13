# import datetime
# import logging

# logger = logging.getLogger(__name__)

# class TimingMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         print('beginning middleware time stamps')
#         start_time = datetime.datetime.now()
#         print(f"[Middleware] Request received at: {start_time}")

#         # Call the view (and later middleware)
#         response = self.get_response(request)

#         end_time = datetime.datetime.now()
#         duration = end_time - start_time
#         print(f"[Middleware] Response returned at: {end_time}")
#         print(f"[Middleware] Total request duration: {duration}")

#         return response

import time
import logging
from django.db import connection

logger = logging.getLogger(__name__)

class TimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_request = time.time()
        
        response = self.get_response(request)
        
        total_request_time = time.time() - start_request

        total_query_time = 0.0
        for query in connection.queries:
            try:
                total_query_time += float(query.get('time', 0))
            except (ValueError, TypeError):
                pass

        logger.info(
            f"[TimingMiddleware] Path: {request.path} | "
            f"Total time: {total_request_time:.3f}s | "
            f"DB time: {total_query_time:.3f}s | "
            f"Query count: {len(connection.queries)}"
        )

        return response

