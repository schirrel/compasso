using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

public class AuthenticationService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RsaSecurityKey _securityKey;

    public AuthenticationService(UserManager<IdentityUser> userManager, RsaSecurityKey securityKey)
    {
        _userManager = userManager;
        _securityKey = securityKey;
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

    private string CreateJwtToken(IdentityUser user)
    {
        var handler = new JsonWebTokenHandler();
        var token = handler.CreateToken(new SecurityTokenDescriptor
        {
            Issuer = JwtHelper.Issuer,
            Audience = JwtHelper.Audience,
            Subject = new ClaimsIdentity(
            [
                new Claim("sub", user.Id),
                new Claim("email", user.Email!)
            ]),
            Expires = DateTime.UtcNow.AddMinutes(15),
            SigningCredentials = new SigningCredentials(_securityKey, SecurityAlgorithms.RsaSha256)
        });
        return token;
    }
}
