namespace WebShop.Auth.Abstractions
{
    public interface ISessionContextAccessor
    {
        SessionContext SessionContext { get; }
    }
}
