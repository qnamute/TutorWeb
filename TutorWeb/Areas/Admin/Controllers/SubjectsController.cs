using Microsoft.AspNetCore.Mvc;
using TutorWeb.Application.Interfaces;
using TutorWeb.Infrastructure.Interfaces;

namespace TutorWeb.Areas.Admin.Controllers
{
    public class SubjectsController : BaseController
    {
        private ISubjectService _subjectService;
        private IUnitOfWork _unitOfWork;

        public SubjectsController(ISubjectService subjectService, IUnitOfWork unitOfWork)
        {
            _subjectService = subjectService;
            _unitOfWork = unitOfWork;
        }

        public IActionResult Index()
        {
            return View();
        }

        #region AJAX API

        public IActionResult GetAllPaging(int page, int pageSize)
        {
            var model = _subjectService.GetAllPaging(page, pageSize);
            return new OkObjectResult(model);
        }

        #endregion AJAX API
    }
}