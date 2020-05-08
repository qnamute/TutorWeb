using System;
using System.Collections.Generic;
using TutorWeb.Application.ViewModels;
using TutorWeb.Data.Entities;

namespace TutorWeb.Application.Interfaces
{
    public interface IRegisterClassService : IDisposable
    {
        void Delete(int id);

        List<User> GetAllTutor();

        void Save();
    }
}