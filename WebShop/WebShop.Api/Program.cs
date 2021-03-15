using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using WebShop.Api.DatabaseInitializerExtensions;
using Webshop.Database;

namespace WebShop.Api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            await host.MigrateDatabase<DatabaseContext>();

            using (var scope = host.Services.CreateScope())
                scope.ServiceProvider.GetService<DatabaseInitializer>().Initialize().Wait();

            await host.RunAsync();
        }

        private static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
        }

    }
}
