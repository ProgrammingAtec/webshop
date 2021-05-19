using System.ComponentModel;

namespace Webshop.Entities.Enums
{
    public enum UserRoleTypeOptions
    {
        /// <summary>
        /// Системный администратор
        /// </summary>
        [Description("Администратор")]
        Admin = 1,

        /// <summary>
        /// Региональный администратор
        /// </summary>
        [Description("Пользователь")]
        User = 2,
    }
}
