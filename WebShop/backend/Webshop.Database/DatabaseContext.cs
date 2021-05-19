using Microsoft.EntityFrameworkCore;
using Webshop.Entities;

namespace Webshop.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Индексы
            builder.Entity<User>().HasIndex(a => a.Phone).IsUnique();
            builder.Entity<User>().HasIndex(a => a.Email).IsUnique();
        }
    }
}
