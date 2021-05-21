using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebShop.Domain.Abstractions;
using WebShop.Domain.Models.Session;

namespace WebShop.Api.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionService _sessionService;

        public SessionController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpPost]
        public async Task<AuthorizationModel> LogIn([FromBody] AuthorizationInfo authorizationInfo) 
            => await _sessionService.LogIn(authorizationInfo);

        /// <summary>
        /// Деавторизация
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpDelete]
        [Route("{sessionGuid}")]
        public void LogOut([FromRoute] Guid sessionGuid) 
            => _sessionService.LogOut(sessionGuid);
    }
}
