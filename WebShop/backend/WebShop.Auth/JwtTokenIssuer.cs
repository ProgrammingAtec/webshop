using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using WebShop.Auth.Abstractions;
using WebShop.Auth.Models;

namespace WebShop.Auth
{
    public class JwtTokenIssuer : ITokenIssuer
    {
        private readonly IOptions<JwtTokenOptions> _options;

        /// <summary/>
        public JwtTokenIssuer(IOptions<JwtTokenOptions> options)
        {
            _options = options;
        }

        public string IssueToken(ClaimsIdentity identity)
        {
            var securityKey = _options.Value.GetSymmetricSecurityKey();
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(_options.Value.Issuer,
                _options.Value.Audience,
                identity.Claims,
                expires: DateTime.Now.AddSeconds(_options.Value.TokenLifeTime),
                signingCredentials: signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
