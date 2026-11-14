using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
public class JwtHelper
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
}