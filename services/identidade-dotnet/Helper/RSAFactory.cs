using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.IO;
public static class RSAFactory
{
        static readonly string KeyFileName = "jwt-key.pem";
        static readonly string PublicKeyFileName = "public-jwt-key.pem";
        public static RSA CreateRSA(IServiceProvider serviceProvider)
    {
        return RSA.Create(2048);
    }
    
    public static RsaSecurityKey CreateRsaSecurityKey(IServiceProvider serviceProvider)
    {
        var rsa = CreateRSA(serviceProvider);
        if (File.Exists(KeyFileName)) rsa.ImportFromPem(File.ReadAllText(KeyFileName));
        else File.WriteAllText(KeyFileName, rsa.ExportRSAPrivateKeyPem());

        if (!File.Exists(PublicKeyFileName)) File.WriteAllText(PublicKeyFileName, rsa.ExportRSAPublicKeyPem());

        var keyId = Convert.ToHexString(SHA256.HashData(rsa.ExportSubjectPublicKeyInfo()))[..16];
        return new RsaSecurityKey(rsa) { KeyId = keyId};
    }
}