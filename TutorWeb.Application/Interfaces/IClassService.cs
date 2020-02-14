using System;
using System.Collections.Generic;
using TutorWeb.Application.ViewModels;

namespace TutorWeb.Application.Interfaces
{
    public interface IClassService : IDisposable
    {
        List<ClassViewModel> GetAll();

        ClassViewModel GetById(int id);

        void Delete(int id);

        void Update(ClassViewModel classViewModel);

        void Save();
    }
}