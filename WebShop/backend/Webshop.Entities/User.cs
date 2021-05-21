using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Webshop.Entities.Enums;

namespace Webshop.Entities
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid Id { get; set; }

        public UserRoleTypeOptions Role { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string Phone { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }

        [MaxLength(150)]
        public string Credentials { get; set; }


        public User() { }

        public User(UserRoleTypeOptions userRole, string email, string phone, string passwordSalt, string passwordHash,
            string credentials)
        {
            Id = Guid.NewGuid();
            Role = userRole;
            Email = email;
            Phone = phone;
            PasswordSalt = passwordSalt;
            PasswordHash = passwordHash;
            Credentials = credentials;
        }
    }
}
