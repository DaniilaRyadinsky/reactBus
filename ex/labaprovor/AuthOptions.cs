using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace labaprovor
{
    public class AuthOptions
    {
        public const string ISSUER = "ProvorovIndustriesCorporations";
        public const string AUDIENCE = "MSUTStankin"; 
        const string KEY = "averyveryveryveryveryveryveryveryveryveryveryverycoolkey141817!";   
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
