using System.Security.Claims;

namespace WebShop.Auth.Abstractions
{
    public interface ITokenIssuer
    {
        /// <summary>
        /// Издание токена
        /// </summary>
        /// <param name="identity">Клеймы</param>
        /// <returns>Токен</returns>
        string IssueToken(ClaimsIdentity identity);
    }
}
