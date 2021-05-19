using System;
using Webshop.Entities.Enums;

namespace WebShop.Auth
{
    public class SessionContext
    {
        public Guid SessionId { get; set; }

        public Guid UserId { get; set; }

        public UserRoleTypeOptions UserRoleType { get; set; }

        public bool Authorized { get; set; }



        /// <summary/>
        public SessionContext()
        {
            Authorized = false;
        }

        public SessionContext(Guid sessionId, Guid userId, UserRoleTypeOptions userRoleType)
        {
            SessionId = sessionId;
            UserId = userId;
            UserRoleType = userRoleType;
            Authorized = true;
        }
    }
}
