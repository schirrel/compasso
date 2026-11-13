using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Security.Claims;

[Route("api/[controller]")]
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
        if (result)
        {
            return CreatedAtAction(nameof(Register), new { email = credentials.Email }, null);
        }
        return BadRequest();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Credentials credentials)
    {
        var token = await _authenticationService.LoginUserAsync(credentials);
        if (token != null)
        {
            return Ok(new { access_token = token, expires_in = 900 });
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
