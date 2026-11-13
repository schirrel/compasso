using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

// Banco e Identity
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseNpgsql(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddIdentityCore<IdentityUser>(o => o.User.RequireUniqueEmail = true)
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddSingleton<RsaSecurityKey>(RSAFactory.CreateRsaSecurityKey);
builder.Services.AddSingleton<RSA>(RSAFactory.CreateRSA);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();
builder.Services.AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
    .Configure<RsaSecurityKey>((options, securityKey) =>
    {
        JwtHelper.InflateToken(options, securityKey);
    });

builder.Services.AddAuthorization();
builder.Services.AddOpenApi();
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddControllers();

var app = builder.Build();

app.MapOpenApi();
app.MapControllers();
app.Run();