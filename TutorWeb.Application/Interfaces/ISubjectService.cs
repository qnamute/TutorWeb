using System;
using System.Collections.Generic;
using TutorWeb.Application.ViewModels;
using TutorWeb.Utilities.Dtos;

namespace TutorWeb.Application.Interfaces
{
    public interface ISubjectService : IDisposable
    {
        List<SubjectViewModel> GetAll();

        PagedResult<SubjectViewModel> GetAllPaging(int page, int pageSize);

        SubjectViewModel GetById(int id);

        void Delete(int id);

        void Update(SubjectViewModel subjectViewModel);

        void Save();
    }
}