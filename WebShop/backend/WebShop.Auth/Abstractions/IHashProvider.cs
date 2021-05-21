namespace WebShop.Auth.Abstractions
{
    public interface IHashProvider
    {
        string GetHash(string password, string salt);
        bool Validate(string value, string salt, string hash);
    }
}
