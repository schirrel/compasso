using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
public class JwtHelper
{
    public static readonly string Issuer = "compasso-identidade";
    public static readonly string Audience = "compasso";

    public static void InflateToken(JwtBearerOptions options, RsaSecurityKey securityKey)
    {
        options.MapInboundClaims = false; // mantém os nomes "sub" e "email"
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = Issuer,
            ValidAudience = Audience,
            IssuerSigningKey = securityKey
        };
    }
}