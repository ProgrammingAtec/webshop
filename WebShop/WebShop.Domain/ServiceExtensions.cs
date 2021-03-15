using Microsoft.Extensions.DependencyInjection;
using WebShop.Domain.Abstractions;
using WebShop.Domain.Services;

namespace WebShop.Domain
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddDomain(this IServiceCollection services)
        {
            services.AddScoped<ISessionService, SessionService>();

            return services;
        }
    }
}
