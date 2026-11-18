using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[Route("")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly AuthenticationService _authenticationService;

    public AccountController(AuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Credentials credentials)
    {
        var result = await _authenticationService.RegisterUserAsync(credentials);
        if (result.Succeeded)
        {
            return CreatedAtAction(nameof(Register), new { email = credentials.Email }, null);
        }
        return BadRequest(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Credentials credentials)
    {
        var loginResult = await _authenticationService.LoginUserAsync(credentials);
        if (loginResult != null)
        {
            return Ok(new { access_token = loginResult.Token, expires_in = loginResult.ExpiresIn});
        }
        return Unauthorized();
    }

    [HttpGet("me")]
    [Authorize]  
     public async Task<IActionResult> Me(){
       var userInfo = new
        {
            id = User.FindFirstValue("sub"),
            email = User.FindFirstValue("email")
        };
        return Ok(userInfo);
    }
}
