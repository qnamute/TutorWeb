using System;
using System.Collections.Generic;
using TutorWeb.Application.ViewModels;

namespace TutorWeb.Application.Interfaces
{
    public interface ISubjectService : IDisposable
    {
        List<SubjectViewModel> GetAll();

        SubjectViewModel GetById(int id);

        void Delete(int id);

        void Update(SubjectViewModel subjectViewModel);

        void Save();
    }
}