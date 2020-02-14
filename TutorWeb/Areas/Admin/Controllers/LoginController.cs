using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using TutorWeb.Data.Entities;
using TutorWeb.Models.AccountViewModels;
using TutorWeb.Utilities.Dtos;

namespace TutorWeb.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class LoginController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger _logger;

        public LoginController(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<LoginController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Authen(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");
                    return new OkObjectResult(new GenericResult(true));
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning("User account locked out.");
                    return new ObjectResult(new GenericResult(false, "Tài khoản đã bị khóa!"));
                }
                else
                {
                    return new ObjectResult(new GenericResult(false, "Thông tin đăng nhập không đúng!"));
                }
            }

            // If we got this far, something failed, redisplay form
            // Return modal state
            return new ObjectResult(new GenericResult(false, model));
        }
    }
}