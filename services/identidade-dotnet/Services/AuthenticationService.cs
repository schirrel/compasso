using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

public class AuthenticationService
{
    private readonly ILogger<AuthenticationService> _logger;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RsaSecurityKey _securityKey;
    private readonly RSA _rsa;
    public AuthenticationService(ILogger<AuthenticationService> logger, UserManager<IdentityUser> userManager, RsaSecurityKey securityKey, RSA rsa)
    {
        _logger = logger;
        _userManager = userManager;
        _securityKey = securityKey;
        _rsa = rsa;
    }

    public async Task<ModelState> RegisterUserAsync(Credentials credentials)
    {
        var state = new ModelState();
        try
        {
            var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
            var exists = await _userManager.FindByEmailAsync(credentials.Email);
            if (exists != null)
            {
                 return new ModelState(["E-mail already registered"]);
            }
            var result = await _userManager.CreateAsync(user, credentials.Password);
            state.Succeeded = result.Succeeded;
            return ModelState.FromResult(result);

        }
        catch (Exception e)
        {
            _logger.LogError(e, "Registration processing failed.");
            throw;
        }
    }

    public async Task<TokenResult?> LoginUserAsync(Credentials credentials)
    {
        var user = await _userManager.FindByEmailAsync(credentials.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, credentials.Password))
        {
            return null;
        }

        var result = JwtFactory.CreateJwtToken(_rsa, _securityKey, user);
        return result;
    }
}
