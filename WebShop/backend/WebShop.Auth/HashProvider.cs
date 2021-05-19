using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Text;
using WebShop.Auth.Abstractions;

namespace WebShop.Auth
{
    public class HashProvider : IHashProvider
    {
        public string GetHash(string password, string salt)
        {
            var valueBytes = KeyDerivation.Pbkdf2(
                password: password,
                salt: Encoding.UTF8.GetBytes(salt),
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);

            return Convert.ToBase64String(valueBytes);
        }

        public bool Validate(string value, string salt, string hash)
            => GetHash(value, salt) == hash;
        
    }
}
