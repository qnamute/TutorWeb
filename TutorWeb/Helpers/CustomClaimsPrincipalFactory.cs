using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Threading.Tasks;
using TutorWeb.Data.Entities;

namespace TutorWeb.Helpers
{
    // Custom claim user to save some information like avatar...
    public class CustomClaimsPrincipalFactory : UserClaimsPrincipalFactory<User, Role>
    {
        private UserManager<User> _userManager;

        public CustomClaimsPrincipalFactory(UserManager<User> userManager, RoleManager<Role> roleManager, IOptions<IdentityOptions> options)
            : base(userManager, roleManager, options)
        {
            _userManager = userManager;
        }

        public async override Task<ClaimsPrincipal> CreateAsync(User user)
        {
            var principal = await base.CreateAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            ((ClaimsIdentity)principal.Identity).AddClaims(new[]
            {
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email),
                new Claim("FullName", user.FullName),
                new Claim("Avatar", user.Avatar ??string.Empty),
                new Claim("Roles", string.Join(";",roles))
            });

            return principal;
        }
    }
}