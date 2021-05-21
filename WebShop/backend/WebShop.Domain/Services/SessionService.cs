using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using WebShop.Auth.Abstractions;
using WebShop.Auth.Models;
using Webshop.Database;
using WebShop.Domain.Abstractions;
using WebShop.Domain.Models.Session;
using WebShop.Utils;

namespace WebShop.Domain.Services
{
    public class SessionService : ISessionService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IHashProvider _hashProvider;
        private readonly IDistributedCache _cache;
        private readonly ITokenIssuer _tokenIssuer;
        private readonly ISessionContextAccessor _sessionContextAccessor;

        private const int SessionsLifeTime = 86400; //1 day

        public SessionService(DatabaseContext databaseContext, 
            IHashProvider hashProvider, 
            IDistributedCache cache, 
            ITokenIssuer tokenIssuer, ISessionContextAccessor sessionContextAccessor)
        {
            _databaseContext = databaseContext;
            _hashProvider = hashProvider;
            _cache = cache;
            _tokenIssuer = tokenIssuer;
            _sessionContextAccessor = sessionContextAccessor;
        }

        public async Task<AuthorizationModel> LogIn(AuthorizationInfo authorizationModel)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(a => a.Email == authorizationModel.Email);

            if (user == null || user.PasswordHash != _hashProvider.GetHash(authorizationModel.Password, user.PasswordSalt))
                throw new InvalidOperationException("Пользователь с такой парой логин/пароль не найден");

            var sessionEntry = new SessionCacheEntry();
            var entryName = GetEntryName(user.Id);

            List<SessionCacheEntry> sessions;

            if(_cache.TryGetObject<List<SessionCacheEntry>>(entryName,  out sessions) == false)
                sessions = new List<SessionCacheEntry>();

            sessions.Add(sessionEntry);

            _cache.SetObject<List<SessionCacheEntry>>(entryName, sessions, SessionsLifeTime);

            var claims = new List<Claim>
            {
                new Claim("userId", user.Id.ToString()),
                new Claim("sessionId", sessionEntry.SessionId.ToString()),
                new Claim("role", user.Role.ToString())
            };

            return new AuthorizationModel
            {
                SessionId = sessionEntry.SessionId,
                AccessToken = _tokenIssuer.IssueToken(new ClaimsIdentity(claims)),
            };
        }

        public void LogOut(Guid sessionId)
        {
            var entryName = GetEntryName(_sessionContextAccessor.SessionContext.UserId);
            
            List<SessionCacheEntry> sessions;

            if (_cache.TryGetObject<List<SessionCacheEntry>>(entryName, out sessions) == false)
                sessions = new List<SessionCacheEntry>();
            
            var sessionToRemove = sessions.FirstOrDefault(a => a.SessionId == sessionId);
            sessions.Remove(sessionToRemove);

            _cache.SetObject<List<SessionCacheEntry>>(entryName, sessions, SessionsLifeTime);
        }

        private static string GetEntryName(Guid userGuid)
        {
            return $"sessions_{userGuid}";
        }
    }
}
