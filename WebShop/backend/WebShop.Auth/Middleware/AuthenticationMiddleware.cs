using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.DependencyInjection;
using WebShop.Auth.Models;
using WebShop.Utils;

namespace WebShop.Auth.Middleware
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private const int SessionsLifeTime = 86400;

        /// <summary/>
        public AuthenticationMiddleware(RequestDelegate next, IAuthenticationSchemeProvider schemes)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            Schemes = schemes ?? throw new ArgumentNullException(nameof(schemes));
        }

        /// <summary>
        /// Схема аутентификации
        /// </summary>
        public IAuthenticationSchemeProvider Schemes { get; set; }

        /// <summary>
        /// Выполнение middleware
        /// </summary>
        /// <param name="context">HttpContext</param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            context.Features.Set<IAuthenticationFeature>(new AuthenticationFeature
            {
                OriginalPath = context.Request.Path,
                OriginalPathBase = context.Request.PathBase
            });

            var handlers = context.RequestServices.GetRequiredService<IAuthenticationHandlerProvider>();
            foreach (var authenticationScheme in await Schemes.GetRequestHandlerSchemesAsync())
            {
                var handlerAsync = await handlers.GetHandlerAsync(context, authenticationScheme.Name) as IAuthenticationRequestHandler;
                var flag = handlerAsync != null;
                if (flag)
                    flag = await handlerAsync.HandleRequestAsync();
                if (flag)
                    return;
            }

            var authenticateSchemeAsync = await Schemes.GetDefaultAuthenticateSchemeAsync();
            if (authenticateSchemeAsync != null)
            {
                var authenticateResult = await context.AuthenticateAsync(authenticateSchemeAsync.Name);

                var userGuidClaim = authenticateResult?.Principal?.Claims.FirstOrDefault(a => a.Type == "userId");
                var sessionGuidClaim = authenticateResult?.Principal?.Claims.FirstOrDefault(a => a.Type == "sessionId");

                if (userGuidClaim != null && sessionGuidClaim != null)
                {
                    try
                    {
                        var userGuid = Guid.Parse(userGuidClaim.Value);
                        var sessionGuid = Guid.Parse(sessionGuidClaim.Value);

                        var cache = context.RequestServices.GetService<IDistributedCache>();

                        cache.TryGetObject<List<SessionCacheEntry>>($"sessions_{userGuid}", out var sessions);

                        if (sessions != null && sessions.Any() && sessions.Any(a => a.SessionId == sessionGuid))
                        {
                            context.User = authenticateResult.Principal;

                            var activityEntry = new ActivityCacheEntry(sessionGuid);
                            cache.SetObject($"activity_{userGuid}", activityEntry, SessionsLifeTime);
                        }
                    }
                    catch (Exception)
                    {
                        await _next(context);
                    }
                }
            }

            await _next(context);
        }
    }
}
