using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace WebShop.Api.DatabaseInitializerExtensions
{
    public static class DatabaseInitializerExtensions
    {
        /// <summary />
        public static async Task<IWebHost> MigrateDatabase<TDatabase>(this IWebHost webHost) where TDatabase : DbContext
        {
            using (var scope = webHost.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var database = services.GetRequiredService<TDatabase>();
                    await database.Database.MigrateAsync();
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "An error occurred while migrating the database!");
                }
            }

            return webHost;
        }

    }
}
