using MessagePack.Resolvers;
using System;
using MessagePack;
using Microsoft.Extensions.Caching.Distributed;
using Serilog;

namespace WebShop.Utils
{
    public static class DistributedCacheExtensions
    {
        static DistributedCacheExtensions()
        {
            StaticCompositeResolver.Instance.Register
            (
                NativeDateTimeResolver.Instance,
                NativeGuidResolver.Instance,
                NativeDecimalResolver.Instance,
                TypelessObjectResolver.Instance,
                StandardResolver.Instance
            );

            MessagePackSerializer.DefaultOptions = MessagePackSerializerOptions.Standard
                .WithResolver(StaticCompositeResolver.Instance);
        }

        public static void SetObject<T>(this IDistributedCache distributedCache, string key, T source,
            int expirationInSeconds)
        {
            var bytes = MessagePackSerializer.Serialize(source);
            distributedCache.Set(key, bytes, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(expirationInSeconds)
            });
        }

        public static bool TryGetObject<T>(this IDistributedCache distributedCache, string key, out T result)
        {
            try
            {
                var bytes = distributedCache.Get(key);
                if (bytes == null)
                {
                    result = default;

                    return false;
                }

                result = MessagePackSerializer.Deserialize<T>(bytes);
            }
            catch (Exception exc)
            {
                result = default;
                Log.Information(exc.Message);

                return false;
            }

            return true;
        }
    }
}
