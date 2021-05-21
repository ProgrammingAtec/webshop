using System;

namespace WebShop.Auth.Models
{
    public class SessionCacheEntry
    {
        public SessionCacheEntry()
        {
            SessionId = Guid.NewGuid();
            CreationDate = DateTimeOffset.Now;
        }

        public Guid SessionId { get; set; }

        public DateTimeOffset CreationDate { get; set; }
    }
}
