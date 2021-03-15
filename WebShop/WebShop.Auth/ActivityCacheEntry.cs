using System;

namespace WebShop.Auth
{
    public class ActivityCacheEntry
    {
        /// <summary/>
        public ActivityCacheEntry(Guid sessionId)
        {
            SessionId = sessionId;
            ActivityDate = DateTimeOffset.Now;
        }

        public Guid SessionId { get; set; }

        public DateTimeOffset ActivityDate { get; set; }
    }
}
