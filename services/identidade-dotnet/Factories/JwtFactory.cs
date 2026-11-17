using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text.Json;
public class JwtFactory
{
    public static readonly string Issuer = "compasso-identidade"; // @todo import from services/shared/data.json
    public static readonly string Audience = "compasso"; // @todo import from services/shared/data.json

    public static void InflateToken(JwtBearerOptions options, RsaSecurityKey securityKey)
    {
        options.MapInboundClaims = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = Issuer,
            ValidAudience = Audience,
            IssuerSigningKey = securityKey
        };
    }
    public static string Base64UrlEncode(byte[] bytes) =>
    Convert.ToBase64String(bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');


    public static string SignJwt(RSA rsa, string keyId, Dictionary<string, object> claims)
    {
        var header = Base64UrlEncode(JsonSerializer.SerializeToUtf8Bytes(
            new Dictionary<string, object> { ["alg"] = "RS256", ["typ"] = "JWT", ["kid"] = keyId }));
        var payload = Base64UrlEncode(JsonSerializer.SerializeToUtf8Bytes(claims));

        var input = System.Text.Encoding.ASCII.GetBytes($"{header}.{payload}");
        var signature = rsa.SignData(input, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);

        return $"{header}.{payload}.{Base64UrlEncode(signature)}";
    }
    
    public static string CreateJwtToken(RSA rsa, RsaSecurityKey securityKey, IdentityUser user)
    {
        var now = DateTimeOffset.UtcNow;
        var token = SignJwt(rsa, securityKey.KeyId, new Dictionary<string, object>
        {
            ["iss"] = Issuer,
            ["aud"] = Audience,
            ["sub"] = user.Id.ToString(),
            ["email"] = user.Email!,
            ["iat"] = now.ToUnixTimeSeconds(),
            ["nbf"] = now.ToUnixTimeSeconds(),
            ["exp"] = now.AddMinutes(15).ToUnixTimeSeconds()
        });
        return token;
    }
}


    // Theres some issue on here i need to investigate why further, but for now i will make this work for learning purposes
    // private string CreateJwtToken(IdentityUser user)
    // {
    //     var handler = new JsonWebTokenHandler();
    //     var token = handler.CreateToken(new SecurityTokenDescriptor
    //     {
    //         Issuer = JwtHelper.Issuer,
    //         Audience = JwtHelper.Audience,
    //         Subject = new ClaimsIdentity(
    //         [
    //             new Claim("sub", user.Id),
    //             new Claim("email", user.Email!)
    //         ]),
    //         Expires = DateTime.UtcNow.AddMinutes(15),
    //         SigningCredentials = new SigningCredentials(_securityKey, SecurityAlgorithms.RsaSha256)
    //     });
    //     return token;
    // }