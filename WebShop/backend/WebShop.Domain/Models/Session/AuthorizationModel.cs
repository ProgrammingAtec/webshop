using System;

namespace WebShop.Domain.Models.Session
{
    public class AuthorizationModel
    {
        public Guid SessionId { get; set; }

        public string AccessToken { get; set; }
    }
}
