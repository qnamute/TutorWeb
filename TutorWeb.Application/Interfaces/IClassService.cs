using System;
using System.Collections.Generic;
using TutorWeb.Application.ViewModels;
using TutorWeb.Utilities.Dtos;

namespace TutorWeb.Application.Interfaces
{
    public interface IClassService : IDisposable
    {
        List<ClassViewModel> GetAll();

        PagedResult<ClassViewModel> GetAllPaging(string keyWord, int page, int pageSize);

        ClassViewModel GetById(int id);

        void Delete(int id);

        void Update(ClassViewModel classViewModel);

        void Save();
    }
}