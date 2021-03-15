using System;
using System.Threading.Tasks;
using WebShop.Domain.Models.Session;

namespace WebShop.Domain.Abstractions
{
    public interface ISessionService
    {
        /// <summary>
        /// Авторизация пользователя
        /// </summary>
        /// <param name="authorizationModel">Модель авторизации</param>
        /// <returns></returns>
        Task<AuthorizationModel> LogIn(AuthorizationInfo authorizationModel);

        /// <summary>
        /// Деавторизация пользователя
        /// </summary>
        /// <returns></returns>
        void LogOut(Guid sessionGuid);
    }
}
