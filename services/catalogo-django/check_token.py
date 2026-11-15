import json
import urllib.request

import jwt
from jwt import PyJWK


def post_json(url, body):
    request = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request) as response:
        return json.load(response)


def get_json(url):
    with urllib.request.urlopen(url) as response:
        return json.load(response)


token = post_json(
    "http://localhost:5000/login",
    {"email": "teste@compasso.dev", "password": "Senha@123"},
)["access_token"]

jwks = get_json("http://localhost:5000/.well-known/jwks.json")
header = jwt.get_unverified_header(token)
print("token kid:", header.get("kid"))
print("published kids:", [k["kid"] for k in jwks["keys"]])

key_data = next(k for k in jwks["keys"] if k["kid"] == header["kid"])
public_key = PyJWK(key_data).key

try:
    claims = jwt.decode(
        token,
        public_key,
        algorithms=["RS256"],
        audience="compasso",
        issuer="compasso-identidade",
    )
    print("VALID:", claims)
except jwt.PyJWTError as error:
    print(type(error).__name__, "-", error)