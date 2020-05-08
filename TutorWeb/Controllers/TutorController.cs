using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TutorWeb.Application.Implementations;
using TutorWeb.Application.Interfaces;
using TutorWeb.Data.Entities;

namespace TutorWeb.Controllers
{
    public class TutorController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IRegisterClassService _registerClassService;
        private readonly IClassService _classService;

        public TutorController(UserManager<User> userManager, IRegisterClassService registerClassService, IClassService classService)
        {
            _userManager = userManager;
            _registerClassService = registerClassService;
            _classService = classService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Route("all-tutors.html")]
        public IActionResult GetAllTutors()
        {
            var tutors = _userManager.Users.ToList();
            return View(tutors);
        }
    }
}