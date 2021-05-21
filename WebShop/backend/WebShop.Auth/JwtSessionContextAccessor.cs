using System;
using System.Security.Claims;
using WebShop.Auth.Abstractions;
using Webshop.Entities.Enums;
using Microsoft.AspNetCore.Http;

namespace WebShop.Auth
{
    public class JwtSessionContextAccessor : ISessionContextAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        /// <summary/>
        public JwtSessionContextAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        /// <inheritdoc />
        public SessionContext SessionContext
        {
            get
            {
                if (_httpContextAccessor == null)
                    return null;

                var authenticated = _httpContextAccessor.HttpContext?.User.Identity.IsAuthenticated;
                if (!authenticated.HasValue || !authenticated.Value)
                    return new SessionContext();

                var userIdentity = _httpContextAccessor.HttpContext.User;

                var userGuid = Guid.Parse(userIdentity.FindFirst("userId").Value);
                var sessionGuid = Guid.Parse(userIdentity.FindFirst("sessionId").Value);
                var roleType = (UserRoleTypeOptions)Enum.Parse(typeof(UserRoleTypeOptions),
                    userIdentity.FindFirst(ClaimsIdentity.DefaultRoleClaimType).Value);

                return new SessionContext(sessionGuid, userGuid, roleType);
            }
        }
    }
}
