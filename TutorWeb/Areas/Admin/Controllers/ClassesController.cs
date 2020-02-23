using Microsoft.AspNetCore.Mvc;
using TutorWeb.Application.Interfaces;
using TutorWeb.Infrastructure.Interfaces;

namespace TutorWeb.Areas.Admin.Controllers
{
    public class ClassesController : BaseController
    {
        private IClassService _classService;
        private IUnitOfWork _unitOfWork;

        public ClassesController(IClassService classService, IUnitOfWork unitOfWork)
        {
            _classService = classService;
            _unitOfWork = unitOfWork;
        }

        public IActionResult Index()
        {
            return View();
        }

        #region AJAX API

        public IActionResult GetAllPaging(string keyWord, int page, int pageSize)
        {
            var model = _classService.GetAllPaging(keyWord, page, pageSize);
            return new OkObjectResult(model);
        }

        #endregion AJAX API
    }
}