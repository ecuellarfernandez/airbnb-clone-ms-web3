
from functools import wraps
from rest_framework.exceptions import PermissionDenied, NotAuthenticated

def needs_roles(required_roles : list):
    """
    Decorator to check if the user has the required roles to access a function.

    :param required_roles: List of roles required to access the function.
    """
    def decorator(view_func):
        def wrapper(*args, **kwargs):

            request = None
            for arg in args:
                if hasattr(arg, 'META'):
                    request = arg
                    break

            if not request:
                raise PermissionDenied

            roles_header = request.META.get('HTTP_X_USER_ROLES', '')
            provided_roles = [role.strip() for role in roles_header.split(';') if role.strip()]

            if not provided_roles:
                raise NotAuthenticated("User roles not provided in the request headers.")

            has_permission = any(role in provided_roles for role in required_roles)
            if not has_permission:
                raise PermissionDenied("You do not have permission to access this resource.")

            return view_func(*args, **kwargs)

        return wrapper
    return decorator