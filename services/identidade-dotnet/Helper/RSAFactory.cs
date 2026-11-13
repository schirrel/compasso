using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.IO;
public static class RSAFactory
{
        public static string keyFileName = "jwt-key.pem";
        public static string keyId = "compasso-1";
        public static RSA CreateRSA(IServiceProvider serviceProvider)
    {
        return RSA.Create(2048);
    }
    
    public static RsaSecurityKey CreateRsaSecurityKey(IServiceProvider serviceProvider)
    {
        var rsa = CreateRSA(serviceProvider);
        if (File.Exists(keyFileName)) rsa.ImportFromPem(File.ReadAllText(keyFileName));
        else File.WriteAllText(keyFileName, rsa.ExportRSAPrivateKeyPem());
        return new RsaSecurityKey(rsa) { KeyId = keyId};
    }
}