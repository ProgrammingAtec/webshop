using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using WebShop.Auth.Abstractions;
using WebShop.Auth.Middleware;

namespace WebShop.Auth
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddJwtTokenProvider(this IServiceCollection services)
        {
            services.AddScoped<ITokenIssuer, JwtTokenIssuer>();
            services.AddScoped<IHashProvider, HashProvider>();
            services.AddScoped<ISessionContextAccessor, JwtSessionContextAccessor>();

            return services;
        }

        public static IApplicationBuilder UseControllableAuthentication(this IApplicationBuilder app)
        {
            return app.UseMiddleware<AuthenticationMiddleware>();
        }
    }
}
