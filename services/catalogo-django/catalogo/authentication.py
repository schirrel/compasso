import jwt
from django.conf import settings
from jwt import PyJWKClient
from rest_framework import authentication, exceptions

_jwks_client = PyJWKClient(settings.IDENTITY_JWKS_URL, cache_keys=True)


class IdentityUser:
    """Minimal user object built from the token. The Identity service owns the real user."""

    is_authenticated = True

    def __init__(self, user_id, email):
        self.id = user_id
        self.email = email


class IdentityJWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        parts = authentication.get_authorization_header(request).split()
        if not parts or parts[0].lower() != b"bearer":
            return None  # no Bearer token: let other authenticators try

        if len(parts) != 2:
            raise exceptions.AuthenticationFailed("Malformed Authorization header.")

        token = parts[1].decode()
        try:
            signing_key = _jwks_client.get_signing_key_from_jwt(token)
            claims = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],  # never trust the algorithm named in the token
                audience=settings.IDENTITY_AUDIENCE,
                issuer=settings.IDENTITY_ISSUER,
            )
        except jwt.PyJWTError as error:
            raise exceptions.AuthenticationFailed(f"Invalid token: {error}")

        return IdentityUser(claims["sub"], claims.get("email")), claims

    def authenticate_header(self, request):
        # Makes missing or invalid tokens return 401 instead of 403
        return 'Bearer realm="catalogo"'