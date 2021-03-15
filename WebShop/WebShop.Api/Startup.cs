using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebShop.Api.Extensions;
using WebShop.Auth;
using Webshop.Database;
using WebShop.Auth.Models;
using WebShop.Domain;

namespace WebShop.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _env;

        public Startup(IConfiguration configuration, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            var defaultConnection = _configuration.GetSection("AUTH_CONNECTION_STRING").Value;
            if (string.IsNullOrEmpty(defaultConnection))
                defaultConnection = _configuration.GetSection("ConnectionStrings:DefaultConnection").Value;

            services.AddDbContextPool<DatabaseContext>(options =>
                {
                    options.UseNpgsql(defaultConnection, a => a.MigrationsAssembly("WebShop.Api"));
                    if (_env.IsDevelopment())
                        options.EnableSensitiveDataLogging();
                }
            );

            services.AddScoped<DatabaseInitializer>();

            services.AddControllers();

            var authOptionsConfiguration = _configuration.GetSection("Auth");
            services.Configure<JwtTokenOptions>(authOptionsConfiguration);

            var authOptions = authOptionsConfiguration.Get<JwtTokenOptions>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = authOptions.Audience,

                        ValidateLifetime = true,

                        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true
                    };
                });

            services.AddDistributedRedisCache(a => a.Configuration = Environment.GetEnvironmentVariable("AUTH_CACHE_CONNECTION_STRING")
                                                                     ?? _configuration["Redis:ConnectionString"]);

            services.AddJwtTokenProvider();
            services.AddSwaggerDocumentation();
            services.AddDomain();

            services.AddHttpContextAccessor();
            services.AddCors();
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (_env.IsDevelopment())
                app.UseSwaggerDocumentation();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseControllableAuthentication();

            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
