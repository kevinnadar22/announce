from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    """
    Custom pagination class that allows clients to set the page size
    via query parameters while maintaining reasonable limits.
    """

    page_size = 6  # Default page size
    page_size_query_param = "page_size"  # Allow client to override page size
