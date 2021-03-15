using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using WebShop.Auth.Abstractions;
using Webshop.Entities;
using Webshop.Entities.Enums;
using WebShop.Utils;

namespace Webshop.Database
{
    public class DatabaseInitializer
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IHashProvider _hashProvider;

        public DatabaseInitializer(DatabaseContext databaseContext, 
            IHashProvider hashProvider)
        {
            _databaseContext = databaseContext;
            _hashProvider = hashProvider;
        }

		public async Task Initialize()
		{

			if (!await _databaseContext.Users.AnyAsync())
			{
                #region Пользователи

				var adminSalt = new Random().GenerateSequence();
				var admin = new User
				(
					UserRoleTypeOptions.Admin,
                    "admin@admin.ru",
					"+79999999999",
					adminSalt,
					_hashProvider.GetHash("111111", adminSalt),
					"Системный Администратор"
				);


				_databaseContext.Users.Add(admin);

				#endregion

				
				await _databaseContext.SaveChangesAsync();
			}

			await _databaseContext.SaveChangesAsync();
		}
	}
}
