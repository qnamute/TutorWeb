using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TutorWeb.Application.Interfaces;
using TutorWeb.Application.ViewModels;
using TutorWeb.Infrastructure.Interfaces;
using TutorWeb.Models;

namespace TutorWeb.Controllers
{
    public class NewClassController : Controller
    {
        private readonly IClassService _classService;
        private readonly IUnitOfWork _unitOfWork;

        public NewClassController(IClassService classService, IUnitOfWork unitOfWork)
        {
            _classService = classService;
            _unitOfWork = unitOfWork;
        }

        public IActionResult Index()
        {
            var model = new List<ClassViewModel>();
            model = _classService.GetAll();
            return View(model);
        }

        [Route("all-classes.html")]
        public IActionResult NewClasses()
        {
            var model = new List<ClassViewModel>();
            model = _classService.GetAll();
            return View(model);
        }


    }
}