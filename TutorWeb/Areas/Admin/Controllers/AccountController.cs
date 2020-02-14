using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TutorWeb.Data.Entities;

namespace TutorWeb.Areas.Admin.Controllers
{
    public class AccountController : BaseController
    {
        private readonly SignInManager<User> _signInManager;

        public AccountController(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Redirect("/Admin/Login/Index");
        }
    }
}