using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;


[Route("api")]
[ApiController]
public class DebugController(RsaSecurityKey securityKey, RSA rsa) : ControllerBase
{
    private readonly RsaSecurityKey _securityKey = securityKey;
    private readonly RSA _rsa = rsa;

    [HttpGet("debug/check")]
    public async Task<IActionResult> DebugCheck(){
       var handler = new JsonWebTokenHandler();

    // Sign with the private key, as /login does
    var token = handler.CreateToken(new SecurityTokenDescriptor
    {
        Issuer = JwtHelper.Issuer,
        Audience = JwtHelper.Audience,
        Claims = new Dictionary<string, object> { ["sub"] = "debug" },
        Expires = DateTime.UtcNow.AddMinutes(5),
        SigningCredentials = new SigningCredentials(_securityKey, SecurityAlgorithms.RsaSha256)
    });

    // Verify with a key built ONLY from the public parameters, as the JWKS does
        var publicKey = new RsaSecurityKey(_rsa.ExportParameters(false)) { KeyId = _securityKey.KeyId };
    var result = handler.ValidateToken(token, new TokenValidationParameters
    {
        IssuerSigningKey = publicKey,
        ValidateIssuer = false,
        ValidateAudience = false
    });

    return Ok(new {
        privateKeyTokenValidWithPublicKey = result.IsValid,
        error = result.Exception?.Message,
        kid = _securityKey.KeyId
    });
    }

    
    [HttpGet("debug/rsa")]
     public async Task<IActionResult> DebugRSA()
    {
        var data = System.Text.Encoding.UTF8.GetBytes("hello");
    var signature = _rsa.SignData(data, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);

    using var verifier = RSA.Create();
    verifier.ImportParameters(_rsa.ExportParameters(false));

    return Ok(new
    {
        valid = verifier.VerifyData(data, signature, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1),
        keySizeInBits = _rsa.KeySize
    });
    }
    }
