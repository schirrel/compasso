public class TokenResult
{
    public string Token { get; set; }
    public long ExpiresIn { get; set; }

    public TokenResult(string token, long expiresIn)
    {
        Token = token;
        ExpiresIn = expiresIn;
    }
}
