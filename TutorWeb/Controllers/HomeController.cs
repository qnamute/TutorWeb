using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TutorWeb.Application.Interfaces;
using TutorWeb.Infrastructure.Interfaces;
using TutorWeb.Models;

namespace TutorWeb.Controllers
{
    public class HomeController : Controller
    {
        private IClassService _classService;
        private IUnitOfWork _unitOfWork;

        public HomeController(IClassService classService, IUnitOfWork unitOfWork)
        {
            _classService = classService;
            _unitOfWork = unitOfWork;
        }

        public IActionResult Index()
        {
            var homeViewModel = new HomeViewModel();
            homeViewModel.ListSlider = _classService.GetListSlider();

            homeViewModel.NewClasses = _classService.GetNewClasses();

            return View(homeViewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}