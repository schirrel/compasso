using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using System.Security.Cryptography;


public class AuthenticationService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RsaSecurityKey _securityKey;
    private readonly RSA _rsa;
    public AuthenticationService(UserManager<IdentityUser> userManager, RsaSecurityKey securityKey, RSA rsa)
    {
        _userManager = userManager;
        _securityKey = securityKey;
        _rsa = rsa;
    }

    public async Task<bool> RegisterUserAsync(Credentials credentials)
    {
        var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
        var result = await _userManager.CreateAsync(user, credentials.Password);
        return result.Succeeded;
    }

    public async Task<string?> LoginUserAsync(Credentials credentials)
    {
        var user = await _userManager.FindByEmailAsync(credentials.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, credentials.Password))
        {
            return null;
        }

        var token = CreateJwtToken(user);
        return token;
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
    private string CreateJwtToken(IdentityUser user)
    {
        var now = DateTimeOffset.UtcNow;
        var token = SignJwt(_rsa, _securityKey.KeyId, new Dictionary<string, object>
        {
            ["iss"] = JwtHelper.Issuer,
            ["aud"] = JwtHelper.Audience,
            ["sub"] = user.Id.ToString(),
            ["email"] = user.Email!,
            ["iat"] = now.ToUnixTimeSeconds(),
            ["nbf"] = now.ToUnixTimeSeconds(),
            ["exp"] = now.AddMinutes(15).ToUnixTimeSeconds()
        });
        return token;
    }

    private string Base64UrlEncode(byte[] bytes) =>
        Convert.ToBase64String(bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

    private string SignJwt(RSA rsa, string keyId, Dictionary<string, object> claims)
    {
        var header = Base64UrlEncode(JsonSerializer.SerializeToUtf8Bytes(
            new Dictionary<string, object> { ["alg"] = "RS256", ["typ"] = "JWT", ["kid"] = keyId }));
        var payload = Base64UrlEncode(JsonSerializer.SerializeToUtf8Bytes(claims));

        var input = System.Text.Encoding.ASCII.GetBytes($"{header}.{payload}");
        var signature = rsa.SignData(input, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);

        return $"{header}.{payload}.{Base64UrlEncode(signature)}";
    }


}
