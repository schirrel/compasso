using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

[Route(".well-known")]
[ApiController]
public class WellKnownController : ControllerBase
{
    private readonly RsaSecurityKey _securityKey;
    private readonly RSA _rsa;
    public WellKnownController(RsaSecurityKey securityKey, RSA rsa)
    {
        _securityKey = securityKey;
        _rsa = rsa;
    }

    [HttpGet("jwks.json")]
    public async Task<IResult> Register()
    {
      var publica = new RsaSecurityKey(_rsa.ExportParameters(false)) { KeyId = _securityKey.KeyId };
        var jwk = JsonWebKeyConverter.ConvertFromRSASecurityKey(publica);
        return Results.Json(new
        {
            keys = new[] { new { kty = jwk.Kty, kid = jwk.Kid, use = "sig", alg = "RS256", n = jwk.N, e = jwk.E } }
        });
    }
}
